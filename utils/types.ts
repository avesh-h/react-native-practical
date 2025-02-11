import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

export type DetailsProps = {
  address: {
    flatNo: string | null;
    buildingNo?: string | undefined;
    area: string;
    city: string;
    state: string;
    pincode: string;
  };
  receiversDetails: {
    petName?: string | null | undefined;
    name: string;
    phone: string;
  };
};

export type CompleteAddress = {
  buildingName?: string | undefined;
  flatNo?: string | undefined;
  landmark?: string | undefined;
  savedAs?: string | undefined;
};

export type ReceiversDetails = {
  petName?: string | null | undefined;
  name: string;
  phone: string;
};

export type SavedAddress = {
  geocodeAddress: GooglePlaceDetail;
  address: CompleteAddress;
  receiversDetails: ReceiversDetails;
};
