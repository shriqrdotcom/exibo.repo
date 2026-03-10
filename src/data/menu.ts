import { MenuItem } from '../context/CartContext';
import { FOOD_IMAGES, FALLBACK_IMAGES } from './images';

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
    fallbackImage: FALLBACK_IMAGES['Paneer Tikka']
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
    fallbackImage: FALLBACK_IMAGES['Chicken Seekh Kebab']
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
    fallbackImage: FALLBACK_IMAGES['Hara Bhara Kebab']
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
    fallbackImage: FALLBACK_IMAGES['Crispy Corn Chaat']
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
    fallbackImage: FALLBACK_IMAGES['Dahi Puri']
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
    fallbackImage: FALLBACK_IMAGES['Tandoori Mushroom']
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
    fallbackImage: FALLBACK_IMAGES['Butter Chicken'],
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
    fallbackImage: FALLBACK_IMAGES['Dal Makhani'],
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
    fallbackImage: FALLBACK_IMAGES['Palak Paneer']
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
    fallbackImage: FALLBACK_IMAGES['Mutton Rogan Josh']
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
    fallbackImage: FALLBACK_IMAGES['Chicken Biryani'],
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
    fallbackImage: FALLBACK_IMAGES['Chole Bhature']
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
    fallbackImage: FALLBACK_IMAGES['Mango Lassi']
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
    fallbackImage: FALLBACK_IMAGES['Masala Chai']
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
    fallbackImage: FALLBACK_IMAGES['Rose Sharbat']
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
    fallbackImage: FALLBACK_IMAGES['Thandai']
  }
];
