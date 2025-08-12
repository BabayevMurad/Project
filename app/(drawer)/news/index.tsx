import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Link } from 'expo-router';
import { fetchNews, getCachedNews, News } from '../../../lib/news';

export default function NewsListScreen() {
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadNews = async (nextPage = 1) => {
    try {
      setLoading(true);
      const data = await fetchNews(nextPage);
      setNews(prev => (nextPage === 1 ? data : [...prev, ...data]));
      setHasMore(data.length > 0);
      setPage(nextPage);
    } catch (e) {
      Alert.alert('Xəta', 'Offline rejimdə göstərilir');
      const cached = await getCachedNews();
      setNews(cached);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      loadNews(page + 1);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>📰 Xəbərlər</Text>

      <FlatList
        data={news}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/news/${item.id}`} asChild>
            <TouchableOpacity style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
              <Text numberOfLines={2} style={{ color: '#666' }}>{item.body}</Text>
            </TouchableOpacity>
          </Link>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
      />
    </View>
  );
}
