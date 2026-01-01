import { supabase } from '@/integrations/supabase/client';

// Define types locally since the auto-generated types may not be in sync
interface Car {
  id: string;
  name: string;
  description: string | null;
  price: number;
  collection_id: string | null;
  image_url: string | null;
  stock_quantity: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface Collection {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface CartItem {
  id: string;
  user_id: string;
  car_id: string;
  quantity: number;
  created_at: string;
}

// Cars API
export const carsApi = {
  // Get all cars
  async getAll(): Promise<Car[]> {
    const { data, error } = await supabase
      .from('cars' as any)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as unknown as Car[];
  },

  // Get car by ID
  async getById(id: string): Promise<Car | null> {
    const { data, error } = await supabase
      .from('cars' as any)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as unknown as Car;
  },

  // Get featured cars
  async getFeatured(): Promise<Car[]> {
    const { data, error } = await supabase
      .from('cars' as any)
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as unknown as Car[];
  },

  // Create car (admin only)
  async create(car: Omit<Car, 'id' | 'created_at' | 'updated_at'>): Promise<Car> {
    const { data, error } = await supabase
      .from('cars' as any)
      .insert(car)
      .select()
      .single();
    
    if (error) throw error;
    return data as unknown as Car;
  },

  // Update car (admin only)
  async update(id: string, updates: Partial<Car>): Promise<Car> {
    const { data, error } = await supabase
      .from('cars' as any)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as unknown as Car;
  },

  // Delete car (admin only)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('cars' as any)
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
      .from('collections' as any)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as unknown as Collection[];
  },

  // Get featured collections
  async getFeatured(): Promise<Collection[]> {
    const { data, error } = await supabase
      .from('collections' as any)
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as unknown as Collection[];
  },

  // Create collection (admin only)
  async create(collection: Omit<Collection, 'id' | 'created_at' | 'updated_at'>): Promise<Collection> {
    const { data, error } = await supabase
      .from('collections' as any)
      .insert(collection)
      .select()
      .single();
    
    if (error) throw error;
    return data as unknown as Collection;
  },

  // Update collection (admin only)
  async update(id: string, updates: Partial<Collection>): Promise<Collection> {
    const { data, error } = await supabase
      .from('collections' as any)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as unknown as Collection;
  },

  // Delete collection (admin only)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('collections' as any)
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
      .from('cart_items' as any)
      .select(`
        *,
        car:cars(*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return (data || []) as unknown as (CartItem & { car: Car })[];
  },

  // Add item to cart
  async addItem(userId: string, carId: string, quantity: number = 1): Promise<void> {
    const { error } = await supabase
      .from('cart_items' as any)
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
      .from('cart_items' as any)
      .update({ quantity })
      .eq('user_id', userId)
      .eq('car_id', carId);
    
    if (error) throw error;
  },

  // Remove item from cart
  async removeItem(userId: string, carId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items' as any)
      .delete()
      .eq('user_id', userId)
      .eq('car_id', carId);
    
    if (error) throw error;
  },

  // Clear entire cart
  async clearCart(userId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items' as any)
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
  }
};
