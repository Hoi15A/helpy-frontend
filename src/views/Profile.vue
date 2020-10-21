<template>
  <div id="profile">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="centered-image">
          <figure class="image is-128x128 is-centered">
            <img class="is-rounded" src="https://payload.cargocollective.com/1/23/749547/12784313/IDK_800.png" alt="Profilbild">
          </figure>
        </div>

        <button class="button">Avatar hochladen</button>

        <div class="field has-text-left">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" v-model="profile.email" type="mail" placeholder="mail@provider.tld">
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Passwort</label>
          <div class="control">
            <input class="input" v-model="profile.password" type="password" placeholder="hunter2">
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Passwort wiederholen</label>
          <div class="control">
            <input class="input" v-model="profile.passwordRepeat" type="password" placeholder="hunter2">
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Ich will helfen</label>
          <label class="switch">
            <input type="checkbox" v-model="profile.helper">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="field has-text-left" v-if="profile.helper">
          <label class="label">Kategorien</label>
          <div class="control">
            <div class="select is-multiple is-fullwidth">
              <select multiple size="5" v-model="profile.categories">
                <option value="Englisch">Englisch</option>
                <option value="Deutsch">Deutsch</option>
                <option value="Kat1">Kat1</option>
                <option value="Kat2">Kat2</option>
                <option value="Etc">Etc</option>
                <option value="Other">Other</option>
                <option value="Pog">Pog</option>
              </select>
            </div>
          </div>
          <p class="help">Mehrere mit CTRL+Click auswählen</p>
        </div>

        <div class="field has-text-left" v-if="profile.helper">
          <label class="label">Tags</label>
          <div class="control">
            <input class="input" v-model="profile.tags" type="text" placeholder="z.B. sbb, billet, zvv">
          </div>
        </div>

        <div class="field has-text-left" v-if="profile.helper">
          <label class="label">Über mich</label>
          <div class="control">
            <textarea class="textarea" v-model="profile.bio" placeholder="I am a massive chad and will help with anything."></textarea>
          </div>
        </div>

        <hr>

        <div class="level">
          <div class="level-left">
            <button class="button is-danger">Löschen</button>
          </div>
          <div class="level-right">
            <div class="buttons">
              <button class="button is-info" :disabled="!this.isValid">Profil speichern</button>
              <button class="button">Abbrechen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: function () {
    return {
      profile: {
        email: "austin@neat.moe",
        password: "",
        passwordRepeat: "",
        helper: false,
        categories: [],
        tags: "", // TODO: prolly has to be array later
        bio: ""
      }
    }
  },
  computed: {
    isValid: function () {
      let emailOK = this.profile.email.length > 0;
      let passOK = this.profile.password === this.profile.passwordRepeat;
      return emailOK && passOK;
    }
  }
}
</script>

<style scoped type="less">

.centered-image {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>