<template class="Testttt">
  <ion-page style="overflow: hidden;">
    <ion-header style="height:vh">
      <ion-toolbar>
        <ion-title>Recycling Camera</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content style="height:90vh">
      <ion-img 
        src="https://www.sellcell.com/assets/images/cell-phone-recycling/cell-phone-recycling.jpg"
        style="width:200%;height:100%;object-fit: cover;position:absolute;left:-190px"
      >
      </ion-img>
      <!-- <ion-grid>
        <ion-row>
          <ion-col size="6" :key="index" v-for="(item, index) in photos">
            <ion-img :src="item.webviewPath"></ion-img>
            <ion-fab-button @click="deletePhoto(index)" size="small" style="position:absolute;top:60%;right:0%;">
              <ion-icon :icon="trash" size="small"></ion-icon>
            </ion-fab-button>
          </ion-col>
        </ion-row>
      </ion-grid> -->
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="submitPhoto()">
          <ion-icon :icon="camera"></ion-icon>
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
import axios from 'axios';
import FormData from 'form-data';

import { Geolocation } from "@capacitor/geolocation";
const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  return coordinates;
};

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
  methods:{
    async submitPhoto(){
      await this.takePhoto();

      // start loader

      // const formData = new FormData();
      // if (this.photos.length > 0 && this.photos[0].webviewPath) {
      //   const imagebuffer = await fetch(this.photos[0].webviewPath);

      //   formData.append('file', await imagebuffer.blob(), 'image.jpg');
      //   axios.post(`${process.env.RECYCLE_API}/search`, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   }).then((response) => {
      //     console.log(response);
      //     this.$router.push('/tabs/recyclingMap');
      //     // stop loader
      //   }).catch((error) => {
      //     console.log(error);
      //     // stop loader, error page
      //   });
      // }
      // Get Postal Code
      let currentPosition = await getCurrentPosition();
      let lat = currentPosition.coords.latitude
      let lng = currentPosition.coords.longitude
      let locationUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}`
      let currentLocation = await axios.get(locationUrl)
      let address_components = currentLocation.data.results[0].formatted_address.split(",")
      let postal_code = address_components[address_components.length - 2].split(" ")[2]
      let material_id = 5898478
      
      // Get locations
      let locations_url = `https://legacyapi.recyclenation.com/locations?zip=${postal_code}&radius=100&offset=0&limit=5&material_id=${material_id}`
      let locations: any = await axios.get(locations_url)
      // Format markers
      console.log("Locations here: ", locations)
      let locations_data = locations.data.locations
      let markers:any = []
      for (let loc of locations_data){
        let marker = { position: { lat: loc.latitude, lng: loc.lodegitue }, id: loc.location_id , description: loc.description, url:loc.url}
        markers.push(marker)
      }
      this.$router.push({name:'recyclingMap', params:{markers:markers}});
    }
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
