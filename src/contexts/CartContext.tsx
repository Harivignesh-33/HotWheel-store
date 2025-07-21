import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthContext'
import { toast } from '@/hooks/use-toast'

interface CartItem {
  id: string
  car_id: string
  quantity: number
  car: {
    id: string
    name: string
    price: number
    image_url: string
    stock_quantity: number
  }
}

interface CartContextType {
  cartItems: CartItem[]
  loading: boolean
  addToCart: (carId: string, quantity?: number) => Promise<void>
  removeFromCart: (carId: string) => Promise<void>
  updateQuantity: (carId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getTotalAmount: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchCartItems()
    } else {
      setCartItems([])
    }
  }, [user])

  const fetchCartItems = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          car:cars(id, name, price, image_url, stock_quantity)
        `)
        .eq('user_id', user.id)

      if (error) throw error
      setCartItems(data || [])
    } catch (error) {
      console.error('Error fetching cart items:', error)
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (carId: string, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to cart",
        variant: "destructive"
      })
      return
    }

    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.car_id === carId)

      if (existingItem) {
        await updateQuantity(carId, existingItem.quantity + quantity)
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            car_id: carId,
            quantity
          })

        if (error) throw error
        await fetchCartItems()
        
        toast({
          title: "Added to cart",
          description: "Item has been added to your cart"
        })
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      })
    }
  }

  const removeFromCart = async (carId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('car_id', carId)

      if (error) throw error
      await fetchCartItems()
      
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart"
      })
    } catch (error) {
      console.error('Error removing from cart:', error)
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      })
    }
  }

  const updateQuantity = async (carId: string, quantity: number) => {
    if (!user) return

    if (quantity <= 0) {
      await removeFromCart(carId)
      return
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('car_id', carId)

      if (error) throw error
      await fetchCartItems()
    } catch (error) {
      console.error('Error updating quantity:', error)
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive"
      })
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      if (error) throw error
      setCartItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive"
      })
    }
  }

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.car.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const value: CartContextType = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalAmount,
    getTotalItems
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}