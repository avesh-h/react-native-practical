import Constants from "expo-constants";

export default async function getGeoCodeAddress({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const apiKey = Constants.expoConfig?.extra?.googlePlacesApiKey;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    if (data.status === "OK") {
      const placeDetails = data.results[0];
      return placeDetails;
    }
  } catch (error) {
    console.error("Error fetching address:", error);
  }
}
