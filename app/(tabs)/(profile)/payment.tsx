import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, QrCode, CheckCircle2 } from 'lucide-react-native';
import { useState } from 'react';
import Colors from '@/constants/colors';
import { useUser } from '@/contexts/UserContext';

type PaymentMethod = 'qr' | 'card' | null;

export default function PaymentScreen() {
  const router = useRouter();
  const { getTotalPending, markAsPaid } = useUser();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = getTotalPending();

  const handlePayment = async () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Por favor selecciona un método de pago');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(async () => {
      await markAsPaid();
      setIsProcessing(false);
      
      Alert.alert(
        'Pago Exitoso',
        'Tu pago ha sido procesado correctamente',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Total a Pagar</Text>
          <Text style={styles.amountValue}>Bs. {totalAmount}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Pago</Text>
          
          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'qr' && styles.methodCardSelected,
            ]}
            onPress={() => setSelectedMethod('qr')}
            activeOpacity={0.7}
          >
            <View style={styles.methodIconContainer}>
              <QrCode size={28} color={selectedMethod === 'qr' ? Colors.primary : Colors.text.secondary} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={[styles.methodTitle, selectedMethod === 'qr' && styles.methodTitleSelected]}>
                Código QR
              </Text>
              <Text style={styles.methodDescription}>
                Escanea con tu app de pagos
              </Text>
            </View>
            {selectedMethod === 'qr' && (
              <CheckCircle2 size={24} color={Colors.primary} fill={Colors.primary} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'card' && styles.methodCardSelected,
            ]}
            onPress={() => setSelectedMethod('card')}
            activeOpacity={0.7}
          >
            <View style={styles.methodIconContainer}>
              <CreditCard size={28} color={selectedMethod === 'card' ? Colors.primary : Colors.text.secondary} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={[styles.methodTitle, selectedMethod === 'card' && styles.methodTitleSelected]}>
                Tarjeta de Débito
              </Text>
              <Text style={styles.methodDescription}>
                Paga con tu tarjeta bancaria
              </Text>
            </View>
            {selectedMethod === 'card' && (
              <CheckCircle2 size={24} color={Colors.primary} fill={Colors.primary} />
            )}
          </TouchableOpacity>
        </View>

        {selectedMethod === 'qr' && (
          <View style={styles.qrSection}>
            <Text style={styles.qrTitle}>Escanea el código QR</Text>
            <View style={styles.qrPlaceholder}>
              <QrCode size={120} color={Colors.text.secondary} />
              <Text style={styles.qrPlaceholderText}>Código QR de pago</Text>
            </View>
            <Text style={styles.qrInstructions}>
              Abre tu aplicación de pagos móviles y escanea este código para completar la transacción
            </Text>
          </View>
        )}

        {selectedMethod === 'card' && (
          <View style={styles.cardSection}>
            <Text style={styles.cardTitle}>Información de la Tarjeta</Text>
            <Text style={styles.cardDescription}>
              Serás redirigido a la pasarela de pagos segura para ingresar los datos de tu tarjeta
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.payButton,
            (!selectedMethod || isProcessing) && styles.payButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={!selectedMethod || isProcessing}
          activeOpacity={0.8}
        >
          <Text style={styles.payButtonText}>
            {isProcessing ? 'Procesando Pago...' : `Pagar Bs. ${totalAmount}`}
          </Text>
        </TouchableOpacity>

        <Text style={styles.securityNote}>
          🔒 Transacción segura y encriptada
        </Text>
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
  amountSection: {
    backgroundColor: Colors.tertiary + '15',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 40,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  methodCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '05',
  },
  methodIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  methodTitleSelected: {
    color: Colors.primary,
  },
  methodDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  qrSection: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 20,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: Colors.background,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed' as const,
  },
  qrPlaceholderText: {
    fontSize: 12,
    color: Colors.text.light,
    marginTop: 12,
  },
  qrInstructions: {
    fontSize: 13,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  cardSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  payButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonDisabled: {
    opacity: 0.5,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  securityNote: {
    fontSize: 13,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});
