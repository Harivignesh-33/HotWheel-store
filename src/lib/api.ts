import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Car = Database['public']['Tables']['cars']['Row'];
type Collection = Database['public']['Tables']['collections']['Row'];
type CartItem = Database['public']['Tables']['cart_items']['Row'];

// Cars API
export const carsApi = {
  // Get all cars
  async getAll(): Promise<Car[]> {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get car by ID
  async getById(id: string): Promise<Car | null> {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get featured cars
  async getFeatured(): Promise<Car[]> {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Create car (admin only)
  async create(car: Database['public']['Tables']['cars']['Insert']): Promise<Car> {
    const { data, error } = await supabase
      .from('cars')
      .insert(car)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update car (admin only)
  async update(id: string, updates: Database['public']['Tables']['cars']['Update']): Promise<Car> {
    const { data, error } = await supabase
      .from('cars')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete car (admin only)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('cars')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Collections API
export const collectionsApi = {
  // Get all collections
  async getAll(): Promise<Collection[]> {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get featured collections
  async getFeatured(): Promise<Collection[]> {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Create collection (admin only)
  async create(collection: Database['public']['Tables']['collections']['Insert']): Promise<Collection> {
    const { data, error } = await supabase
      .from('collections')
      .insert(collection)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update collection (admin only)
  async update(id: string, updates: Database['public']['Tables']['collections']['Update']): Promise<Collection> {
    const { data, error } = await supabase
      .from('collections')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete collection (admin only)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Cart API
export const cartApi = {
  // Get user's cart items
  async getCartItems(userId: string): Promise<(CartItem & { car: Car })[]> {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        car:cars(*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data || [];
  },

  // Add item to cart
  async addItem(userId: string, carId: string, quantity: number = 1): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        car_id: carId,
        quantity
      }, {
        onConflict: 'user_id,car_id'
      });
    
    if (error) throw error;
  },

  // Update cart item quantity
  async updateQuantity(userId: string, carId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await this.removeItem(userId, carId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('car_id', carId);
    
    if (error) throw error;
  },

  // Remove item from cart
  async removeItem(userId: string, carId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('car_id', carId);
    
    if (error) throw error;
  },

  // Clear entire cart
  async clearCart(userId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
  }
};