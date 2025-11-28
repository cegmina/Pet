import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface Pet {
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
}

export interface Owner {
  name: string;
  email: string;
  phone: string;
}

export interface User {
  owner: Owner;
  pet: Pet;
}

export interface UserService {
  serviceId: string;
  serviceName: string;
  date: string;
  price: number;
  status: 'pending' | 'completed' | 'paid';
  results?: string;
}

export const [UserProvider, useUser] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [userServices, setUserServices] = useState<UserService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const servicesData = await AsyncStorage.getItem('userServices');
      
      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (servicesData) {
        setUserServices(JSON.parse(servicesData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const savedUser = JSON.parse(userData);
        if (savedUser.owner.email === email) {
          setUser(savedUser);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const register = async (userData: User): Promise<boolean> => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      const mockServices: UserService[] = [
        {
          serviceId: '1',
          serviceName: 'Radiografía Digital',
          date: '2024-01-15',
          price: 150,
          status: 'completed',
          results: 'No se detectaron fracturas. Articulaciones en buen estado.',
        },
        {
          serviceId: '2',
          serviceName: 'Ecografía Abdominal',
          date: '2024-01-20',
          price: 200,
          status: 'completed',
          results: 'Órganos internos sin anomalías detectadas.',
        },
        {
          serviceId: '5',
          serviceName: 'Limpieza Dental',
          date: '2024-02-10',
          price: 300,
          status: 'pending',
        },
      ];
      
      await AsyncStorage.setItem('userServices', JSON.stringify(mockServices));
      setUserServices(mockServices);
      
      return true;
    } catch (error) {
      console.error('Error registering:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setUserServices([]);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const addService = async (service: UserService) => {
    try {
      const updated = [...userServices, service];
      await AsyncStorage.setItem('userServices', JSON.stringify(updated));
      setUserServices(updated);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const getTotalPending = (): number => {
    return userServices
      .filter(s => s.status === 'pending' || s.status === 'completed')
      .reduce((sum, s) => sum + s.price, 0);
  };

  const markAsPaid = async () => {
    try {
      const updated = userServices.map(s => 
        s.status === 'pending' || s.status === 'completed' 
          ? { ...s, status: 'paid' as const }
          : s
      );
      await AsyncStorage.setItem('userServices', JSON.stringify(updated));
      setUserServices(updated);
    } catch (error) {
      console.error('Error marking as paid:', error);
    }
  };

  return {
    user,
    userServices,
    isLoading,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    addService,
    getTotalPending,
    markAsPaid,
  };
});
