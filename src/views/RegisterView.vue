<template>
  <div class="register">
    <div v-if="errors">
      <span class="error">Произошла ошибка при регистрации</span>
    </div>
    <form @submit.prevent="login">
      <div>
        <label for="username">username</label>
        <input name="username" v-model="username" placeholder="username">
      </div>
      <div>
        <label for="phone">phone</label>
        <input name="phone" v-model="phone" placeholder="phone" type="phone">
      </div>
      <input type="submit" value="register">
    </form>
  </div>
</template>

<script>

import Constants from "@/plugins/Constants";

export default {
  name: 'RegisterView',
  data() {
    return {
      errors: false,
      username: "test",
      phone: "0123456789"
    };
  },
  methods: {
    login() {
      this.axios
          .post(Constants.BASE_URL + '/register',
              {
                name: this.username,
                phone: this.phone,
              }
          )
          .then((response) => {
            if (response.status === 200) {
              const link = response.data.link;
              this.$router.push({ path:`/${link}` });
            } else {
              this.errors = true;
              setTimeout(() => {
                this.errors = false;
              }, 3000);
            }
          })
          .catch(() => {
            this.errors = true;
            setTimeout(() => {
              this.errors = false;
            }, 3000);
          });
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
