<template>
  <ion-page>
    <ion-header style="height:8vh">
      <ion-toolbar>
        <ion-title>Recycling Centers</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Suspense>
        <Map></Map>
      </Suspense>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Map from '../components/Map.vue'

export default defineComponent({
  name: 'recyclingMap',
  props: {
    markers: Array<any>()
  },
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Map},
  async setup(props) {
    let markers = props.markers
    return {
      markers,
    };
  },
});
</script>
