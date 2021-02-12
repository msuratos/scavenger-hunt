import getApiUrl from "../config/serviceConfig";

async function getClues(huntid) {
    try {
        let response = await fetch(`${getApiUrl()}/api/v1/clue/${huntid}`);
        let clues = await response.json();
        console.log(`Clues for hunt ${huntid}`, clues);

        return clues;
    }
    catch (err) {
        console.log(`Get clues for hunt ${huntid} failed`, err);
    }
}

export default getClues;