import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.PODCASTR_API_URL
})