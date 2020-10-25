<template>
  <div id="register">
    <h1>Register</h1>
    <div class="register-form">
      <input type="text" class="input" v-model="user.firstname" name="firstname"  placeholder="Vorname" />
      <input type="text" class="input" v-model="user.lastname" name="lastname"  placeholder="Nachname" />
      <input type="email" class="input" v-model="user.email" name="email"  placeholder="Email" />
      <input type="password" class="input" v-model="user.password" name="password"  placeholder="Passwort" />
      <input type="password" class="input" name="password-repeat"  placeholder="Passwort wiederholen" />
      <input type="date" class="input" v-model="user.birthdate" id="date of birth" name="date-of-birth"  placeholder="Geburtsdatum" />
      <div class="buttons">
        <button type="button" v-on:click="registerUser()">Registrieren</button>
        <router-link to="/">
          <button type="button">Abbrechen</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      user: {
        firstname: "aaaaa",
        lastname: "aaaaaa",
        email: "aa@aa.aa",
        password: "aaaaaaaaa",
        birthdate: "",
        plz: 8032,
        sex: "g",
        biographie: "null",
        status: "ACTIVE",
        permission: "USER"
      }
    };
  },
  methods: {
    registerUser: async function() {
      let res = await fetch(`http://${this.$baseURL}/api/user/add`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.user)
      });
      console.log(res);
    }
  }
};

</script>

<style>

#register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
.register-form {
  display: flex;
  width: 30%;
  flex-direction: column;
}

.buttons {
  display: flex;
  flex-direction: row-reverse;
}

.buttons button {
  margin-left: 3px;

}

</style>