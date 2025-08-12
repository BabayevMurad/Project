import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { deleteNote, getNotes, Note } from '../../../lib/storage';

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  const loadNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    loadNotes();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        onPress={() => router.push('/(drawer)/notes/add')}
        style={{
          backgroundColor: '#10b981',
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Yeni Qeyd</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/(drawer)/notes/${item.id}`)}
            style={{
              padding: 12,
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>{item.createdAt}</Text>

            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={{
                backgroundColor: '#ef4444',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
                marginTop: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>Sil</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
