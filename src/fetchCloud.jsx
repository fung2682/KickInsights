// function to load data from firebase before rendering the app
import { getData, getClubs, getModels } from "./firebase/firestore";

export let logoImage = [];
export let dataAll = [];
export let dataHome = [];
export let dataAway = [];
export let dataClubs = [];
export let dataPlayersList = [];
export let dataModels = [];

export var parts_to_load = 6;

const fetchCloud = async (progress) => {
    
    // progess between 0 and 1, shown on progress bar
    if (progress == 0) {
        const data_all = await getData("league_tables", "all");
        dataAll = data_all.table;
    } else if (progress == 1) {
        const data_home = await getData("league_tables", "home");
        dataHome = data_home.table;
    } else if (progress == 2) {
        const data_away = await getData("league_tables", "away");
        dataAway = data_away.table;
    } else if (progress == 3) {
        const data_clubs = await getClubs();
        dataClubs = data_clubs;
    } else if (progress == 4) {
        const data_players_list = await getData("player_list", "full_player_list");
        dataPlayersList = data_players_list.full_player_list;
    } else if (progress == 5) {
        const data_models_list = await getModels();
        dataModels = data_models_list;
        console.log("-- all data loaded --")
    }

    return progress + 1; // be careful about the summation, potential error due to floating point
}

export default fetchCloud;