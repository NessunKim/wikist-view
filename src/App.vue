<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";

@Options({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
