<template>
  <div class="page wiki">
    <h1>{{ state.article.fullTitle }}</h1>
    <tool-links :fullTitle="state.article.fullTitle" />
    <div v-for="rev in state.revisions" :key="rev.id">
      {{ rev.createdAt.format("llll") }}
    </div>
  </div>
</template>

<script lang="ts">
import ToolLinks from "@/components/ToolLinks.vue";
import { request } from "@/utils/request";
import router from "@/router";
import { reactive, onMounted, defineComponent } from "vue";
import moment from "moment";

export default defineComponent({
  components: {
    ToolLinks
  },
  setup() {
    const { currentRoute } = router;

    const state = reactive({
      article: {
        fullTitle: ""
      },
      revisions: []
    });

    onMounted(async () => {
      const {
        data: { data: article }
      } = await request.get(`articles/${currentRoute.value.params.fullTitle}`);
      state.article.fullTitle = article.fullTitle;
      const {
        data: { data: revisions }
      } = await request.get(`articles/${article.fullTitle}/revisions`);
      console.log(revisions);
      revisions.reverse();
      state.revisions = revisions.map(
        (rev: { id: number; createdAt: string }) => ({
          id: rev.id,
          createdAt: moment(rev.createdAt)
        })
      );
    });

    return {
      state
    };
  }
});
</script>
