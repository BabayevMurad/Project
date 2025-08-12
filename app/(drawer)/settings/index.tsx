import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Button, Switch, Text, View } from 'react-native';
import { useThemeContext } from '../../../lib/context/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeContext();
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Çıxış edildi', 'Tətbiq sıfırlandı');
    router.replace('/profile');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>⚙️ Ayarlar</Text>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16 }}>Tema: {theme === 'light' ? 'İşıqlı' : 'Qaranlıq'}</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          style={{ marginTop: 10 }}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="🚪 Çıxış et (Logout)" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}
