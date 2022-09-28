<script setup lang="ts">
defineProps({
  duration: {
    type: Number,
    default: 100,
  },
  activeDuration: {
    type: Number,
    default: 0,
  },
  handleSetActiveDuration: {
    type: Function,
    required: true,
  },
});
</script>

<script lang="ts">
export default {
  methods: {
    onClickBar(e: any) {
      const width = e.target.offsetWidth;
      const clickedWidth = e.offsetX;
      const percentage = (clickedWidth / width) * 100;
      const activeDuration = (this.duration / 100) * percentage;
      this.handleSetActiveDuration(activeDuration);
    },
  },
};
</script>

<template>
  <div class="track">
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
  overflow: hidden;
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
</style>
