<template>
  <div id="register">
    <h1>Register</h1>
    <div class="register-form">
      <input type="text" name="surname"  placeholder="Vorname" />
      <input type="text" name="lastname"  placeholder="Nachname" />
      <input type="email" name="email"  placeholder="Email" />
      <input type="password" name="password"  placeholder="Passwort" />
      <input type="password" name="password-repeat"  placeholder="Passwort wiederholen" />
      <input type="date" id="date of birth" name="date-of-birth"  placeholder="Geburtsdatum" />
      <div class="buttons">
        <button type="button" v-on:click="registerUser()">Registrieren</button>
        <button type="button" v-on:click="cancel()">Abbrechen</button>
      </div>
    </div>
  </div>
</template>

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

.register-form input {
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