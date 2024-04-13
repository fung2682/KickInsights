import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { storage } from './base';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";


const get_clubLogo_url = async (name_code) => {
    const pathReference = ref(storage, `gs://kickinsights-ccc1e.appspot.com/club_logos/${name_code}.png`);
    const url = await getDownloadURL(pathReference);
    return url;
}

const uploadPlayerImage = (file, club_name, player_id) => {
    const storageRef = ref(storage, `/player_images/${club_name}/${player_id}.jpg`);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('[Firebase] Uploaded image', club_name, player_id);
    })
    .catch((error) => {
        console.error(error);
    });
}

const downloadPlayerImage = async (team_name, player_id) => {
    let url = '';
    try {
        url = await getDownloadURL(ref(storage, `/player_images/${team_name}/${player_id}.jpg`))
        console.log('[Firebase] Downloaded image', team_name, player_id);
    } catch (error) {
        console.log('[Firebase] No image found', team_name, player_id);
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    return url;
}

const downloadModelPlots = async (model_id) => {
    let urls = {
        'metrics': '',
        'feature_importance': '',
        'confusion_matrix_0.3': '',
        'confusion_matrix_0.35': '',
        'confusion_matrix_0.4': '',
        'confusion_matrix_0.45': '',
        'confusion_matrix_0.5': '',
        'confusion_matrix_0.55': '',
        'confusion_matrix_0.6': '',
        'confusion_matrix_0.65': '',
        'confusion_matrix_0.7': '',
        'confusion_matrix_0.75': '',
        'confusion_matrix_0.8': '',
        'confusion_matrix_0.85': '',
        'confusion_matrix_0.9': '',
        'confusion_matrix_0.95': '',
        'confusion_matrix_1.0': '',
    };
    // loop through urls and download each
    for (let key in urls) {
        try {
            urls[key] = await getDownloadURL(ref(storage, `/models/${model_id}/${key}.png`))
            console.log('[Firebase] Downloaded model plot', model_id, key);
        } catch (error) {
            console.log('[Firebase] No model plot found', model_id, key);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    return urls;
}

export { get_clubLogo_url, uploadPlayerImage, downloadPlayerImage, downloadModelPlots };