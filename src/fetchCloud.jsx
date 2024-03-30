// function to load data from firebase before rendering the app
import { getData, getClubs, getModels } from "./firebase/firestore";
import { auth } from "./firebase/base";

export let logoImage = [];
export let dataAll = [];
export let dataHome = [];
export let dataAway = [];
export let dataClubs = [];
export let dataPlayersList = [];
export let dataMatchesList = [];
export let dataModels = [];
export let userData = null;

export var parts_to_load = 8;   // Increment when new data needs to be loaded

const fetchCloud = async (progress) => {
    
    // progess between 0 and 1, shown on progress bar
    if (progress == 0) {
        // get user auth data first, takes around 1 second to load
        const getUserData = async (email) => {
            const data = await getData("users", email);
            return data;
        }
        auth.onAuthStateChanged((user) => {
            if (user) { // if user is signed in
                getUserData(user.email).then((data) => {
                    userData = data;
                });
            }
        });
    } else if (progress == 1) {
        const data_all = await getData("league_tables", "all");
        dataAll = data_all.table;
    } else if (progress == 2) {
        const data_home = await getData("league_tables", "home");
        dataHome = data_home.table;
    } else if (progress == 3) {
        const data_away = await getData("league_tables", "away");
        dataAway = data_away.table;
    } else if (progress == 4) {
        const data_clubs = await getClubs();
        dataClubs = data_clubs;
    } else if (progress == 5) {
        const data_players_list_1 = await getData("player_list", "full_player_list(0-4)");
        const data_players_list_2 = await getData("player_list", "full_player_list(4-8)");
        const data_players_list_3 = await getData("player_list", "full_player_list(8-12)");
        const data_players_list_4 = await getData("player_list", "full_player_list(12-16)");
        const data_players_list_5 = await getData("player_list", "full_player_list(16-20)");
        const data_players_list = [...data_players_list_1.full_player_list, ...data_players_list_2.full_player_list, ...data_players_list_3.full_player_list, ...data_players_list_4.full_player_list, ...data_players_list_5.full_player_list];
        dataPlayersList = data_players_list;
    } else if (progress == 6) {
        const data_matches_list = await getData("match_list", "full_match_list");
        dataMatchesList = data_matches_list;
    } else if (progress == 7) {
        const data_models_list = await getModels();
        dataModels = data_models_list;
        console.log("-- all data loaded --")
    }
    return progress + 1;
}

export default fetchCloud;