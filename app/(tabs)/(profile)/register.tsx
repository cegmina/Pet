import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Phone, Heart, Calendar, Weight, Ruler } from 'lucide-react-native';
import { useState } from 'react';
import Colors from '@/constants/colors';
import { useUser } from '@/contexts/UserContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petWeight, setPetWeight] = useState('');

  const handleRegister = async () => {
    if (!ownerName || !ownerEmail || !ownerPhone || !petName || !petBreed || !petAge || !petWeight) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    const success = await register({
      owner: {
        name: ownerName,
        email: ownerEmail,
        phone: ownerPhone,
      },
      pet: {
        name: petName,
        species: 'Perro',
        breed: petBreed,
        age: parseInt(petAge),
        weight: parseFloat(petWeight),
      },
    });
    setIsLoading(false);

    if (success) {
      Alert.alert(
        'Registro Exitoso',
        'Tu cuenta ha sido creada correctamente',
        [{ text: 'OK', onPress: () => router.replace('/profile') }]
      );
    } else {
      Alert.alert('Error', 'No se pudo completar el registro');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Regístrate para acceder a todos los servicios</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Propietario</Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <User size={20} color={Colors.text.light} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor={Colors.text.light}
              value={ownerName}
              onChangeText={setOwnerName}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Mail size={20} color={Colors.text.light} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor={Colors.text.light}
              value={ownerEmail}
              onChangeText={setOwnerEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Phone size={20} color={Colors.text.light} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor={Colors.text.light}
              value={ownerPhone}
              onChangeText={setOwnerPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la Mascota</Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Heart size={20} color={Colors.text.light} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la mascota"
              placeholderTextColor={Colors.text.light}
              value={petName}
              onChangeText={setPetName}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Ruler size={20} color={Colors.text.light} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Raza"
              placeholderTextColor={Colors.text.light}
              value={petBreed}
              onChangeText={setPetBreed}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <View style={styles.inputIconContainer}>
                <Calendar size={20} color={Colors.text.light} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Edad (años)"
                placeholderTextColor={Colors.text.light}
                value={petAge}
                onChangeText={setPetAge}
                keyboardType="number-pad"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfInput]}>
              <View style={styles.inputIconContainer}>
                <Weight size={20} color={Colors.text.light} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Peso (kg)"
                placeholderTextColor={Colors.text.light}
                value={petWeight}
                onChangeText={setPetWeight}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.registerButtonText}>
            {isLoading ? 'Registrando...' : 'Crear Cuenta'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.replace('/profile/login')}>
            <Text style={styles.loginPromptLink}>Inicia sesión aquí</Text>
          </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text.secondary,
    marginBottom: 24,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputIconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
    color: Colors.text.primary,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPromptText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  loginPromptLink: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
});
