import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/admin/live',
      name: 'live',
      component: () => import('../views/Admin/AdminLive/AdminLiveView.vue')
    },
    {
      path: '/admin/event',
      name: 'admin-event',
      component: () => import('../views/Admin/AdminEvent/AdminEvent.vue')
    },
    {
      path: '/admin/event-detail/:id',
      name: 'admin-event-detail',
      component: () => import('../views/Admin/AdminEvent/AdminEventDetail/AdminEventDetail.vue')
    },
    {
      path: '/admin/attendance',
      name: 'admin-attendance',
      component: () => import('../views/Admin/AdminAttendance/AdminAttendance.vue')
    },
    {
      path: '/admin/progress/student',
      name: 'admin-progress-student',
      component: () => import('../views/Admin/AdminStudentProgress/AdminStudentProgress.vue')
    },
    {
      path: '/admin/instructor-grade',
      name: 'admin-instructor-grade',
      component: () => import('../views/Admin/AdminGrades/InstructorGrades/InstructorGrades.vue')
    },
    {
      path: '/admin/message/instructor/:id',
      name: 'admin-instructor-message-grade',
      component: () => import('../views/Admin/AdminGrades/InstructorGrades/InstructorGradesMessage/InstructorGradesMessage.vue'),
      props: true
    },
    {
      path: '/admin/course-grade',
      name: 'admin-course-grade',
      component: () => import('../views/Admin/AdminGrades/StudentGrades/CourseGrades.vue')
    },
    {
      path: '/admin/course-grade/:course/student',
      name: 'admin-course-grade-student',
      component: () => import('../views/Admin/AdminGrades/StudentGrades/StudentCourseGrades.vue')
    },
    {
      path: '/admin/message/student/:id',
      name: 'admin-student-message-grade',
      component: () => import('../views/Admin/AdminGrades/StudentGrades/StudentGradesMessage/StudentGradesMessage.vue'),
      props: true
    },
    {
      path: '/admin/create',
      name: 'admin-create',
      component: () => import('../views/Admin/AdminCreate/AdminCreate.vue'),
      children: [
        {
          path: '',
          name: 'admin-create-root',
          component: () => import('../views/Admin/AdminCreate/Course/CourseList/CourseList.vue')
        },
        // Course
        {
          path: '/admin/create/course',
          name: 'admin-create-course-list',
          component: () => import('../views/Admin/AdminCreate/Course/CourseList/CourseList.vue')
        },
        {
          path: '/admin/create/course/add',
          name: 'admin-create-course-add',
          component: () => import('../views/Admin/AdminCreate/Course/CourseCreate/CourseCreate.vue')
        },
        // Question
        {
          path: '/admin/create/question',
          name: 'admin-create-question-list',
          component: () => import('../views/Admin/AdminCreate/Question/QuestionList/QuestionList.vue')
        },
        {
          path: '/admin/create/question/add',
          name: 'admin-create-question-add',
          component: () => import('../views/Admin/AdminCreate/Question/QuestionCreate/QuestionCreate.vue')
        },
        // Material
        {
          path: '/admin/create/material',
          name: 'admin-create-material-list',
          component: () => import('../views/Admin/AdminCreate/Material/MaterialList/MaterialList.vue')
        },
        {
          path: '/admin/create/material/add',
          name: 'admin-create-material-add',
          component: () => import('../views/Admin/AdminCreate/Material/MaterialCreate/MaterialCreate.vue')
        },
        // Instructor
        {
          path: '/admin/create/instructor',
          name: 'admin-create-instructor-list',
          component: () => import('../views/Admin/AdminCreate/Instructor/InstructorList/InstructorList.vue')
        },
        {
          path: '/admin/create/instructor/add',
          name: 'admin-create-instructor-add',
          component: () => import('../views/Admin/AdminCreate/Instructor/InstructorCreate/InstructorCreate.vue')
        },
        // Task
        {
          path: '/admin/create/task',
          name: 'admin-create-task-list',
          component: () => import('../views/Admin/AdminCreate/Task/TaskList/TaskList.vue')
        },
        {
          path: '/admin/create/task/add',
          name: 'admin-create-task-add',
          component: () => import('../views/Admin/AdminCreate/Task/TaskCreate/TaskCreate.vue')
        },
      ]
    },

  ]
})

export default router
