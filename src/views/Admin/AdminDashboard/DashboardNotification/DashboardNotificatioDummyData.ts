interface Massage {
    subject: string;
    time: string;
    verb: string;
    object: string;
}

interface Inotif {
    date: string;
    massage: Massage[];
}

export const notificationDummyData: Inotif[] = [
    {
        date: "08 Oct 2021",
        massage: [{
            subject: "Admin has",
            time: "12 minutes ago",
            verb: "added",
            object: "the course “UI UX Design”"
        },
        {
            subject: "Instructor has",
            time: "12 minutes ago",
            verb: "graded",
            object: "the course “UI UX Design”"
        },
        {
            subject: "Student has",
            time: "12 minutes ago",
            verb: "give comment",
            object: "for the course “UI UX Design”"
        },
        ]
    },
    {
        date: "07 Oct 2021",
        massage: [{
            subject: "Admin has",
            time: "12 minutes ago",
            verb: "added",
            object: "the course “UI UX Design”"
        },
        {
            subject: "Instructor has",
            time: "12 minutes ago",
            verb: "graded",
            object: "the course “UI UX Design”"
        },
        {
            subject: "Student has",
            time: "12 minutes ago",
            verb: "give comment",
            object: "for the course “UI UX Design”"
        },
        ]
    },
]