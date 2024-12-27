import { defineClientConfig } from "vuepress/client";
import Tip from './components/Tip.vue';
import ImageHover from "./components/ImageHover.vue";
import LyricAdjuster from "./components/tools/LyricAdjuster.vue";
import CharsetCvtor from "./components/tools/CharsetCvtor.vue";

export default defineClientConfig({
  enhance: ( { app, router, siteData } ) => {
    app.component('Tip', Tip)
      .component('ImageHover', ImageHover)
      .component('LyricAdjuster', LyricAdjuster)
      .component('CharsetCvtor', CharsetCvtor);
  }
})
