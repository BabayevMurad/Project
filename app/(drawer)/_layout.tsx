import { Drawer } from 'expo-router/drawer';

const visibleScreens = [
  { name: "home/index", label: "🏠 Ana Səhifə", title: "SmartLife+" },
  { name: "profile/index", label: "👤 Profil", title: "Profil" },
  { name: "settings/index", label: "⚙️ Ayarlar", title: "Ayarlar" }
];

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerTitleAlign: 'center',
        drawerType: 'slide',
      }}
    >
      {visibleScreens.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          options={{
            drawerLabel: screen.label,
            title: screen.title,
          }}
        />
      ))}

      <Drawer.Screen
        name="notes/add"
        options={{ drawerItemStyle: { display: 'none' }, title: "Qeyd əlavə et" }}
      />
      <Drawer.Screen
        name="tasks/add"
        options={{ drawerItemStyle: { display: 'none' }, title: "Tapşırıq əlavə et" }}
      />
      <Drawer.Screen
        name="notes/index"
        options={{ drawerItemStyle: { display: 'none' }, title: "Qeydlər" }}
      />
      <Drawer.Screen
        name="tasks/index"
        options={{ drawerItemStyle: { display: 'none' }, title: "Tapşırıqlar" }}
      />
      <Drawer.Screen
        name="news/index"
        options={{ drawerItemStyle: { display: 'none' }, title: "Xəbərlər" }}
      />
      <Drawer.Screen
        name="weather/index"
        options={{ drawerItemStyle: { display: 'none' }, title: "Hava proqnozu" }}
      />
      <Drawer.Screen
        name="notes/[id]"
        options={{ drawerItemStyle: { display: 'none' }, title: "Qeyd detayı" }}
      />
      <Drawer.Screen
        name="tasks/[id]"
        options={{ drawerItemStyle: { display: 'none' }, title: "Tapşırıq detayı" }}
      />
      <Drawer.Screen
        name="news/[id]"
        options={{ drawerItemStyle: { display: 'none' }, title: "Xəbər detayı" }}
      />
    </Drawer>
  );
}
