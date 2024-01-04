// This function fetches each club's statistics from FBREF,
// transforms it and adds it to Firestore

import axios from 'axios';
import { updateData } from "../firebase/firestore";
import { dataClubs } from "../fetchCloud";
import { useState } from 'react';

const year = '2023-2024'

function isNumeric(str) {
    if (typeof str != "string") return false // process strings only
    return !isNaN(str) && // use type corrcion to parse the _entirety_ of the string
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function check_numeric_values(stats) {
    for (const stat of stats) {
        if (!isNumeric(Object.values(stat)[0])) {
            if (Object.keys(stat)[0] === '---' || Object.keys(stat)[0] === 'Record (W-D-L)') {
                continue;
            }
            console.log("Non-numeric value found")
            console.log(stat);
        }
    }
}

const fetchGeneral = async (team_id) => {
    // General
    const res = await axios.get(`https://fbref.com/en/squads/${team_id}/${year}/matchlogs/c9/shooting`)
    const table = await res.data.match(/matchlogs_for.*<\/table>/)[0]
    const row = await table.match(/<tfoot.*?<\/tfoot>/)[0]

    const result = row.match(/data-stat="result".*?<\/td>/)[0].slice(20, -5)
    const goals_for = row.match(/data-stat="goals_for".*?<\/td>/)[0].slice(23, -5)
    const goals_against = row.match(/data-stat="goals_against".*?<\/td>/)[0].slice(27, -5)

    return [
        {'Record (W-D-L)': result},
        {'Goals For': goals_for},
        {'Goals Against': goals_against}
    ]
}

const fetchShooting = async (team_id) => {
    // Shooting
    const res = await axios.get(`https://fbref.com/en/squads/${team_id}/${year}/matchlogs/c9/shooting`)
    const table = await res.data.match(/matchlogs_for.*<\/table>/)[0]
    const row = await table.match(/<tfoot.*?<\/tfoot>/)[0]

    const shots = row.match(/data-stat="shots" >.*?<\/td>/)[0].slice(19, -5)
    const goals = row.match(/data-stat="goals" >.*?<\/td>/)[0].slice(19, -5)
    const shots_on_target = row.match(/data-stat="shots_on_target".*?<\/td>/)[0].slice(29, -5)
    const shots_on_target_pct = row.match(/data-stat="shots_on_target_pct".*?<\/td>/)[0].slice(33, -5)
    const goals_per_shot = row.match(/data-stat="goals_per_shot".*?<\/td>/)[0].slice(28, -5)
    const goals_per_shot_on_target = row.match(/data-stat="goals_per_shot_on_target".*?<\/td>/)[0].slice(38, -5)
    const average_shot_distance = row.match(/data-stat="average_shot_distance".*?<\/td>/)[0].slice(35, -5)
    const shots_free_kicks = row.match(/data-stat="shots_free_kicks".*?<\/td>/)[0].slice(30, -5)
    const pens_made = row.match(/data-stat="pens_made".*?<\/td>/)[0].slice(23, -5)
    const pens_att = row.match(/data-stat="pens_att".*?<\/td>/)[0].slice(22, -5)

    return [
        {'Shots': shots},
        {'Goals': goals},
        {'Shots On Target': shots_on_target},
        {'Shots On Target %': shots_on_target_pct},
        {'Goals / Shot': goals_per_shot},
        {'Goals / Shot On Target': goals_per_shot_on_target},
        {'Average Shot Distance': average_shot_distance},
        {'---': '---'},
        {'Shots From Free Kicks': shots_free_kicks},
        {'Penalty Kicks': pens_made},
        {'Penalty Kicks Attempted': pens_att}
    ]
}

const fetchPassing = async (team_id) => {
    // Passing
    const res = await axios.get(`https://fbref.com/en/squads/${team_id}/${year}/matchlogs/c9/passing`)
    const table = await res.data.match(/matchlogs_for.*<\/table>/)[0]
    const row = await table.match(/<tfoot.*?<\/tfoot>/)[0]

    const assists = row.match(/data-stat="assists".*?<\/td>/)[0].slice(21, -5)
    const passes_completed = row.match(/data-stat="passes_completed".*?<\/td>/)[0].slice(30, -5)
    const passes = row.match(/data-stat="passes".*?<\/td>/)[0].slice(20, -5)
    const passes_pct = row.match(/data-stat="passes_pct".*?<\/td>/)[0].slice(24, -5)
    const passes_completed_short = row.match(/data-stat="passes_completed_short".*?<\/td>/)[0].slice(36, -5)
    const passes_short = row.match(/data-stat="passes_short".*?<\/td>/)[0].slice(26, -5)
    const passes_pct_short = row.match(/data-stat="passes_pct_short".*?<\/td>/)[0].slice(30, -5)
    const passes_completed_medium = row.match(/data-stat="passes_completed_medium".*?<\/td>/)[0].slice(37, -5)
    const passes_medium = row.match(/data-stat="passes_medium".*?<\/td>/)[0].slice(27, -5)
    const passes_pct_medium = row.match(/data-stat="passes_pct_medium".*?<\/td>/)[0].slice(31, -5)
    const passes_completed_long = row.match(/data-stat="passes_completed_long".*?<\/td>/)[0].slice(35, -5)
    const passes_long = row.match(/data-stat="passes_long".*?<\/td>/)[0].slice(25, -5)
    const passes_pct_long = row.match(/data-stat="passes_pct_long".*?<\/td>/)[0].slice(29, -5)

    return [
        {'Assists': assists},
        {'---': '---'},
        {'[Total] Attempted': passes},
        {'[Total] Completed': passes_completed},
        {'[Total] Completion %': passes_pct},
        {'---': '---'},
        {'[Short] Attempted': passes_short},
        {'[Short] Completed': passes_completed_short},
        {'[Short] Completion %': passes_pct_short},
        {'---': '---'},
        {'[Medium] Attempted': passes_medium},
        {'[Medium] Completed': passes_completed_medium},
        {'[Medium] Completion %': passes_pct_medium},
        {'---': '---'},
        {'[Long] Attempted': passes_long},
        {'[Long] Completed': passes_completed_long},
        {'[Long] Completion %': passes_pct_long}
    ]
}

const fetchPassTypes = async (team_id) => {
    // Pass Types
    const res = await axios.get(`https://fbref.com/en/squads/${team_id}/${year}/matchlogs/c9/passing_types`)
    const table = await res.data.match(/matchlogs_for.*<\/table>/)[0]
    const row = await table.match(/<tfoot.*?<\/tfoot>/)[0]

    const passes_live = row.match(/data-stat="passes_live".*?<\/td>/)[0].slice(25, -5)
    const passes_dead = row.match(/data-stat="passes_dead".*?<\/td>/)[0].slice(25, -5)
    const passes_free_kicks = row.match(/data-stat="passes_free_kicks".*?<\/td>/)[0].slice(31, -5)
    const through_balls = row.match(/data-stat="through_balls".*?<\/td>/)[0].slice(27, -5)
    const passes_switches = row.match(/data-stat="passes_switches".*?<\/td>/)[0].slice(29, -5)
    const crosses = row.match(/data-stat="crosses".*?<\/td>/)[0].slice(21, -5)
    const throw_ins = row.match(/data-stat="throw_ins".*?<\/td>/)[0].slice(23, -5)
    const corner_kicks = row.match(/data-stat="corner_kicks".*?<\/td>/)[0].slice(26, -5)
    const passes_offsides = row.match(/data-stat="passes_offsides".*?<\/td>/)[0].slice(29, -5)
    const passes_blocked = row.match(/data-stat="passes_blocked".*?<\/td>/)[0].slice(28, -5)

    return [
        {'Live-ball Passes': passes_live},
        {'Dead-ball Passes': passes_dead},
        {'Free Kicks': passes_free_kicks},
        {'Through Balls': through_balls},
        {'Switches': passes_switches},
        {'Crosses': crosses},
        {'Throw-Ins': throw_ins},
        {'Corner Kicks': corner_kicks},
        {'Offsides': passes_offsides},
        {'Passes Blocked': passes_blocked},
    ]
}

const fetchGoalAndShotCreation = async (team_id) => {
    // Goal and Shot Creation
    const res = await axios.get(`https://fbref.com/en/squads/${team_id}/${year}/matchlogs/c9/gca`)
    const table = await res.data.match(/matchlogs_for.*<\/table>/)[0]
    const row = await table.match(/<tfoot.*?<\/tfoot>/)[0]

    const sca = row.match(/data-stat="sca".*?<\/td>/)[0].slice(17, -5)
    const sca_passes_live = row.match(/data-stat="sca_passes_live".*?<\/td>/)[0].slice(29, -5)
    const sca_passes_dead  = row.match(/data-stat="sca_passes_dead".*?<\/td>/)[0].slice(29, -5)
    const sca_take_ons = row.match(/data-stat="sca_take_ons".*?<\/td>/)[0].slice(26, -5)
    const sca_shots = row.match(/data-stat="sca_shots".*?<\/td>/)[0].slice(23, -5)
    const sca_fouled = row.match(/data-stat="sca_fouled".*?<\/td>/)[0].slice(24, -5)
    const sca_defense = row.match(/data-stat="sca_defense".*?<\/td>/)[0].slice(25, -5)
    const gca = row.match(/data-stat="gca".*?<\/td>/)[0].slice(17, -5)
    const gca_passes_live = row.match(/data-stat="gca_passes_live".*?<\/td>/)[0].slice(29, -5)
    const gca_passes_dead = row.match(/data-stat="gca_passes_dead".*?<\/td>/)[0].slice(29, -5)
    const gca_take_ons = row.match(/data-stat="gca_take_ons".*?<\/td>/)[0].slice(26, -5)
    const gca_shots = row.match(/data-stat="gca_shots".*?<\/td>/)[0].slice(23, -5)
    const gca_fouled = row.match(/data-stat="gca_fouled".*?<\/td>/)[0].slice(24, -5)
    const gca_defense = row.match(/data-stat="gca_defense".*?<\/td>/)[0].slice(25, -5)

    return [
        {'Shot Creating Actions': sca},
        {'[SCA] Live-Ball Passes': sca_passes_live},
        {'[SCA] Dead-Ball Passes': sca_passes_dead},
        {'[SCA] Take-Ons': sca_take_ons},
        {'[SCA] Shots': sca_shots},
        {'[SCA] Fouls': sca_fouled},
        {'[SCA] Defensive Actions': sca_defense},
        {'---': '---'},
        {'Goal Creating Actions': gca},
        {'[GCA] Live-Ball Passes': gca_passes_live},
        {'[GCA] Dead-Ball Passes': gca_passes_dead},
        {'[GCA] Take-Ons': gca_take_ons},
        {'[GCA] Shots': gca_shots},
        {'[GCA] Fouls': gca_fouled},
        {'[GCA] Defensive Actions': gca_defense},
    ]
}

const fetchDefensiveActions = async (team_id) => {
    // Defensive Actions
    const res = await axios.get(`https://fbref.com/en/squads/${team_id}/${year}/matchlogs/c9/defense`)
    const table = await res.data.match(/matchlogs_for.*<\/table>/)[0]
    const row = await table.match(/<tfoot.*?<\/tfoot>/)[0]
    
    const tackles = row.match(/data-stat="tackles".*?<\/td>/)[0].slice(21, -5)
    const tackles_won = row.match(/data-stat="tackles_won".*?<\/td>/)[0].slice(25, -5)
    const tackles_def_3rd = row.match(/data-stat="tackles_def_3rd".*?<\/td>/)[0].slice(29, -5)
    const tackles_mid_3rd = row.match(/data-stat="tackles_mid_3rd".*?<\/td>/)[0].slice(29, -5)
    const tackles_att_3rd = row.match(/data-stat="tackles_att_3rd".*?<\/td>/)[0].slice(29, -5)
    const challenges = row.match(/data-stat="challenges".*?<\/td>/)[0].slice(24, -5)
    const challenge_tackles = row.match(/data-stat="challenge_tackles".*?<\/td>/)[0].slice(31, -5)
    const challenge_tackles_pct = row.match(/data-stat="challenge_tackles_pct".*?<\/td>/)[0].slice(35, -5)
    const blocks = row.match(/data-stat="blocks".*?<\/td>/)[0].slice(20, -5)
    const blocked_shots = row.match(/data-stat="blocked_shots".*?<\/td>/)[0].slice(27, -5)
    const blocked_passes = row.match(/data-stat="blocked_passes".*?<\/td>/)[0].slice(28, -5)
    const interceptions = row.match(/data-stat="interceptions".*?<\/td>/)[0].slice(27, -5)
    const clearances = row.match(/data-stat="clearances".*?<\/td>/)[0].slice(24, -5)
    const errors = row.match(/data-stat="errors".*?<\/td>/)[0].slice(20, -5)

    return [
        {'[Tackles] Attempted': tackles},
        {'[Tackles] Won': tackles_won},
        {'[Tackles] Def 3rd': tackles_def_3rd},
        {'[Tackles] Mid 3rd': tackles_mid_3rd},
        {'[Tackles] Att 3rd': tackles_att_3rd},
        {'---': '---'},
        {'[Challenges] Attempted': challenges},
        {'[Challenges] Won': challenge_tackles},
        {'[Challenges] Won %': challenge_tackles_pct},
        {'---': '---'},
        {'[Blocks] Balls': blocks},
        {'[Blocks] Shots': blocked_shots},
        {'[Blocks] Passes': blocked_passes},
        {'---': '---'},
        {'Interceptions': interceptions},
        {'Clearances': clearances},
        {'Errors': errors},
    ]
}

const fetchPossession = async (team_id) => {
    // Possession
    const res = await axios.get(`https://fbref.com/en/squads/${team_id}/${year}/matchlogs/c9/possession`)
    const table = await res.data.match(/matchlogs_for.*<\/table>/)[0]
    const row = await table.match(/<tfoot.*?<\/tfoot>/)[0]

    const possession = row.match(/data-stat="possession".*?<\/td>/)[0].slice(24, -5)
    const touches = row.match(/data-stat="touches".*?<\/td>/)[0].slice(21, -5)
    const touches_def_pen_area = row.match(/data-stat="touches_def_pen_area".*?<\/td>/)[0].slice(34, -5)
    const touches_def_3rd = row.match(/data-stat="touches_def_3rd".*?<\/td>/)[0].slice(29, -5)
    const touches_mid_3rd = row.match(/data-stat="touches_mid_3rd".*?<\/td>/)[0].slice(29, -5)
    const touches_att_3rd = row.match(/data-stat="touches_att_3rd".*?<\/td>/)[0].slice(29, -5)
    const touches_att_pen_area = row.match(/data-stat="touches_att_pen_area".*?<\/td>/)[0].slice(34, -5)
    const take_ons = row.match(/data-stat="take_ons".*?<\/td>/)[0].slice(22, -5)
    const take_ons_won = row.match(/data-stat="take_ons_won".*?<\/td>/)[0].slice(26, -5)
    const take_ons_tackled = row.match(/data-stat="take_ons_tackled".*?<\/td>/)[0].slice(30, -5)
    const carries = row.match(/data-stat="carries".*?<\/td>/)[0].slice(21, -5)
    const carries_distance = row.match(/data-stat="carries_distance".*?<\/td>/)[0].slice(30, -5)
    const carries_progressive_distance = row.match(/data-stat="carries_progressive_distance".*?<\/td>/)[0].slice(42, -5)
    const progressive_carries = row.match(/data-stat="progressive_carries".*?<\/td>/)[0].slice(33, -5)
    const carries_into_final_third = row.match(/data-stat="carries_into_final_third".*?<\/td>/)[0].slice(38, -5)
    const carries_into_penalty_area = row.match(/data-stat="carries_into_penalty_area".*?<\/td>/)[0].slice(39, -5)
    const miscontrols = row.match(/data-stat="miscontrols".*?<\/td>/)[0].slice(25, -5)
    const dispossessed = row.match(/data-stat="dispossessed".*?<\/td>/)[0].slice(26, -5)
    const passes_received = row.match(/data-stat="passes_received".*?<\/td>/)[0].slice(29, -5)
    const progressive_passes_received = row.match(/data-stat="progressive_passes_received".*?<\/td>/)[0].slice(41, -5)

    return [
        {'Possession %': possession},
        {'---': '---'},
        {'Touches': touches},
        {'[Touches] Def Pen Area': touches_def_pen_area},
        {'[Touches] Def 3rd': touches_def_3rd},
        {'[Touches] Mid 3rd': touches_mid_3rd},
        {'[Touches] Att 3rd': touches_att_3rd},
        {'[Touches] Att Pen Area': touches_att_pen_area},
        {'---': '---'},
        {'[Take-Ons] Attempted': take_ons},
        {'[Take-Ons] Won': take_ons_won},
        {'[Take-Ons] Tackled': take_ons_tackled},
        {'---': '---'},
        {'Carries': carries},
        {'Total Distance (yards)': carries_distance},
        {'Progressive Distance (yards)': carries_progressive_distance},
        {'Progressive Carries': progressive_carries},
        {'Carries Into Att 3rd': carries_into_final_third},
        {'Carries Into Att Pen Area': carries_into_penalty_area},
        {'Miscontrols': miscontrols},
        {'Dispossessed': dispossessed},
        {'---': '---'},
        {'Passes Received': passes_received},
        {'Progressive Passes Received': progressive_passes_received},
    ]
}

const fetchGoalkeeping = async (team_id) => {
    // Goalkeeping
    const res = await axios.get(`https://fbref.com/en/squads/${team_id}/${year}/matchlogs/c9/keeper`)
    const table = await res.data.match(/matchlogs_for.*<\/table>/)[0]
    const row = await table.match(/<tfoot.*?<\/tfoot>/)[0]

    const gk_shots_on_target_against = row.match(/data-stat="gk_shots_on_target_against".*?<\/td>/)[0].slice(40, -5)
    const gk_goals_against = row.match(/data-stat="gk_goals_against".*?<\/td>/)[0].slice(30, -5)
    const gk_saves = row.match(/data-stat="gk_saves".*?<\/td>/)[0].slice(22, -5)
    const gk_save_pct = row.match(/data-stat="gk_save_pct".*?<\/td>/)[0].slice(25, -5)
    const gk_clean_sheets = row.match(/data-stat="gk_clean_sheets".*?<\/td>/)[0].slice(29, -5)

    const gk_passes_launched = row.match(/data-stat="gk_passes_launched".*?<\/td>/)[0].slice(32, -5)
    const gk_passes_completed_launched = row.match(/data-stat="gk_passes_completed_launched".*?<\/td>/)[0].slice(42, -5)
    const gk_passes_pct_launched = row.match(/data-stat="gk_passes_pct_launched".*?<\/td>/)[0].slice(36, -5)

    const gk_passes = row.match(/data-stat="gk_passes".*?<\/td>/)[0].slice(23, -5)
    const gk_passes_throws = row.match(/data-stat="gk_passes_throws".*?<\/td>/)[0].slice(30, -5)
    const gk_pct_passes_launched = row.match(/data-stat="gk_pct_passes_launched".*?<\/td>/)[0].slice(36, -5)
    const gk_passes_length_avg = row.match(/data-stat="gk_passes_length_avg".*?<\/td>/)[0].slice(34, -5)

    const gk_goal_kicks = row.match(/data-stat="gk_goal_kicks".*?<\/td>/)[0].slice(27, -5)
    const gk_pct_goal_kicks_launched = row.match(/data-stat="gk_pct_goal_kicks_launched".*?<\/td>/)[0].slice(40, -5)
    const gk_goal_kick_length_avg = row.match(/data-stat="gk_goal_kick_length_avg".*?<\/td>/)[0].slice(37, -5)

    const gk_crosses = row.match(/data-stat="gk_crosses".*?<\/td>/)[0].slice(24, -5)
    const gk_crosses_stopped = row.match(/data-stat="gk_crosses_stopped".*?<\/td>/)[0].slice(32, -5)
    const gk_crosses_stopped_pct = row.match(/data-stat="gk_crosses_stopped_pct".*?<\/td>/)[0].slice(36, -5)

    const gk_def_actions_outside_pen_area = row.match(/data-stat="gk_def_actions_outside_pen_area".*?<\/td>/)[0].slice(45, -5)
    const gk_avg_distance_def_actions = row.match(/data-stat="gk_avg_distance_def_actions".*?<\/td>/)[0].slice(41, -5)

    return [
        {'Shots On Target Against': gk_shots_on_target_against},
        {'Goals Against': gk_goals_against},
        {'Saves': gk_saves},
        {'Save %': gk_save_pct},
        {'Clean Sheets': gk_clean_sheets},
        {'---': '---'},
        {'[Long Pass] Attempted': gk_passes_launched},
        {'[Long Pass] Completed': gk_passes_completed_launched},
        {'[Long Pass] Completion %': gk_passes_pct_launched},
        {'---': '---'},
        {'[Passes] Attempted': gk_passes},
        {'[Passes] Throws': gk_passes_throws},
        {'[Passes] Long Pass %': gk_pct_passes_launched},
        {'[Passes] Avg Length (yards)': gk_passes_length_avg},
        {'---': '---'},
        {'[Goal Kicks] Attempted': gk_goal_kicks},
        {'[Goal Kicks] Long Pass %': gk_pct_goal_kicks_launched},
        {'[Goal Kicks] Avg Length (yards)': gk_goal_kick_length_avg},
        {'---': '---'},
        {'[Crosses] Faced': gk_crosses},
        {'[Crosses] Stopped': gk_crosses_stopped},
        {'[Crosses] Stopped %': gk_crosses_stopped_pct},
        {'---': '---'},
        {'Actions Outside Pen Area': gk_def_actions_outside_pen_area},
        {'Avg Action Distance (yards)': gk_avg_distance_def_actions},
    ]



}

const fetchMiscellaneous = async (team_id) => {
    // Miscellaneous
    const res = await axios.get(`https://fbref.com/en/squads/${team_id}/${year}/matchlogs/c9/misc`)
    const table = await res.data.match(/matchlogs_for.*<\/table>/)[0]
    const row = await table.match(/<tfoot.*?<\/tfoot>/)[0]

    const cards_yellow = row.match(/data-stat="cards_yellow".*?<\/td>/)[0].slice(26, -5)
    const cards_red = row.match(/data-stat="cards_red".*?<\/td>/)[0].slice(23, -5)
    const cards_yellow_red = row.match(/data-stat="cards_yellow_red".*?<\/td>/)[0].slice(30, -5)
    const fouls = row.match(/data-stat="fouls".*?<\/td>/)[0].slice(19, -5)
    const fouled = row.match(/data-stat="fouled".*?<\/td>/)[0].slice(20, -5)
    const offsides = row.match(/data-stat="offsides".*?<\/td>/)[0].slice(22, -5)

    const pens_won = row.match(/data-stat="pens_won".*?<\/td>/)[0].slice(22, -5)
    const pens_conceded = row.match(/data-stat="pens_conceded".*?<\/td>/)[0].slice(27, -5)
    const own_goals = row.match(/data-stat="own_goals".*?<\/td>/)[0].slice(23, -5)
    const ball_recoveries = row.match(/data-stat="ball_recoveries".*?<\/td>/)[0].slice(29, -5)

    const aerials_won = row.match(/data-stat="aerials_won".*?<\/td>/)[0].slice(25, -5)
    const aerials_lost = row.match(/data-stat="aerials_lost".*?<\/td>/)[0].slice(26, -5)
    const aerials_won_pct = row.match(/data-stat="aerials_won_pct".*?<\/td>/)[0].slice(29, -5)

    return [
        {'Yellow Cards': cards_yellow},
        {'Red Cards': cards_red},
        {'Second Yellow Cards': cards_yellow_red},
        {'Fouls Committed': fouls},
        {'Fouls Drawn': fouled},
        {'Offsides': offsides},
        {'---': '---'},
        {'Penalty Kicks Won': pens_won},
        {'Penalty Kicks Conceded': pens_conceded},
        {'Own Goals': own_goals},
        {'Ball Recoveries': ball_recoveries},
        {'---': '---'},
        {'Aerial Duels Won': aerials_won},
        {'Aerial Duels Lost': aerials_lost},
        {'Aerial Duels Won %': aerials_won_pct},
    ]
}

// club id in FBREF
club_id_by_name = ['18bb7c10', '8602292d', '4ba7cbea', 'cd051869', 'd07537b9',
                    '943e8050', 'cff3d9bb', '47c64c55', 'd3fd31cc', 'fd962109',
                    '822bd0ba', 'e297cd13', 'b8fd03ef', '19538871', 'b2b47a98',
                    'e4a775cb', '1df6b87e', '361ca564', '7c21e445', '8cec06e1']

const fetchClubStats = async () => {
    for (let i = 0; i < club_id_by_name.length; i++) {
        console.log(`Started fetching ${dataClubs[i].club.name_code}...`);
        
        const statsGeneral = await fetchGeneral(club_id_by_name[i]);
        const statsShooting = await fetchShooting(club_id_by_name[i]);
        const statsPassing = await fetchPassing(club_id_by_name[i]);
        const statsPassTypes = await fetchPassTypes(club_id_by_name[i]);
        const statsGoalAndShotCreation = await fetchGoalAndShotCreation(club_id_by_name[i]);
        const statsDefensiveActions = await fetchDefensiveActions(club_id_by_name[i]);
        const statsPossession = await fetchPossession(club_id_by_name[i]);
        const statsGoalkeeping = await fetchGoalkeeping(club_id_by_name[i]);
        const statsMiscellaneous = await fetchMiscellaneous(club_id_by_name[i]);
        
        const stats = {
            general: statsGeneral,
            shooting: statsShooting,
            passing: statsPassing,
            pass_types: statsPassTypes,
            goal_and_shot_creation: statsGoalAndShotCreation,
            defensive_actions: statsDefensiveActions,
            possession: statsPossession,
            goalkeeping: statsGoalkeeping,
            miscellaneous: statsMiscellaneous
        }

        for (const attribute in stats) {
            check_numeric_values(stats[attribute]);
        }

        updateData('clubs', dataClubs[i].club.name_full, {stats: stats});

        // wait 30 seconds per iteration, FBREF allows 40 requests per minute
        console.log(`Finished ${dataClubs[i].club.name_code}, waiting 30 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 30*1000));
    }
}

export { fetchClubStats };