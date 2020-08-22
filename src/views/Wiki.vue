<template>
  <div class="page wiki">
    <h1>{{ state.article.fullTitle }}</h1>
    <tool-links :fullTitle="state.article.fullTitle" />
    <div v-html="state.article.html" />
  </div>
</template>

<script lang="ts">
import ToolLinks from "@/components/ToolLinks.vue";
import { request } from "@/utils/request";
import { reactive, onMounted, defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  components: {
    ToolLinks
  },
  setup() {
    const { currentRoute } = router;

    const state = reactive({
      article: {
        fullTitle: "",
        html: ""
      }
    });

    onMounted(async () => {
      const { data } = await request.get(
        `articles/${currentRoute.value.params.fullTitle}?fields[]=html`
      );
      state.article.fullTitle = data.result.fullTitle;
      state.article.html = data.result.html;
    });

    return {
      state
    };
  }
});
</script>
