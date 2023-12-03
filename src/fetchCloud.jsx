// function to load data from firebase before rendering the app
import { getData, getClubs } from "./firebase/firestore";

export let logoImage = [];
export let dataAll = [];
export let dataHome = [];
export let dataAway = [];
export let dataClubs = [];

const Loading = async () => {
    // for club logo
    // const image = <Image source={clubLogo['ARS']} style={{width: 50, height: 50}}/>
    // logoImage.push(image);
    // for league table
    const data_all = await getData("league_tables", "all");
    dataAll = data_all.table;
    const data_home = await getData("league_tables", "home");
    dataHome = data_home.table;
    const data_away = await getData("league_tables", "away");
    dataAway = data_away.table;
    // for club pane
    const data_clubs = await getClubs();
    dataClubs = data_clubs;
    // return false to App after finishing loading
    return false;
}

export default Loading;