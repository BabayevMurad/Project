import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { addNote, Note } from '../../../lib/storage';

export default function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!title || !content) {
      Alert.alert('Boş sahə', 'Zəhmət olmasa başlıq və məzmun daxil edin');
      return;
    }

    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toLocaleString(),
    };

    await addNote(newNote);
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Yeni Qeyd</Text>
      <TextInput
        placeholder="Başlıq"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Məzmun"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
        style={{ borderWidth: 1, padding: 10, marginBottom: 12, height: 100 }}
      />
      <Button title="Əlavə et" onPress={handleAdd} />
    </View>
  );
}
