import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { 
  Scan, Activity, Scissors, Smile, Bed, Droplet, 
  Syringe, Pill, Siren, ScissorsLineDashed, Stethoscope,
  HeartPulse, Dumbbell
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { services, Service } from '@/mocks/services';
import { useState } from 'react';

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

const categoryColors: Record<Service['category'], string> = {
  diagnostic: Colors.tertiary,
  surgery: Colors.primary,
  care: Colors.secondary,
  emergency: '#EF4444',
};

const categoryLabels: Record<Service['category'], string> = {
  diagnostic: 'Diagnóstico',
  surgery: 'Cirugía',
  care: 'Cuidado',
  emergency: 'Emergencia',
};

export default function ServicesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Service['category'] | 'all'>('all');

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const categories: { key: Service['category'] | 'all'; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'diagnostic', label: 'Diagnóstico' },
    { key: 'surgery', label: 'Cirugía' },
    { key: 'care', label: 'Cuidado' },
    { key: 'emergency', label: 'Emergencia' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nuestros Servicios</Text>
          <Text style={styles.subtitle}>Atención veterinaria especializada</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          style={styles.categoriesScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryChip,
                selectedCategory === cat.key && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat.key && styles.categoryChipTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView 
          style={styles.servicesContainer}
          contentContainerStyle={styles.servicesContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredServices.map((service) => {
            const Icon = iconMap[service.icon] || Stethoscope;
            const categoryColor = categoryColors[service.category];
            
            return (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => router.push(`/services/${service.id}` as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.serviceIconContainer, { backgroundColor: categoryColor + '15' }]}>
                  <Icon size={24} color={categoryColor} />
                </View>
                <View style={styles.serviceContent}>
                  <View style={styles.serviceHeader}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '20' }]}>
                      <Text style={[styles.categoryBadgeText, { color: categoryColor }]}>
                        {categoryLabels[service.category]}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.serviceDescription} numberOfLines={2}>
                    {service.description}
                  </Text>
                  <View style={styles.serviceFooter}>
                    <Text style={styles.servicePrice}>Bs. {service.price}</Text>
                    <Text style={styles.serviceDuration}>{service.duration}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
  categoriesScroll: {
    maxHeight: 50,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.text.secondary,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  servicesContainer: {
    flex: 1,
  },
  servicesContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  serviceCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceContent: {
    flex: 1,
    gap: 8,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600' as const,
  },
  serviceDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  serviceDuration: {
    fontSize: 13,
    color: Colors.text.light,
  },
});
