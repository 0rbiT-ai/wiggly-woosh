export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed: string;
  age: number;
}

export interface HealthRecord {
  id: string;
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
  category: 'Food' | 'Accessories' | 'Health';
  image: string;
  rating: number;
}

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  date: string;
}

export interface Vet {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  verified: boolean;
  image: string;
}
