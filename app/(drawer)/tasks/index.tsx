import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { initDatabase } from '../../../lib/db';

interface Task {
  id: number;
  title: string;
  deadline: string;
  completed: number;
}

export default function TasksListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const loadTasks = async () => {
    try {
      const db = await initDatabase();
      const rows = await db.getAllAsync<Task>('SELECT * FROM tasks');
      setTasks(rows);
    } catch (err) {
      console.error('Yükləmə xətası:', err);
    }
  };

  const toggleComplete = async (id: number, current: number) => {
    try {
      const db = await initDatabase();
      await db.runAsync(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        current ? 0 : 1,
        id
      );
      await loadTasks();
    } catch (err) {
      console.error('Toggle xəta:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
        📝 Tapşırıqlar
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleComplete(item.id, item.completed)}
            onLongPress={() => router.push(`/tasks/${item.id}`)}
            style={{
              padding: 12,
              backgroundColor: item.completed ? '#d1fae5' : '#f9fafb',
              marginBottom: 8,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textDecorationLine: item.completed ? 'line-through' : 'none',
              }}
            >
              {item.title}
            </Text>
            <Text style={{ color: '#6b7280' }}>{item.deadline}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push('/tasks/add')}
        style={{
          backgroundColor: '#10b981',
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 45,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>➕ Yeni Tapşırıq</Text>
      </TouchableOpacity>
    </View>
  );
}
