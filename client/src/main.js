import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// Create app instance 
const app = createApp(App);

// Apply vue router
app.use(router);

// Mount app to #app div
app.mount("#app");
