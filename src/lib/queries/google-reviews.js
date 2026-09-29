export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn('Google Places API key or Place ID is missing. Returning empty reviews array.');
    return [];
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
    
    // We use next: { revalidate: 86400 } to cache the result for 24 hours (86400 seconds)
    // This prevents hitting the Google Places API limits and keeps the page extremely fast.
    const res = await fetch(url, { next: { revalidate: 86400 } });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch Google Reviews: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.result || !data.result.reviews) {
      return [];
    }

    // Map Google review format to our TestimonialCard format
    return data.result.reviews.map((review, index) => ({
      id: `google-review-${index}`,
      student_name: review.author_name,
      photo_url: review.profile_photo_url,
      rating: review.rating,
      review: review.text,
      course: 'Google Review',
      time: review.time // Unix timestamp if needed later
    }));

  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    return [];
  }
}
