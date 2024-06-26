// This function fetches the player details from FootApi,
// with statistics from FBREF,
// transforms it and adds it to Firestore

import { updateData, setData } from "../firebase/firestore";
import { X_RapidAPI_Key, X_RapidAPI_Host } from "@env"
import { downloadPlayerImage } from '../firebase/storage';
import { fetchPlayerStats } from './fetchPlayerStats';

// manually translate different names in FBREF and FootApi
const player_name_translation = {
    'Edward Nketiah': 'Eddie Nketiah',              // ARS
    'Fábio Vieira': 'Fabio Vieira',                 // ARS
    'Gabriel Magalhães': 'Gabriel Dos Santos',      // ARS
    'Benjamin White': 'Ben White',                  // ARS
    'Karl Hein': 'Karl Jakob Hein',                 // ARS
    'Miloš Kerkez': 'Milos Kerkez',                 // BOU
    'Joshua Dasilva': 'Josh Dasilva',               // BRE
    'Zanka': 'Mathias Jørgensen',                   // BRE
    'Julio Enciso': 'Julio César Enciso',           // BHA
    'Igor Júlio': 'Igor' ,                          // BHA
    'Manuel Benson': 'Benson Manuel',               // BUR
    'Jóhann Guðmundsson': 'Jóhann Berg Guðmundsson',// BUR
    'Arijanet Murić': 'Arijanet Muric',             // BUR
    'Mykhaylo Mudryk': 'Mykhailo Mudryk',           // CHE
    'Jesurun Rak-Sakyi': 'Jesuran Rak Sakyi',       // CRY
    'Idrissa Gueye': 'Idrissa Gana Gueye',          // EVE
    'Bobby Decordova-Reid': 'Bobby Reid',           // FUL
    'Konstantinos Tsimikas': 'Kostas Tsimikas',     // LIV
    'Caoimhin Kelleher': 'Caoimhín Kelleher',       // LIV
    'Ryan Giles': 'Ryan John Giles',                // LUT
    'Jérémy Doku': 'Jeremy Doku',                   // MCI
    'Moussa Niakhaté': 'Moussa Niakhate',           // NFO
    'Odysseas Vlachodimos': 'Odisseas Vlachodimos', // NFO
    'Benie Traore': 'Bénie Adama Traore',           // SHU
    'James McAtee': 'James Mcatee',                 // SHU
    'Vinícius Souza': 'Vinicius Souza',             // SHU
    'Wesley Foderingham': 'Wes Foderingham',        // SHU
    'Heung-min Son': 'Son Heung-min',               // TOT
    'Pierre-Emile Højbjerg': 'Pierre Højbjerg',     // TOT
    'Emerson Royal': 'Emerson',                     // TOT
    'Mohammed Kudus': 'Kudus Mohammed',             // WHU
    'Alphonse Aréola': 'Alphonse Areola',           // WHU
    'Hee-Chan Hwang':  'Hwang Hee-chan',            // WOL
    'Saša Kalajdžić': 'Sasa Kalajdzic',             // WOL
    'Jonny Otto': 'Jonny Castro',                   // WOL
}

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
            console.log("Error fetching club player", team_id);
        }
        console.log(`[FootApi] Fetching player for club index ${index}`);
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
            image: '',
            // club
            club_name_full: club.name_full,
            club_name_code: club.name_code,
        }
        player_array.push(player_obj);
    }
    return player_array;
}


// club id in FootApi
club_id_by_name =[42, 40, 60, 50, 30, 6, 38, 7, 48, 43,
                44, 72, 17, 35, 39, 14, 15, 33, 37, 3]

// club id in FBREF
FBREF_club_id_by_name = ['18bb7c10', '8602292d', '4ba7cbea', 'cd051869', 'd07537b9',
                    '943e8050', 'cff3d9bb', '47c64c55', 'd3fd31cc', 'fd962109',
                    '822bd0ba', 'e297cd13', 'b8fd03ef', '19538871', 'b2b47a98',
                    'e4a775cb', '1df6b87e', '361ca564', '7c21e445', '8cec06e1']

const fetchPlayers = async () => {
    let full_player_list = [];
    let missing_statistics_player_list = [];
    let missing_statistics_or_name_translation_player_list = [];
    for (let i = 0; i < club_id_by_name.length; i++) {
        const club_players = await fetchClubPlayer(club_id_by_name[i], i);
        // fetchPlayerStats for that club
        const club_players_stats = await fetchPlayerStats(FBREF_club_id_by_name[i]);
        // console.log("retrieved object:", club_players_stats); 
        for (let j = 0; j < club_players.length; j++) {
            const player = club_players[j];
            // for player list
            const player_copy = {...player};
            full_player_list.push(player_copy);
            // for player dictionary

            // for player image
            const player_image_url = await downloadPlayerImage(player.club_name_full, player.Footapi_id);
            player.image = player_image_url;
            // add the stats object if name matches
            player.stats = club_players_stats[player.Footapi_name];

            // if no name match
            if (player.stats === undefined) {
                // check if its in player name translation dictionary
                if (player_name_translation[player.Footapi_name] !== undefined) {
                    player.stats = club_players_stats[player_name_translation[player.Footapi_name]];
                    console.log(`[Translated] ${player.Footapi_name} to ${player_name_translation[player.Footapi_name]}`);
                    if (player.stats === undefined) {
                        player.stats = {};
                        console.log(`[Missing Statistics for player] ----------> ${player_name_translation[player.Footapi_name]}`);
                        missing_statistics_player_list.push(`${player.club_name_code} - ${player_name_translation[player.Footapi_name]}`);
                    }
                } else {
                    player.stats = {};
                    console.log(`[Missing Statistics / Name Translation for player] ----------> ${player.Footapi_name}`);
                    missing_statistics_or_name_translation_player_list.push(`${player.club_name_code} - ${player.Footapi_name}`);
                }
            }
            setData('players', player.Footapi_name, player);
            console.log(`Added ${player.club_name_code}: ${player.Footapi_name}`);
            await new Promise(resolve => setTimeout(resolve, 0.5*1000));
        }
        // wait 5 seconds per iteration, prevent Firebase network error
        console.log("Full player list length:", full_player_list.length);
        console.log(`Finished club index ${i}, waiting 5 seconds\n`);
        console.log("Missing statistics player list:", missing_statistics_player_list);
        console.log("Missing statistics or name translation player list:", missing_statistics_or_name_translation_player_list);
        await new Promise(resolve => setTimeout(resolve, 5*1000));
    }
    // for player list
    setData('player_list', 'full_player_list', {full_player_list});
    setData('player_list', 'missing_statistics_player_list', {missing_statistics_player_list});
    setData('player_list', 'missing_statistics_or_name_translation_player_list', {missing_statistics_or_name_translation_player_list});
    console.log("Full player list length:", full_player_list.length);
    console.log("Missing statistics player list length:", missing_statistics_player_list.length);
    console.log("Missing statistics or name translation player list length:", missing_statistics_or_name_translation_player_list.length);
}

export { fetchPlayers };