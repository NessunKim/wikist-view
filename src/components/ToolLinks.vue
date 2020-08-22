<template>
  <p uk-margin>
    <router-link class="uk-button uk-button-default" :to="`/wiki/${fullTitle}`">
      Read
    </router-link>
    <router-link class="uk-button uk-button-default" :to="`/edit/${fullTitle}`">
      Edit
    </router-link>
  </p>
</template>

<script lang="ts">
import { request } from "@/utils/request";
import { reactive, onMounted, defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  props: {
    fullTitle: String
  }
});
</script>
