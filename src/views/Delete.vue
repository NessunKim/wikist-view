<template>
  <div class="page delete">
    <h1>{{ state.article.fullTitle }}</h1>
    <tool-links :fullTitle="state.article.fullTitle" />
    <div
      class="error-article-not-found"
      v-if="state.error === 'ARTICLE_NOT_FOUND'"
    >
      Could not find the article "{{ state.article.fullTitle }}".
    </div>
    <form>
      <fieldset class="uk-fieldset">
        <div class="uk-margin">
          <input
            v-model="state.form.comment"
            class="uk-input"
            type="text"
            placeholder="Comment"
          />
        </div>
      </fieldset>
    </form>
    <p class="uk-flex uk-flex-between" uk-margin>
      <button @click="save" class="uk-button uk-button-danger">
        Delete
      </button>
      <router-link
        class="uk-button uk-button-default"
        :to="`/wiki/${state.article.fullTitle}`"
      >
        Cancel
      </router-link>
    </p>
  </div>
</template>

<script lang="ts">
import ToolLinks from "@/components/ToolLinks.vue";
import { request } from "@/utils/request";
import { reactive, onMounted, defineComponent, watch } from "vue";
import router from "@/router";

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
      form: {
        comment: ""
      },
      error: ""
    });

    const save = async () => {
      await request.delete(`articles/${state.article.fullTitle}`, {
        data: {
          comment: state.form.comment
        }
      });
      router.push(`/wiki/${state.article.fullTitle}`);
    };

    const loadData = async () => {
      state.article.fullTitle = currentRoute.value.params.fullTitle as string;
      state.form.comment = "";
      state.error = "";

      try {
        const {
          data: { data: article }
        } = await request.get(
          `articles/${currentRoute.value.params.fullTitle}`
        );
        state.article.fullTitle = article.fullTitle;
      } catch (error) {
        if (error.response.status === 404) {
          state.error = "ARTICLE_NOT_FOUND";
        }
      }
    };

    onMounted(loadData);
    watch(currentRoute, loadData);

    return {
      state,
      save
    };
  }
});
</script>
