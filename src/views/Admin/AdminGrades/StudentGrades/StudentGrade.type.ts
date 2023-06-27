import type { ICourse } from "./CourseInterface";

export interface Student {
    id: number;
    name: string;
    email: string;
    image: string;
    city_branch: string;
    upline: number;
}
export interface IStudentGrade {
    id: number;
    student_id: number;
    student: Student;
    courses: {
        completion: number; // percentage
        course: ICourse;
    }[]
}

// Dummy data for students
export const students: Student[] = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "New York",
        upline: 1234
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "Los Angeles",
        upline: 5678
    },
    {
        id: 3,
        name: "David Johnson",
        email: "davidjohnson@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "Chicago",
        upline: 9012
    },
    {
        id: 4,
        name: "Sarah Williams",
        email: "sarahwilliams@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "Houston",
        upline: 3456
    },
    {
        id: 5,
        name: "Michael Brown",
        email: "michaelbrown@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "San Francisco",
        upline: 7890
    },
    {
        id: 6,
        name: "Emily Davis",
        email: "emilydavis@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "Miami",
        upline: 2345
    },
    {
        id: 7,
        name: "Daniel Taylor",
        email: "danieltaylor@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "Seattle",
        upline: 6789
    },
    {
        id: 8,
        name: "Olivia Anderson",
        email: "oliviaanderson@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "Dallas",
        upline: 1234
    },
    {
        id: 9,
        name: "James Martinez",
        email: "jamesmartinez@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "Atlanta",
        upline: 5678
    },
    {
        id: 10,
        name: "Sophia Thomas",
        email: "sophiathomas@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "Boston",
        upline: 9012
    }
];

// Dummy data for courses
export const courses: ICourse[] = [
    {
        id: 1,
        name: "UI UX Design",
        image: "/assets/img/course/ui-ux-design.png"
    },
    {
        id: 2,
        name: "Finance",
        image: "/assets/img/course/finance.png"
    },
    {
        id: 3,
        name: "Marketing",
        image: "/assets/img/course/marketing.png"
    }
];

// Generate student grades
export const studentGrades: IStudentGrade[] = students.map((student) => {
    const studentCourses = [];

    // Randomly select two courses for each student
    for (let i = 0; i < 2; i++) {
        const randomCourse = courses[Math.floor(Math.random() * courses.length)];
        const completionPercentage = Math.floor(Math.random() * 101); // Random percentage between 0 and 100

        studentCourses.push({
            completion: completionPercentage,
            course: randomCourse
        });
    }

    return {
        id: student.id,
        student_id: student.id,
        student: student,
        courses: studentCourses
    };
});

console.log(students);
console.log(courses);
console.log(studentGrades);
