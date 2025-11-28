import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Heart, Stethoscope, Users, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useUser } from '@/contexts/UserContext';

export default function HomeScreen() {
  const router = useRouter();
  const { isLoggedIn, user } = useUser();

  const mainOptions = [
    {
      title: 'Servicios',
      description: 'Descubre todos nuestros servicios médicos',
      icon: Stethoscope,
      color: Colors.primary,
      route: '/(services)',
    },
    {
      title: 'Doctores',
      description: 'Conoce a nuestro equipo médico',
      icon: Users,
      color: Colors.secondary,
      route: '/(doctors)',
    },
    {
      title: isLoggedIn ? 'Mi Perfil' : 'Iniciar Sesión',
      description: isLoggedIn 
        ? `Bienvenido, ${user?.pet.name || 'Usuario'}`
        : 'Accede a tu cuenta y servicios',
      icon: User,
      color: Colors.tertiary,
      route: '/(profile)',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Heart size={40} color={Colors.primary} fill={Colors.primary} />
          </View>
          <Text style={styles.title}>Fidooo</Text>
          <Text style={styles.subtitle}>
            Cuidado veterinario especializado para tu mejor amigo
          </Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80' }}
            style={styles.dogImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.cardsContainer}>
          {mainOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.card, { borderLeftColor: option.color }]}
                onPress={() => router.push(option.route as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: option.color + '15' }]}>
                  <Icon size={28} color={option.color} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{option.title}</Text>
                  <Text style={styles.cardDescription}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>¿Por qué elegirnos?</Text>
          <View style={styles.features}>
            {[
              'Equipo médico altamente calificado',
              'Tecnología de diagnóstico avanzada',
              'Atención 24/7 para emergencias',
              'Instalaciones modernas y cómodas',
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 52,
    fontWeight: '900' as const,
    color: Colors.text.primary,
    marginBottom: 8,
    letterSpacing: 1,
    fontFamily: Platform.select({
      ios: 'Snell Roundhand',
      android: 'cursive',
      web: '"Brush Script MT", "Lucida Handwriting", cursive',
    }),
    fontStyle: 'italic' as const,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    maxWidth: 300,
  },
  dogImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginTop: 20,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderLeftWidth: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  infoSection: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  features: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  featureText: {
    fontSize: 15,
    color: Colors.text.secondary,
    flex: 1,
  },
});
