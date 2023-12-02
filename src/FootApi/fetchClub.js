// This function fetches the club details from FootApi,
// transforms it and adds it to Firestore
import { setData } from "../firebase/firestore";
import { X_RapidAPI_Key, X_RapidAPI_Host } from "@env"

const fetchClub = async (team_id) => {
    const url = `https://footapi7.p.rapidapi.com/api/team/${team_id}`;
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

    const team = result.team;

    // keep only the needed data
    const club = {
        // general
        name_code: team.nameCode,
        id: team.id,
        // for club pane
        name_full: team.name,
        stadium: team.venue.stadium.name,
        city: team.venue.city.name,
        founded: new Date(team.foundationDateTimestamp*1000).getUTCFullYear(),
        // for club info
        capacity: team.venue.stadium.capacity,
        manager: team.manager.name,
        name_short: team.shortName,
    }

    // console.log(club);
    return club;
}

// club id in FootApi
club_id_by_name =[42, 40, 60, 50, 30, 6, 38, 7, 48, 43, 
                44, 72, 17, 35, 39, 14, 15, 33, 37, 3]

const fetchClubs = async () => {
    for (club_id of club_id_by_name) {
        const club = await fetchClub(club_id);
        setData('clubs', club.name_full, {club});
    }
}

export { fetchClubs };