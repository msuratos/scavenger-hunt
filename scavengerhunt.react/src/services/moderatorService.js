import axios from 'axios';

export async function getNextPendingImage() {
  try {
    const response = await axios.get("/api/v1/moderator/next");
    return response.data || null;
  }
  catch (error) {
    console.error("Error fetching next item:", error);
    throw error;
  }
}

export async function submitReview(reviewData) {
  try {
    const response = await axios.post("/api/v1/moderator/review", reviewData);
    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
}