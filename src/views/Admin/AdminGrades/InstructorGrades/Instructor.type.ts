export interface Instructor {
    id: number;
    name: string;
    image: string;
    email: string;
    work_as: string;
    department: string;
    rating: {
        total_rating: number;
        total_vote: number;
        rating: number;
        ratings: {
            helpful: number;
            easiness: number;
            clarity: number;
        },
        ratings_overall?: number;
    }
}