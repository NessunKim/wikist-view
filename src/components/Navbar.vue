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
