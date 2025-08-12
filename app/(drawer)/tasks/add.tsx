import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { initDatabase } from '../../../lib/db';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const router = useRouter();

  const addTask = async () => {
    if (!title || !deadline) {
      Alert.alert('Boş sahə', 'Zəhmət olmasa başlıq və deadline daxil edin');
      return;
    }

    try {
      const db = await initDatabase();
      await db.runAsync(
        'INSERT INTO tasks (title, deadline, completed) VALUES (?, ?, 0)',
        title,
        deadline
      );
      router.back();
    } catch (error) {
      console.error('Tapşırıq əlavə edilərkən xəta:', error);
      Alert.alert('Xəta', 'Tapşırıq əlavə edilə bilmədi');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        ➕ Tapşırıq əlavə et
      </Text>

      <TextInput
        placeholder="Başlıq"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Deadline (YYYY‑MM‑DD)"
        value={deadline}
        onChangeText={setDeadline}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12 }}
      />

      <Button title="Əlavə et" onPress={addTask} />
    </View>
  );
}
