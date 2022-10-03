<script setup lang="ts">
import AudioControllers from "../components/AudioControllers.vue";
import TrackBar from "../components/TrackBar.vue";
import SpinnerLoading from "../components/SpinnerLoading.vue";
import SongItem from "../components/SongItem.vue";
</script>

<script lang="ts">
import { songs } from "../utils/songs";
import type { Song } from "../global.types";

interface Data {
  isPlaying: boolean;
  volume: number;
  audioDuration: number;
  activeAudioDuration: number;
  isLoading: boolean;
  activeSong: HTMLAudioElement | null;
  activeId: number | null;
}

export default {
  data(): Data {
    return {
      isPlaying: false,
      volume: 1.0,
      audioDuration: 1000,
      activeAudioDuration: 0,
      isLoading: true,
      activeSong: null,
      activeId: null,
    };
  },
  methods: {
    handlePlay(isPlay: boolean): void {
      if (this.activeSong) {
        this.isPlaying = isPlay;
      }
      if (!isPlay && !!this.activeSong) {
        this.activeSong.pause();
      }
      if (isPlay && !!this.activeSong) {
        this.activeSong.play();
      }
      if (isPlay && !this.activeSong) {
        this.isPlaying = isPlay;
        this.handleStartMusic(this.songs[0].id);
      }
    },
    handleNext(): void {
      if (this.activeSong && this.activeId) {
        const currentSongIndex = this.songs.findIndex(
          (item: Song) => item.id === this.activeId
        );
        if (currentSongIndex > -1) {
          if (currentSongIndex < this.songs.length - 1) {
            const nextSong = this.songs[currentSongIndex + 1];
            this.resetDurations();
            if (this.activeSong && this.activeId !== nextSong.id) {
              this.resetActiveSong();
            }
            const audioPlayer = document.getElementById(
              `audio-${nextSong.id}`
            ) as HTMLAudioElement;
            if (audioPlayer) {
              this.activeSong = audioPlayer;
            }
          } else {
            this.handleStartMusic(this.songs[0].id);
          }
        }
      }
    },
    handlePrev(): void {
      if (this.activeSong && this.activeId) {
        const currentSongIndex = this.songs.findIndex(
          (item: Song) => item.id === this.activeId
        );
        if (currentSongIndex > -1) {
          if (currentSongIndex > 0) {
            const prevSong = this.songs[currentSongIndex - 1];
            this.resetDurations();
            if (this.activeSong && this.activeId !== prevSong.id) {
              this.resetActiveSong();
            }
            const audioPlayer = document.getElementById(
              `audio-${prevSong.id}`
            ) as HTMLAudioElement;
            if (audioPlayer) {
              this.activeSong = audioPlayer;
            }
          } else {
            this.handleStartMusic(this.songs[this.songs.length - 1].id);
          }
        }
      }
    },
    resetDurations(): void {
      this.audioDuration = 0;
      this.activeAudioDuration = 0;
    },
    resetActiveSong(): void {
      if (this.activeSong) {
        this.activeSong.pause();
        this.activeSong.currentTime = 0;
        this.activeAudioDuration = 0;
      }
    },
    setActiveAudioDuration(value: number): void {
      if (this.activeSong) {
        this.activeAudioDuration = value;
        this.activeSong.currentTime = value;
      }
    },
    setVolume(value: number): void {
      this.volume = value;
      if (this.activeSong) {
        this.activeSong.volume = value;
      }
    },
    handleStartMusic(id: number): void {
      const song = this.songs.find((item: Song) => item.id === id);
      if (song) {
        if (this.activeSong && this.activeId !== song.id) {
          this.activeSong.pause();
          this.activeSong.currentTime = 0;
          this.activeAudioDuration = 0;
        }
        const audioPlayer = document.getElementById(
          `audio-${song.id}`
        ) as HTMLAudioElement;
        if (audioPlayer) {
          this.activeSong = audioPlayer;
        }
      }
    },
    onChangeDuration(time: number): void {
      if (time >= this.activeAudioDuration) {
        this.activeAudioDuration = time;
      }
    },
    handleAudioEnded(): void {
      if (this.activeSong && this.activeId) {
        this.handleNext();
      }
    },
  },
  mounted() {
    this.$store.commit("setSongs", songs);
    this.isLoading = false;
  },
  computed: {
    songs() {
      return this.$store.state.songs;
    },
  },
  watch: {
    activeSong: function (value: HTMLAudioElement) {
      this.audioDuration = value.duration;
      this.isPlaying = true;
      this.activeId = parseInt(value.id.split("-")[1]);
      value.volume = this.volume;
      value.play();
    },
  },
};
</script>

<template>
  <main>
    <div class="audio">
      <AudioControllers
        :handlePrev="handlePrev"
        :handlePlay="handlePlay"
        :handleNext="handleNext"
        :isPlaying="isPlaying"
      />
      <TrackBar
        :duration="audioDuration"
        :activeDuration="activeAudioDuration"
        :handleSetActiveDuration="setActiveAudioDuration"
        class="audio__track"
        durationType="seconds"
      />
      <TrackBar
        :duration="1.0"
        :activeDuration="volume"
        :handleSetActiveDuration="setVolume"
        class="audio__volume"
        durationType="percent"
        durationName="Volume"
      />
    </div>
    <div v-if="isLoading">
      <SpinnerLoading />
    </div>
    <div v-else class="songs">
      <div v-for="song of songs" :key="song.id">
        <SongItem
          :id="song.id"
          :name="song.name"
          :url="song.url"
          :artist="song.artist"
          :isActive="activeId == song.id"
          :handleStartMusic="handleStartMusic"
          :onChangeDuration="onChangeDuration"
          :handleEnded="handleAudioEnded"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.audio {
  display: flex;
  flex-direction: row;
  align-items: center;
}

@media screen and (max-width: 450px) {
  .audio {
    flex-direction: column;
  }
}

.audio__track {
  margin-left: 15px;
  width: 100%;
}

@media screen and (max-width: 450px) {
  .audio__track {
    margin-left: 0;
    margin-top: 10px;
  }
}

.audio__volume {
  margin-left: 15px;
  width: 30%;
}

@media screen and (max-width: 450px) {
  .audio__volume {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
}

.songs {
  margin-top: 20px;
}
</style>
