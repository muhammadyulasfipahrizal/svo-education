import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Admin/AdminDashboard/AdminDashboard.vue')
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
      path: '/admin/event/:id',
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
      path: '/admin/progress/student/:courseId',
      name: 'admin-progress-student-detail',
      component: () => import('../views/Admin/AdminStudentProgress/AdminStudentProgressDetail.vue')
    },
    {
      path: '/admin/progress/guest',
      name: 'admin-progress-guest',
      component: () => import('../views/Admin/AdminGuestProgress/AdminGuestProgress.vue')
    },
    {
      path: '/admin/progress/guest/:courseId',
      name: 'admin-progress-guest-detail',
      component: () => import('../views/Admin/AdminGuestProgress/AdminGuestProgressDetail.vue')
    },
    {
      path: '/admin/grade/instructor',
      name: 'admin-instructor-grade',
      component: () => import('../views/Admin/AdminGrades/InstructorGrades/InstructorGrades.vue')
    },
    {
      path: '/admin/grade/instructor/:id/message',
      name: 'admin-instructor-message-grade',
      component: () => import('../views/Admin/AdminGrades/InstructorGrades/InstructorGradesMessage/InstructorGradesMessage.vue'),
      props: true
    },
    {
      path: '/admin/grade/course',
      name: 'admin-course-grade',
      component: () => import('../views/Admin/AdminGrades/StudentGrades/CourseGrades.vue')
    },
    {
      path: '/admin/grade/course/:course/student',
      name: 'admin-course-grade-student',
      component: () => import('../views/Admin/AdminGrades/StudentGrades/StudentCourseGrades.vue')
    },
    {
      path: '/admin/grade/student/:id/message',
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
    // Profile Instructor
    {
      path: '/admin/profile/instructors',
      name: 'admin-profile-instructors',
      component: () => import('../views/Admin/AdminProfile/Instructors/AdminProfileInstructors.vue'),
      meta: {
        pageName: 'Profile'
      }
    },
    {
      path: '/admin/profile/instructors/:id',
      name: 'admin-profile-instructors-view',
      component: () => import('../views/Admin/AdminProfile/Instructors/AdminProfileInstuctorView.vue'),
      meta: {
        pageName: 'Profile'
      }
    },
    {
      path: '/dashboard/calander',
      name: 'admin-dashboard-calander',
      component: () => import('../views/Admin/AdminDashboard/DashboardCalander/DasboardCalander.vue'),
    },
    {
      path: '/dashboard/cart',
      name: 'admin-dashboard-cart',
      component: () => import('../views/Admin/AdminDashboard/DashboardCart/DashboardCart.vue'),
    },
    {
      path: '/dashboard/cart/checkout',
      name: 'admin-dashboard-cart-checkout',
      component: () => import('../views/Admin/AdminDashboard/DashboardCart/CartCheckout/CartChekout.vue'),
    },
    {
      path: '/dashboard/settings',
      name: 'admin-dashboard-settings',
      component: () => import('../views/Admin/AdminDashboard/DashboardSettings/DashboardSettings.vue'),
    },
  ]
})

export default router
