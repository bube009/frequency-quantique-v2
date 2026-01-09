import { calculateHRV } from '../engine/hrvAnalyzer'
import { coherenceScore } from '../engine/coherenceEngine'
import { mapFrequency } from '../engine/frequencyMapper'
import { play, stop } from '../audio/oscillator'<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Scan cardiaque</h2>

      <video ref="video" autoplay playsinline muted></video>
      <canvas ref="canvas" width="200" height="150" style="display:none"></canvas>

      <p><strong>BPM :</strong> {{ bpm }}</p>

      <ion-button @click="startScan">Démarrer le scan</ion-button>
      <ion-button color="danger" @click="stopScan">Arrêter</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { extractPPGFromFrame } from '../engine/ppgProcessor'
import { detectPeak, calculateBPMFromPeaks } from '../engine/bpmCalculator'

const video = ref<HTMLVideoElement>()
const canvas = ref<HTMLCanvasElement>()
const bpm = ref(0)

let ctx: CanvasRenderingContext2D | null = null
let animationId = 0
let peaks: number[] = []
let baseline = 0

async function startScan() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  })

  if (video.value) {
    video.value.srcObject = stream
    await video.value.play()
  }

  ctx = canvas.value?.getContext('2d') || null
  baseline = 0
  peaks = []

  loop()
}

function loop() {
  if (!video.value || !ctx || !canvas.value) return

  ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height)
  const frame = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height)

  const ppg = extractPPGFromFrame(frame)
  baseline = baseline * 0.95 + ppg * 0.05

  const now = performance.now()
  const peak = detectPeak(ppg, baseline + 5, now)

  if (peak) {
    peaks.push(peak)
    if (peaks.length > 8) peaks.shift()
    bpm.value = calculateBPMFromPeaks(peaks)
  }

  animationId = requestAnimationFrame(loop)
}

function stopScan() {
  cancelAnimationFrame(animationId)
  if (video.value?.srcObject) {
    const tracks = (video.value.srcObject as MediaStream).getTracks()
    tracks.forEach(t => t.stop())
  }
}
</script>
