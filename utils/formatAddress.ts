import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { DetailsProps } from "./types";

export function formatAddress(details: GooglePlaceDetail) {
  const { address_components } = details;
  const filteredComponents = address_components.filter(
    (component) => !component.types.includes("plus_code")
  );

  const longNames = filteredComponents.map((component) => component.long_name);

  const uniqueWords: Array<string> = [];
  const wordSet = new Set();

  longNames.forEach((name) => {
    if (!wordSet.has(name)) {
      wordSet.add(name);
      uniqueWords.push(name);
    }
  });

  return uniqueWords.join(", ");
}

export function formatAddedAddress(details: DetailsProps): string {
  const { address } = details;
  const parts = [
    address.flatNo,
    address.buildingNo,
    address.area,
    address.city,
    address.state,
    address.pincode,
  ];

  // Filter out null, undefined, and empty strings, then join with commas
  return parts.filter((part) => part).join(", ");
}
