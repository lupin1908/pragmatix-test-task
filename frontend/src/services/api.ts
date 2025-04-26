import axios from "axios";

export interface City {
  id?: string;
  name: string;
}

export const api = {
  // Cities endpoints
  getCities: async (): Promise<City[]> => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/cities`);
    return response.data;
  },

  addCity: async (city: City): Promise<City> => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/cities`,
      city
    );
    return response.data;
  },

  deleteCity: async (id: string): Promise<void> => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/cities/${id}`);
  },

  // Weather endpoints
  getRawWeather: async (
    city: string,
    from: string,
    to: string
  ): Promise<any> => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/weather/raw`,
      {
        params: { city, from, to },
      }
    );
    return response.data;
  },

  getAverageWeather: async (
    city: string,
    from: string,
    to: string
  ): Promise<any> => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_URL}/weather/average`,
      {
        params: { city, from, to },
      }
    );
    return response.data;
  },
};
