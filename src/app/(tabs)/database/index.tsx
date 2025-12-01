import { CATEGORIES } from '@/src/data/categories';
import { FRUITS } from '@/src/data/fruits';
import { dbService } from '@/src/services/db.service';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DatabaseHomeScreen() {
  const [stats, setStats] = useState({ fruits: 0, categories: 0 });
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initDatabase();
  }, []);

  const initDatabase = async () => {
    try {
      await dbService.init();
      
      // Charger les stats
      const cats = await dbService.getAllCategories();
      const fruits = await dbService.getAllFruits();
      
      // Si la base est vide, on peut proposer d'initialiser
      if (cats.length === 0) {
        setInitialized(false);
      } else {
        setInitialized(true);
      }
      
      setStats({ fruits: fruits.length, categories: cats.length });
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    setLoading(true);
    try {
      await dbService.seedDefaultData(CATEGORIES, FRUITS);
      await initDatabase();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
        <Text style={styles.loadingText}>Initialisation de la base...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="server" size={64} color="#27ae60" />
          <Text style={styles.title}>Base de Données SQLite</Text>
          <Text style={styles.subtitle}>Gestion locale des fruits et catégories</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="nutrition" size={32} color="#27ae60" />
            <Text style={styles.statValue}>{stats.fruits}</Text>
            <Text style={styles.statLabel}>Fruits</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="folder" size={32} color="#f39c12" />
            <Text style={styles.statValue}>{stats.categories}</Text>
            <Text style={styles.statLabel}>Catégories</Text>
          </View>
        </View>

        {/* Actions si base vide */}
        {!initialized && (
          <View style={styles.initSection}>
            <Text style={styles.initText}>
              La base de données est vide. Voulez-vous y insérer les données par défaut ?
            </Text>
            <TouchableOpacity style={styles.initButton} onPress={handleSeedData}>
              <Ionicons name="download" size={20} color="#fff" />
              <Text style={styles.initButtonText}>Initialiser avec les données</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Navigation */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Gestion des données</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/database/fruits' as never)}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="nutrition" size={24} color="#27ae60" />
            </View>
            <View style={styles.menuInfo}>
              <Text style={styles.menuItemTitle}>Gestion des Fruits</Text>
              <Text style={styles.menuItemDesc}>Ajouter, modifier, supprimer des fruits</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/database/categories' as never)}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#fff3e0' }]}>
              <Ionicons name="folder" size={24} color="#f39c12" />
            </View>
            <View style={styles.menuInfo}>
              <Text style={styles.menuItemTitle}>Gestion des Catégories</Text>
              <Text style={styles.menuItemDesc}>Ajouter, modifier, supprimer des catégories</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Info technique */}
        <View style={styles.infoSection}>
          <Ionicons name="information-circle" size={20} color="#666" />
          <Text style={styles.infoText}>
            Base de données : fruits.db{'\n'}
            Les données sont stockées localement sur votre appareil.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  initSection: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  initText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    marginBottom: 16,
  },
  initButton: {
    backgroundColor: '#27ae60',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  initButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  menuSection: {
    marginBottom: 30,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuInfo: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuItemDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  infoSection: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1565c0',
    lineHeight: 20,
  },
});
