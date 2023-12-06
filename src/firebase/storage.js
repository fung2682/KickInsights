import { storage } from './base';
import { ref, getDownloadURL } from "firebase/storage";


const get_clubLogo_url = async (name_code) => {
    const pathReference = ref(storage, `gs://kickinsights-ccc1e.appspot.com/club_logos/${name_code}.png`);
    const url = await getDownloadURL(pathReference);
    return url;
}

export { get_clubLogo_url };