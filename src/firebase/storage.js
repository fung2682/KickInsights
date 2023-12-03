import { storage } from './base';
import { ref, getDownloadURL } from "firebase/storage";

const pathReference = ref(storage, 'gs://kickinsights-ccc1e.appspot.com/club_logos/ARS.png');
const get_url = async () => {
    const url = await getDownloadURL(pathReference);
    return url;
}

export default get_url;