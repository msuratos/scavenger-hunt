export async function createHunt(values) {
    try {
        const response = await fetch('api/v1/hunt', { method: 'POST', body: JSON.stringify(values), headers: { 'Content-Type': 'application/json' }});
        const hunt = await response.json();

        return hunt;
    }
    catch (err) {
        console.error('Creating hunt failed', err);
        throw err;
    }
}

export async function getHunt() {
    try {
        let response = await fetch('api/v1/hunt');
        let hunts = await response.json();

        return hunts;
    }
    catch (err) {
        console.error(`Get hunts failed`, err);
        throw err;
    }
}