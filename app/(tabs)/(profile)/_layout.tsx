import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function ProfileLayout() {
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
        name="login"
        options={{
          title: 'Iniciar Sesión',
          headerBackTitle: 'Atrás',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Registrarse',
          headerBackTitle: 'Atrás',
        }}
      />
      <Stack.Screen
        name="my-services"
        options={{
          title: 'Mis Servicios',
          headerBackTitle: 'Perfil',
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          title: 'Pago',
          headerBackTitle: 'Servicios',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
