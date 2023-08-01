export interface Course {
    id: number;
    name: string;
    instructor: string;
    attandance: number;
    position: number;
    rating: {
        total_rating: number;
        rating: number;
    },
    enrolled: number;
    image: string;
}

export interface Instructor {
    id: number;
    position: number;
    name: string;
    rating: number
    enrolled: number;
    image: string;
}

export interface Student {
    id: number;
    position: number;
    name: string;
    rating: number
    enrolled: number;
    image: string;
}

export interface Activities {
    id: number;
    start_time: string;
    end_time: string;
    activity: string;
}

