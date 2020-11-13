<template>
  <div id="login">
    <h1>Login</h1>
    <div class="columns">
      <div class="column is-one-third is-offset-one-third has-text-left">
        <input class="input" type="text" v-model="username" name="username" placeholder="Email" v-on:keyup.esc="cancel()" />
        <input class="input" type="password" v-model="password" name="password" placeholder="Passwort" v-on:keyup.enter="login()" v-on:keyup.esc="cancel()" />
        <div class="buttons">
          <button class="button" v-on:click="login()">Login</button>
          <button class="button" v-on:click="cancel()">Abbrechen</button>
        </div>
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
    login: async function () {
      try {
        await api.login(this.username, this.password);
        console.log("Logged in");
        this.$router.push("/");
      } catch (e) {
        this.$swal(
          'Login fehlgeschlagen',
          e.message,
          'error'
        )
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

<style scoped>

</style>
