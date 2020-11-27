<template>
  <div id="register">
    <h1>Register</h1>
    <div class="columns">
      <div class="column is-one-third is-offset-one-third has-text-left">

        <div class="field">
          <div class="control has-icons-left">
            <input type="email" class="input" v-model="user.email" name="email"  placeholder="Email" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="envelope" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input type="password" class="input" v-model="user.password" name="password"  placeholder="Passwort" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="key" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input type="password" class="input" v-model="user.repeatPass" name="password-repeat"  placeholder="Passwort wiederholen" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="key" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input type="text" class="input" v-model="user.firstname" name="firstname"  placeholder="Vorname" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="id-card" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input type="text" class="input" v-model="user.lastname" name="lastname"  placeholder="Nachname" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="id-card" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input type="date" class="input" v-model="user.birthdate" id="date of birth" name="date-of-birth"  placeholder="Geburtsdatum" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="calendar" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input type="text" class="input" v-model="user.plz" name="plz" placeholder="PLZ">
            <span class="icon is-small is-left">
              <font-awesome-icon icon="map-marker-alt" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea class="textarea" v-model="user.biographie" placeholder="Biographie"></textarea>
          </div>
        </div>

        <div class="field">
          <div class="buttons">
            <div class="control">
              <button class="button is-info" v-on:click="registerUser()">Registrieren</button>
            </div>
            <div class="control">
              <router-link to="/">
                <button class="button">Abbrechen</button>
              </router-link>
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
import { faEnvelope, faKey, faIdCard, faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const userApi = new UserApi();

library.add(faEnvelope, faKey, faIdCard, faCalendar, faMapMarkerAlt);

export default {
  name: "Register",
  data: function() {
    return {
      user: {
        type: "Helpseeker",
        email: "",
        password: "",
        repeatPass: "",
        firstname: "",
        lastname: "",
        sex: "M",
        plz: "",
        birthdate: "",
        biographie: "",
        status: "INACTIVE",
        permission: "USER"
      }
    };
  },
  methods: {
    registerUser: async function() {
      if (this.validateUser(this.user)) {
        // delete this.user.repeatPass;

        let success = true;

        try {
          await userApi.register(this.user);
        } catch (e) {
          success = false;
          this.$swal(
              'Registration Fehlgeschlagen',
              e.message,
              'error'
          )
        }

        if (success) {
          await userApi.login(this.user.email, this.user.password);
          await this.$router.push("/");
        }

      }
    },
    validateUser: function(user) {
      if (user.password !== user.repeatPass) {
        this.$swal(
            {
              title: 'Passwörter sind nicht gleich',
              icon: 'error'
            }
        )
        return false;
      }
      return true;
    }
  }
};

</script>

<style>
</style>