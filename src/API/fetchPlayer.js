// This function fetches the player details from FootApi,
// with statistics from FBREF,
// transforms it and adds it to Firestore

import { updateData, setData } from "../firebase/firestore";
import { X_RapidAPI_Key, X_RapidAPI_Host } from "@env"
import { downloadPlayerImage } from '../firebase/storage';


const fetchClubPlayer = async (team_id, index) => {
    const url = `https://footapi7.p.rapidapi.com/api/team/${team_id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': X_RapidAPI_Key,
            'X-RapidAPI-Host': X_RapidAPI_Host
        }
    };
    let result;
    let team;

    while (team === undefined) {
        try {
            const response = await fetch(url, options);
            console.log("HTTP response status:", response.status); // 200: OK
            result = await response.json();
            team = result.team;
        } catch (error) {
            console.error(error);
        }
        console.log(`[FootApi] Fetching for club index ${index}`);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // keep only the needed data
    const club = {
        name_code: team.nameCode,
        name_full: team.name,
    }

    const player_array = [];

    const url_player = `https://footapi7.p.rapidapi.com/api/team/${team_id}/players`;
    let result_player;

    while (result_player === undefined) {
        try {
            const response = await fetch(url_player, options);
            console.log("HTTP response status:", response.status); // 200: OK
            result_player = await response.json();
        } catch (error) {
            console.error(error);
        }
        console.log(`[FootApi] Fetching players`);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const result_array = result_player.players;
    for (item of result_array) {
        const player = item.player;
        // for age
        const today = new Date();
        const birthDate = new Date(player.dateOfBirthTimestamp*1000);
        const age = today.getFullYear() - birthDate.getFullYear();
        // for contract
        const contractEnd = new Date(player.contractUntilTimestamp*1000);
        const contractEndYear = contractEnd.getFullYear();
        // for market value
        const value = player.proposedMarketValue || 0;
        const value_string = value >= 1000000 ?
            `€${(value/1000000).toFixed(0)}m` 
            : 
            value === 0 ?
            '--'
            :
            `€${(value/1000).toFixed(0)}k`;
        // for position
        let pos = '';
        switch (player.position) {
            case 'F':
                pos = 'FW'; break;
            case 'M':
                pos = 'MF'; break;
            case 'D':
                pos = 'DF'; break;
            case 'G':
                pos = 'GK'; break;
            default:
                pos = '--';
                console.log(`Unknown position for ${player.name} of ${club.name_code}`);
                break;
        }
        // for player image
        const player_image_url = await downloadPlayerImage(club.name_full, player.id);

        const player_obj = {
            Footapi_id: player.id,
            number: player.jerseyNumber || '--',
            Footapi_name: player.name || '--',
            position: pos,
            height: player.height || '--',
            foot: player.preferredFoot || 'Right',
            country: player.country.name || '--',
            age: age || '--',
            contractEnd: contractEndYear || '--',
            marketValue: value_string,
            image: player_image_url,
            // club
            club_name_full: club.name_full,
            club_name_code: club.name_code,
            stats: {},
        }
        player_array.push(player_obj);
    }
    return player_array;
}


// club id in FootApi
club_id_by_name =[42, 40, 60, 50, 30, 6, 38, 7, 48, 43,
                44, 72, 17, 35, 39, 14, 15, 33, 37, 3]

const fetchPlayers = async () => {
    let full_player_list = [];
    for (let i = 0; i < club_id_by_name.length; i++) {
        const club_players = await fetchClubPlayer(club_id_by_name[i], i);
        for (let j = 0; j < club_players.length; j++) {
            // for player dictionary
            const player = club_players[j];
            setData('players', player.Footapi_name, player);
            console.log(`Added ${player.club_name_code}: ${player.Footapi_name}`);
            // for player list
            const player_info = {
                Footapi_id: player.Footapi_id,
                number: player.number,
                Footapi_name: player.Footapi_name,
                position: player.position,
                club_name_code: player.club_name_code,
            }
            full_player_list.push(player_info);
        }
        // wait 5 seconds per iteration, prevent Firebase network error
        console.log("Full player list length:", full_player_list.length);
        console.log(`Finished club index ${i}, waiting 5 seconds\n`);
        await new Promise(resolve => setTimeout(resolve, 5*1000));
    }
    // for player list
    setData('player_list', 'full_player_list', {full_player_list});
    console.log("Full player list length:", full_player_list.length);
}

export { fetchPlayers };