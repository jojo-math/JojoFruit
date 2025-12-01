import CategorieForm from '@/src/components/CategorieForm';
import { CATEGORIES } from '@/src/data/categories';
import { FRUITS } from '@/src/data/fruits';
import { ICategory } from '@/src/interfaces/category';
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

export default function CategoriesDBScreen() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingCategory, setEditingCategory] = useState<ICategory | undefined>(undefined);

  const loadData = useCallback(async () => {
    try {
      await dbService.init();
      
      // Charger les catégories depuis SQLite
      const catsFromDB = await dbService.getAllCategories();
      
      // Si la base est vide, insérer les données par défaut
      if (catsFromDB.length === 0) {
        await dbService.seedDefaultData(CATEGORIES, FRUITS);
        const newCats = await dbService.getAllCategories();
        setCategories(newCats);
      } else {
        setCategories(catsFromDB);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      Alert.alert('Erreur', 'Impossible de charger les catégories');
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

  const handleAddCategory = () => {
    setEditingCategory(undefined);
    setViewMode('form');
  };

  const handleEditCategory = (category: ICategory) => {
    setEditingCategory(category);
    setViewMode('form');
  };

  const handleDeleteCategory = async (category: ICategory) => {
    Alert.alert(
      'Confirmer la suppression',
      `Voulez-vous vraiment supprimer la catégorie "${category.name}" ?\n\nAttention: Les fruits associés ne seront pas supprimés.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await dbService.deleteCategory(parseInt(category.id));
              setCategories(prev => prev.filter(c => c.id !== category.id));
              Alert.alert('Succès', 'Catégorie supprimée avec succès');
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
              Alert.alert('Erreur', 'Impossible de supprimer la catégorie');
            }
          },
        },
      ]
    );
  };

  const handleSaveCategory = (category: ICategory) => {
    if (editingCategory) {
      // Mode édition
      setCategories(prev => prev.map(c => c.id === category.id ? category : c));
    } else {
      // Mode création
      setCategories(prev => [...prev, category]);
    }
    setViewMode('list');
    setEditingCategory(undefined);
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setEditingCategory(undefined);
  };

  const renderCategoryItem = ({ item }: { item: ICategory }) => (
    <View style={styles.categoryCard}>
      <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryColor}>{item.color}</Text>
      </View>
      <View style={styles.categoryActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditCategory(item)}
        >
          <Ionicons name="pencil" size={18} color="#27ae60" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteCategory(item)}
        >
          <Ionicons name="trash" size={18} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
        <Text style={styles.loadingText}>Chargement des catégories...</Text>
      </SafeAreaView>
    );
  }

  if (viewMode === 'form') {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <CategorieForm
          category={editingCategory}
          onSave={handleSaveCategory}
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
          <Text style={styles.title}>📁 Catégories</Text>
          <Text style={styles.subtitle}>{categories.length} catégories</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCategory}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Liste des catégories */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📁</Text>
            <Text style={styles.emptyText}>Aucune catégorie</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={handleAddCategory}>
              <Text style={styles.emptyButtonText}>Ajouter une catégorie</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={renderCategoryItem}
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
  addButton: {
    backgroundColor: '#27ae60',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  categoryCard: {
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
  colorIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryColor: {
    fontSize: 14,
    color: '#666',
  },
  categoryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#e8f5e9',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
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
