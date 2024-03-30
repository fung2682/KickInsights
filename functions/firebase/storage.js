import { storage } from './base.js';
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

export { get_clubLogo_url, uploadPlayerImage, downloadPlayerImage };