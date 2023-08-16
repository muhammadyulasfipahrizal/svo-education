interface Course {
  name: string;
  review: number;
  rating: number;
  totalHour: number;
  lecturers: number;
  level: string;
  price: number;
  priceWas?: number;
  totalCompleted: number;
  image: string;
}

export interface Instructor {
  id: number;
  name: string;
  about?: string;
  role?: string;
  image: string;
  branch: string;
  enrolled: string;
  course: Course[]
}