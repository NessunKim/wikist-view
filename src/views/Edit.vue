<template>
  <div class="page wiki">
    <h1>{{ article.fullTitle }}</h1>
    <form>
      <fieldset class="uk-fieldset">
        <textarea
          v-model="article.wikitext"
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
        :to="`/wiki/${article.fullTitle}`"
      >
        Cancel
      </router-link>
    </p>
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
      wikitext: ""
    });

    const save = async () => {
      await request.put(`articles/${article.fullTitle}`, {
        wikitext: article.wikitext
      });
      router.push(`/wiki/${article.fullTitle}`);
    };

    onMounted(async () => {
      const { data } = await request.get(
        `articles/${currentRoute.value.params.fullTitle}?fields[]=wikitext`
      );
      article.fullTitle = data.result.fullTitle;
      article.wikitext = data.result.wikitext;
    });

    return {
      article,
      save
    };
  }
});
</script>
