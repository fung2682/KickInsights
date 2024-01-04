import { X_RapidAPI_Key, X_RapidAPI_Host } from "@env"
import { uploadPlayerImage } from "../firebase/storage";
import { dataClubs } from "../fetchCloud";

const fetchImage = async (player_id) => {
    const url = `https://footapi7.p.rapidapi.com/api/player/${player_id}/image`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': X_RapidAPI_Key,
            'X-RapidAPI-Host': X_RapidAPI_Host
        }
    };
    try {
        const res = await fetch(url, options).then(response => response.blob())
        return res;
    } catch (error) {
        console.error(error);
    }
}

const fetchPlayerImage = async () => {
    for (let i = 0; i < dataClubs.length; i++) {
        const club_name = dataClubs[i].club.name_full;
        const players = dataClubs[i].club.players;
        for (let j = 0; j < players.length; j++) {
            const player_id = players[j].Footapi_id;

            // check if player already has an image
            if (players[j].image !== "") {
                continue;
            }

            console.log(`[FootApi] Fetching image for ${club_name} ${player_id}`);

            let image;
            try {
                image = await fetchImage(player_id);
            } catch (error) {
                console.log("Error fetching image", club_name, player_id);
            }
            //console.log("image type: ", image.type)
            uploadPlayerImage(image, club_name, player_id);
            // FootApi allows 4 requests per second
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        // console.log('\n');
    }
}

export { fetchPlayerImage };