import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { deleteNote, getNoteById, Note } from '../../../lib/storage';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    getNoteById(id!)
      .then((res) => {
        if (res) {
          setNote(res);
        } else {
          Alert.alert('Xəta', 'Qeyd tapılmadı');
          router.back();
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Xəta', 'Qeyd yüklənmədi');
        router.back();
      });
  }, [id]);

  const handleDelete = async () => {
    Alert.alert('Silmək?', 'Qeydi silmək istədiyinizə əminsiniz?', [
      { text: 'İmtina' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: async () => {
          await deleteNote(id!);
          router.back();
        },
      },
    ]);
  };

  if (!note) return null;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{note.title}</Text>
      <Text style={{ marginVertical: 12 }}>{note.content}</Text>
      <Text style={{ color: '#6b7280' }}>{note.createdAt}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="🗑️ Sil" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}
