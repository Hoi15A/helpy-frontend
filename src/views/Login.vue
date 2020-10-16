<template>
  <div id="login">
    <h1>Login</h1>
    <div class="login-form">
        <input type="text" name="username"  placeholder="Email" />
        <input type="password" name="password"  placeholder="Passwort" />
      <div class="buttons">
        <button type="button" v-on:click="login()">Login</button>
        <button type="button" v-on:click="cancel()">Abbrechen</button>
      </div>
    </div>
  </div>
</template>

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