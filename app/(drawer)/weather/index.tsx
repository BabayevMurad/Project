import React, { useState } from 'react';
import { Alert, Button, Image, Text, TextInput, View } from 'react-native';
import { fetchWeather, getCachedWeather, WeatherData } from '../../../lib/weather';


export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return Alert.alert('Şəhər adı boş ola bilməz');
    try {
      setLoading(true);
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      Alert.alert('Xəta baş verdi', 'İnternet yoxdur və ya şəhər tapılmadı');
      const cached = await getCachedWeather();
      if (cached) {
        Alert.alert('Offline məlumat göstərilir');
        setWeather(cached);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>🌦️ Hava Məlumatı</Text>

      <TextInput
        placeholder="Şəhəri daxil et"
        value={city}
        onChangeText={setCity}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
      />

      <Button title="Axtar" onPress={handleSearch} disabled={loading} />

      {weather && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{weather.city}</Text>
          <Image source={{ uri: weather.icon }} style={{ width: 100, height: 100 }} />
          <Text style={{ fontSize: 18 }}>{weather.temp}°C</Text>
          <Text style={{ fontSize: 16, color: '#555' }}>{weather.description}</Text>
          <Text style={{ marginTop: 10, fontSize: 12, color: '#888' }}>
            Son yeniləmə: {weather.cachedAt}
          </Text>
        </View>
      )}
    </View>
  );
}
