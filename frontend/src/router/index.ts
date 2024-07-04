import {createRouter, createWebHistory} from "@ionic/vue-router";
import {RouteRecordRaw} from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import TestPage from "../views/TestPage.vue";
import Login from "../views/LoginPage.vue";
import {getToken} from "@/services/storageService";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/tabs/home",
	},
	{
		path: "/tabs/",
		component: TabsPage,
		children: [
			{
				path: "",
				redirect: "/tabs/home",
			},
			{
				path: "home",
				component: () => import("@/views/TabHomepage.vue"),
			},
			{
				path: "navigate",
				component: () => import("@/views/TabNavigate.vue"),
			},
			{
				path: "search",
				component: () => import("@/views/TabAssets.vue"),
			},
		],
		meta: {requiresAuth: true},
	},
	{
		path: "/test/",
		component: TestPage,
	},
	{
		path: "/login",
		component: Login,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

// Required Auth routes check
router.beforeEach(async (to, from, next) => {
	const url = to.fullPath;
	const authToken = await getToken();

	const authRequired = to.matched.some((record) => record.meta.requiresAuth);

	if (authRequired && !authToken) {
		next("/login");
	} else {
		const existingState = history.state || {};
		history.replaceState({...existingState}, "", url);
		next();
	}
});

export default router;
