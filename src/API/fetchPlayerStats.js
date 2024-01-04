// This function fetches a club's player stats from FBREF
// returns it to the calling function

import axios from 'axios';

function isNumeric(str) {
    if (typeof str != "string") return false // process strings only
    return !isNaN(str) && // use type corrcion to parse the _entirety_ of the string
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function check_numeric_values(stats) {
    for (const stat of stats) {
        if (!isNumeric(Object.values(stat)[0])) {
            let value = Object.values(stat)[0]
            if (value === '---' || value == '-') {
                continue;
            }
            console.log("Non-numeric value found")
            console.log(stat);
        }
    }
}

const year = '2023-2024'
let player_stats = {}

const fetchPlayerNames = (table) => {

    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {
        const row_header = row.match(/<th.*?<\/th>/)[0]
        const player_link = row_header.match(/<a.*?<\/a>/)[0]
        const player_name = player_link.match(/>.*</)[0].slice(1, -1)
        player_stats[player_name] = {}
    }
    // return a promise
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerShooting = (table) => {
    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {   // for each player
        const player_name = row.match(/<th.*?<\/th>/)[0].match(/<a.*?<\/a>/)[0].match(/>.*</)[0].slice(1, -1)
        let shooting_full = [];
        const shooting_stats_raw = row.match(/<td.*?<\/td>/g)
        for (col of shooting_stats_raw) {      // for each stat
            let cell_value = col.match(/>.*</)[0].slice(1, -1)
            cell_value === '' ? cell_value = '-' : null;
            shooting_full.push(cell_value)
        }

        let shooting_trimmed = [
            {'Shots': shooting_full[5]},
            {'Goals': shooting_full[4]},
            {'Shots On Target': shooting_full[6]},
            {'Shots On Target %': shooting_full[7]},
            {'Goals / Shot': shooting_full[10]},
            {'Goals / Shot On Target': shooting_full[11]},
            {'Average Shot Distance': shooting_full[12]},
            {'---': '---'},
            {'Shots From Free Kicks': shooting_full[13]},
            {'Penalty Kicks': shooting_full[14]},
            {'Penalty Kicks Attempted': shooting_full[15]},
        ];
        check_numeric_values(shooting_trimmed)
        player_stats[player_name] = {"shooting": shooting_trimmed}
    }
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerPassing = (table) => {
    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {   // for each player
        const player_name = row.match(/<th.*?<\/th>/)[0].match(/<a.*?<\/a>/)[0].match(/>.*</)[0].slice(1, -1)
        let passing_full = [];
        const passing_stats_raw = row.match(/<td.*?<\/td>/g)
        
        for (col of passing_stats_raw) {      // for each stat
            let cell_value = col.match(/>.*</)[0].slice(1, -1)
            cell_value === '' ? cell_value = '-' : null;
            passing_full.push(cell_value)
        }

        let passing_trimmed = [
            {'Assists': passing_full[18]},
            {'---': '---'},
            {'[Total] Attempted': passing_full[5]},
            {'[Total] Completed': passing_full[4]},
            {'[Total] Completion %': passing_full[6]},
            {'---': '---'},
            {'[Short] Attempted': passing_full[10]},
            {'[Short] Completed': passing_full[9]},
            {'[Short] Completion %': passing_full[11]},
            {'---': '---'},
            {'[Medium] Attempted': passing_full[13]},
            {'[Medium] Completed': passing_full[12]},
            {'[Medium] Completion %': passing_full[14]},
            {'---': '---'},
            {'[Long] Attempted': passing_full[16]},
            {'[Long] Completed': passing_full[15]},
            {'[Long] Completion %': passing_full[17]}
        ]
        check_numeric_values(passing_trimmed)
        player_stats[player_name]["passing"] = passing_trimmed
    }
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerPassTypes = (table) => {
    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {   // for each player
        const player_name = row.match(/<th.*?<\/th>/)[0].match(/<a.*?<\/a>/)[0].match(/>.*</)[0].slice(1, -1)
        let pass_types_full = [];
        const pass_types_stats_raw = row.match(/<td.*?<\/td>/g)

        for (col of pass_types_stats_raw) {      // for each stat
            let cell_value = col.match(/>.*</)[0].slice(1, -1)
            cell_value === '' ? cell_value = '-' : null;
            pass_types_full.push(cell_value)
        }

        let pass_types_trimmed = [
            {'Live-ball Passes': pass_types_full[5]},
            {'Dead-ball Passes': pass_types_full[6]},
            {'Free Kicks': pass_types_full[7]},
            {'Through Balls': pass_types_full[8]},
            {'Switches': pass_types_full[9]},
            {'Crosses': pass_types_full[10]},
            {'Throw-Ins': pass_types_full[11]},
            {'Corner Kicks': pass_types_full[12]},
            {'Offsides': pass_types_full[17]},
            {'Passes Blocked': pass_types_full[18]},
        ]
        check_numeric_values(pass_types_trimmed)
        player_stats[player_name]["pass_types"] = pass_types_trimmed
    }
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerGoalShotCreation = (table) => {
    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {   // for each player
        const player_name = row.match(/<th.*?<\/th>/)[0].match(/<a.*?<\/a>/)[0].match(/>.*</)[0].slice(1, -1)
        let gsc_full = [];
        const gsc_stats_raw = row.match(/<td.*?<\/td>/g)

        for (col of gsc_stats_raw) {      // for each stat
            let cell_value = col.match(/>.*</)[0].slice(1, -1)
            cell_value === '' ? cell_value = '-' : null;
            gsc_full.push(cell_value)
        }

        let gsc_trimmed = [
            {'Shot Creating Actions': gsc_full[4]},
            {'[SCA] Live-Ball Passes': gsc_full[6]},
            {'[SCA] Dead-Ball Passes': gsc_full[7]},
            {'[SCA] Take-Ons': gsc_full[8]},
            {'[SCA] Shots': gsc_full[9]},
            {'[SCA] Fouls': gsc_full[10]},
            {'[SCA] Defensive Actions': gsc_full[11]},
            {'---': '---'},
            {'Goal Creating Actions': gsc_full[12]},
            {'[GCA] Live-Ball Passes': gsc_full[14]},
            {'[GCA] Dead-Ball Passes': gsc_full[15]},
            {'[GCA] Take-Ons': gsc_full[16]},
            {'[GCA] Shots': gsc_full[17]},
            {'[GCA] Fouls': gsc_full[18]},
            {'[GCA] Defensive Actions': gsc_full[19]},
        ]
        check_numeric_values(gsc_trimmed)
        player_stats[player_name]["goal_and_shot_creation"] = gsc_trimmed
    }
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerDefensiveActions = (table) => {
    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {   // for each player
        const player_name = row.match(/<th.*?<\/th>/)[0].match(/<a.*?<\/a>/)[0].match(/>.*</)[0].slice(1, -1)
        let defensive_actions_full = [];
        const defensive_actions_stats_raw = row.match(/<td.*?<\/td>/g)

        for (col of defensive_actions_stats_raw) {      // for each stat
            let cell_value = col.match(/>.*</)[0].slice(1, -1)
            cell_value === '' ? cell_value = '-' : null;
            defensive_actions_full.push(cell_value)
        }

        let defensive_actions_trimmed = [
            {'[Tackles] Attempted': defensive_actions_full[4]},
            {'[Tackles] Won': defensive_actions_full[5]},
            {'[Tackles] Def 3rd': defensive_actions_full[6]},
            {'[Tackles] Mid 3rd': defensive_actions_full[7]},
            {'[Tackles] Att 3rd': defensive_actions_full[8]},
            {'---': '---'},
            {'[Challenges] Attempted': defensive_actions_full[10]},
            {'[Challenges] Won': defensive_actions_full[9]},
            {'[Challenges] Won %': defensive_actions_full[11]},
            {'---': '---'},
            {'[Blocks] Balls': defensive_actions_full[13]},
            {'[Blocks] Shots': defensive_actions_full[14]},
            {'[Blocks] Passes': defensive_actions_full[15]},
            {'---': '---'},
            {'Interceptions': defensive_actions_full[16]},
            {'Clearances': defensive_actions_full[18]},
            {'Errors': defensive_actions_full[19]},
        ]
        check_numeric_values(defensive_actions_trimmed)
        player_stats[player_name]["defensive_actions"] = defensive_actions_trimmed
    }
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerPossession = (table) => {
    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {   // for each player
        const player_name = row.match(/<th.*?<\/th>/)[0].match(/<a.*?<\/a>/)[0].match(/>.*</)[0].slice(1, -1)
        let possession_full = [];
        const possession_stats_raw = row.match(/<td.*?<\/td>/g)

        for (col of possession_stats_raw) {      // for each stat
            let cell_value = col.match(/>.*</)[0].slice(1, -1)
            cell_value === '' ? cell_value = '-' : null;
            possession_full.push(cell_value)
        }

        let possession_trimmed = [
            {'Touches': possession_full[4]},
            {'[Touches] Def Pen Area': possession_full[5]},
            {'[Touches] Def 3rd': possession_full[6]},
            {'[Touches] Mid 3rd': possession_full[7]},
            {'[Touches] Att 3rd': possession_full[8]},
            {'[Touches] Att Pen Area': possession_full[9]},
            {'---': '---'},
            {'[Take-Ons] Attempted': possession_full[11]},
            {'[Take-Ons] Won': possession_full[12]},
            {'[Take-Ons] Tackled': possession_full[14]},
            {'---': '---'},
            {'Carries': possession_full[16]},
            {'Total Distance (yards)': possession_full[17]},
            {'Progressive Distance (yards)': possession_full[18]},
            {'Progressive Carries': possession_full[19]},
            {'Carries Into Att 3rd': possession_full[20]},
            {'Carries Into Att Pen Area': possession_full[21]},
            {'Miscontrols': possession_full[22]},
            {'Dispossessed': possession_full[23]},
            {'---': '---'},
            {'Passes Received': possession_full[24]},
            {'Progressive Passes Received': possession_full[25]},
        ]
        check_numeric_values(possession_trimmed)
        player_stats[player_name]["possession"] = possession_trimmed
    }
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerMisc = (table) => {
    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {   // for each player
        const player_name = row.match(/<th.*?<\/th>/)[0].match(/<a.*?<\/a>/)[0].match(/>.*</)[0].slice(1, -1)
        let misc_full = [];
        const misc_stats_raw = row.match(/<td.*?<\/td>/g)

        for (col of misc_stats_raw) {      // for each stat
            let cell_value = col.match(/>.*</)[0].slice(1, -1)
            cell_value === '' ? cell_value = '-' : null;
            misc_full.push(cell_value)
        }

        let misc_trimmed = [
            {'Yellow Cards': misc_full[4]},
            {'Red Cards': misc_full[5]},
            {'Second Yellow Cards': misc_full[6]},
            {'Fouls Committed': misc_full[7]},
            {'Fouls Drawn': misc_full[8]},
            {'Offsides': misc_full[9]},
            {'---': '---'},
            {'Penalty Kicks Won': misc_full[13]},
            {'Penalty Kicks Conceded': misc_full[14]},
            {'Own Goals': misc_full[15]},
            {'Ball Recoveries': misc_full[16]},
            {'---': '---'},
            {'Aerial Duels Won': misc_full[17]},
            {'Aerial Duels Lost': misc_full[18]},
            {'Aerial Duels Won %': misc_full[19]},
        ]
        check_numeric_values(misc_trimmed)
        player_stats[player_name]["misc"] = misc_trimmed
    }
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerGoalkeeping = (table) => {
    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {   // for each player
        const player_name = row.match(/<th.*?<\/th>/)[0].match(/<a.*?<\/a>/)[0].match(/>.*</)[0].slice(1, -1)
        let goalkeeping_full = [];
        const goalkeeping_stats_raw = row.match(/<td.*?<\/td>/g)

        for (col of goalkeeping_stats_raw) {      // for each stat
            let cell_value = col.match(/>.*</)[0].slice(1, -1)
            cell_value === '' ? cell_value = '-' : null;
            goalkeeping_full.push(cell_value)
        }

        let goalkeeping_trimmed = [
            {'Shots On Target Against': goalkeeping_full[9]},
            {'Goals Against': goalkeeping_full[7]},
            {'Saves': goalkeeping_full[10]},
            {'Save %': goalkeeping_full[11]},
            {'Clean Sheets': goalkeeping_full[15]},
            {'---': '---'},
            {'[Penalty Kicks] Against': goalkeeping_full[17]},
            {'[Penalty Kicks] Saved': goalkeeping_full[19]},
            {'[Penalty Kicks] Save %': goalkeeping_full[21]},
        ]
        check_numeric_values(goalkeeping_trimmed)
        player_stats[player_name]["goalkeeping"] = goalkeeping_trimmed
    }
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerGoalkeepingAdvanced = (table) => {
    const table_body = table.match(/<tbody>.*<\/tbody>/)
    const table_rows = table_body[0].match(/<tr >.*?<\/tr>/g)

    for (row of table_rows) {   // for each player
        const player_name = row.match(/<th.*?<\/th>/)[0].match(/<a.*?<\/a>/)[0].match(/>.*</)[0].slice(1, -1)
        let goalkeeping_adv_full = [];
        const goalkeeping_adv_stats_raw = row.match(/<td.*?<\/td>/g)

        for (col of goalkeeping_adv_stats_raw) {      // for each stat
            let cell_value = col.match(/>.*</)[0].slice(1, -1)
            cell_value === '' ? cell_value = '-' : null;
            goalkeeping_adv_full.push(cell_value)
        }

        let goalkeeping_adv_trimmed = [
            {'Penalty Kicks Against': goalkeeping_adv_full[5]},
            {'Free Kicks Against': goalkeeping_adv_full[6]},
            {'Corner Kicks Against': goalkeeping_adv_full[7]},
            {'Own Goals': goalkeeping_adv_full[8]},
            {'---': '---'},
            {'[Long Pass] Attempted': goalkeeping_adv_full[14]},
            {'[Long Pass] Completed': goalkeeping_adv_full[13]},
            {'[Long Pass] Completion %': goalkeeping_adv_full[15]},
            {'---': '---'},
            {'[Passes] Attempted': goalkeeping_adv_full[16]},
            {'[Passes] Throws': goalkeeping_adv_full[17]},
            {'[Passes] Long Pass %': goalkeeping_adv_full[18]},
            {'[Passes] Avg Length (yards)': goalkeeping_adv_full[19]},
            {'---': '---'},
            {'[Goal Kicks] Attempted': goalkeeping_adv_full[20]},
            {'[Goal Kicks] Long Pass %': goalkeeping_adv_full[21]},
            {'[Goal Kicks] Avg Length (yards)': goalkeeping_adv_full[22]},
            {'---': '---'},
            {'[Crosses] Faced': goalkeeping_adv_full[23]},
            {'[Crosses] Stopped': goalkeeping_adv_full[24]},
            {'[Crosses] Stopped %': goalkeeping_adv_full[25]},
            {'---': '---'},
            {'Actions Outside Pen Area': goalkeeping_adv_full[26]},
            {'Avg Action Distance (yards)': goalkeeping_adv_full[28]},
        ]
        check_numeric_values(goalkeeping_adv_trimmed)
        player_stats[player_name]["goalkeeping_advanced"] = goalkeeping_adv_trimmed
    }
    return new Promise(resolve => {resolve(1)})
}

const fetchPlayerStats = async (fbref_id) => {
    console.log("\nStarted fetching player stats for club: " + fbref_id);

    
    const res = await axios.get(`https://fbref.com/en/squads/${fbref_id}/${year}/c9`);


    // firstly get list of players
    const table_for_name = await res.data.match(/<table class=".*" id="stats_shooting_9".*<\/table>/)
    await fetchPlayerNames(table_for_name[0])
    // shooting
    const shooting_table = await res.data.match(/<table class=".*" id="stats_shooting_9".*<\/table>/)
    await fetchPlayerShooting(shooting_table[0])
    // passing
    const passing_table = await res.data.match(/<table class=".*" id="stats_passing_9".*<\/table>/)
    await fetchPlayerPassing(passing_table[0])
    // pass types
    const pass_types_table = await res.data.match(/<table class=".*" id="stats_passing_types_9".*<\/table>/)
    await fetchPlayerPassTypes(pass_types_table[0])
    // goal and shot creation
    const goal_shot_creation_table = await res.data.match(/<table class=".*" id="stats_gca_9".*<\/table>/)
    await fetchPlayerGoalShotCreation(goal_shot_creation_table[0])
    // defensive actions
    const defensive_actions_table = await res.data.match(/<table class=".*" id="stats_defense_9".*<\/table>/)
    await fetchPlayerDefensiveActions(defensive_actions_table[0])
    // possession
    const possession_table = await res.data.match(/<table class=".*" id="stats_possession_9".*<\/table>/)
    await fetchPlayerPossession(possession_table[0])
    // miscelleneous
    const misc_table = await res.data.match(/<table class=".*" id="stats_misc_9".*<\/table>/)
    await fetchPlayerMisc(misc_table[0])
    // goalkeeping
    const goalkeeping_table = await res.data.match(/<table class=".*" id="stats_keeper_9".*<\/table>/)
    await fetchPlayerGoalkeeping(goalkeeping_table[0])
    // advanced goalkeeping
    const goalkeeping_adv_table = await res.data.match(/<table class=".*" id="stats_keeper_adv_9".*<\/table>/)
    await fetchPlayerGoalkeepingAdvanced(goalkeeping_adv_table[0])

    // console.log(player_stats)
    return player_stats;
}

export { fetchPlayerStats };