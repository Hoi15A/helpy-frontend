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
          <label class="label">Freie Tage</label>
          <div class="control">
            <div class="select is-multiple is-fullwidth">
              <select multiple size="3" v-model="displayedProfile.availableWeekDays">
                <option v-for="weekday in availableDates" :key="weekday" :value="weekday">{{weekday}}</option>
              </select>
            </div>
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
            <button class="button is-danger" @click="deleteUser()">Löschen</button>
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
import UserApi from "@/userApi";
import CategoryApi from "@/categoryApi";
import Api from "@/api1";

const userApi = new UserApi();
const categoryApi = new CategoryApi();
const api = new Api();

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
        availableWeekDays: [],
        categories: [],
        tags: "", // TODO: has to be array later
        bio: ""
      },
      availableDates: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
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
    saveUser: async function (user) {
      user.type = user.helper ? "Helper" : "Helpseeker";
      user.availableWeekDays = user.availableWeekDays.map(day => this.availableDates.indexOf(day));

      if (this.displayedProfile.password === "") {
        delete this.displayedProfile.password;
      }

      try {
        await userApi.updateCurrentUser(this.displayedProfile)
      } catch (e) {
        this.$swal(
          'Aktualisierung fehlgeschlagen.',
          e.message,
          'error'
        )
      }
    },
    deleteUser: async function() {
      try {
        let result = await this.$swal(
          {
            title: 'Konto löschen?',
            html: 'Willst du uns wirklich verlassen?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Löschen`,
            cancelButtonText: `Abbrechen`
          }
        )
        if (result.isConfirmed) {
          await userApi.deleteUserByEmail(this.displayedProfile.email);
          this.$swal(
            {
              title: 'Konto erfolgreich gelöscht.',
              html: 'Schade, dass du uns verlässt :(',
              icon: 'success',
              confirmButtonText: `Okay`,
            }
          )
          this.$router.push("/")
        }
      } catch (e) {
        this.$swal(
          'Fehler beim Löschen.',
          'Konto konnte nicht gelöscht werden.',
          'error'
        )
      }
    }
  },
  beforeMount: async function() {
    this.availableCategories = await categoryApi.fetchCategories();
    this.displayedProfile = await api.getCurrentUser();

    this.displayedProfile.categories = this.displayedProfile.categories || []
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