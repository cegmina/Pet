import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { services } from '@/mocks/services';
import { 
  Scan, Activity, Scissors, Smile, Bed, Droplet, 
  Syringe, Pill, Siren, ScissorsLineDashed, Stethoscope,
  HeartPulse, Dumbbell, Clock, DollarSign
} from 'lucide-react-native';

const iconMap: Record<string, any> = {
  scan: Scan,
  activity: Activity,
  scissors: Scissors,
  bone: Activity,
  smile: Smile,
  bed: Bed,
  droplet: Droplet,
  syringe: Syringe,
  pill: Pill,
  siren: Siren,
  'scissors-line-dashed': ScissorsLineDashed,
  stethoscope: Stethoscope,
  'heart-pulse': HeartPulse,
  dumbbell: Dumbbell,
};

export default function ServiceDetailScreen() {
  const { serviceId } = useLocalSearchParams();
  const router = useRouter();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Servicio no encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const Icon = iconMap[service.icon] || Stethoscope;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Stack.Screen options={{ title: service.name }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <View style={[styles.iconCircle, { backgroundColor: Colors.primary + '15' }]}>
            <Icon size={48} color={Colors.primary} />
          </View>
          <Text style={styles.serviceName}>{service.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>

        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <DollarSign size={20} color={Colors.primary} />
            </View>
            <Text style={styles.infoLabel}>Precio</Text>
            <Text style={styles.infoValue}>Bs. {service.price}</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Clock size={20} color={Colors.secondary} />
            </View>
            <Text style={styles.infoLabel}>Duración</Text>
            <Text style={styles.infoValue}>{service.duration}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Qué incluye?</Text>
          <View style={styles.includesList}>
            {[
              'Consulta con especialista',
              'Uso de equipo médico especializado',
              'Informe detallado de resultados',
              'Seguimiento post-servicio',
            ].map((item, index) => (
              <View key={index} style={styles.includeItem}>
                <View style={styles.includeDot} />
                <Text style={styles.includeText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendaciones</Text>
          <View style={styles.recommendationsBox}>
            <Text style={styles.recommendationText}>
              • Agenda tu cita con anticipación{'\n'}
              • Trae el carnet de vacunación de tu mascota{'\n'}
              • Ayuno previo de 8 horas para análisis de sangre{'\n'}
              • Pregunta por nuestros planes de pago
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push('/(profile)' as any)}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Agendar Servicio</Text>
        </TouchableOpacity>
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
  heroSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  infoCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  includesList: {
    gap: 12,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  includeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  includeText: {
    fontSize: 15,
    color: Colors.text.secondary,
    flex: 1,
  },
  recommendationsBox: {
    backgroundColor: Colors.tertiary + '10',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.tertiary,
  },
  recommendationText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  bookButton: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
});
