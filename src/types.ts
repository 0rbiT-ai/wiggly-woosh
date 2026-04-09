export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed: string;
  age: number;
}

export interface HealthRecord {
  id: string;
  petName: string;
  date: string;
  type: 'Vaccination' | 'Lab Report' | 'Prescription' | 'Checkup';
  title: string;
  description: string;
  status: 'Due' | 'Scheduled' | 'Completed' | 'Missed';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Food' | 'Accessories' | 'Health' | 'Grooming';
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  stock: number;
  badge?: 'Best Seller' | 'New' | 'Sale' | 'Limited';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  date: string;
  isLiked?: boolean;
}

export interface Vet {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  image: string;
  phone: string;
  hours: string;
  services: string[];
}

export interface BookingRequest {
  vetId: string;
  vetName: string;
  petName: string;
  date: string;
  time: string;
  notes: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}
