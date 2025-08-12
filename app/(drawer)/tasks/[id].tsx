import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { initDatabase } from '../../../lib/db';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const db = await initDatabase();
        const row = await db.getFirstAsync<{ title: string; deadline: string }>(
          'SELECT title, deadline FROM tasks WHERE id = ?',
          [Number(id)]
        );
        if (row) {
          setTitle(row.title);
          setDeadline(row.deadline);
        } else {
          Alert.alert('Xəta', 'Tapşırıq tapılmadı');
        }
      } catch (err) {
        console.error(err);
        Alert.alert('Xəta', 'Tapşırıq yüklənmədi');
      }
    };
    load();
  }, [id]);

  const updateTask = async () => {
    try {
      const db = await initDatabase();
      await db.runAsync(
        'UPDATE tasks SET title = ?, deadline = ? WHERE id = ?',
        [title, deadline, Number(id)]
      );
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert('Xəta', 'Tapşırıq yenilənmədi');
    }
  };

  const deleteTask = async () => {
    try {
      const db = await initDatabase();
      await db.runAsync('DELETE FROM tasks WHERE id = ?', [Number(id)]);
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert('Xəta', 'Tapşırıq silinmədi');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>✏️ Tapşırıq Detalları</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Başlıq"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        value={deadline}
        onChangeText={setDeadline}
        placeholder="Deadline (YYYY‑MM‑DD)"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button title="Yadda saxla" onPress={updateTask} />
      <View style={{ height: 10 }} />
      <Button title="🗑️ Sil" color="red" onPress={deleteTask} />
    </View>
  );
}
