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
        enrollment: Math.round(Math.random() * 100),
        image: '/assets/img/course/ui-ux-design.png',
        startDate: '27 mar 2023',
        endDate: '3 apr 2023',
        duration: '2W',
        progress: Math.round(Math.random() * 100)

    },
    {
        id: 3,
        name: "FINANCE",
        instructor: 'James Smith',
        attandance: 100,
        position: 2,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 140000,
        enrollment: Math.round(Math.random() * 100),
        image: '/assets/img/course/finance.png',
        startDate: '27 mar 2023',
        endDate: '3 apr 2023',
        duration: '2W',
        progress: Math.round(Math.random() * 100)

    },
    {
        id: 4,
        name: "AI INTELLIGENCE",
        instructor: 'Rain James',
        attandance: 100,
        position: 3,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 130000,
        enrollment: Math.round(Math.random() * 100),
        image: '/assets/img/course/ai-inteligence.png',
        startDate: '27 mar 2023',
        endDate: '3 apr 2023',
        duration: '2W',
        progress: Math.round(Math.random() * 100)
    },
    {
        id: 5,
        name: "MARKETING",
        instructor: 'Rain James',
        attandance: 100,
        position: 3,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 130000,
        enrollment: Math.round(Math.random() * 100),
        image: '/assets/img/course/marketing.png',
        startDate: '3 apr 2023',
        endDate: '8 apr 2023',
        duration: '5D',
        progress: Math.round(Math.random() * 100)
    },
    {
        id: 6,
        name: "CONTENT WRITER",
        instructor: 'Rain James',
        attandance: 100,
        position: 3,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 130000,
        enrollment: Math.round(Math.random() * 100),
        image: '/assets/img/course/content-writer.jpeg',
        startDate: '12 jun 2023',
        endDate: '3 jul 2023',
        duration: '3W',
        progress: Math.round(Math.random() * 100)
    },

    {
        id: 7,
        name: "GAMING",
        instructor: 'Rain James',
        attandance: 100,
        position: 3,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 130000,
        enrollment: Math.round(Math.random() * 100),
        image: '/assets/img/course/gaming.jpeg',
        startDate: '21 aug 2023',
        endDate: '21 aug 2024',
        duration: '1Y',
        progress: Math.round(Math.random() * 100)
    },
    {
        id: 8,
        name: "INFO TECHNOLOGY",
        instructor: 'Rain James',
        attandance: 100,
        position: 3,
        rating: {
            total_rating: 10000,
            rating: 4.5,
        },
        enrolled: 130000,
        enrollment: Math.round(Math.random() * 100),
        image: '/assets/img/course/technology.png',
        startDate: '9 sep 2023',
        endDate: '10 sep 2024',
        duration: '1D',
        progress: Math.round(Math.random() * 100)
    },

]

export const instructorDummyData: Instructor[] = [
    {
        id: 1,
        position: 1,
        name: "David Burn",
        rating: 100,
        enrolled: 10,
        image: '/assets/img/avatar/avatar-1.jpeg',
    },
    {
        id: 1,
        position: 2,
        name: "Edison Chan",
        rating: 99,
        enrolled: 9,
        image: '/assets/img/avatar/avatar-2.jpeg',
    },
    {
        id: 1,
        position: 3,
        name: "Pamela Tracy",
        rating: 98,
        enrolled: 8,
        image: '/assets/img/avatar/avatar-3.jpeg',
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
    {
        id: 2,
        position: 2,
        name: "Isabel Trey",
        rating: 99,
        enrolled: 9,
        image: '/assets/img/student/student-02.png',
    },
    {
        id: 3,
        position: 3,
        name: "Ken Troy",
        rating: 98,
        enrolled: 8,
        image: '/assets/img/student/student-03.png',
    },

]

export const activitiesDummyData: Activities[] = [
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions',
        checked: true
    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys',
        checked: false
    },
    {
        id: 3,
        start_time: '10:00',
        end_time: '12:00',
        activity: 'Set reminders for contract renewals',
        checked: false
    },
    {
        id: 4,
        start_time: '13:00',
        end_time: '14:00',
        activity: 'Client meeting',
        checked: false
    },
    {
        id: 5,
        start_time: '14:00',
        end_time: '15:00',
        activity: 'Find supplier for updates',
        checked: false
    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys',
        checked: false
    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions',
        checked: false
    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys',
        checked: false
    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions',
        checked: false
    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys',
        checked: false
    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions',
        checked: false
    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys',
        checked: false
    },
    {
        id: 1,
        start_time: '08:00',
        end_time: '10:00',
        activity: 'Plan CRM training sessions',
        checked: false
    },
    {
        id: 2,
        start_time: '09:00',
        end_time: '10:00',
        activity: 'Conduct customer feedback surveys',
        checked: false
    },
];