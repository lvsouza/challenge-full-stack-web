import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import StudentsDetail from '../views/students/StudentsDetail.vue';
import StudentsPage from '../views/students/Students.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Dashboard,
    meta: {
      title: 'Página inicial',
    }
  },
  {
    path: '/alunos',
    component: StudentsPage,
    meta: {
      title: 'Consulta de alunos',
    }
  },
  {
    path: '/alunos/:id',
    component: StudentsDetail,
    meta: {
      title: 'Cadastro de aluno',
    }
  },
];

const router = new VueRouter(
  {
    base: process.env.BASE_URL,
    mode: 'history',
    routes,
  },
);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});

export default router;
