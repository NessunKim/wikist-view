<template>
  <div class="page login">
    <button class="uk-button uk-button-default" @click="facebookLogin">
      Login with Facebook
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

const useFacebookLogin = () => {
  const facebookLogin = () => {
    window.FB.login(async response => {
      if (response.status === "connected") {
        console.log("OK");
      } else {
        console.log("Failed");
      }
    });
  };
  return { facebookLogin };
};

export default defineComponent({
  setup() {
    return { ...useFacebookLogin() };
  }
});
</script>
