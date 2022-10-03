<script setup lang="ts">
interface SongItemProps {
  id: number;
  name: string;
  url: string;
  artist: string;
  isActive: boolean;
  handleStartMusic: Function;
  onChangeDuration: Function;
  handleEnded: Function;
}

defineProps<SongItemProps>();
</script>

<script lang="ts">
import moment from "moment";

interface Data {
  duration: string;
}

export default {
  data(): Data {
    return {
      duration: "",
    };
  },
  methods: {
    onDurationChange(): void {
      const audioPlayer = document.getElementById(
        `audio-${this.id}`
      ) as HTMLAudioElement | null;
      if (audioPlayer) {
        this.duration = moment()
          .startOf("day")
          .seconds(audioPlayer.duration)
          .format("m:ss");
      }
    },
    handleTimeUpdate(e: Event): void {
      if (e.target) {
        this.onChangeDuration((e.target as HTMLAudioElement).currentTime);
      }
    },
    onAudioEnd(): void {
      this.handleEnded();
    },
  },
};
</script>

<template>
  <div
    :onclick="() => handleStartMusic(id)"
    :class="`song${isActive ? ' song__active' : ''}`"
  >
    <div class="song__name">{{ `${artist} - ${name}` }}</div>
    <div class="song__duration">{{ duration }}</div>
  </div>
  <audio
    v-on:durationchange="onDurationChange"
    v-on:timeupdate="handleTimeUpdate"
    v-on:ended="onAudioEnd"
    :id="`audio-${id}`"
  >
    <source :src="url" type="audio/mpeg" />
  </audio>
</template>

<style scoped>
.song {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  cursor: pointer;
}

.song:hover {
  opacity: 0.6;
}

.song__name {
  font-size: 14px;
  color: gray;
}

.song__active .song__name {
  color: #000;
}
.song__active .song__duration {
  color: #000;
}

.song__duration {
  font-size: 14px;
  color: gray;
}
</style>
