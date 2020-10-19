import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/pixi",
    name: "PIXIExample",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PIXI.vue")
  },
  {
    path: "/canvas",
    name: "CanvasExample",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CanvasExample.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
