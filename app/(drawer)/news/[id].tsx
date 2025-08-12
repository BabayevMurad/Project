import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getNewsById, News } from '../../../lib/news';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<News | null>(null);

  useEffect(() => {
    if (id) {
      getNewsById(Number(id)).then(data => {
        setNewsItem(data ?? null);
      });
    }
  }, [id]);

  if (!newsItem) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>{newsItem.title}</Text>
      <Text style={{ fontSize: 16, lineHeight: 24 }}>{newsItem.body}</Text>
    </View>
  );
}
