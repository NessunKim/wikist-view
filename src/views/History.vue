<template>
  <div class="page history">
    <h1>{{ state.article.fullTitle }}</h1>
    <tool-links :fullTitle="state.article.fullTitle" />
    <ul>
      <li v-for="rev in state.revisions" :key="rev.id">
        <span class="created-at">
          {{ rev.createdAt.format("llll") }}
        </span>
        <span class="comment">
          {{ rev.comment }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import ToolLinks from "@/components/ToolLinks.vue";
import { request } from "@/utils/request";
import router from "@/router";
import { reactive, onMounted, defineComponent, watch } from "vue";
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
      revisions: [],
      error: ""
    });

    const loadData = async () => {
      state.article.fullTitle = currentRoute.value.params.fullTitle as string;
      state.revisions = [];
      state.error = "";

      try {
        const {
          data: { data: article }
        } = await request.get(
          `articles/${currentRoute.value.params.fullTitle}`
        );
        state.article.fullTitle = article.fullTitle;
        const {
          data: { data: revisions }
        } = await request.get(`articles/${article.fullTitle}/revisions`);
        revisions.reverse();
        state.revisions = revisions.map(
          (rev: { id: number; comment: string; createdAt: string }) => ({
            id: rev.id,
            createdAt: moment(rev.createdAt),
            comment: rev.comment
          })
        );
      } catch (error) {
        if (error.response.status === 404) {
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

<style lang="scss" scoped>
.comment {
  margin-left: 0.5em;
}
</style>
