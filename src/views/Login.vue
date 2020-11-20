<template>
  <div id="login">
    <h1>Login</h1>
    <div class="columns">
      <div class="column is-one-third is-offset-one-third has-text-left">
        <div class="field">
          <div class="control has-icons-left">
            <input class="input" type="text" v-model="username" name="username" placeholder="Email" v-on:keyup.esc="cancel()" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="envelope" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input class="input" type="password" v-model="password" name="password" placeholder="Passwort" v-on:keyup.enter="login()" v-on:keyup.esc="cancel()" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="key" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="buttons">
            <div class="control">
              <button class="button is-info" v-on:click="login()">Login</button>
            </div>
            <div class="control">
              <button class="button" v-on:click="cancel()">Abbrechen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "@/api/userApi";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'

const userApi = new UserApi();

library.add(faEnvelope, faKey);

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
        await userApi.login(this.username, this.password);
        console.log("Logged in");
        await this.$router.push("/");
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
