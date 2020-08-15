import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "uikit/dist/js/uikit";
import "uikit/dist/js/uikit-icons";

createApp(App)
  .use(router)
  .mount("#app");
