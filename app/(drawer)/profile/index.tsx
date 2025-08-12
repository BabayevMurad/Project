import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useUser } from '../../../lib/context/UserContext';

export default function ProfileScreen() {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSave = () => {
    if (!name) return Alert.alert('Ad boş ola bilməz!');
    setUser({ name, bio, avatar });
    Alert.alert('Profil yadda saxlandı ✅');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>👤 Profil Məlumatları</Text>

      <Text style={{ marginTop: 16 }}>Ad:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ad daxil et"
        style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
      />

      <Text style={{ marginTop: 12 }}>Bio:</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Haqqında"
        style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
      />

      <Text style={{ marginTop: 12 }}>Avatar (Emoji):</Text>
      <TextInput
        value={avatar}
        onChangeText={setAvatar}
        placeholder="🙂"
        style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Yadda Saxla" onPress={handleSave} />
      </View>
    </View>
  );
}
