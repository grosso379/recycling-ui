<template class="Testttt">
  <ion-page>
    <ion-header style="height:8vh">
      <ion-toolbar>
        <ion-title>Recycling Camera</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="index" v-for="(item, index) in photos">
            <ion-img :src="item.webviewPath"></ion-img>
            <ion-fab-button @click="deletePhoto(index)" size="small" style="position:absolute;top:60%;right:0%;">
              <ion-icon :icon="trash" size="small"></ion-icon>
            </ion-fab-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="bottom" style="width:100%;display:flex;justify-content:space-evenly;" slot="fixed">
        <ion-fab-button @click="takePhoto()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
        <ion-fab-button href="/tabs/recyclingMap">
          <ion-icon :icon="send"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { camera, trash, close, send } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';
import {
  IonFabList,
  IonPage,
  IonHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from '@ionic/vue';

export default defineComponent({
  name: 'pictureCapture',
  components: {
    IonPage,
    IonHeader,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
  },
  setup() {
    const { photos, deletePhoto, takePhoto } = usePhotoGallery();
    return {
      photos,
      takePhoto,
      deletePhoto,
      camera,
      trash,
      close,
      send,
    };
  },
});
</script>
