export interface IStudent {
    id: string;
    name: string;
    email: string;
    progress: number;
    percentage: number;
    passFail: 'pass' | 'fail' | 'none';
    attendance: number;
    image: string;
    days: string[];
}

export const mockStudentProgress: IStudent[] = [
    {
        id: '1',
        name: 'John Tason',
        email: 'JohnToson@gmail.com',
        progress: 100,
        percentage: 80,
        passFail: 'pass',
        attendance: 5,
        image: '/assets/img/student/student.png',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '2',
        name: 'Isabel Tray',
        email: 'IsabelT@gmail.com',
        progress: 100,
        percentage: 100,
        passFail: 'pass',
        attendance: 4,
        image: '/assets/img/student/student-02.png',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '3',
        name: 'Ken Troy',
        email: 'kentroy@gmail.com',
        progress: 100,
        percentage: 100,
        passFail: 'pass',
        attendance: 4,
        image: '/assets/img/student/student-03.png',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '4',
        name: 'Rachel May',
        email: 'RachelMay@gmail.com',
        progress: 100,
        percentage: 100,
        passFail: 'fail',
        attendance: 4,
        image: '/assets/img/student/student-04.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '5',
        name: 'Kenny Matthew',
        email: 'KenMatt@gmail.com',
        progress: 90,
        percentage: 100,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-05.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '6',
        name: 'Charles Young',
        email: 'CharlesYoung@gmail.com',
        progress: 90,
        percentage: 70,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-06.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '7',
        name: 'Zac Jordan',
        email: 'ZJordan@gmail.com',
        progress: 80,
        percentage: 80,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-07.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '8',
        name: 'Melody Hannah',
        email: 'MHannah@gmail.com',
        progress: 80,
        percentage: 80,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-08.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    }, {
        id: '9',
        name: 'Rachel Lorrey',
        email: 'RachelLorey@gmail.com',
        progress: 70,
        percentage: 70,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-09.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '10',
        name: 'Jennifer Pan',
        email: 'JenPan@gmail.com',
        progress: 50,
        percentage: 50,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-10.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },

    {
        id: '11',
        name: 'John Tason',
        email: 'JohnToson@gmail.com',
        progress: 100,
        percentage: 80,
        passFail: 'pass',
        attendance: 5,
        image: '/assets/img/student/student.png',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '13',
        name: 'Ken Troy',
        email: 'kentroy@gmail.com',
        progress: 100,
        percentage: 100,
        passFail: 'pass',
        attendance: 4,
        image: '/assets/img/student/student-03.png',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '12',
        name: 'Isabel Tray',
        email: 'IsabelT@gmail.com',
        progress: 100,
        percentage: 100,
        passFail: 'pass',
        attendance: 4,
        image: '/assets/img/student/student-02.png',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '16',
        name: 'Charles Young',
        email: 'CharlesYoung@gmail.com',
        progress: 90,
        percentage: 70,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-06.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '17',
        name: 'Zac Jordan',
        email: 'ZJordan@gmail.com',
        progress: 80,
        percentage: 80,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-07.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '14',
        name: 'Rachel May',
        email: 'RachelMay@gmail.com',
        progress: 100,
        percentage: 100,
        passFail: 'fail',
        attendance: 4,
        image: '/assets/img/student/student-04.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '15',
        name: 'Kenny Matthew',
        email: 'KenMatt@gmail.com',
        progress: 90,
        percentage: 100,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-05.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '18',
        name: 'Melody Hannah',
        email: 'MHannah@gmail.com',
        progress: 80,
        percentage: 80,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-08.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    }, {
        id: '19',
        name: 'Rachel Lorrey',
        email: 'RachelLorey@gmail.com',
        progress: 70,
        percentage: 70,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-09.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
    {
        id: '20',
        name: 'Jennifer Pan',
        email: 'JenPan@gmail.com',
        progress: 50,
        percentage: 50,
        passFail: 'none',
        attendance: 4,
        image: '/assets/img/student/student-10.jpeg',
        days: [
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
            'passed',
            'passed',
            'not passed',
            'not passed',
            'not passed',
        ],
    },
]