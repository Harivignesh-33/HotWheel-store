// Car image imports
import redSpeedster from '@/assets/cars/red-speedster.jpg';
import blueRacer from '@/assets/cars/blue-racer.jpg';
import yellowMuscle from '@/assets/cars/yellow-muscle.jpg';
import greenMonster from '@/assets/cars/green-monster.jpg';
import blackLuxury from '@/assets/cars/black-luxury.jpg';
import purpleDrift from '@/assets/cars/purple-drift.jpg';

// Image mapping for database URLs
export const carImages: Record<string, string> = {
  'red-speedster.jpg': redSpeedster,
  'blue-racer.jpg': blueRacer,
  'yellow-muscle.jpg': yellowMuscle,
  'green-monster.jpg': greenMonster,
  'black-luxury.jpg': blackLuxury,
  'purple-drift.jpg': purpleDrift,
};

// Helper function to get image URL
export const getCarImageUrl = (imageUrl: string | null): string => {
  if (!imageUrl) return redSpeedster; // fallback
  return carImages[imageUrl] || redSpeedster;
};

// Helper function for collections - they can use car images for now
export const getCollectionImageUrl = (imageUrl: string | null): string => {
  return getCarImageUrl(imageUrl);
};