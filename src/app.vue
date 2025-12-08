<template>
  <ion-app>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Frequency Quantique</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <h1>Bienvenue 🌌</h1>
        <p>
          Build Ionic + Vue propre, prêt pour Appflow.
          On ajoutera ensuite tes fréquences, boutons, etc.
        </p>
      </ion-content>
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>

<style>
h1 {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}
</style>
