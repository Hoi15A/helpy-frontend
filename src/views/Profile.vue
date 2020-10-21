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
          <switch-checkbox v-model="profile.helper"></switch-checkbox>
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
              <button class="button" @click="$router.go(-1)">Abbrechen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchCheckbox from "@/components/SwitchCheckbox";

export default {
  name: "Profile",
  components: {
    SwitchCheckbox
  },
  data: function () {
    return {
      profile: {
        email: "austin@neat.moe",
        password: "",
        passwordRepeat: "",
        helper: true,
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

</style>