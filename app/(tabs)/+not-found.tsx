import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Colors from '@/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Página no encontrada" }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.message}>Esta página no existe</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Volver al inicio</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 72,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    color: Colors.text.secondary,
    marginBottom: 24,
  },
  link: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  linkText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
