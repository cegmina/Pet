import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DollarSign, FileCheck, Clock, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useUser } from '@/contexts/UserContext';

export default function MyServicesScreen() {
  const router = useRouter();
  const { userServices, getTotalPending } = useUser();

  const totalPending = getTotalPending();
  const pendingServices = userServices.filter(s => s.status === 'pending' || s.status === 'completed');
  const paidServices = userServices.filter(s => s.status === 'paid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return Colors.success;
      case 'pending':
        return Colors.warning;
      case 'paid':
        return Colors.tertiary;
      default:
        return Colors.text.light;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Pendiente';
      case 'paid':
        return 'Pagado';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {totalPending > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Pendiente</Text>
            <Text style={styles.summaryAmount}>Bs. {totalPending}</Text>
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => router.push('/profile/payment')}
              activeOpacity={0.8}
            >
              <Text style={styles.payButtonText}>Pagar Ahora</Text>
              <ChevronRight size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}

        {pendingServices.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios por Pagar</Text>
            {pendingServices.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.serviceName}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(service.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(service.status) }]}>
                      {getStatusText(service.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.serviceInfo}>
                  <View style={styles.infoRow}>
                    <Calendar size={16} color={Colors.text.light} />
                    <Text style={styles.infoText}>
                      {new Date(service.date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <DollarSign size={16} color={Colors.text.light} />
                    <Text style={styles.infoText}>Bs. {service.price}</Text>
                  </View>
                </View>

                {service.results && (
                  <View style={styles.resultsBox}>
                    <FileCheck size={16} color={Colors.success} />
                    <Text style={styles.resultsText}>{service.results}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {paidServices.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historial de Servicios</Text>
            {paidServices.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.serviceName}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(service.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(service.status) }]}>
                      {getStatusText(service.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.serviceInfo}>
                  <View style={styles.infoRow}>
                    <Calendar size={16} color={Colors.text.light} />
                    <Text style={styles.infoText}>
                      {new Date(service.date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <DollarSign size={16} color={Colors.text.light} />
                    <Text style={styles.infoText}>Bs. {service.price}</Text>
                  </View>
                </View>

                {service.results && (
                  <View style={styles.resultsBox}>
                    <FileCheck size={16} color={Colors.success} />
                    <Text style={styles.resultsText}>{service.results}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {userServices.length === 0 && (
          <View style={styles.emptyState}>
            <Clock size={48} color={Colors.text.light} />
            <Text style={styles.emptyTitle}>No tienes servicios aún</Text>
            <Text style={styles.emptySubtitle}>
              Los servicios que recibas aparecerán aquí
            </Text>
          </View>
        )}
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
    padding: 20,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.white + 'CC',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: Colors.white,
    marginBottom: 16,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  serviceCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  serviceInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  resultsBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.success + '10',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.success,
  },
  resultsText: {
    fontSize: 13,
    color: Colors.text.secondary,
    flex: 1,
    lineHeight: 18,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});
