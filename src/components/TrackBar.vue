<script setup lang="ts">
interface TrackBarProps {
  duration: number;
  activeDuration: number;
  handleSetActiveDuration: Function;
  durationType: string;
  durationName?: string;
}

defineProps<TrackBarProps>();
</script>

<script lang="ts">
import moment from "moment";

export default {
  methods: {
    onClickBar(e: MouseEvent) {
      if (e.target) {
        const width = (e.target as HTMLElement).offsetWidth;
        const clickedWidth = e.offsetX;
        const percentage = (clickedWidth / width) * 100;
        const activeDuration = (this.duration / 100) * percentage;
        this.handleSetActiveDuration(activeDuration);
      }
    },
  },
};
</script>

<template>
  <div class="track">
    <div v-if="activeDuration > 0" class="track__timer">
      {{ durationName ? `${durationName} ` : "" }}
      {{
        durationType === "seconds"
          ? moment.utc(activeDuration * 1000).format("mm:ss")
          : Math.floor(activeDuration * 100) + "%"
      }}
    </div>
    <div class="track__bar" :onclick="onClickBar" />
    <div
      class="track__active"
      :style="{
        width: `${(activeDuration > 0 ? activeDuration / duration : 0) * 100}%`,
      }"
    />
  </div>
</template>

<style scoped>
.track {
  width: 100%;
  height: 10px;
  position: relative;
  background-color: rgb(205, 205, 205);
  border-radius: 5px;
}

.track__bar {
  border-radius: 5px;
  cursor: pointer;
  height: 100%;
  width: 100%;
  background-color: transparent;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.track__active {
  background-color: #000;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}

.track__timer {
  position: absolute;
  top: -15px;
  right: 0;
  font-size: 12px;
}
</style>
