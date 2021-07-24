async function getHunt() {
    try {
        let response = await fetch('api/v1/hunt');
        let hunts = await response.json();

        return hunts;
    }
    catch (err) {
        console.log(`Get hunts failed`, err);
    }
}

export default getHunt;