export const getClues = async (huntid) => {
    try {
        let response = await fetch(`/api/v1/clue/${huntid}`);
        let clues = await response.json();

        return clues;
    }
    catch (err) {
        console.log(`Get clues for hunt ${huntid} failed`, err);
    }
};

export const getClue = async (clueid) => {
    try {
        let response = await fetch(`/api/v1/clue/getclue/${clueid}`);
        let clue = await response.json();

        return clue;
    }
    catch (err) {
        console.log(`Getting clue ${clueid} failed.`, err);
    }
};