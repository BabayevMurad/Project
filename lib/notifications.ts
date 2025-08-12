import { Alert } from 'react-native';

export async function scheduleLocalNotification(
  title: string,
  body: string,
  seconds = 5
) {
  Alert.alert('📢 Bildiriş', `${title}\n\n${body}`);
}
