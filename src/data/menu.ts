import { MenuItem } from '../context/CartContext';

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
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop'
  },
  {
    id: 's2',
    name: 'Chicken Seekh Kebab',
    description: 'Minced chicken with herbs and spices, skewered and grilled.',
    price: 349,
    category: 'Starters',
    isVeg: false,
    spiceLevel: 3,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop'
  },
  {
    id: 's3',
    name: 'Hara Bhara Kebab',
    description: 'Spinach and green pea patties with aromatic spices.',
    price: 249,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400&h=300&fit=crop'
  },
  {
    id: 's4',
    name: 'Crispy Corn Chaat',
    description: 'Deep fried corn kernels tossed with onions, tomatoes and spices.',
    price: 199,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=400&h=300&fit=crop'
  },
  {
    id: 's5',
    name: 'Dahi Puri',
    description: 'Crispy shells filled with potatoes, yogurt, and tangy chutneys.',
    price: 179,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
  },
  {
    id: 's6',
    name: 'Tandoori Mushroom',
    description: 'Fresh mushrooms marinated in tandoori masala and grilled.',
    price: 279,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1541014741259-df549fa9ba6f?w=400&h=300&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1618161595730-3e8365da25ef?w=400&h=300&fit=crop'
  },
  {
    id: 'm4',
    name: 'Mutton Rogan Josh',
    description: 'Classic Kashmiri lamb curry with aromatic spices.',
    price: 549,
    category: 'Main Course',
    isVeg: false,
    spiceLevel: 3,
    image: 'https://images.unsplash.com/photo-1545243191-34802f75738c?w=400&h=300&fit=crop'
  },
  {
    id: 'm5',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with spiced chicken and herbs.',
    price: 499,
    category: 'Main Course',
    isVeg: false,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1626132646529-500637532537?w=400&h=300&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1571006682864-740315ee65d7?w=400&h=300&fit=crop'
  },
  {
    id: 'd2',
    name: 'Masala Chai',
    description: 'Traditional Indian tea brewed with aromatic spices and milk.',
    price: 79,
    category: 'Drinks',
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1544787210-2827448b303c?w=400&h=300&fit=crop'
  },
  {
    id: 'd3',
    name: 'Rose Sharbat',
    description: 'Refreshing cool drink with rose syrup and basil seeds.',
    price: 129,
    category: 'Drinks',
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1618161595730-3e8365da25ef?w=400&h=300&fit=crop'
  },
  {
    id: 'd4',
    name: 'Thandai',
    description: 'Traditional cold drink prepared with a mixture of almonds, fennel seeds, and rose petals.',
    price: 159,
    category: 'Drinks',
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?w=400&h=300&fit=crop'
  }
];
