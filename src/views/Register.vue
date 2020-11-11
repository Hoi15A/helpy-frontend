<template>
  <div id="register">
    <h1>Register</h1>
    <div class="columns">
      <div class="column is-one-third is-offset-one-third has-text-left">
        <input type="text" class="input" v-model="user.firstname" name="firstname"  placeholder="Vorname" />
        <input type="text" class="input" v-model="user.lastname" name="lastname"  placeholder="Nachname" />
        <input type="email" class="input" v-model="user.email" name="email"  placeholder="Email" />
        <input type="password" class="input" v-model="user.password" name="password"  placeholder="Passwort" />
        <input type="password" class="input" name="password-repeat"  placeholder="Passwort wiederholen" />
        <input type="date" class="input" v-model="user.birthdate" id="date of birth" name="date-of-birth"  placeholder="Geburtsdatum" />
        <div class="buttons">
          <router-link to="/">
            <button class="button">Abbrechen</button>
          </router-link>
          <button class="button" v-on:click="registerUser()">Registrieren</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "Home",
  data: function() {
    return {
      user: { // TODO: This is just copy pasted stuff from the db directly, map to actual input
        type: "Helpseeker",
        email: "ahmed_miri@gmx.net",
        firstname: "Ahmed",
        lastname: "Miri",
        sex: "M",
        plz: 8400,
        birthdate: "2003-01-05",
        biographie: "Ich heisse Ahmed und bin 17 Jahre alt und bin seit 2015 in der Schweiz und komme aus Afghanistan. Ich wohne in Winterthur und gehe im Moment in die 10. Klasse. Ich schaue gerne Fussball und spiele beim SC Veltheim in der U19 2. Mannschaft. Ich habe Probleme mit Schreiben und Lesen von wichtigen Papieren in der Schweiz und verstehe sie nicht alle.",
        status: "INACTIVE",
        permission: "USER"
      }
    };
  },
  methods: {
    registerUser: async function() {
      await api.register(this.user);
    }
  }
};

</script>

<style>
</style>