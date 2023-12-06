// This function fetches the club details from FootApi,
// scrape the kits from the Premier League website,
// transforms it and adds it to Firestore
import axios from 'axios';
import { updateData } from "../firebase/firestore";
import { X_RapidAPI_Key, X_RapidAPI_Host } from "@env"
import { get_clubLogo_url } from "../firebase/storage";

const fetchClub = async (team_id, kit_id, index) => {
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
    // get logo from firebase storage
    // const logo = await get_clubLogo_url(team.nameCode);

    // keep only the needed data
    const club = {
        // general
        name_code: team.nameCode,
        id: index,
        footApi_id: team.id,
        // logo: logo,
        // for club pane
        name_full: team.name,
        stadium: team.venue.stadium.name,
        city: team.venue.city.name,
        founded: new Date(team.foundationDateTimestamp*1000).getUTCFullYear(),
        // for club info
        capacity: team.venue.stadium.capacity,
        manager: team.manager.name,
        name_short: team.shortName,
        PL_titles: 0,
        kit: [],
        players: [],
    }

    // manually add the PL titles
    // source: https://www.premierleague.com/premier-league-explained
    // source: https://en.wikipedia.org/wiki/Premier_League#References
    switch (club.name_full) {
        case 'Manchester United':
            club.PL_titles = 13; break;
        case 'Manchester City':
            club.PL_titles = 7; break;
        case 'Chelsea':
            club.PL_titles = 5; break;
        case 'Arsenal':
            club.PL_titles = 3; break;
        case 'Liverpool':
            club.PL_titles = 1; break;
        case 'Blackburn Rovers':
            club.PL_titles = 1; break;
        case 'Leicester City':
            club.PL_titles = 1; break;
        default:
            club.PL_titles = 0; break;
    }

    // scrape the kits from the Premier League website
    const kit_array = [];   // index 0: home, index 1: away, index 2: third
    const html_match_phrase = /class="club-kit-promo__kit-image picture__img" src=.* alt="/g;
    const response = await axios.get(`https://www.premierleague.com/clubs/${kit_id}/club`);
    const matches = response.data.match(html_match_phrase);
    matches.forEach(match => {
        kit_array.push(match.slice(52, -7));
    })
    club.kit = kit_array;

    // scrape the players
    const player_array = [];

    const url_player = `https://footapi7.p.rapidapi.com/api/team/${team_id}/players`;
    let result_player;
    try {
        const response = await fetch(url_player, options);
        result_player = await response.json();
    } catch (error) {
        console.error(error);
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
        }
        player_array.push(player_obj);
    }
    club.players = player_array;

    return club;
}

// club id in FootApi
club_id_by_name =[42, 40, 60, 50, 30, 6, 38, 7, 48, 43,
                44, 72, 17, 35, 39, 14, 15, 33, 37, 3]
// kit id in Premier League website
kit_id_by_name =[1, 2, 127, 130, 131, 43, 4, 6, 7, 34,
                10, 163, 11, 12, 23, 15, 18, 21, 25, 38]

const fetchClubs = async () => {
    for (let i = 0; i < club_id_by_name.length; i++) {
        const club = await fetchClub(club_id_by_name[i], kit_id_by_name[i], i);
        updateData('clubs', club.name_full, {club});
        console.log(`Updated club info for ${club.name_code}`);
    }
}

export { fetchClubs };