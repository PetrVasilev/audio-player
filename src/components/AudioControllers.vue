<script setup lang="ts">
defineProps({
  isPlaying: {
    type: Boolean,
    default: false,
    required: true,
  },
  handlePlay: {
    type: Function,
    required: true,
  },
  handleNext: {
    type: Function,
    required: true,
  },
  handlePrev: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="audio-controllers">
    <div :onclick="() => handlePrev()" class="audio-controllers__button">
      <ion-icon name="play-back"></ion-icon>
    </div>
    <div
      v-if="isPlaying"
      :onclick="() => handlePlay(false)"
      class="audio-controllers__button"
    >
      <ion-icon name="pause"></ion-icon>
    </div>
    <div
      v-else
      :onclick="() => handlePlay(true)"
      class="audio-controllers__button"
    >
      <ion-icon name="play"></ion-icon>
    </div>
    <div :onclick="() => handleNext()" class="audio-controllers__button">
      <ion-icon name="play-forward"></ion-icon>
    </div>
  </div>
</template>

<style scoped>
.audio-controllers {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.audio-controllers__button {
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-controllers__button:hover {
  opacity: 0.6;
}
</style>
