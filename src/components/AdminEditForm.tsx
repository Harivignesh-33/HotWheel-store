import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ImageUpload";
import { carsApi, collectionsApi } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface Car {
  id: string;
  name: string;
  description: string | null;
  price: number;
  collection_id: string | null;
  image_url: string | null;
  stock_quantity: number;
  featured: boolean;
}

interface Collection {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  featured: boolean;
}

interface AdminEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'car' | 'collection';
  item: Car | Collection | null;
  onSuccess: () => void;
}

export const AdminEditForm = ({ isOpen, onClose, type, item, onSuccess }: AdminEditFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
    featured: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      if (type === 'car') {
        const car = item as Car;
        setFormData({
          name: car.name,
          description: car.description || '',
          price: car.price.toString(),
          stockQuantity: car.stock_quantity.toString(),
          imageUrl: car.image_url || '',
          featured: car.featured
        });
      } else {
        const collection = item as Collection;
        setFormData({
          name: collection.name,
          description: collection.description || '',
          price: '',
          stockQuantity: '',
          imageUrl: collection.image_url || '',
          featured: collection.featured
        });
      }
    }
  }, [item, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (type === 'car' && item) {
        await carsApi.update(item.id, {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock_quantity: parseInt(formData.stockQuantity),
          image_url: formData.imageUrl,
          featured: formData.featured
        });
        toast({ title: "Success", description: "Car updated successfully" });
      } else if (type === 'collection' && item) {
        await collectionsApi.update(item.id, {
          name: formData.name,
          description: formData.description,
          image_url: formData.imageUrl,
          featured: formData.featured
        });
        toast({ title: "Success", description: "Collection updated successfully" });
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update " + type,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestock = async (amount: number) => {
    if (type !== 'car' || !item) return;
    setIsSubmitting(true);
    
    try {
      const car = item as Car;
      await carsApi.update(car.id, {
        stock_quantity: car.stock_quantity + amount
      });
      toast({ title: "Success", description: `Restocked ${amount} units` });
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restock",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {type === 'car' ? 'Car' : 'Collection'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          {type === 'car' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Stock Quantity</Label>
                  <Input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quick Restock</Label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => handleRestock(5)} disabled={isSubmitting}>
                    +5
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => handleRestock(10)} disabled={isSubmitting}>
                    +10
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => handleRestock(25)} disabled={isSubmitting}>
                    +25
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => handleRestock(50)} disabled={isSubmitting}>
                    +50
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Product Image</Label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            />
            <Label>Featured</Label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
