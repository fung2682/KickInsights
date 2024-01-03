// function to load data from firebase before rendering the app
import { getData, getClubs, getPlayersList, getPlayersDict } from "./firebase/firestore";

export let logoImage = [];
export let dataAll = [];
export let dataHome = [];
export let dataAway = [];
export let dataClubs = [];
export let dataPlayersList = [];
export let dataPlayersDict;

const fetchCloud = async (progress) => {

    // progess between 0 and 1, shown on progress bar
    if (progress == 0) {
        const data_all = await getData("league_tables", "all");
        dataAll = data_all.table;
    } else if (progress == 0.19) {
        const data_home = await getData("league_tables", "home");
        dataHome = data_home.table;
    } else if (progress == 0.38) {
        const data_away = await getData("league_tables", "away");
        dataAway = data_away.table;
    } else if (progress == 0.57) {
        const data_clubs = await getClubs();
        dataClubs = data_clubs;
    } else if (progress == 0.76) {
        const data_players_list = await getPlayersList();
        dataPlayersList = data_players_list;
    } else if (progress == 0.95) {
        const data_players_dict = await getPlayersDict();
        dataPlayersDict = data_players_dict;
        console.log("all data loaded")
    }

    return progress + 0.19;
}

export default fetchCloud;