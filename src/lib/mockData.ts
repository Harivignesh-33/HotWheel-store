// Mock data for when API fails - provides beautiful fallback content
export const mockCars = [
  {
    id: '1',
    name: 'Red Lightning Speedster',
    description: 'A blazing fast red sports car with racing stripes and aerodynamic design. Perfect for speed enthusiasts.',
    price: 179,
    collection_id: null,
    image_url: 'red-speedster.jpg',
    stock_quantity: 25,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2', 
    name: 'Blue Flame Racer',
    description: 'High-performance blue racing car with flame decals and aggressive styling. Built for the track.',
    price: 299,
    collection_id: null,
    image_url: 'blue-racer.jpg',
    stock_quantity: 18,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Yellow Thunder Muscle',
    description: 'Classic American muscle car in bright yellow with black racing stripes. Pure power and nostalgia.',
    price: 499,
    collection_id: null,
    image_url: 'yellow-muscle.jpg',
    stock_quantity: 12,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Green Monster Truck',
    description: 'Massive off-road monster truck with oversized wheels and incredible ground clearance.',
    price: 299,
    collection_id: null,
    image_url: 'green-monster.jpg',
    stock_quantity: 8,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Black Luxury Sedan',
    description: 'Elegant black luxury car with chrome details and tinted windows. Sophistication meets performance.',
    price: 499,
    collection_id: null,
    image_url: 'black-luxury.jpg',
    stock_quantity: 15,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Purple Drift Machine',
    description: 'Lowered drift car with wide fenders and neon accents. Built for style and sideways action.',
    price: 179,
    collection_id: null,
    image_url: 'purple-drift.jpg',
    stock_quantity: 20,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Silver Supercar',
    description: 'Futuristic chrome supercar with gull-wing doors and cutting-edge design.',
    price: 499,
    collection_id: null,
    image_url: 'silver-supercar.jpg',
    stock_quantity: 5,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Orange Racing Beast',
    description: 'Vibrant orange sports car with carbon fiber accents and aerodynamic wings.',
    price: 179,
    collection_id: null,
    image_url: 'orange-sports.jpg',
    stock_quantity: 10,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockCollections = [
  {
    id: '1',
    name: 'Speed Demons',
    description: 'The fastest cars in our collection, built for pure speed and adrenaline.',
    image_url: 'red-speedster.jpg',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Classic Muscle',
    description: 'Iconic American muscle cars that defined an era of automotive power.',
    image_url: 'yellow-muscle.jpg',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Luxury Line',
    description: 'Premium vehicles that combine elegance with performance.',
    image_url: 'black-luxury.jpg',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Off-Road Warriors',
    description: 'Rugged vehicles built to conquer any terrain.',
    image_url: 'green-monster.jpg',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Drift Masters',
    description: 'Sideways specialists designed for the art of controlled sliding.',
    image_url: 'purple-drift.jpg',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Future Tech',
    description: 'Cutting-edge supercars representing the future of automotive design.',
    image_url: 'silver-supercar.jpg',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Racing Legends',
    description: 'Iconic race cars that made history on famous tracks around the world.',
    image_url: 'orange-sports.jpg',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Street Racers',
    description: 'Urban warriors built for city streets and midnight runs.',
    image_url: 'blue-racer.jpg',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Vintage Classics',
    description: 'Timeless automobiles from the golden age of motoring.',
    image_url: 'yellow-muscle.jpg',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];