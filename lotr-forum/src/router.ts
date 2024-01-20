import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {"path": "/", component: () => import("./views/PokemonListPage.vue") },
    {"path": "/pokemon/:name", name: "pokemon-details", component: () => import("./views/PokemonDetailsPage.vue") }
];

export const router = createRouter({history: createWebHistory(), routes});
