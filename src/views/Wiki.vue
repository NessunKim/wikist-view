<template>
  <div class="page wiki">
    <h1>{{ article.fullTitle }}</h1>
    <div v-html="article.html" />
  </div>
</template>

<script lang="ts">
import { request } from "@/utils/request";
import { reactive, onMounted, defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  setup() {
    const { currentRoute } = router;

    const article = reactive({
      fullTitle: "",
      html: ""
    });

    onMounted(async () => {
      const { data } = await request.get(
        `articles/${currentRoute.value.params.fullTitle}`
      );
      article.fullTitle = data.result.fullTitle;
      article.html = data.result.html;
    });

    return {
      article
    };
  }
});
</script>
