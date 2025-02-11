import Constants from "expo-constants";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { DetailsProps } from "./types";

export default async function getGeoCodeAddress({
  latitude,
  longitude,
  details,
}: {
  latitude?: number;
  longitude?: number;
  details?: DetailsProps;
}): Promise<GooglePlaceDetail> {
  const apiKey = Constants.expoConfig?.extra?.googlePlacesApiKey;

  const addressParts = [
    details?.address?.flatNo,
    details?.address.buildingNo,
    details?.address.area,
    details?.address.city,
    details?.address.state,
    details?.address.pincode,
  ].filter(Boolean);
  const formattedAddress = encodeURIComponent(addressParts.join(", "));

  const geocodeUrl =
    latitude || longitude
      ? `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      : `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    if (data.status === "OK") {
      const placeDetails = data.results[0];
      return placeDetails;
    } else return {} as GooglePlaceDetail;
  } catch (error) {
    console.error("Error fetching address:", error);
    return {} as GooglePlaceDetail;
  }
}
