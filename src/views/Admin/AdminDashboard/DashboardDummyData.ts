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
    {
        id: 2,
        name: "MARKETING",
        instructor: 'Kelly Knight',
        attandance: 100,
        position: 2,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 150000,
        image: '/assets/img/course/ui-ux-design.png',
    },
    {
        id: 3,
        name: "FINANCE",
        instructor: 'James Smith',
        attandance: 100,
        position: 3,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 140000,
        image: '/assets/img/course/finance.png',
    },
    {
        id: 4,
        name: "AI INTELLIGENCE",
        instructor: 'Rain James',
        attandance: 100,
        position: 4,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 130000,
        image: '/assets/img/course/ai-inteligence.png',
    },

]

export const instructorDummyData: Instructor[] = [
    {
        id: 1,
        position: 1,
        name: "David Burn",
        rating: 100,
        enrolled: 10,
        image: '/assets/img/instructor-2.png',
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
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys'

    },
    {
        id: 3,
        start_time: '10:00',
        end_time: '12:00',
        activity: 'Set reminders for contract renewals'

    },
    {
        id: 4,
        start_time: '13:00',
        end_time: '14:00',
        activity: 'Client meeting'

    },
    {
        id: 5,
        start_time: '14:00',
        end_time: '15:00',
        activity: 'Find supplier for updates'

    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys'

    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions'

    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys'

    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions'

    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys'

    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions'

    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys'

    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions'

    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys'

    },
]