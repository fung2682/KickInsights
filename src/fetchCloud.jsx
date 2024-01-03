// function to load data from firebase before rendering the app
import { getData, getClubs, getPlayers } from "./firebase/firestore";

export let logoImage = [];
export let dataAll = [];
export let dataHome = [];
export let dataAway = [];
export let dataClubs = [];
export let dataPlayers = [];

const fetchCloud = async (progress) => {

    // progess between 0 and 1, shown on progress bar
    if (progress == 0) {
        const data_all = await getData("league_tables", "all");
        dataAll = data_all.table;
    } else if (progress == 0.24) {
        const data_home = await getData("league_tables", "home");
        dataHome = data_home.table;
    } else if (progress == 0.48) {
        const data_away = await getData("league_tables", "away");
        dataAway = data_away.table;
    } else if (progress == 0.72) {
        const data_clubs = await getClubs();
        dataClubs = data_clubs;
    } else if (progress == 0.96) {
        const data_players = await getPlayers();
        dataPlayers = data_players;
        console.log("all data loaded")
    }

    return progress + 0.24;
}

export default fetchCloud;