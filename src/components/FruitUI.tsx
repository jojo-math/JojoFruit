import React from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ICategory } from '../interfaces/category';
import { IFruit } from '../interfaces/fruit';

interface FruitUIProps {
  fruit: IFruit;
  category?: ICategory;
  onEdit?: (fruit: IFruit) => void;
  onDelete?: (fruit: IFruit) => void;
  onPress?: (fruit: IFruit) => void;
  showActions?: boolean;
}

export default function FruitUI({
  fruit,
  category,
  onEdit,
  onDelete,
  onPress,
  showActions = true,
}: FruitUIProps) {
  
  const handleDelete = () => {
    Alert.alert(
      'Confirmer la suppression',
      `Voulez-vous vraiment supprimer "${fruit.name}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => onDelete?.(fruit),
        },
      ]
    );
  };

  const CardContent = () => (
    <>
      {/* Image du fruit */}
      <Image
        source={{ uri: fruit.image || 'https://via.placeholder.com/400x300?text=Fruit' }}
        style={styles.image}
      />

      {/* Badge catégorie */}
      {category && (
        <View style={[styles.categoryBadge, { backgroundColor: category.color }]}>
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      )}

      {/* Informations du fruit */}
      <View style={styles.info}>
        <Text style={styles.name}>{fruit.name}</Text>
        
        {fruit.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {fruit.description}
          </Text>
        ) : null}

        <View style={styles.priceRow}>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Achat</Text>
            <Text style={styles.buyPrice}>{fruit.buyPrice.toLocaleString()} FCFA</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Vente</Text>
            <Text style={styles.sellPrice}>{fruit.sellPrice.toLocaleString()} FCFA</Text>
          </View>
        </View>

        <View style={styles.stockRow}>
          <Text style={styles.stockLabel}>📦 Stock:</Text>
          <Text style={[
            styles.stockValue,
            fruit.stock < 10 && styles.stockLow,
            fruit.stock === 0 && styles.stockEmpty,
          ]}>
            {fruit.stock} unités
          </Text>
        </View>
      </View>

      {/* Actions */}
      {showActions && (onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => onEdit(fruit)}
            >
              <Text style={styles.actionButtonText}>✏️ Modifier</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.deleteButtonText}>🗑️ Supprimer</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(fruit)}
        activeOpacity={0.8}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.card}>
      <CardContent />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceBox: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  buyPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e74c3c',
  },
  sellPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
  },
  stockLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  stockValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  stockLow: {
    color: '#f39c12',
  },
  stockEmpty: {
    color: '#e74c3c',
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    borderRightWidth: 1,
    borderRightColor: '#eee',
    backgroundColor: '#f8f9fa',
  },
  deleteButton: {
    backgroundColor: '#fff5f5',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e74c3c',
  },
});
