export const getClues = async (huntid) => {
    try {
        let response = await fetch(`/api/v1/clue/${huntid}`);
        let clues = await response.json();

        return clues;
    }
    catch (err) {
        console.error(`Get clues for hunt ${huntid} failed`, err);
        throw err;
    }
};

export const getClue = async (clueid) => {
    try {
        let response = await fetch(`/api/v1/clue/getclue/${clueid}`);
        let clue = await response.json();

        return clue;
    }
    catch (err) {
        console.error(`Getting clue ${clueid} failed.`, err);
        throw err;
    }
};