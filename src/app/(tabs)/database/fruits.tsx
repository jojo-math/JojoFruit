import FruitForm from '@/src/components/FruitForm';
import FruitUI from '@/src/components/FruitUI';
import { CATEGORIES } from '@/src/data/categories';
import { FRUITS } from '@/src/data/fruits';
import { ICategory } from '@/src/interfaces/category';
import { IFruit } from '@/src/interfaces/fruit';
import { dbService } from '@/src/services/db.service';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ViewMode = 'list' | 'form';

export default function FruitsDBScreen() {
  const [fruits, setFruits] = useState<IFruit[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingFruit, setEditingFruit] = useState<IFruit | undefined>(undefined);

  const loadData = useCallback(async () => {
    try {
      await dbService.init();
      
      // Charger les catégories et fruits depuis SQLite
      const catsFromDB = await dbService.getAllCategories();
      const fruitsFromDB = await dbService.getAllFruits();
      
      // Si la base est vide, insérer les données par défaut
      if (catsFromDB.length === 0) {
        await dbService.seedDefaultData(CATEGORIES, FRUITS);
        const newCats = await dbService.getAllCategories();
        const newFruits = await dbService.getAllFruits();
        setCategories(newCats);
        setFruits(newFruits);
      } else {
        setCategories(catsFromDB);
        setFruits(fruitsFromDB);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      Alert.alert('Erreur', 'Impossible de charger les données');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const getCategoryForFruit = (fruit: IFruit): ICategory | undefined => {
    return categories.find(c => c.id === fruit.categoryId);
  };

  const handleAddFruit = () => {
    setEditingFruit(undefined);
    setViewMode('form');
  };

  const handleEditFruit = (fruit: IFruit) => {
    setEditingFruit(fruit);
    setViewMode('form');
  };

  const handleDeleteFruit = async (fruit: IFruit) => {
    try {
      await dbService.deleteFruit(parseInt(fruit.id));
      setFruits(prev => prev.filter(f => f.id !== fruit.id));
      Alert.alert('Succès', 'Fruit supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      Alert.alert('Erreur', 'Impossible de supprimer le fruit');
    }
  };

  const handleSaveFruit = (fruit: IFruit) => {
    if (editingFruit) {
      // Mode édition
      setFruits(prev => prev.map(f => f.id === fruit.id ? fruit : f));
    } else {
      // Mode création
      setFruits(prev => [...prev, fruit]);
    }
    setViewMode('list');
    setEditingFruit(undefined);
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setEditingFruit(undefined);
  };

  const handleResetDatabase = () => {
    Alert.alert(
      'Réinitialiser la base de données',
      'Cette action supprimera toutes les données et les remplacera par les données par défaut. Continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await dbService.resetDatabase();
              await dbService.seedDefaultData(CATEGORIES, FRUITS);
              await loadData();
              Alert.alert('Succès', 'Base de données réinitialisée');
            } catch (error) {
              console.error('Erreur:', error);
              Alert.alert('Erreur', 'Impossible de réinitialiser la base');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
        <Text style={styles.loadingText}>Chargement des fruits...</Text>
      </SafeAreaView>
    );
  }

  if (viewMode === 'form') {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <FruitForm
          fruit={editingFruit}
          onSave={handleSaveFruit}
          onCancel={handleCancelForm}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* En-tête */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>🍎 Gestion des Fruits</Text>
          <Text style={styles.subtitle}>{fruits.length} fruits dans la base</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetDatabase}
          >
            <Ionicons name="refresh" size={20} color="#e74c3c" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddFruit}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Liste des fruits */}
      <FlatList
        data={fruits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🍎</Text>
            <Text style={styles.emptyText}>Aucun fruit dans la base</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={handleAddFruit}>
              <Text style={styles.emptyButtonText}>Ajouter un fruit</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <FruitUI
            fruit={item}
            category={getCategoryForFruit(item)}
            onEdit={handleEditFruit}
            onDelete={handleDeleteFruit}
            showActions={true}
          />
        )}
      />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  addButton: {
    backgroundColor: '#27ae60',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#fff',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
