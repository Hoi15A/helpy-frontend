<template>
  <div id="profile">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="centered-image">
          <figure class="image is-128x128 is-centered">
            <img class="is-rounded" src="http://www.colegiodepadua.com.br/img/user.png" alt="Profilbild">
          </figure>
        </div>

        <button disabled class="button">Avatar hochladen</button>

        <div class="field has-text-left">
          <label class="label">Email</label>
          <div class="control">
            <input disabled class="input" v-model="displayedProfile.email" type="mail" placeholder="mail@provider.tld">
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Passwort</label>
          <div class="control">
            <input class="input" v-model="displayedProfile.password" type="password" placeholder="hunter2">
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Passwort wiederholen</label>
          <div class="control">
            <input class="input" v-model="displayedProfile.passwordRepeat" type="password" placeholder="hunter2">
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Ich will helfen</label>
          <switch-checkbox v-model="displayedProfile.helper"></switch-checkbox>
        </div>

        <div class="field has-text-left" v-if="displayedProfile.helper">
          <label class="label">Kategorien</label>
          <div class="control">
            <div class="select is-multiple is-fullwidth">
              <select multiple size="5" v-model="displayedProfile.categories">
                <option v-for="cat in availableCategories" :key="cat.name" :value="cat">{{cat.name}}</option>
              </select>
            </div>
          </div>
          <p class="help">Mehrere mit CTRL+Click auswählen</p>
        </div>

        <div class="field has-text-left" v-if="displayedProfile.helper">
          <label class="label">Tags</label>
          <div class="control">
            <input disabled class="input" v-model="displayedProfile.tags" type="text" placeholder="z.B. sbb, billet, zvv">
          </div>
        </div>

        <div class="field has-text-left" v-if="displayedProfile.helper">
          <label class="label">Über mich</label>
          <div class="control">
            <textarea class="textarea" v-model="displayedProfile.biographie" placeholder="I am a massive chad and will help with anything."></textarea>
          </div>
        </div>

        <hr>

        <div class="level">
          <div class="level-left">
            <button disabled class="button is-danger">Löschen</button>
          </div>
          <div class="level-right">
            <div class="buttons">
              <button class="button is-info" @click="saveUser(displayedProfile)" :disabled="!this.isValid">Profil speichern</button>
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
      displayedProfile: {
        email: "",
        password: "",
        passwordRepeat: "",
        helper: false,
        categories: [],
        tags: "", // TODO: has to be array later
        bio: ""
      },
      availableCategories: [],
      selectedCategories: []
    }
  },
  computed: {
    isValid: function () {
      let emailOK = this.displayedProfile.email.length > 0;
      let passOK = this.displayedProfile.password === this.displayedProfile.passwordRepeat;
      return true || emailOK && passOK; // TODO: validation properly
    }
  },
  methods: {
    fetchUser: async function () { // TODO: This is used in many places. Put it somewhere more global & cache in localstorage
      let currentUser = "ahmed_miri@gmx.net";
      let res = await fetch(`http://${this.$baseURL}/api/user/${currentUser}`);
      let user = await res.json();

      user.password = "";
      this.displayedProfile.passwordRepeat = "";

      this.displayedProfile.helper = user.status === "ACTIVE";

      return user;
    },
    fetchCategories: async function () { // TODO: Put it more global
      let res = await fetch(`http://${this.$baseURL}/api/category/all`);
      return res.json();
    },
    saveUser: async function (user) {
      user.type = user.helper ? "Helper" : "Helpseeker";
      let currentUser = "ahmed_miri@gmx.net";
      let res = await fetch(`http://${this.$baseURL}/api/user/update/${currentUser}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.displayedProfile)
      });

      console.log(res);

    }
  },
  beforeMount: async function() {
    this.availableCategories = await this.fetchCategories();
    this.displayedProfile = await this.fetchUser();
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