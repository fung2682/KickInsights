// This function fetches all matches from FootApi,
// transforms it and adds it to Firestore
import axios from 'axios';
import { getData, updateData } from "../firebase/firestore";
import { clubShortName } from '../clubShortName';
import { clubNameCode } from '../clubNameCode';

let prevDate = "";   // to check if a match is the first match of the day
let prevRefDate = "";   // for "to be scheduled" matches

const fetchMatch = async (row) => {
    const matchWeek = row.match(/<th.*>.*<\/th>/)[0].match(/>.*?</)[0].slice(1, -1)
    const columns = row.match(/<td.*?>.*?<\/td>/g)

    // Local date and time
    const epoch = columns[2].match(/data-venue-epoch=".*?"/)
    let dayOfWeek, month, day, time;
    
    if (epoch === null) {   // if match has not been played
        dayOfWeek = "f"   // f for future
        month = "f"       
        day = "f"         
        time = "f"        
    } else {
        const epoch_value = epoch[0].slice(18, -1)
        const foreignDateTime = new Date(epoch_value * 1000)    // date takes in milliseconds
        const localDateTime = foreignDateTime.toLocaleString('en-US', { 
            timeZone: 'Asia/Hong_Kong', 
            hour12: false, 
            month: 'short', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            weekday: 'short' 
        })
        const dateTimeArray = localDateTime.split(' ')
        dayOfWeek = dateTimeArray[0].slice(0, -1)
        month = dateTimeArray[1]
        day = dateTimeArray[2]
        time = dateTimeArray[4]
    }

    // Reference date (future schedule)
    let refDayOfWeek = columns[0].match(/>.*?</)[0].slice(1, -1).split(' ')[0]
    let refDate = columns[1].match(/<a.*?>.*?<\/a>/)[0].match(/>.*?</)[0].slice(1, -1)

    // First match of the day
    let firstMatch = false;

    if (day === "f") {   // "to be scheduled" matches
        if (refDate != prevRefDate) {
            prevRefDate = refDate
            firstMatch = true;
        }
    } else if (month + " " + day != prevDate) {
        prevDate = month + " " + day
        firstMatch = true;
    } 

    // Home and Away team short name, namecode
    let homeTeam, homeTeamNameCode, awayTeam, awayTeamNameCode;
    let homeTeam_FBREF = columns[3].match(/<a.*?>.*?<\/a>/)[0].match(/>.*?</)[0].slice(1, -1)
    homeTeam = clubShortName[homeTeam_FBREF] ? clubShortName[homeTeam_FBREF] : homeTeam_FBREF
    homeTeamNameCode = clubNameCode[homeTeam_FBREF]
    let awayTeam_FBREF = columns[7].match(/<a.*?>.*?<\/a>/)[0].match(/>.*?</)[0].slice(1, -1)
    awayTeam = clubShortName[awayTeam_FBREF] ? clubShortName[awayTeam_FBREF] : awayTeam_FBREF
    awayTeamNameCode = clubNameCode[awayTeam_FBREF]

    // Home and Away team goal
    const scoreline = columns[5]
    let homeGoal, awayGoal;

    if (scoreline.match(/<a.*?>.*?<\/a>/) === null) {   // if match has not been played
        homeGoal = 'f'    // f for future
        awayGoal = 'f'    // f for future
    } else {
        homeGoal = scoreline.match(/<a.*?>.*?<\/a>/)[0].match(/>.*?</)[0].slice(1, -1).split('&ndash;')[0]
        awayGoal = scoreline.match(/<a.*?>.*?<\/a>/)[0].match(/>.*?</)[0].slice(1, -1).split('&ndash;')[1]
    }
    
    // Notes
    const notes = columns[12].match(/>.*?</)[0].slice(1, -1)
    // Reference (for match details)
    let matchRef = "";
    if (notes === 'Match Postponed') {
        console.log("a match in week", matchWeek, "was postponed")
        matchRef = "Match Postponed"
    } else if (notes === 'Match Suspended') {
        console.log("a match in week", matchWeek, "was suspended")
    } else {
        if (scoreline.match(/<a.*?>.*?<\/a>/) !== null) {   // if match has been played and not postponed
            matchRef = "fbref.com" + columns[11].match(/<a.*?>.*?<\/a>/)[0].match(/href=".*?"/)[0].slice(6, -1)
        } else {
            matchRef = "Match not played"
        }
    }

    return {
        matchWeek: matchWeek,
        dayOfWeek: dayOfWeek,
        day: day,
        month: month,
        time: time,
        homeTeam: homeTeam,
        homeNameCode: homeTeamNameCode,
        homeGoal: homeGoal,
        awayGoal: awayGoal,
        awayNameCode: awayTeamNameCode,
        awayTeam: awayTeam,
        matchRef: matchRef,  // match stats for past games, H2H for future games
        rescheduled: false,
        firstMatch: firstMatch,
        refDayOfWeek: refDayOfWeek,
        refDate: refDate
    }
}

const fetchMatches = async () => {
    const url = await axios.get('https://fbref.com/en/comps/9/schedule/Premier-League-Scores-and-Fixtures');
    const table = url.data.match(/<table.*id="sched_2023-2024_9_1".*>.*<\/table>/)[0]
    const tableBody = table.match(/<tbody>.*<\/tbody>/)[0]
    const row = tableBody.match(/<tr.*?>.*?<\/tr>/g) // ? makes it non-greedy

    let fetching_week = 1;
    let fetching_row = 0;

    while (fetching_week < 39) {
        let matches = [];

        for (let i = fetching_row; i < 419; i++) {  // total match rows
            fetching_row++;
            const week = row[i].match(/<th.*>.*<\/th>/)[0].match(/>.*</)[0].slice(1, -1)

            if (week != fetching_week) {
                if (week.length === 0) {    // to skip title rows
                    continue; 
                } else if (week == fetching_week + 1) { // to fetch the next week
                    fetching_row--;
                    break;
                } else {    // matches from previous week rescheduled
                    let match = await fetchMatch(row[i])
                    match["rescheduled"] = true
                    let cloud_match_list = await getData("match_list", "full_match_list")
                    let original_matches = cloud_match_list["Week " + match.matchWeek]
                    original_matches.push(match)
                    updateData("match_list", "full_match_list", {["Week " + match.matchWeek] : original_matches})
                    console.log("a match in week", match.matchWeek, "was rescheduled")
                    continue;
                }
            }     

            let match = await fetchMatch(row[i])
            matches.push(match)
        }
        updateData("match_list", "full_match_list", {["Week " + fetching_week] : matches})
        fetching_week++;
    }
    console.log("Finished fetching matches")
}

export { fetchMatches }