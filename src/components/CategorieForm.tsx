import React, { useState } from 'react';
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
import { dbService } from '../services/db.service';

// Couleurs prédéfinies pour les catégories
const PRESET_COLORS = [
  '#F39C12', // Orange
  '#27AE60', // Vert
  '#9B59B6', // Violet
  '#E74C3C', // Rouge
  '#16A085', // Turquoise
  '#2980B9', // Bleu
  '#8E44AD', // Violet foncé
  '#D35400', // Orange foncé
  '#1ABC9C', // Vert menthe
  '#C0392B', // Rouge foncé
  '#3498DB', // Bleu clair
  '#F1C40F', // Jaune
];

interface CategorieFormProps {
  category?: ICategory; // Si fourni, on est en mode édition
  onSave: (category: ICategory) => void;
  onCancel: () => void;
}

export default function CategorieForm({ category, onSave, onCancel }: CategorieFormProps) {
  const [name, setName] = useState(category?.name || '');
  const [color, setColor] = useState(category?.color || PRESET_COLORS[0]);
  const [saving, setSaving] = useState(false);

  const isEditing = !!category;

  const validateForm = (): boolean => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom de la catégorie est obligatoire');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      await dbService.init();
      
      if (isEditing && category) {
        // Mode édition
        await dbService.updateCategory(parseInt(category.id), name.trim(), color);
        onSave({ id: category.id, name: name.trim(), color });
      } else {
        // Mode création
        const newId = await dbService.addCategory(name.trim(), color);
        onSave({ id: newId.toString(), name: name.trim(), color });
      }

      Alert.alert(
        'Succès',
        isEditing ? 'Catégorie modifiée avec succès' : 'Catégorie ajoutée avec succès'
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder la catégorie');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? '✏️ Modifier la catégorie' : '📁 Nouvelle catégorie'}
      </Text>

      {/* Nom de la catégorie */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nom de la catégorie *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: Agrumes"
          placeholderTextColor="#999"
        />
      </View>

      {/* Sélection de la couleur */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Couleur</Text>
        <View style={styles.colorGrid}>
          {PRESET_COLORS.map((presetColor) => (
            <TouchableOpacity
              key={presetColor}
              style={[
                styles.colorOption,
                { backgroundColor: presetColor },
                color === presetColor && styles.colorSelected,
              ]}
              onPress={() => setColor(presetColor)}
            >
              {color === presetColor && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Aperçu */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Aperçu</Text>
        <View style={[styles.preview, { backgroundColor: color }]}>
          <Text style={styles.previewText}>{name || 'Nom de la catégorie'}</Text>
        </View>
      </View>

      {/* Couleur personnalisée */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Couleur personnalisée (hex)</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholder="#27AE60"
          placeholderTextColor="#999"
          autoCapitalize="characters"
          maxLength={7}
        />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
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
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: '#333',
    borderWidth: 3,
  },
  checkmark: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  preview: {
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
