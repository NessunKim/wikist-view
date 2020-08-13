import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/wiki/:fullTitle",
    name: "Wiki",
    component: () => import(/* webpackChunkName: "wiki" */ "../views/Wiki.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
