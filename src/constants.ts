import { HealthRecord, Product, ForumPost, Vet } from './types';

export const MOCK_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: '1',
    date: 'Jul 26, 2025',
    type: 'Vaccination',
    title: 'Rabies',
    description: 'Annual booster shot',
    status: 'Completed',
  },
  {
    id: '2',
    date: 'Aug 8, 2025',
    type: 'Vaccination',
    title: 'DHPP',
    description: 'Core vaccination',
    status: 'Scheduled',
  },
  {
    id: '3',
    date: 'Dec 12, 2024',
    type: 'Lab Report',
    title: 'Blood Test Results',
    description: 'Routine checkup results',
    status: 'Completed',
  },
  {
    id: '4',
    date: 'Dec 12, 2024',
    type: 'Prescription',
    title: 'Antibiotic Prescription',
    description: 'For minor skin infection',
    status: 'Completed',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Kibble',
    price: 45.99,
    category: 'Food',
    image: 'https://picsum.photos/seed/petfood/400/400',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Orthopedic Bed',
    price: 89.00,
    category: 'Accessories',
    image: 'https://picsum.photos/seed/petbed/400/400',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Interactive Toy',
    price: 15.50,
    category: 'Accessories',
    image: 'https://picsum.photos/seed/pettoy/400/400',
    rating: 4.5,
  },
  {
    id: '4',
    name: 'Organic Treats',
    price: 12.99,
    category: 'Food',
    image: 'https://picsum.photos/seed/pettreats/400/400',
    rating: 4.7,
  },
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    author: 'Sarah J.',
    title: 'Best food for sensitive stomachs?',
    content: 'My golden retriever has been having some issues lately. Any recommendations for gentle kibble?',
    likes: 24,
    comments: 12,
    tags: ['Nutrition', 'Golden Retriever'],
    date: '2 hours ago',
  },
  {
    id: '2',
    author: 'Mike D.',
    title: 'Training tips for new puppies',
    content: 'Just got a 10-week old lab. Looking for advice on crate training!',
    likes: 45,
    comments: 30,
    tags: ['Training', 'Puppy'],
    date: '5 hours ago',
  },
];

export const MOCK_VETS: Vet[] = [
  {
    id: '1',
    name: 'Happy Paws Clinic',
    specialty: 'General Practice',
    distance: '1.2 miles',
    rating: 4.9,
    verified: true,
    image: 'https://picsum.photos/seed/vet1/400/400',
  },
  {
    id: '2',
    name: 'City Vet Hospital',
    specialty: 'Emergency Care',
    distance: '2.5 miles',
    rating: 4.7,
    verified: true,
    image: 'https://picsum.photos/seed/vet2/400/400',
  },
];
