import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

export function usePhotoGallery() {
    const photos = ref<UserPhoto[]>([]);
    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = {
            filepath: fileName,
            webviewPath: photo.webPath,
        };
        console.log(photos.value)
        photos.value = [savedFileImage, ...photos.value];
    };

    function deletePhoto(index: number) {
        photos.value.splice(index, 1)
    }
    
    return {
        photos,
        takePhoto,
        deletePhoto,
    }; 
}

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}