// This function fetches all matches from FootApi,
// transforms it and adds it to Firestore
import axios from 'axios';
import { getData, setData, updateData } from "../firebase/firestore.js";
import { clubShortName } from "./clubShortName.js";
import { clubNameCode } from "./clubNameCode.js";
import { parse } from 'node-html-parser';

let prevDate = "";   // to check if a match is the first match of the day
let prevRefDate = "";   // for "to be scheduled" matches

const fetchInGameStats = async (matchRef, matchWeek, current_row) => {
    let root;
    while (root === undefined) {
        try {
            const res = await axios.get('https://fbref.com/en/matches/' + matchRef);
            // const docRef = matchRef.split("/")[3]
            root = parse(res.data)
        } catch (error) {
            console.log(error)
            console.log("Error fetching matchRef:", matchRef, "retrying...")
            await new Promise(resolve => setTimeout(resolve, 3500))
        }
    }

    while (true) {
        try {
            // home team
            const homeTeam = root.querySelector('.scorebox div:nth-child(1) div:nth-child(1) strong').text.trim()
            const homeScore = root.querySelector('.scorebox div:nth-child(1) div:nth-child(2) .score').text.trim()
            const homeXG = root.querySelector('.scorebox div:nth-child(1) div:nth-child(2) .score_xg').text.trim()
            const homeManager = root.querySelector('.scorebox div:nth-child(1) div:nth-child(5)').text.trim().slice(9)
            const homeCaptain = root.querySelector('.scorebox div:nth-child(1) div:nth-child(6)').text.trim().slice(9)

            // away team
            const awayTeam = root.querySelector('.scorebox div:nth-child(2) div:nth-child(1) strong').text.trim()
            const awayScore = root.querySelector('.scorebox div:nth-child(2) div:nth-child(2) .score').text.trim()
            const awayXG = root.querySelector('.scorebox div:nth-child(2) div:nth-child(2) .score_xg').text.trim()
            const awayManager = root.querySelector('.scorebox div:nth-child(2) div:nth-child(5)').text.trim().slice(9)
            const awayCaptain = root.querySelector('.scorebox div:nth-child(2) div:nth-child(6)').text.trim().slice(9)

            // match details
            const detailsHTML = root.querySelector('.scorebox > div:nth-child(3)').innerText.replace(/&nbsp;/g, " ")
            let attendance = "NA"
            try {
                attendance = detailsHTML.match(/Attendance:.*Venue/)[0].slice(11, -5).trim()
            } catch (error) {}
            const venue = detailsHTML.match(/Venue:.*Officials/)[0].slice(7, -9).trim()
            const referee = detailsHTML.match(/Officials:.*\(Referee\)/)[0].slice(11, -9).trim()
            const assistantReferee1 = detailsHTML.match(/\(Referee\) &#183;.*\(AR1\)/)[0].slice(17, -5).trim()
            const assistantReferee2 = detailsHTML.match(/\(AR1\) &#183;.*\(AR2\)/)[0].slice(13, -5).trim()
            const fourthOfficial = detailsHTML.match(/\(AR2\) &#183;.*\(4th\)/)[0].slice(13, -5).trim()
            const varReferee = detailsHTML.match(/\(4th\) &#183;.*\(VAR\)/)[0].slice(13, -5).trim()

            // goals
            const homeGoals_HTML = root.querySelectorAll('#events_wrap .event.a .goal+div div, #events_wrap .event.a .own_goal+div div, #events_wrap .event.a .penalty_goal+div div')
            const awayGoals_HTML = root.querySelectorAll('#events_wrap .event.b .goal+div div, #events_wrap .event.b .own_goal+div div, #events_wrap .event.b .penalty_goal+div div')

            
            let homeGoals = []
            let awayGoals = []
            homeGoals_HTML.forEach(goal => {
                const goalTime = goal.parentNode.parentNode.parentNode.querySelector('div:first-child').text.trim().match(/\d+/)[0]
                homeGoals.push({time: goalTime, scorer: goal.innerText.trim()})
            })
            awayGoals_HTML.forEach(goal => {
                const goalTime = goal.parentNode.parentNode.parentNode.querySelector('div:first-child').text.trim().match(/\d+/)[0]
                awayGoals.push({time: goalTime, scorer: goal.innerText.trim()})
            })

            // squads
            const homeFormation = root.querySelector('#field_wrap #a th').text.match(/\(.+\)/)[0].slice(1, -1)
            const homeSquadNumbers = root.querySelectorAll('#field_wrap #a td:nth-child(1)')
            const homeSquadNames = root.querySelectorAll('#field_wrap #a td:nth-child(2)')
            const awayFormation = root.querySelector('#field_wrap #b th').text.match(/\(.+\)/)[0].slice(1, -1)
            const awaySquadNumbers = root.querySelectorAll('#field_wrap #b td:nth-child(1)')
            const awaySquadNames = root.querySelectorAll('#field_wrap #b td:nth-child(2)')

            let homeSquad = []
            let awaySquad = []
            for (let i = 0; i < homeSquadNumbers.length; i++) {
                homeSquad.push({number: homeSquadNumbers[i].text.trim(), name: homeSquadNames[i].text.trim()})
            }
            for (let i = 0; i < awaySquadNumbers.length; i++) {
                awaySquad.push({number: awaySquadNumbers[i].text.trim(), name: awaySquadNames[i].text.trim()})
            }

            // stats
            const homePossession = root.querySelector('#team_stats tr:nth-child(3) td:nth-child(1) strong').text.trim()
            const awayPossession = root.querySelector('#team_stats tr:nth-child(3) td:nth-child(2) strong').text.trim()

            const homePassHTML = root.querySelector('#team_stats tr:nth-child(5) td:nth-child(1)').innerText.trim()
            const homePassPercentage = root.querySelector('#team_stats tr:nth-child(5) td:nth-child(1) strong').text.trim()
            const homePassSuccess = homePassHTML.split(' ')[0]
            const homePassTotal = homePassHTML.split(' ')[2].match(/^\d+/)[0]
            const awayPassHTML = root.querySelector('#team_stats tr:nth-child(5) td:nth-child(2)').innerText.trim()
            const awayPassPercentage = root.querySelector('#team_stats tr:nth-child(5) td:nth-child(2) strong').text.trim()
            const awayPassSuccess = awayPassHTML.split(' ')[0].match(/\d+$/)[0]
            const awayPassTotal = awayPassHTML.split(' ')[2]

            const homeShotHTML = root.querySelector('#team_stats tr:nth-child(7) td:nth-child(1)').innerText.trim()
            const homeShotPercentage = root.querySelector('#team_stats tr:nth-child(7) td:nth-child(1) strong').text.trim()
            const homeShotSuccess = homeShotHTML.split(' ')[0]
            const homeShotTotal = homeShotHTML.split(' ')[2].match(/^\d+/)[0]
            const awayShotHTML = root.querySelector('#team_stats tr:nth-child(7) td:nth-child(2)').innerText.trim()
            const awayShotPercentage = root.querySelector('#team_stats tr:nth-child(7) td:nth-child(2) strong').text.trim()
            const awayShotSuccess = awayShotHTML.split(' ')[0].match(/\d+$/)[0]
            const awayShotTotal = awayShotHTML.split(' ')[2]

            const homeSaveHTML = root.querySelector('#team_stats tr:nth-child(9) td:nth-child(1)').innerText.trim()
            const homeSavePercentage = root.querySelector('#team_stats tr:nth-child(9) td:nth-child(1) strong').text.trim()
            const homeSaveSuccess = homeSaveHTML.split(' ')[0]
            const homeSaveTotal = homeSaveHTML.split(' ')[2].match(/^\d+/)[0]
            const awaySaveHTML = root.querySelector('#team_stats tr:nth-child(9) td:nth-child(2)').innerText.trim()
            const awaySavePercentage = root.querySelector('#team_stats tr:nth-child(9) td:nth-child(2) strong').text.trim()
            const awaySaveSuccess = awaySaveHTML.split(' ')[0].match(/\d+$/)[0]
            const awaySaveTotal = awaySaveHTML.split(' ')[2]

            // extra stats
            const homeFouls = root.querySelector('#team_stats_extra div:nth-child(1) div:nth-child(4)').text.trim()
            const awayFouls = root.querySelector('#team_stats_extra div:nth-child(1) div:nth-child(6)').text.trim()
            const homeCorners = root.querySelector('#team_stats_extra div:nth-child(1) div:nth-child(7)').text.trim()
            const awayCorners = root.querySelector('#team_stats_extra div:nth-child(1) div:nth-child(9)').text.trim()
            const homeCrosses = root.querySelector('#team_stats_extra div:nth-child(1) div:nth-child(10)').text.trim()
            const awayCrosses = root.querySelector('#team_stats_extra div:nth-child(1) div:nth-child(12)').text.trim()
            const homeTouches = root.querySelector('#team_stats_extra div:nth-child(1) div:nth-child(13)').text.trim()
            const awayTouches = root.querySelector('#team_stats_extra div:nth-child(1) div:nth-child(15)').text.trim()

            const homeTackles = root.querySelector('#team_stats_extra div:nth-child(2) div:nth-child(4)').text.trim()
            const awayTackles = root.querySelector('#team_stats_extra div:nth-child(2) div:nth-child(6)').text.trim()
            const homeInterceptions = root.querySelector('#team_stats_extra div:nth-child(2) div:nth-child(7)').text.trim()
            const awayInterceptions = root.querySelector('#team_stats_extra div:nth-child(2) div:nth-child(9)').text.trim()
            const homeAerialsWon = root.querySelector('#team_stats_extra div:nth-child(2) div:nth-child(10)').text.trim()
            const awayAerialsWon = root.querySelector('#team_stats_extra div:nth-child(2) div:nth-child(12)').text.trim()
            const homeClearances = root.querySelector('#team_stats_extra div:nth-child(2) div:nth-child(13)').text.trim()
            const awayClearances = root.querySelector('#team_stats_extra div:nth-child(2) div:nth-child(15)').text.trim()

            const homeOffsides = root.querySelector('#team_stats_extra div:nth-child(3) div:nth-child(4)').text.trim()
            const awayOffsides = root.querySelector('#team_stats_extra div:nth-child(3) div:nth-child(6)').text.trim()
            const homeGoalKicks = root.querySelector('#team_stats_extra div:nth-child(3) div:nth-child(7)').text.trim()
            const awayGoalKicks = root.querySelector('#team_stats_extra div:nth-child(3) div:nth-child(9)').text.trim()
            const homeThrowIns = root.querySelector('#team_stats_extra div:nth-child(3) div:nth-child(10)').text.trim()
            const awayThrowIns = root.querySelector('#team_stats_extra div:nth-child(3) div:nth-child(12)').text.trim()
            const homeLongBalls = root.querySelector('#team_stats_extra div:nth-child(3) div:nth-child(13)').text.trim()
            const awayLongBalls = root.querySelector('#team_stats_extra div:nth-child(3) div:nth-child(15)').text.trim()

            const home = {
                general: {
                    team: homeTeam,
                    score: homeScore,
                    xG: homeXG,
                    manager: homeManager,
                    captain: homeCaptain,
                    goals: homeGoals,
                    formation: homeFormation,
                    squad: homeSquad,   // first-team: 0-10
                },
                stats: {
                    possession: homePossession,
                    passPercentage: homePassPercentage,
                    passSuccess: homePassSuccess,
                    passTotal: homePassTotal,
                    shotPercentage: homeShotPercentage,
                    shotSuccess: homeShotSuccess,
                    shotTotal: homeShotTotal,
                    savePercentage: homeSavePercentage,
                    saveSuccess: homeSaveSuccess,
                    saveTotal: homeSaveTotal,
                },
                extraStats: {
                    fouls: homeFouls,
                    corners: homeCorners,
                    crosses: homeCrosses,
                    touches: homeTouches,
                    tackles: homeTackles,
                    interceptions: homeInterceptions,
                    aerialsWon: homeAerialsWon,
                    clearances: homeClearances,
                    offsides: homeOffsides,
                    goalKicks: homeGoalKicks,
                    throwIns: homeThrowIns,
                    longBalls: homeLongBalls,
                }
            }

            const away = {
                general: {
                    team: awayTeam,
                    score: awayScore,
                    xG: awayXG,
                    manager: awayManager,
                    captain: awayCaptain,
                    goals: awayGoals,
                    formation: awayFormation,
                    squad: awaySquad,    // first-team: 0-10
                },
                stats: {
                    possession: awayPossession,
                    passPercentage: awayPassPercentage,
                    passSuccess: awayPassSuccess,
                    passTotal: awayPassTotal,
                    shotPercentage: awayShotPercentage,
                    shotSuccess: awayShotSuccess,
                    shotTotal: awayShotTotal,
                    savePercentage: awaySavePercentage,
                    saveSuccess: awaySaveSuccess,
                    saveTotal: awaySaveTotal,
                },
                extraStats: {
                    fouls: awayFouls,
                    corners: awayCorners,
                    crosses: awayCrosses,
                    touches: awayTouches,
                    tackles: awayTackles,
                    interceptions: awayInterceptions,
                    aerialsWon: awayAerialsWon,
                    clearances: awayClearances,
                    offsides: awayOffsides,
                    goalKicks: awayGoalKicks,
                    throwIns: awayThrowIns,
                    longBalls: awayLongBalls,
                }
            }

            const general = {
                attendance: attendance,
                venue: venue,
                referee: referee,
                assistantReferee1: assistantReferee1,
                assistantReferee2: assistantReferee2,
                fourthOfficial: fourthOfficial,
                varReferee: varReferee,
            }

            const inGameStats = {
                home: home,
                away: away,
                general: general
            }
            setData("matches", matchRef, inGameStats)
            attendance != "NA" ? updateData("match_list", "latest_fetched_row", {FBREF_row: current_row}) : null
            break;
        } catch (error) {
            console.log("Error fetching in-game stats for matchRef:", matchRef, "retrying...")
            console.log(error)
            await new Promise(resolve => setTimeout(resolve, 3500))
        }
    }
    console.log("Fetched and uploaded matchRef:", matchRef, `(week ${matchWeek}) (FBREF_row: ${current_row})`)
}

const fetchMatch = async (row, latest_fetched_stats_fbref_row, current_row) => {
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
        const dateTimeArray = localDateTime.split(' ') // Array: ['Sat', 'Aug', '12,', '19:30'], different from local result
        dayOfWeek = dateTimeArray[0].slice(0, -1)
        month = dateTimeArray[1]
        day = dateTimeArray[2].slice(0, -1)
        time = dateTimeArray[3]
        // for time, change 24 to 00
        if (time.slice(0, 2) === "24") {
            time = "00" + time.slice(2)
        }
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
        // console.log("a match in week", matchWeek, "was postponed")
        matchRef = "Match Postponed"
    } else if (notes === 'Match Suspended') {
        console.log("a match in week", matchWeek, "was suspended")
    } else {
        if (scoreline.match(/<a.*?>.*?<\/a>/) !== null) {   // if match has been played and not postponed
            matchRef = columns[11].match(/<a.*?>.*?<\/a>/)[0].match(/href=".*?"/)[0].split('/')[3]
            if (current_row > latest_fetched_stats_fbref_row) {
                await fetchInGameStats(matchRef, matchWeek, current_row)
                await new Promise(resolve => setTimeout(resolve, 3500))
            }
        } else {
            matchRef = "NA"
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
    const start = new Date();
    const url = await axios.get('https://fbref.com/en/comps/9/schedule/Premier-League-Scores-and-Fixtures');
    const table = url.data.match(/<table.*id="sched_2023-2024_9_1".*>.*<\/table>/)[0]
    const tableBody = table.match(/<tbody>.*<\/tbody>/)[0]
    const row = tableBody.match(/<tr.*?>.*?<\/tr>/g) // ? makes it non-greedy
    const match_with_stats = await getData("match_list", "latest_fetched_row")
    let rescheduled_matches = [];

    let latest_fetched_stats_fbref_row = match_with_stats.FBREF_row
    console.log("latest_fetched_stats_fbref_row:", latest_fetched_stats_fbref_row)

    let fetching_week = 1;
    let fetching_row = 0;

    while (fetching_week < 39) {
        const func_start = new Date();
        let matches = [];

        for (let i = fetching_row; i < 421; i++) {  // total match rows
            fetching_row++;
            const week = row[i].match(/<th.*>.*<\/th>/)[0].match(/>.*</)[0].slice(1, -1)

            if (week != fetching_week) {
                if (week.length === 0) {    // to skip title rows
                    continue; 
                } else if (week == fetching_week + 1) { // to fetch the next week
                    fetching_row--;
                    break;
                } else {    // matches from previous week rescheduled
                    let match = await fetchMatch(row[i], latest_fetched_stats_fbref_row, i)
                    match["rescheduled"] = true
                    let cloud_match_list = await getData("match_list", "full_match_list")
                    let original_matches = cloud_match_list["Week " + match.matchWeek]
                    original_matches.push(match)
                    await updateData("match_list", "full_match_list", {["Week " + match.matchWeek] : original_matches})
                    // console.log("a match in week", match.matchWeek, "was rescheduled")
                    rescheduled_matches.push(match)
                    continue;
                }
            }     
            let match = await fetchMatch(row[i], latest_fetched_stats_fbref_row, i)
            matches.push(match)
        }
        await new Promise(resolve => setTimeout(resolve, 1000));    // wait for matches
        updateData("match_list", "full_match_list", {["Week " + fetching_week] : matches})
        const func_end = new Date();
        console.log("Time taken for week", fetching_week, ":", (func_end - func_start) / 1000, "s")
        fetching_week++;
    }
    updateData("match_list", "rescheduled_matches", {"rescheduled":  rescheduled_matches})
    console.log("Finished fetching matches")
    const end = new Date();
    console.log("Time taken for fetchMatches:", (end - start) / 1000, "s");
}

export { fetchMatches }