export async function getPlayerImage(huntId, lastFetchedDate) {
  try {
    const response = await fetch(`/api/v1/dashboard/playerimages?huntId=${huntId}${lastFetchedDate ? `&lastFetchedDate=${lastFetchedDate}` : ''}`);
    if (!response.ok) {
      throw new Error('Failed to fetch player images');
    }

    if (response.ok) {
      if (response.status === 204) {
        // No new images available
        return null;
      }

      const data = await response.json();
      return data;      
    }

    throw new Error(`Unexpected response status: ${await response.text()}`);
  } catch (error) {
    console.error('Error fetching player images:', error);
    throw error;
  }
}