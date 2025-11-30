<template>
  <div class="player">
    <p>Fréquence : <strong>{{ frequencyHz }} Hz</strong></p>
    <p v-if="durationSec">Durée cible : {{ durationSec }} s</p>

    <ion-button expand="block" @click="toggle">
      {{ isPlaying ? 'Arrêter' : 'Démarrer' }}
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { ref, onBeforeUnmount, watch } from 'vue';

const props = defineProps<{
  frequencyHz: number;
  durationSec?: number;
}>();

const isPlaying = ref(false);

let audioCtx: AudioContext | null = null;
let osc: OscillatorNode | null = null;

const stop = () => {
  if (osc) {
    osc.stop();
    osc.disconnect();
    osc = null;
  }
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
  isPlaying.value = false;
};

const start = () => {
  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  osc = audioCtx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = props.frequencyHz;
  osc.connect(audioCtx.destination);
  osc.start();
  isPlaying.value = true;

  if (props.durationSec && props.durationSec > 0) {
    setTimeout(() => {
      stop();
    }, props.durationSec * 1000);
  }
};

const toggle = () => {
  if (isPlaying.value) {
    stop();
  } else {
    start();
  }
};

onBeforeUnmount(() => {
  stop();
});

watch(
  () => props.frequencyHz,
  (newVal) => {
    if (osc) {
      osc.frequency.value = newVal;
    }
  }
);
</script>

<style scoped>
.player {
  margin-top: 16px;
}
</style>
