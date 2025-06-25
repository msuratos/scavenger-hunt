import axios from 'axios';

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

export async function uploadItemPicture(file, huntId, itemId, onProgress) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('itemId', itemId);

  try {
    const response = await axios.post(`/api/v1/player/item?huntId=${huntId}`, formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to upload item picture');
    }

    return true;
  }
  catch (err) {
    console.error('Failed to upload item picture', err);
    throw err;
  }
}