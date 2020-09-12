<template>
  <div class="wiki-content" v-html="html" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    html: String
  }
});
</script>

<style lang="scss" scoped>
::v-deep(p) {
  overflow-wrap: break-word;
}
</style>
