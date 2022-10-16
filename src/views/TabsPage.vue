<template>
  <ion-page>
    <ion-tabs>

      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar style="height:8vh" slot="bottom">
          
        <ion-tab-button tab="pictureCapture" href="/tabs/pictureCapture">
          <ion-icon :icon="images" />
          <ion-label>Photos</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="recyclingMap" href="/tabs/recyclingMap">
          <ion-icon :icon="square" />
          <ion-label>Recycling Map</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { images, square, triangle } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      images,
      square, 
      triangle,
    }
  }
});
</script>
