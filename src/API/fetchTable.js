// This function fetches the League Table (All) from  FootApi,
// transforms it and adds it to Firestore
import { setData } from "../firebase/firestore";
import { X_RapidAPI_Key, X_RapidAPI_Host } from "@env"
import { dataClubs } from "../fetchCloud";

const fetchTable = async (url) => {
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
    const initialTable = inputTable.map((club) => {
        return {
            name_full: club.team.name,
            name_code: club.team.nameCode,
            name_short: club.team.shortName,
            club_id: 0,
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
    const table = initialTable.map((club) => {
        return {
            ...club,
            goal_difference: club.goal_for - club.goal_against
        }
    });

    // add club_id according to alphabetical order
    for (club of table) {
        switch (club.name_full) {
            case 'Arsenal':
                club.club_id = 0; break;
            case 'Aston Villa':
                club.club_id = 1; break;
            case 'Bournemouth':
                club.club_id = 2; break;
            case 'Brentford':
                club.club_id = 3; break;
            case 'Brighton & Hove Albion':
                club.club_id = 4; break;
            case 'Burnley':
                club.club_id = 5; break;
            case 'Chelsea':
                club.club_id = 6; break;
            case 'Crystal Palace':
                club.club_id = 7; break;
            case 'Everton':
                club.club_id = 8; break;
            case 'Fulham':
                club.club_id = 9; break;
            case 'Liverpool':
                club.club_id = 10; break;
            case 'Luton Town':
                club.club_id = 11; break;
            case 'Manchester City':
                club.club_id = 12; break;
            case 'Manchester United':
                club.club_id = 13; break;
            case 'Newcastle United':
                club.club_id = 14; break;
            case 'Nottingham Forest':
                club.club_id = 15; break;
            case 'Sheffield United':
                club.club_id = 16; break;
            case 'Tottenham Hotspur':
                club.club_id = 17; break;
            case 'West Ham United':
                club.club_id = 18; break;
            case 'Wolverhampton':
                club.club_id = 19; break;
            default:
                club.club_id = 0; break;
        }
    }
    

    return table;
}

const fetchAllTables = async () => {
    const table = await fetchTable('https://footapi7.p.rapidapi.com/api/tournament/17/season/52186/standings/total');
    // table.forEach((club) => {
    //     club.logo = dataClubs[club.club_id].club.logo;  
    // })
    setData('league_tables', 'all', {table});
    console.log('Fetched table (all)');
}

const fetchHomeTables = async () => {
    const table = await fetchTable('https://footapi7.p.rapidapi.com/api/tournament/17/season/52186/standings/home');
    // table.forEach((club) => {
    //     club.logo = dataClubs[club.club_id].club.logo;  
    // })
    setData('league_tables', 'home', {table});
    console.log('Fetched table (home)');
}

const fetchAwayTables = async () => {
    const table = await fetchTable('https://footapi7.p.rapidapi.com/api/tournament/17/season/52186/standings/away');
    // table.forEach((club) => {
    //     club.logo = dataClubs[club.club_id].club.logo;  
    // })
    setData('league_tables', 'away', {table});
    console.log('Fetched table (away)');
}

const fetchTables = async () => {
    fetchAllTables();
    fetchHomeTables();
    fetchAwayTables();
}

export { fetchTables };