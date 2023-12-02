// This function fetches the League Table (All) from  FootApi,
// transforms it and adds it to Firestore
import { setData } from "../firebase/firestore";
import { X_RapidAPI_Key, X_RapidAPI_Host } from "@env"

const fetchTables = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': X_RapidAPI_Key,
            'X-RapidAPI-Host': X_RapidAPI_Host
        }
    };
    let result;

    try {
        const response = await fetch(url, options);
        result = await response.json();
    } catch (error) {
        console.error(error);
    }

    // access the APIs table array
    const inputTable = result.standings[0].rows;    

    // keep only the needed data
    const tempTable = inputTable.map((club) => {
        return {
            name_full: club.team.name,
            name_code: club.team.nameCode,
            id: club.team.id,
            position: club.position,
            played: club.matches,
            win: club.wins,
            draw: club.draws,
            loss: club.losses,
            goal_for: club.scoresFor,
            goal_against: club.scoresAgainst,
            points: club.points,
        }
    });

    // add the goal difference to the table
    const table = tempTable.map((club) => {
        return {
            ...club,
            goal_difference: club.goal_for - club.goal_against
        }
    });

    return table;
}

const fetchAllTables = async () => {
    const table = await fetchTables('https://footapi7.p.rapidapi.com/api/tournament/17/season/52186/standings/total');
    setData('league_tables', 'all', {table});
}

const fetchHomeTables = async () => {
    const table = await fetchTables('https://footapi7.p.rapidapi.com/api/tournament/17/season/52186/standings/home');
    setData('league_tables', 'home', {table});
}

const fetchAwayTables = async () => {
    const table = await fetchTables('https://footapi7.p.rapidapi.com/api/tournament/17/season/52186/standings/away');
    setData('league_tables', 'away', {table});
}

export { fetchAllTables, fetchHomeTables, fetchAwayTables };