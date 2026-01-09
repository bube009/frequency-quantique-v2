<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Scan cardiaque</h2>
      <video ref="video" autoplay playsinline></video>
      <p>BPM : {{ bpm }}</p>
      <ion-button @click="start">Démarrer</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue'

const video = ref<HTMLVideoElement>()
const bpm = ref(0)

async function start() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  })
  if (video.value) video.value.srcObject = stream
}
</script>
