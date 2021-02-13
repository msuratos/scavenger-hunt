import getApiUrl from "../config/serviceConfig";

async function getCluesService(huntid) {
    try {
        let response = await fetch(`${getApiUrl()}/api/v1/clue/${huntid}`);
        let clues = await response.json();

        return clues;
    }
    catch (err) {
        console.log(`Get clues for hunt ${huntid} failed`, err);
    }
}

async function getClueService(clueid) {
    try {
        let response = await fetch(`${getApiUrl()}/api/v1/clue/getclue/${clueid}`);
        let clue = await response.json();

        return clue;
    }
    catch (err) {
        console.log(`Getting clue ${clueid} failed.`, err);
    }
}

export const getClues = getCluesService;
export const getClue = getClueService;