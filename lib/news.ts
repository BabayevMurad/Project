import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface News {
  id: number;
  title: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const NEWS_KEY = 'news_cache';

export const fetchNews = async (page: number, limit = 10): Promise<News[]> => {
  const res = await axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);
  const news: News[] = res.data;

  // AsyncStorage-də backup saxla
  if (page === 1) {
    await AsyncStorage.setItem(NEWS_KEY, JSON.stringify(news));
  }

  return news;
};

export const getCachedNews = async (): Promise<News[]> => {
  const cached = await AsyncStorage.getItem(NEWS_KEY);
  return cached ? JSON.parse(cached) : [];
};

export const getNewsById = async (id: number): Promise<News | undefined> => {
  const allNews = await getCachedNews();
  return allNews.find(n => n.id === id);
};
