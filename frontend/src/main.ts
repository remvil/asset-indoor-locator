import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";

import {IonIcon, IonicVue} from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// import "@ionic/vue/css/palettes/dark.always.css";
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
// import "@ionic/vue/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

import "vue3-openlayers/styles.css";

// import './registerServiceWorker.js';

import OpenLayersMap from "vue3-openlayers";

const app = createApp(App).use(IonicVue).use(router).use(OpenLayersMap /*, options */).component("ion-icon", IonIcon);

router.isReady().then(() => {
	app.mount("#app");
});
