import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const modules = [
  { id: '1', title: '✅ Tapşırıqlar', route: '/(drawer)/tasks' },
  { id: '2', title: '📝 Qeydlər', route: '/(drawer)/notes' },
  { id: '3', title: '☁️ Hava', route: '/(drawer)/weather' },
  { id: '4', title: '📰 Xəbərlər', route: '/(drawer)/news' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Salam, xoş gəlmisiniz!
      </Text>

      <FlatList
        data={modules}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(item.route as any)}
            style={{
              padding: 20,
              marginBottom: 15,
              backgroundColor: '#e0e0e0',
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
