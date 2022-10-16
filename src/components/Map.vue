<template>
  <GMapMap :center="center" :zoom="14" style="width: 100%; height: 84vh" ref="myMapRef">
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :icon="{
        url: 'https://recyclenation.com/wp-content/themes/rn/assets/favicon/favicon-96x96.png?v=2',
        scaledSize: { width: 40, height: 40 },
        labelOrigin: { x: 16, y: -10 },
      }"
      @click="openMarker(m.id)"
      @closeclick="openMarker(0)"
    >
      <GMapInfoWindow
        :closeclick="true"
        @closeclick="openMarker(0)"
        :opened="openedMarkerID === m.id"
        style="text-align:center; font-size: 15px;padding-bottom: 10px; padding-right: 20px;"
        :options=" {
              pixelOffset: {
                width: 10, height: 10
              },
       }"
      >
        <div><a href="https://www.google.com/maps/place/Northwest+Missouri+State+University/@40.350776,-94.875714,14z/data=!4m5!3m4!1s0x0:0xfc94da964c338044!8m2!3d40.3519854!4d-94.8825243?hl=es-US">{{m.description}}</a></div>
        <!-- <div>{{ m.description }}</div> -->
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Geolocation } from "@capacitor/geolocation";
const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  return coordinates;
};

export default defineComponent({
  name: "Map",
  props: {
    lat: Number,
    lng: Number,
  },
  data() {
    return {
      openedMarkerID: 0,
    }
  },
  methods: {
    openMarker(id: number) {
        this.openedMarkerID = id
    },
    showPosition(event: any, two: any) {
      console.log(event.latLng);
    },
  },
  mounted() {
    (this.$refs['myMapRef'] as any).$mapPromise.then((map: any) => {
      map.addListener('click', (mapsMouseEvent: any) => {
        console.log(mapsMouseEvent.latLng.lat());
        console.log(mapsMouseEvent.latLng.lng());
      });
    });
  },
  async setup(props) {
    let currentPosition = await getCurrentPosition();
    let center = {
      lat: currentPosition.coords.latitude,
      lng: currentPosition.coords.longitude,
    };
    let markers = [
      { position: { lat: center.lat, lng: center.lng }, id: 1 , description: 'This is a test description'},
      { position: { lat: props.lat, lng: props.lng }, id: 2 , description: 'This is another test description'},
    ];
    return {
      center,
      markers,
    };
  },
});
</script>
