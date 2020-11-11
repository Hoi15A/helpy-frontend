<template>
  <div id="login">
    <h1>Login</h1>
    <div class="login-form">
      <input type="text" v-model="username" name="username" placeholder="Email" v-on:keyup.esc="cancel()" />
      <input type="password" v-model="password" name="password" placeholder="Passwort" v-on:keyup.enter="login()" v-on:keyup.esc="cancel()" />
      <div class="buttons">
        <button type="button" v-on:click="login()">Login</button>
        <button type="button" v-on:click="cancel()">Abbrechen</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "Login",
  data: function () {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login: function () {
      try {
        api.login(this.username, this.password);
        console.log("Logged in");
        this.$router.push("/");
      } catch (e) {
        console.error(e);
      }
    },
    cancel: function () {
      this.$router.push("/");
    }
  },
  beforeMount: async function() {
    //
  }
}
</script>

<style>
#login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}

.login-form {
  width: 20%;
  display: flex;
  flex-direction: column;
}

.login-form input {
  padding: 5px 0px 5px 0px;
  margin: 3px 0px 3px 0px;
}

.buttons {
  display: flex;
  flex-direction: row-reverse;
}

.buttons button {
  margin-left: 3px;
}
</style>
