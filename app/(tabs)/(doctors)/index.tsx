import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Star, Calendar } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { doctors } from '@/mocks/doctors';

export default function DoctorsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nuestros Doctores</Text>
          <Text style={styles.subtitle}>Equipo médico altamente calificado</Text>
        </View>

        <ScrollView 
          style={styles.doctorsContainer}
          contentContainerStyle={styles.doctorsContent}
          showsVerticalScrollIndicator={false}
        >
          {doctors.map((doctor) => (
            <View key={doctor.id} style={styles.doctorCard}>
              <Image 
                source={{ uri: doctor.image }} 
                style={styles.doctorImage}
                contentFit="cover"
              />
              <View style={styles.doctorInfo}>
                <View style={styles.doctorHeader}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color={Colors.warning} fill={Colors.warning} />
                    <Text style={styles.ratingText}>{doctor.rating.toFixed(1)}</Text>
                  </View>
                </View>
                <Text style={styles.specialty}>{doctor.specialty}</Text>
                <View style={styles.doctorFooter}>
                  <View style={styles.experienceContainer}>
                    <Text style={styles.experienceLabel}>Experiencia</Text>
                    <Text style={styles.experienceValue}>{doctor.experience}</Text>
                  </View>
                  <View style={styles.availabilityContainer}>
                    <Calendar size={14} color={Colors.text.light} />
                    <Text style={styles.availabilityText}>
                      {doctor.availability.length === 7 || doctor.availability[0] === 'Todos los días'
                        ? 'Todos los días'
                        : `${doctor.availability.length} días`}
                    </Text>
                  </View>
                </View>
                <View style={styles.availabilityDays}>
                  <Text style={styles.availabilityDaysLabel}>Disponible:</Text>
                  <Text style={styles.availabilityDaysList}>
                    {doctor.availability.join(', ')}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text.secondary,
  },
  doctorsContainer: {
    flex: 1,
  },
  doctorsContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  doctorCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorImage: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.border,
  },
  doctorInfo: {
    padding: 16,
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.warning + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.warning,
  },
  specialty: {
    fontSize: 15,
    fontWeight: '500' as const,
    color: Colors.primary,
    marginBottom: 12,
  },
  doctorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginBottom: 12,
  },
  experienceContainer: {
    gap: 4,
  },
  experienceLabel: {
    fontSize: 12,
    color: Colors.text.light,
  },
  experienceValue: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  availabilityText: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  availabilityDays: {
    backgroundColor: Colors.secondary + '10',
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },
  availabilityDaysLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  availabilityDaysList: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
});
