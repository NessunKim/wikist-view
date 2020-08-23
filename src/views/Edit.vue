<template>
  <div class="page wiki">
    <h1>{{ state.article.fullTitle }}</h1>
    <tool-links :fullTitle="state.article.fullTitle" />
    <form>
      <fieldset class="uk-fieldset">
        <textarea
          v-model="state.article.wikitext"
          class="uk-textarea"
          rows="10"
        ></textarea>
      </fieldset>
    </form>
    <p class="uk-flex uk-flex-between" uk-margin>
      <button @click="save" class="uk-button uk-button-primary">
        Save
      </button>
      <router-link
        class="uk-button uk-button-danger"
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
        wikitext: ""
      },
      isNew: false
    });

    const save = async () => {
      if (state.isNew) {
        await request.post(`articles`, {
          fullTitle: state.article.fullTitle,
          wikitext: state.article.wikitext
        });
      } else {
        await request.put(`articles/${state.article.fullTitle}`, {
          wikitext: state.article.wikitext
        });
      }
      router.push(`/wiki/${state.article.fullTitle}`);
    };

    onMounted(async () => {
      try {
        const {
          data: { data: article }
        } = await request.get(
          `articles/${currentRoute.value.params.fullTitle}?fields[]=wikitext`
        );
        state.article.fullTitle = article.fullTitle;
        state.article.wikitext = article.wikitext;
      } catch (error) {
        if (error.response.status === 404) {
          state.article.fullTitle = currentRoute.value.params
            .fullTitle as string;
          state.isNew = true;
        }
      }
    });

    return {
      state,
      save
    };
  }
});
</script>
