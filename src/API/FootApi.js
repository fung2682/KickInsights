// This function fetches the League Table (All) from  FootApi, transforms it and adds it to Firestore
import { addData, setData } from "../firebase/firestore";

const fetchAllTables = async () => {
    const url = 'https://footapi7.p.rapidapi.com/api/tournament/17/season/52186/standings/total';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2d38569861mshff35f4f34de88e4p1ff015jsn6729c1c3f3d0',
            'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
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
    const tempTable = inputTable.map((club) => {
        return {
            clubFullName: club.team.name,
            clubShortName: club.team.nameCode,
            clubID: club.team.id,
            clubPosition: club.position,
            clubPlayed: club.matches,
            clubWin: club.wins,
            clubDraw: club.draws,
            clubLoss: club.losses,
            clubGF: club.scoresFor,
            clubGA: club.scoresAgainst,
            clubPts: club.points,
        }
    });

    // add the goal difference to the table
    const newTable = tempTable.map((club) => {
        return {
            ...club,
            clubGD: club.clubGF - club.clubGA
        }
    });

    console.log(newTable);

    // add the table to Firestore
    setData('league_tables', 'all', {newTable});
}

export { fetchAllTables };