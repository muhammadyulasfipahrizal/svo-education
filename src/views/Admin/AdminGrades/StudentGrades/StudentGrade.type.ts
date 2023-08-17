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
        image: "/assets/img/student/student-02.png",
        city_branch: "Los Angeles",
        upline: 5678
    },
    {
        id: 3,
        name: "David Johnson",
        email: "davidjohnson@example.com",
        image: "/assets/img/student/student-03.png",
        city_branch: "Chicago",
        upline: 9012
    },
    {
        id: 4,
        name: "Sarah Williams",
        email: "sarahwilliams@example.com",
        image: "/assets/img/student/student-04.jpeg",
        city_branch: "Houston",
        upline: 3456
    },
    {
        id: 5,
        name: "Michael Brown",
        email: "michaelbrown@example.com",
        image: "/assets/img/student/student-05.jpeg",
        city_branch: "San Francisco",
        upline: 7890
    },
    {
        id: 6,
        name: "Emily Davis",
        email: "emilydavis@example.com",
        image: "/assets/img/student/student-06.jpeg",
        city_branch: "Miami",
        upline: 2345
    },
    {
        id: 7,
        name: "Daniel Taylor",
        email: "danieltaylor@example.com",
        image: "/assets/img/student/student-07.jpeg",
        city_branch: "Seattle",
        upline: 6789
    },
    {
        id: 8,
        name: "Olivia Anderson",
        email: "oliviaanderson@example.com",
        image: "/assets/img/student/student-08.jpeg",
        city_branch: "Dallas",
        upline: 1234
    },
    {
        id: 9,
        name: "James Martinez",
        email: "jamesmartinez@example.com",
        image: "/assets/img/student/student-09.jpeg",
        city_branch: "Atlanta",
        upline: 5678
    },
    {
        id: 10,
        name: "Sophia Thomas",
        email: "sophiathomas@example.com",
        image: "/assets/img/student/student-10.jpeg",
        city_branch: "Boston",
        upline: 9012
    },
    {
        id: 11,
        name: "Liam Wilson",
        email: "liamwilson@example.com",
        image: "/assets/img/student/student.png",
        city_branch: "Denver",
        upline: 3456
      },
      {
        id: 12,
        name: "Ava Johnson",
        email: "avajohnson@example.com",
        image: "/assets/img/student/student-02.png",
        city_branch: "Phoenix",
        upline: 7890
      },
      {
        id: 13,
        name: "Noah Smith",
        email: "noahsmith@example.com",
        image: "/assets/img/student/student-03.png",
        city_branch: "Portland",
        upline: 2345
      },
      {
        id: 14,
        name: "Isabella Martinez",
        email: "isabellamartinez@example.com",
        image: "/assets/img/student/student-4.jpeg",
        city_branch: "San Diego",
        upline: 6789
      },
      {
        id: 15,
        name: "Ethan Davis",
        email: "ethandavis@example.com",
        image: "/assets/img/student/student-05.jpeg",
        city_branch: "Philadelphia",
        upline: 1234
      },
      {
        id: 16,
        name: "Mia Taylor",
        email: "miataylor@example.com",
        image: "/assets/img/student/student-06.jpeg",
        city_branch: "Austin",
        upline: 5678
      },
      {
        id: 17,
        name: "Oliver Anderson",
        email: "oliveranderson@example.com",
        image: "/assets/img/student/student-07.jpeg",
        city_branch: "Minneapolis",
        upline: 9012
      },
      {
        id: 18,
        name: "Amelia Martinez",
        email: "ameliamartinez@example.com",
        image: "/assets/img/student/student-08.jpeg",
        city_branch: "Charlotte",
        upline: 3456
      },
      {
        id: 19,
        name: "Elijah Thomas",
        email: "elijahthomas@example.com",
        image: "/assets/img/student/student-09.jpeg",
        city_branch: "Nashville",
        upline: 7890
      },
      {
        id: 20,
        name: "Avery Brown",
        email: "averybrown@example.com",
        image: "/assets/img/student/student-10.jpeg",
        city_branch: "Las Vegas",
        upline: 2345
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
    },
    {
        id: 4,
        name: "Content Writer",
        image: "/assets/img/course/content-writer.jpeg"
    },
    {
        id: 5,
        name: "Gaming",
        image: "/assets/img/course/gaming.jpeg"
    },
    {
        id: 5,
        name: "Info Technology",
        image: "/assets/img/course/technology.png"
    },
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
