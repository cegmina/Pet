import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function ServicesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.text.primary,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[serviceId]"
        options={{
          title: 'Detalle del Servicio',
          headerBackTitle: 'Servicios',
        }}
      />
    </Stack>
  );
}
