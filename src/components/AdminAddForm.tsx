import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { carsApi, collectionsApi } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface AdminAddFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'car' | 'collection';
  onSuccess: () => void;
}

export const AdminAddForm = ({ isOpen, onClose, type, onSuccess }: AdminAddFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
    category: '',
    featured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (type === 'car') {
        await carsApi.create({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock_quantity: parseInt(formData.stockQuantity),
          image_url: formData.imageUrl,
          category: formData.category,
          featured: formData.featured
        });
        toast({ title: "Success", description: "Car added successfully" });
      } else {
        await collectionsApi.create({
          name: formData.name,
          description: formData.description,
          image_url: formData.imageUrl,
          featured: formData.featured
        });
        toast({ title: "Success", description: "Collection added successfully" });
      }
      
      setFormData({
        name: '', description: '', price: '', stockQuantity: '',
        imageUrl: '', category: '', featured: false
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add " + type,
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New {type === 'car' ? 'Car' : 'Collection'}</DialogTitle>
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
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="racing">Racing</SelectItem>
                    <SelectItem value="muscle">Muscle</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="drift">Drift</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Image (use: red-speedster.jpg, blue-racer.jpg, etc.)</Label>
            <Input
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="red-speedster.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            />
            <Label>Featured</Label>
          </div>

          <Button type="submit" className="w-full">
            Add {type === 'car' ? 'Car' : 'Collection'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};