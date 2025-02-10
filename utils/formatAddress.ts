import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

export function formatAddress(details: GooglePlaceDetail) {
  const { address_components } = details;
  // Filter out entries with type 'plus_code'
  const filteredComponents = address_components.filter(
    (component) => !component.types.includes("plus_code")
  );

  // Extract long_names
  const longNames = filteredComponents.map((component) => component.long_name);

  // Remove duplicate words
  const uniqueWords: Array<string> = [];
  const wordSet = new Set();

  longNames.forEach((name) => {
    if (!wordSet.has(name)) {
      wordSet.add(name);
      uniqueWords.push(name);
    }
  });

  // Return as comma-separated string
  return uniqueWords.join(", ");
}
