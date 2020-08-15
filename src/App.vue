<template>
  <div id="app">
    <div class="uk-box-shadow-small" uk-sticky>
      <navbar />
    </div>
    <div class="uk-container uk-padding">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: {
    Navbar
  }
});
</script>
<style lang="scss">
// 1. Custom variables and variable overwrites.

// 2. Import default variables and available mixins.
@import "uikit/src/scss/variables-theme.scss";
@import "uikit/src/scss/mixins-theme.scss";

// 3. Custom mixin overwrites.

// 4. Import UIkit.
@import "uikit/src/scss/uikit-theme.scss";
</style>
