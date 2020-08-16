<template>
  <div class="page login">
    <div class="uk-flex uk-flex-center uk-flex-right@l">
      <div class="uk-card uk-card-default uk-card-body">
        <button
          class="uk-button uk-button-default button-facebook"
          @click="facebookLogin"
        >
          Login with Facebook
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { request } from "@/utils/request";

const useFacebookLogin = () => {
  const facebookLogin = () => {
    window.FB.login(
      async response => {
        if (response.status === "connected") {
          const { data } = await request.post("auth/facebook", {
            accessToken: response.authResponse.accessToken,
            userId: response.authResponse.userID
          });
          console.log(data);
          window.localStorage.setItem(
            "auth.refreshToken",
            data.result.refreshToken
          );
        } else {
          console.log("Failed");
        }
      },
      { scope: "email" }
    );
  };
  return { facebookLogin };
};

export default defineComponent({
  setup() {
    return { ...useFacebookLogin() };
  }
});
</script>

<style lang="scss" scoped>
.button-facebook {
  background-color: #1877f2;
  text-transform: none;
  color: white;
  font-weight: bold;
}
</style>
