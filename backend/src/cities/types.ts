export type GeocodingResponse = {
  results: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }[];
};
