import { X_RapidAPI_Key, X_RapidAPI_Host } from "../env.js";
import { uploadPlayerImage } from "../firebase/storage.js";
import { getClubs } from "../firebase/firestore.js";

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
        console.error("Error fetching image", error);
    }
}

const fetchPlayerImage = async () => {
    const start = new Date();
    const dataClubs = await getClubs();
    console.log("checkpoint:" + dataClubs.length)

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
    }
    const end = new Date();
    console.log("Time taken for fetchPlayerImage: ", (end - start) / 1000, "s");
}

export { fetchPlayerImage };