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