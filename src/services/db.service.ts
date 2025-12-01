import * as SQLite from 'expo-sqlite';
import { ICategory } from '../interfaces/category';
import { IFruit } from '../interfaces/fruit';

// Nom de la base de données
const DB_NAME = 'fruits.db';

// Instance de la base de données
let db: SQLite.SQLiteDatabase | null = null;

/**
 * Service de gestion de la base de données SQLite
 * Gère les opérations CRUD pour les fruits et catégories
 */
class DatabaseService {
  
  /**
   * Initialise la connexion à la base de données
   */
  async init(): Promise<SQLite.SQLiteDatabase> {
    if (db) return db;
    
    db = await SQLite.openDatabaseAsync(DB_NAME);
    await this.createTables();
    return db;
  }

  /**
   * Récupère l'instance de la base de données
   */
  async getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (!db) {
      return await this.init();
    }
    return db;
  }

  /**
   * Crée les tables nécessaires si elles n'existent pas
   */
  async createTables(): Promise<void> {
    const database = await this.getDatabase();
    
    // Création de la table categories
    const createCategoriesTable = `
      CREATE TABLE IF NOT EXISTS categories (
        idCategorie INTEGER PRIMARY KEY AUTOINCREMENT,
        nomCategorie VARCHAR(128) NOT NULL,
        color VARCHAR(20) DEFAULT '#27AE60'
      )
    `;
    
    // Création de la table fruits
    const createFruitsTable = `
      CREATE TABLE IF NOT EXISTS fruits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomFruit VARCHAR(128) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        buyPrice REAL DEFAULT 0,
        sellPrice REAL DEFAULT 0,
        stock INTEGER DEFAULT 0,
        categorie INTEGER NOT NULL,
        FOREIGN KEY (categorie) REFERENCES categories(idCategorie)
      )
    `;
    
    await database.execAsync(createCategoriesTable);
    await database.execAsync(createFruitsTable);
  }

  // ==================== OPERATIONS SUR LES CATEGORIES ====================

  /**
   * Récupère toutes les catégories
   */
  async getAllCategories(): Promise<ICategory[]> {
    const database = await this.getDatabase();
    const result = await database.getAllAsync<{
      idCategorie: number;
      nomCategorie: string;
      color: string;
    }>('SELECT * FROM categories');
    
    return result.map(row => ({
      id: row.idCategorie.toString(),
      name: row.nomCategorie,
      color: row.color
    }));
  }

  /**
   * Récupère une catégorie par son ID
   */
  async getCategoryById(id: number): Promise<ICategory | null> {
    const database = await this.getDatabase();
    const result = await database.getFirstAsync<{
      idCategorie: number;
      nomCategorie: string;
      color: string;
    }>('SELECT * FROM categories WHERE idCategorie = ?', [id]);
    
    if (!result) return null;
    
    return {
      id: result.idCategorie.toString(),
      name: result.nomCategorie,
      color: result.color
    };
  }

  /**
   * Ajoute une nouvelle catégorie
   */
  async addCategory(name: string, color: string = '#27AE60'): Promise<number> {
    const database = await this.getDatabase();
    const result = await database.runAsync(
      'INSERT INTO categories (nomCategorie, color) VALUES (?, ?)',
      [name, color]
    );
    return result.lastInsertRowId;
  }

  /**
   * Met à jour une catégorie
   */
  async updateCategory(id: number, name: string, color: string): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(
      'UPDATE categories SET nomCategorie = ?, color = ? WHERE idCategorie = ?',
      [name, color, id]
    );
  }

  /**
   * Supprime une catégorie
   */
  async deleteCategory(id: number): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync('DELETE FROM categories WHERE idCategorie = ?', [id]);
  }

  // ==================== OPERATIONS SUR LES FRUITS ====================

  /**
   * Récupère tous les fruits
   */
  async getAllFruits(): Promise<IFruit[]> {
    const database = await this.getDatabase();
    const result = await database.getAllAsync<{
      id: number;
      nomFruit: string;
      description: string;
      image: string;
      buyPrice: number;
      sellPrice: number;
      stock: number;
      categorie: number;
    }>('SELECT * FROM fruits');
    
    return result.map(row => ({
      id: row.id.toString(),
      name: row.nomFruit,
      description: row.description || '',
      image: row.image || '',
      buyPrice: row.buyPrice,
      sellPrice: row.sellPrice,
      stock: row.stock,
      categoryId: row.categorie.toString()
    }));
  }

  /**
   * Récupère les fruits par catégorie
   */
  async getFruitsByCategory(categoryId: number): Promise<IFruit[]> {
    const database = await this.getDatabase();
    const result = await database.getAllAsync<{
      id: number;
      nomFruit: string;
      description: string;
      image: string;
      buyPrice: number;
      sellPrice: number;
      stock: number;
      categorie: number;
    }>('SELECT * FROM fruits WHERE categorie = ?', [categoryId]);
    
    return result.map(row => ({
      id: row.id.toString(),
      name: row.nomFruit,
      description: row.description || '',
      image: row.image || '',
      buyPrice: row.buyPrice,
      sellPrice: row.sellPrice,
      stock: row.stock,
      categoryId: row.categorie.toString()
    }));
  }

  /**
   * Récupère un fruit par son ID
   */
  async getFruitById(id: number): Promise<IFruit | null> {
    const database = await this.getDatabase();
    const result = await database.getFirstAsync<{
      id: number;
      nomFruit: string;
      description: string;
      image: string;
      buyPrice: number;
      sellPrice: number;
      stock: number;
      categorie: number;
    }>('SELECT * FROM fruits WHERE id = ?', [id]);
    
    if (!result) return null;
    
    return {
      id: result.id.toString(),
      name: result.nomFruit,
      description: result.description || '',
      image: result.image || '',
      buyPrice: result.buyPrice,
      sellPrice: result.sellPrice,
      stock: result.stock,
      categoryId: result.categorie.toString()
    };
  }

  /**
   * Ajoute un nouveau fruit
   */
  async addFruit(fruit: Omit<IFruit, 'id'>): Promise<number> {
    const database = await this.getDatabase();
    const result = await database.runAsync(
      `INSERT INTO fruits (nomFruit, description, image, buyPrice, sellPrice, stock, categorie) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fruit.name,
        fruit.description,
        fruit.image,
        fruit.buyPrice,
        fruit.sellPrice,
        fruit.stock,
        parseInt(fruit.categoryId)
      ]
    );
    return result.lastInsertRowId;
  }

  /**
   * Met à jour un fruit
   */
  async updateFruit(id: number, fruit: Partial<IFruit>): Promise<void> {
    const database = await this.getDatabase();
    
    const updates: string[] = [];
    const values: (string | number)[] = [];
    
    if (fruit.name !== undefined) {
      updates.push('nomFruit = ?');
      values.push(fruit.name);
    }
    if (fruit.description !== undefined) {
      updates.push('description = ?');
      values.push(fruit.description);
    }
    if (fruit.image !== undefined) {
      updates.push('image = ?');
      values.push(fruit.image);
    }
    if (fruit.buyPrice !== undefined) {
      updates.push('buyPrice = ?');
      values.push(fruit.buyPrice);
    }
    if (fruit.sellPrice !== undefined) {
      updates.push('sellPrice = ?');
      values.push(fruit.sellPrice);
    }
    if (fruit.stock !== undefined) {
      updates.push('stock = ?');
      values.push(fruit.stock);
    }
    if (fruit.categoryId !== undefined) {
      updates.push('categorie = ?');
      values.push(parseInt(fruit.categoryId));
    }
    
    if (updates.length === 0) return;
    
    values.push(id);
    
    await database.runAsync(
      `UPDATE fruits SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
  }

  /**
   * Supprime un fruit
   */
  async deleteFruit(id: number): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync('DELETE FROM fruits WHERE id = ?', [id]);
  }

  // ==================== UTILITAIRES ====================

  /**
   * Vérifie si des données existent dans la base
   */
  async hasData(): Promise<boolean> {
    const database = await this.getDatabase();
    const result = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM fruits'
    );
    return (result?.count ?? 0) > 0;
  }

  /**
   * Insère les données par défaut (depuis les fichiers statiques)
   */
  async seedDefaultData(categories: ICategory[], fruits: IFruit[]): Promise<void> {
    const database = await this.getDatabase();
    
    // Vérifier si des données existent déjà
    const hasExistingData = await this.hasData();
    if (hasExistingData) return;
    
    // Insérer les catégories
    for (const cat of categories) {
      await database.runAsync(
        'INSERT INTO categories (idCategorie, nomCategorie, color) VALUES (?, ?, ?)',
        [parseInt(cat.id.replace('c', '')), cat.name, cat.color]
      );
    }
    
    // Insérer les fruits
    for (const fruit of fruits) {
      await database.runAsync(
        `INSERT INTO fruits (nomFruit, description, image, buyPrice, sellPrice, stock, categorie) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          fruit.name,
          fruit.description,
          fruit.image,
          fruit.buyPrice,
          fruit.sellPrice,
          fruit.stock,
          parseInt(fruit.categoryId.replace('c', ''))
        ]
      );
    }
  }

  /**
   * Réinitialise la base de données
   */
  async resetDatabase(): Promise<void> {
    const database = await this.getDatabase();
    await database.execAsync('DELETE FROM fruits');
    await database.execAsync('DELETE FROM categories');
    await database.execAsync('DELETE FROM sqlite_sequence WHERE name="fruits" OR name="categories"');
  }
}

// Export d'une instance unique du service
export const dbService = new DatabaseService();
