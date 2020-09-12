<template>
  <div class="page wiki">
    <h1>{{ state.article.fullTitle }}</h1>
    <tool-links :fullTitle="state.article.fullTitle" />
    <div
      class="error-article-not-found"
      v-if="state.error === 'ARTICLE_NOT_FOUND'"
    >
      Could not find the article "{{ state.article.fullTitle }}".
    </div>
    <wiki-content v-else :html="state.article.html" />
  </div>
</template>

<script lang="ts">
import ToolLinks from "@/components/ToolLinks.vue";
import WikiContent from "@/components/WikiContent.vue";
import { request } from "@/utils/request";
import { reactive, onMounted, defineComponent, watch } from "vue";
import router from "@/router";
import { onBeforeRouteUpdate } from "vue-router";

export default defineComponent({
  components: {
    ToolLinks,
    WikiContent
  },
  setup() {
    const { currentRoute } = router;

    const state = reactive({
      error: "",
      article: {
        fullTitle: "",
        html: ""
      }
    });

    const loadData = async () => {
      try {
        state.error = "";
        const { data } = await request.get(
          `articles/${currentRoute.value.params.fullTitle}?fields[]=html`
        );
        state.article.fullTitle = data.data.fullTitle;
        state.article.html = data.data.html;
      } catch (err) {
        state.article.fullTitle = currentRoute.value.params.fullTitle as string;
        if (err.response.status === 404) {
          state.error = "ARTICLE_NOT_FOUND";
        }
      }
    };

    onMounted(loadData);

    watch(currentRoute, loadData);

    return {
      state
    };
  }
});
</script>
