// This function fetches each club's last 3 matches from FootApi,
// transforms it and adds it to Firestore

import { updateData } from "../firebase/firestore";
import { X_RapidAPI_Key, X_RapidAPI_Host } from "@env"
import { dataClubs } from "../fetchCloud";
import moment from 'moment';

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fetchLast3 = async (team_id, database_id) => {
    const url = `https://footapi7.p.rapidapi.com/api/team/${team_id}/matches/previous/0`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': X_RapidAPI_Key,
            'X-RapidAPI-Host': X_RapidAPI_Host
        }
    };
    let result;

    while (result === undefined) {
        try {
            const response = await fetch(url, options);
            result = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    const last3_array = [];

    for (let i = result.events.length-1; i >= 0; i--) {
        const match = result.events[i];
        // filter only premier league matches
        if (match.tournament.id === 1 && last3_array.length < 3) {
            // for date
            const matchdate = new Date(match.startTimestamp*1000);
            const match_day = weekday[matchdate.getDay()];
            const match_month = month[matchdate.getMonth()];
            // for result
            let result;
            if (match.winnerCode === 3) {   // draw
                result = 'Draw';
            } else if (match.winnerCode === 1) {    // home team won
                if (dataClubs[database_id].club.name_code === match.homeTeam.nameCode) {
                    result = 'Win';
                } else {
                    result = 'Loss';
                }
            } else if (match.winnerCode === 2) {    // away team won
                if (dataClubs[database_id].club.name_code === match.awayTeam.nameCode) {
                    result = 'Win';
                } else {
                    result = 'Loss';
                }
            } else {
                result = 'Postponed';
            }

            last3_array.push({
                date: `${match_day}, ${matchdate.getDate()} ${match_month}`,
                result: result,
                home: {
                    name_short: match.homeTeam.shortName,
                    name_code: match.homeTeam.nameCode,
                    goal: match.homeScore.current !== undefined ? match.homeScore.current : 'postponed',
                },
                away: {
                    name_short: match.awayTeam.shortName,
                    name_code: match.awayTeam.nameCode,
                    goal: match.awayScore.current !== undefined ? match.awayScore.current : 'postponed',
                }, 
            });
        }
    }

    // console.log(last3_array);

    return last3_array;
}

const fetchNext3 = async (team_id, database_id) => {
    const url = `https://footapi7.p.rapidapi.com/api/team/${team_id}/matches/next/0`;
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

    const next3_array = [];

    for (let i = 0; i <= result.events.length-1; i++) {
        const match = result.events[i];
        // filter only premier league matches
        if (match.tournament.id === 1 && next3_array.length < 3) {
            // for date
            const matchdate = new Date(match.startTimestamp*1000);
            const match_day = weekday[matchdate.getDay()];
            const match_month = month[matchdate.getMonth()];

            next3_array.push({
                date: `${match_day}, ${matchdate.getDate()} ${match_month}`,
                time: moment(matchdate).format('HH:mm'),
                // no result yet for future matches
                home: {
                    name_short: match.homeTeam.shortName,
                    name_code: match.homeTeam.nameCode,
                    // no goal yet for future matches
                },
                away: {
                    name_short: match.awayTeam.shortName,
                    name_code: match.awayTeam.nameCode,
                    // no goal yet for future matches
                }, 
            });
        }
    }

    return next3_array;
}

// club id in FootApi
club_id_by_name =[42, 40, 60, 50, 30, 6, 38, 7, 48, 43, 
                44, 72, 17, 35, 39, 14, 15, 33, 37, 3]

const fetchLastNext3 = async () => {
    for (let i = 0; i < club_id_by_name.length; i++) {
        const last3 = await fetchLast3(club_id_by_name[i], i);
        const next3 = await fetchNext3(club_id_by_name[i], i);
        const lastNext3 = {"last3": last3, "next3": next3};
        updateData('clubs', dataClubs[i].club.name_full, {lastNext3: lastNext3});
        console.log(`updated lastNext3 matches for ${dataClubs[i].club.name_code}`);
    }
}

export { fetchLastNext3 };