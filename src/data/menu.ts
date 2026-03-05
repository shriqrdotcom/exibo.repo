import { MenuItem } from '../context/CartContext';

const FOOD_IMAGES: Record<string, string> = {
  "Paneer Tikka": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
  "Chicken Seekh Kebab": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80",
  "Hara Bhara Kebab": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80",
  "Crispy Corn Chaat": "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=800&q=80",
  "Dahi Puri": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  "Tandoori Mushroom": "https://images.unsplash.com/photo-1619193100631-481493ad7f70?auto=format&fit=crop&w=800&q=80",
  "Butter Chicken": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  "Dal Makhani": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  "Palak Paneer": "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&w=800&q=80",
  "Mutton Rogan Josh": "https://images.unsplash.com/photo-1545243191-34802f75738c?auto=format&fit=crop&w=800&q=80",
  "Chicken Biryani": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
  "Chole Bhature": "https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&w=800&q=80",
  "Mango Lassi": "https://images.unsplash.com/photo-1571006682864-740315ee65d7?auto=format&fit=crop&w=800&q=80",
  "Masala Chai": "https://images.unsplash.com/photo-1544787210-2827448b303c?auto=format&fit=crop&w=800&q=80",
  "Rose Sharbat": "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=800&q=80",
  "Thandai": "https://images.unsplash.com/photo-1614735241165-6756e1df61ab?auto=format&fit=crop&w=800&q=80"
};

export const MENU_DATA: MenuItem[] = [
  // STARTERS
  {
    id: 's1',
    name: 'Paneer Tikka',
    description: 'Cottage cheese marinated in yogurt and spices, grilled in tandoor.',
    price: 299,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 2,
    image: FOOD_IMAGES['Paneer Tikka'],
    fallbackImage: 'https://picsum.photos/seed/paneer/800/600'
  },
  {
    id: 's2',
    name: 'Chicken Seekh Kebab',
    description: 'Minced chicken with herbs and spices, skewered and grilled.',
    price: 349,
    category: 'Starters',
    isVeg: false,
    spiceLevel: 3,
    image: FOOD_IMAGES['Chicken Seekh Kebab'],
    fallbackImage: 'https://picsum.photos/seed/kebab/800/600'
  },
  {
    id: 's3',
    name: 'Hara Bhara Kebab',
    description: 'Spinach and green pea patties with aromatic spices.',
    price: 249,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 1,
    image: FOOD_IMAGES['Hara Bhara Kebab'],
    fallbackImage: 'https://picsum.photos/seed/hara/800/600'
  },
  {
    id: 's4',
    name: 'Crispy Corn Chaat',
    description: 'Deep fried corn kernels tossed with onions, tomatoes and spices.',
    price: 199,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 2,
    image: FOOD_IMAGES['Crispy Corn Chaat'],
    fallbackImage: 'https://picsum.photos/seed/corn/800/600'
  },
  {
    id: 's5',
    name: 'Dahi Puri',
    description: 'Crispy shells filled with potatoes, yogurt, and tangy chutneys.',
    price: 179,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 1,
    image: FOOD_IMAGES['Dahi Puri'],
    fallbackImage: 'https://picsum.photos/seed/dahipuri/800/600'
  },
  {
    id: 's6',
    name: 'Tandoori Mushroom',
    description: 'Fresh mushrooms marinated in tandoori masala and grilled.',
    price: 279,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 2,
    image: FOOD_IMAGES['Tandoori Mushroom'],
    fallbackImage: 'https://picsum.photos/seed/mushroom/800/600'
  },

  // MAIN COURSE
  {
    id: 'm1',
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich, creamy tomato-based gravy.',
    price: 449,
    category: 'Main Course',
    isVeg: false,
    spiceLevel: 1,
    image: FOOD_IMAGES['Butter Chicken'],
    fallbackImage: 'https://picsum.photos/seed/butterchicken/800/600',
    isSpecial: true
  },
  {
    id: 'm2',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked overnight with butter and cream.',
    price: 349,
    category: 'Main Course',
    isVeg: true,
    spiceLevel: 1,
    image: FOOD_IMAGES['Dal Makhani'],
    fallbackImage: 'https://picsum.photos/seed/dal/800/600',
    isSpecial: true
  },
  {
    id: 'm3',
    name: 'Palak Paneer',
    description: 'Paneer cubes in a smooth, spiced spinach gravy.',
    price: 369,
    category: 'Main Course',
    isVeg: true,
    spiceLevel: 2,
    image: FOOD_IMAGES['Palak Paneer'],
    fallbackImage: 'https://picsum.photos/seed/palak/800/600'
  },
  {
    id: 'm4',
    name: 'Mutton Rogan Josh',
    description: 'Classic Kashmiri lamb curry with aromatic spices.',
    price: 549,
    category: 'Main Course',
    isVeg: false,
    spiceLevel: 3,
    image: FOOD_IMAGES['Mutton Rogan Josh'],
    fallbackImage: 'https://picsum.photos/seed/mutton/800/600'
  },
  {
    id: 'm5',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with spiced chicken and herbs.',
    price: 499,
    category: 'Main Course',
    isVeg: false,
    spiceLevel: 2,
    image: FOOD_IMAGES['Chicken Biryani'],
    fallbackImage: 'https://picsum.photos/seed/biryani/800/600',
    isSpecial: true
  },
  {
    id: 'm6',
    name: 'Chole Bhature',
    description: 'Spiced chickpeas served with deep-fried leavened bread.',
    price: 299,
    category: 'Main Course',
    isVeg: true,
    spiceLevel: 2,
    image: FOOD_IMAGES['Chole Bhature'],
    fallbackImage: 'https://picsum.photos/seed/chole/800/600'
  },

  // DRINKS
  {
    id: 'd1',
    name: 'Mango Lassi',
    description: 'Creamy yogurt drink blended with sweet mango pulp.',
    price: 149,
    category: 'Drinks',
    isVeg: true,
    spiceLevel: 0,
    image: FOOD_IMAGES['Mango Lassi'],
    fallbackImage: 'https://picsum.photos/seed/mango/800/600'
  },
  {
    id: 'd2',
    name: 'Masala Chai',
    description: 'Traditional Indian tea brewed with aromatic spices and milk.',
    price: 79,
    category: 'Drinks',
    isVeg: true,
    spiceLevel: 0,
    image: FOOD_IMAGES['Masala Chai'],
    fallbackImage: 'https://picsum.photos/seed/chai/800/600'
  },
  {
    id: 'd3',
    name: 'Rose Sharbat',
    description: 'Refreshing cool drink with rose syrup and basil seeds.',
    price: 129,
    category: 'Drinks',
    isVeg: true,
    spiceLevel: 0,
    image: FOOD_IMAGES['Rose Sharbat'],
    fallbackImage: 'https://picsum.photos/seed/rose/800/600'
  },
  {
    id: 'd4',
    name: 'Thandai',
    description: 'Traditional cold drink prepared with a mixture of almonds, fennel seeds, and rose petals.',
    price: 159,
    category: 'Drinks',
    isVeg: true,
    spiceLevel: 0,
    image: FOOD_IMAGES['Thandai'],
    fallbackImage: 'https://picsum.photos/seed/thandai/800/600'
  }
];
