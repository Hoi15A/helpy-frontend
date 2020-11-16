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
import api from "@/api";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faIdCard, faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faKey, faIdCard, faCalendar, faMapMarkerAlt);

export default {
  name: "Home",
  data: function() {
    return {
      user: { // TODO: This is just copy pasted stuff from the db directly, map to actual input
        type: "Helpseeker",
        email: "",
        password: "",
        repeatPass: "",
        firstname: "",
        lastname: "",
        sex: "M",
        plz: "",
        birthdate: "",
        biographie: "Ich heisse Ahmed und bin 17 Jahre alt und bin seit 2015 in der Schweiz und komme aus Afghanistan. Ich wohne in Winterthur und gehe im Moment in die 10. Klasse. Ich schaue gerne Fussball und spiele beim SC Veltheim in der U19 2. Mannschaft. Ich habe Probleme mit Schreiben und Lesen von wichtigen Papieren in der Schweiz und verstehe sie nicht alle.",
        status: "INACTIVE",
        permission: "USER"
      }
    };
  },
  methods: {
    registerUser: async function() {
      if (this.validateUser(this.user)) {
        delete this.user.repeatPass;
        await api.register(this.user);
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
        return true;
      }
      return false;
    }
  }
};

</script>

<style>
</style>