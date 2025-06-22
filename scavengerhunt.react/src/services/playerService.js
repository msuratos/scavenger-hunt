export async function getItemsForPlayer(huntId) {
  try {
    const response = await fetch(`/api/v1/player/items?huntId=${huntId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch item for player');
    }
    return await response.json();
  }
  catch (err) {
    console.error('Failed to get item for player', err);
    throw err;
  }
}

export async function getPlayer(huntId) {
  try {
    const response = await fetch(`/api/v1/player/details?huntId=${huntId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch player details');
    }
    return await response.json();
  }
  catch (err) {
    console.error('Failed to get player details', err);
    throw err;
  }
}

export async function isPlayerValid() {
  try {
    const response = await fetch('/api/v1/player/isvalid');
    return response.ok;
  }
  catch (err) {
    console.error('Failed to determine player\'s validity');
    return false;
  }
}