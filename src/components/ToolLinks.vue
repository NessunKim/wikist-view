<template>
  <p uk-margin>
    <router-link class="uk-button uk-button-default" :to="`/wiki/${fullTitle}`">
      Read
    </router-link>
    <router-link class="uk-button uk-button-default" :to="`/edit/${fullTitle}`">
      Edit
    </router-link>
    <router-link
      class="uk-button uk-button-default"
      :to="`/delete/${fullTitle}`"
    >
      Delete
    </router-link>
    <router-link
      class="uk-button uk-button-default"
      :to="`/history/${fullTitle}`"
    >
      History
    </router-link>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    fullTitle: String
  }
});
</script>
