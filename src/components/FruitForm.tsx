import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ICategory } from '../interfaces/category';
import { IFruit } from '../interfaces/fruit';
import { dbService } from '../services/db.service';

interface FruitFormProps {
  fruit?: IFruit; // Si fourni, on est en mode édition
  onSave: (fruit: IFruit) => void;
  onCancel: () => void;
}

export default function FruitForm({ fruit, onSave, onCancel }: FruitFormProps) {
  const [name, setName] = useState(fruit?.name || '');
  const [description, setDescription] = useState(fruit?.description || '');
  const [image, setImage] = useState(fruit?.image || '');
  const [buyPrice, setBuyPrice] = useState(fruit?.buyPrice?.toString() || '');
  const [sellPrice, setSellPrice] = useState(fruit?.sellPrice?.toString() || '');
  const [stock, setStock] = useState(fruit?.stock?.toString() || '');
  const [categoryId, setCategoryId] = useState(fruit?.categoryId || '');
  
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isEditing = !!fruit;

  const loadCategories = useCallback(async () => {
    try {
      await dbService.init();
      const cats = await dbService.getAllCategories();
      setCategories(cats);
      
      // Si on n'a pas de catégorie sélectionnée et qu'il y en a, prendre la première
      if (!categoryId && cats.length > 0) {
        setCategoryId(cats[0].id);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
      Alert.alert('Erreur', 'Impossible de charger les catégories');
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const validateForm = (): boolean => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom du fruit est obligatoire');
      return false;
    }
    if (!categoryId) {
      Alert.alert('Erreur', 'Veuillez sélectionner une catégorie');
      return false;
    }
    if (buyPrice && isNaN(parseFloat(buyPrice))) {
      Alert.alert('Erreur', "Le prix d'achat doit être un nombre valide");
      return false;
    }
    if (sellPrice && isNaN(parseFloat(sellPrice))) {
      Alert.alert('Erreur', 'Le prix de vente doit être un nombre valide');
      return false;
    }
    if (stock && isNaN(parseInt(stock))) {
      Alert.alert('Erreur', 'Le stock doit être un nombre entier');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const fruitData: Omit<IFruit, 'id'> = {
        name: name.trim(),
        description: description.trim(),
        image: image.trim() || 'https://via.placeholder.com/400x300?text=Fruit',
        buyPrice: parseFloat(buyPrice) || 0,
        sellPrice: parseFloat(sellPrice) || 0,
        stock: parseInt(stock) || 0,
        categoryId: categoryId,
      };

      if (isEditing && fruit) {
        // Mode édition
        await dbService.updateFruit(parseInt(fruit.id), fruitData);
        onSave({ ...fruitData, id: fruit.id });
      } else {
        // Mode création
        const newId = await dbService.addFruit(fruitData);
        onSave({ ...fruitData, id: newId.toString() });
      }

      Alert.alert(
        'Succès',
        isEditing ? 'Fruit modifié avec succès' : 'Fruit ajouté avec succès'
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder le fruit');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? '✏️ Modifier le fruit' : '🍎 Nouveau fruit'}
      </Text>

      {/* Nom du fruit */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nom du fruit *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: Orange"
          placeholderTextColor="#999"
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description du fruit..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* URL de l'image */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>URL de l&apos;image</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
          placeholder="https://..."
          placeholderTextColor="#999"
          keyboardType="url"
        />
      </View>

      {/* Prix d'achat */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Prix d&apos;achat (FCFA)</Text>
        <TextInput
          style={styles.input}
          value={buyPrice}
          onChangeText={setBuyPrice}
          placeholder="0"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      {/* Prix de vente */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Prix de vente (FCFA)</Text>
        <TextInput
          style={styles.input}
          value={sellPrice}
          onChangeText={setSellPrice}
          placeholder="0"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      {/* Stock */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Stock</Text>
        <TextInput
          style={styles.input}
          value={stock}
          onChangeText={setStock}
          placeholder="0"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      {/* Catégorie */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Catégorie *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoryId}
            onValueChange={(value) => setCategoryId(value)}
            style={styles.picker}
          >
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          disabled={saving}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton, saving && styles.disabledButton]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Modifier' : 'Enregistrer'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#27ae60',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
