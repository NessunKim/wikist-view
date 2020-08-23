import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/wiki/:fullTitle",
    name: "Wiki",
    component: () => import(/* webpackChunkName: "wiki" */ "../views/Wiki.vue")
  },
  {
    path: "/edit/:fullTitle",
    name: "Edit",
    component: () => import(/* webpackChunkName: "edit" */ "../views/Edit.vue")
  },
  {
    path: "/history/:fullTitle",
    name: "History",
    component: () =>
      import(/* webpackChunkName: "history" */ "../views/History.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
