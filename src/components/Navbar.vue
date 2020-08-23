<template>
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav">
        <router-link to="/" custom v-slot="{ href, navigate, isActive }">
          <li :class="{ 'uk-active': isActive }">
            <a :href="href" @click="navigate">Wikist</a>
          </li>
        </router-link>
      </ul>
      <div class="uk-navbar-item">
        <form @submit.prevent="search" class="uk-search uk-search-navbar">
          <button uk-search-icon @click="search"></button>
          <input
            class="uk-search-input"
            type="text"
            placeholder="Search..."
            v-model="state.searchInput"
          />
        </form>
      </div>
    </div>
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <router-link to="/login" custom v-slot="{ href, navigate, isActive }">
          <li :class="{ 'uk-active': isActive }">
            <a :href="href" @click="navigate">Log in / Sign up</a>
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import router from "@/router";

const useSearch = () => {
  const state = reactive({
    searchInput: ""
  });
  const search = (e: Event) => {
    console.log(e);
    router.push(`/wiki/${state.searchInput}`);
  };
  return { search, state };
};

export default defineComponent({
  setup() {
    return {
      ...useSearch()
    };
  }
});
</script>
