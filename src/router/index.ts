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

  ]
})

export default router
