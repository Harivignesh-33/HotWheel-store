// Car image imports
import redSpeedster from '@/assets/cars/red-speedster.jpg';
import blueRacer from '@/assets/cars/blue-racer.jpg';
import yellowMuscle from '@/assets/cars/yellow-muscle.jpg';
import greenMonster from '@/assets/cars/green-monster.jpg';
import blackLuxury from '@/assets/cars/black-luxury.jpg';
import purpleDrift from '@/assets/cars/purple-drift.jpg';
import silverSupercar from '@/assets/cars/silver-supercar.jpg';
import orangeSports from '@/assets/cars/orange-sports.jpg';
import retroClassic from '@/assets/cars/retro-classic.jpg';
import policePursuit from '@/assets/cars/police-pursuit.jpg';
import monsterTruck from '@/assets/cars/monster-truck.jpg';
import f1Racer from '@/assets/cars/f1-racer.jpg';
import electricFuture from '@/assets/cars/electric-future.jpg';
import hotRod from '@/assets/cars/hot-rod.jpg';

// Image mapping for database URLs
export const carImages: Record<string, string> = {
  'red-speedster.jpg': redSpeedster,
  'blue-racer.jpg': blueRacer,
  'yellow-muscle.jpg': yellowMuscle,
  'green-monster.jpg': greenMonster,
  'black-luxury.jpg': blackLuxury,
  'purple-drift.jpg': purpleDrift,
  'silver-supercar.jpg': silverSupercar,
  'orange-sports.jpg': orangeSports,
  'retro-classic.jpg': retroClassic,
  'police-pursuit.jpg': policePursuit,
  'monster-truck.jpg': monsterTruck,
  'f1-racer.jpg': f1Racer,
  'electric-future.jpg': electricFuture,
  'hot-rod.jpg': hotRod,
};

// Helper function to get image URL
export const getCarImageUrl = (imageUrl: string | null): string => {
  if (!imageUrl) return redSpeedster; // fallback
  
  // Extract filename from full path if needed
  const filename = imageUrl.includes('/') ? imageUrl.split('/').pop() || '' : imageUrl;
  
  return carImages[filename] || redSpeedster;
};

// Helper function for collections - they can use car images for now
export const getCollectionImageUrl = (imageUrl: string | null): string => {
  return getCarImageUrl(imageUrl);
};