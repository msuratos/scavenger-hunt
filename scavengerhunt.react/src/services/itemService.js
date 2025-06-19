export const getItems = async (huntid) => {
    try {
        const response = await fetch(`/api/v1/item/${huntid}`);
        const items = await response.json();

        return items;
    }
    catch (err) {
        console.error(`Getting items for hunt ${huntid} failed`, err);
        throw err;
    }
};

export const getItem = async (itemid) => {
    try {
        const response = await fetch(`/api/v1/item/getitem/${itemid}`);
        const item = await response.json();

        return item;
    }
    catch (err) {
        console.error(`Getting item ${itemid} failed.`, err);
        throw err;
    }
};