class clueService {
    async getClues(huntid) {
        try {
            var response = await fetch(`/api/v1/clue/${huntid}`);
        }
        catch (err) {
            console.log(`Get clues for hunt ${huntid} failed`, err);
        }
    }
}

export default clueService;