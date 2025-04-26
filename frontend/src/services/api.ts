import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export interface City {
  id?: string;
  name: string;
}

export const api = {
  // Cities endpoints
  getCities: async (): Promise<City[]> => {
    const response = await axios.get(`${API_BASE_URL}/cities`);
    return response.data;
  },

  addCity: async (city: City): Promise<City> => {
    const response = await axios.post(`${API_BASE_URL}/cities`, city);
    return response.data;
  },

  deleteCity: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/cities/${id}`);
  },

  // Weather endpoints
  getRawWeather: async (
    city: string,
    from: string,
    to: string
  ): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/weather/raw`, {
      params: { city, from, to },
    });
    return response.data;
  },

  getAverageWeather: async (
    city: string,
    from: string,
    to: string
  ): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/weather/average`, {
      params: { city, from, to },
    });
    return response.data;
  },
};
