import type { Course, Instructor, Student, Activities } from "./Dashboard.type";

export const courseDummyData: Course[] = [
    {
        id: 1,
        name: "UI UX DESIGN",
        instructor: 'David Burn',
        attandance: 100,
        position: 1,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 150000,
        image: '/assets/img/course/ui-ux-design.png',
    },

]

export const instructorDummyData: Instructor[] = [
    {
        id: 1,
        position: 1,
        name: "David Burn",
        rating: 100,
        enrolled: 10,
        image: '/assets/img/instructor.png',
    },
]

export const studentDummyData: Student[] = [
    {
        id: 1,
        position: 1,
        name: "John Tason",
        rating: 100,
        enrolled: 100,
        image: '/assets/img/student/student.png',
    },

]

export const activitiesDummyData: Activities[] = [
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions'

    },
    {
        id: 2,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions'

    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions'

    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions'

    },
]