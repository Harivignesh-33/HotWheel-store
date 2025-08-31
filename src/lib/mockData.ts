// Mock data for when API fails - provides beautiful fallback content
export const mockCars = [
  {
    id: '1',
    name: 'Red Lightning Speedster',
    description: 'A blazing fast red sports car with racing stripes and aerodynamic design. Perfect for speed enthusiasts.',
    price: 4.99,
    category: 'Sports',
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
    price: 5.49,
    category: 'Racing',
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
    price: 6.99,
    category: 'Muscle',
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
    price: 8.99,
    category: 'Trucks',
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
    price: 7.49,
    category: 'Luxury',
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
    price: 6.49,
    category: 'Drift',
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
    price: 9.99,
    category: 'Supercar',
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
    price: 7.99,
    category: 'Sports',
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Classic Muscle',
    description: 'Iconic American muscle cars that defined an era of automotive power.',
    image_url: 'yellow-muscle.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Luxury Line',
    description: 'Premium vehicles that combine elegance with performance.',
    image_url: 'black-luxury.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Off-Road Warriors',
    description: 'Rugged vehicles built to conquer any terrain.',
    image_url: 'green-monster.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];