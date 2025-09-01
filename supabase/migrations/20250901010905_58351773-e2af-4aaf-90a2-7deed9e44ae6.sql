-- Insert Hot Wheels collections
INSERT INTO public.collections (id, name, description, image_url, featured) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Speed Demons', 'High-performance racing cars built for speed and adrenaline', '/src/assets/hero-racing.jpg', true),
('550e8400-e29b-41d4-a716-446655440001', 'Classic Legends', 'Timeless designs that defined automotive history', '/src/assets/about-hero.jpg', true),
('550e8400-e29b-41d4-a716-446655440002', 'Street Racers', 'Urban warriors ready to dominate the streets', '/src/assets/hero-racing.jpg', false),
('550e8400-e29b-41d4-a716-446655440003', 'Luxury Elite', 'Premium vehicles for the distinguished collector', '/src/assets/about-hero.jpg', false);

-- Insert Hot Wheels cars with existing images
INSERT INTO public.cars (id, name, description, price, image_url, stock_quantity, featured, collection_id) VALUES
-- Red Speedster
('650e8400-e29b-41d4-a716-446655440000', 'Red Lightning Speedster', 'A blazing red Hot Wheels speedster designed for maximum velocity. Features aerodynamic styling and precision engineering.', 12.99, '/src/assets/cars/red-speedster.jpg', 25, true, '550e8400-e29b-41d4-a716-446655440000'),

-- Blue Racer
('650e8400-e29b-41d4-a716-446655440001', 'Blue Thunder Racer', 'Electric blue racing machine with lightning-fast acceleration. Perfect for track domination.', 15.99, '/src/assets/cars/blue-racer.jpg', 30, true, '550e8400-e29b-41d4-a716-446655440000'),

-- Yellow Muscle
('650e8400-e29b-41d4-a716-446655440002', 'Yellow Muscle Beast', 'Classic American muscle car in vibrant yellow. Raw power meets iconic design.', 18.99, '/src/assets/cars/yellow-muscle.jpg', 20, true, '550e8400-e29b-41d4-a716-446655440001'),

-- Green Monster
('650e8400-e29b-41d4-a716-446655440003', 'Green Machine Monster', 'Menacing green monster truck ready to crush any obstacle. Built for extreme terrain.', 22.99, '/src/assets/cars/green-monster.jpg', 15, true, '550e8400-e29b-41d4-a716-446655440002'),

-- Black Luxury
('650e8400-e29b-41d4-a716-446655440004', 'Black Diamond Luxury', 'Sleek black luxury sedan with premium detailing. Elegance meets performance.', 24.99, '/src/assets/cars/black-luxury.jpg', 12, true, '550e8400-e29b-41d4-a716-446655440003'),

-- Purple Drift
('650e8400-e29b-41d4-a716-446655440005', 'Purple Drift King', 'Purple drift machine engineered for precision sliding. Master of the curves.', 19.99, '/src/assets/cars/purple-drift.jpg', 18, false, '550e8400-e29b-41d4-a716-446655440002'),

-- Silver Supercar
('650e8400-e29b-41d4-a716-446655440006', 'Silver Storm Supercar', 'Futuristic silver supercar with cutting-edge technology. The future of racing.', 27.99, '/src/assets/cars/silver-supercar.jpg', 10, false, '550e8400-e29b-41d4-a716-446655440000'),

-- Orange Sports
('650e8400-e29b-41d4-a716-446655440007', 'Orange Fury Sports', 'Fiery orange sports car with aggressive styling. Pure adrenaline in die-cast form.', 16.99, '/src/assets/cars/orange-sports.jpg', 22, false, '550e8400-e29b-41d4-a716-446655440000');