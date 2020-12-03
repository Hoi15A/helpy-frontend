<template>
  <div id="profile">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="centered-image">
          <figure class="image is-128x128 is-centered">
            <img class="is-rounded" src="http://www.colegiodepadua.com.br/img/user.png" alt="Profilbild">
          </figure>
        </div>

        <button class="button" @click="logout()">Logout</button>

        <div class="field has-text-left">
          <label class="label">Punktestand: {{points}}</label>
        </div>

        <div class="field has-text-left">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" v-model="displayedProfile.email" type="mail" placeholder="mail@provider.tld">
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
              <selectize persist v-model="displayedProfile.availableWeekDays" :settings="availableDatesSettings">
                <option v-for="date in availableDates" :key="date" :value="date">{{date}}</option>
              </selectize>
            </div>
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Ich will helfen</label>
          <input type="checkbox" v-model="displayedProfile.wantsToHelpActive">
        </div>

        <div class="field has-text-left" v-if="displayedProfile.wantsToHelpActive">
          <label class="label">Kategorien</label>
          <div class="control">
            <div class="select is-multiple is-fullwidth">
              <selectize persist v-model="displayedProfile.categories" :settings="categorySettings">
                <option v-for="cat in availableCategories" :key="cat.name" :value="cat.name">{{cat.name}}</option>
              </selectize>
            </div>
          </div>
          <p class="help">Mehrere mit CTRL+Click auswählen</p>
        </div>

        <div class="field has-text-left" v-if="displayedProfile.wantsToHelpActive">
          <label class="label">Tags</label>
          <div class="control">
            <selectize v-model="displayedProfile.tags" :settings="tagSettings">
              <option v-for="tag in availableTags" :key="tag.name" :value="tag.name">{{tag.name}}</option>
            </selectize>
          </div>
        </div>

        <div class="field has-text-left" v-if="displayedProfile.wantsToHelpActive">
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
              <button class="button is-info" @click="saveUser()" :disabled="!this.isValid">Profil speichern</button>
              <button class="button" @click="$router.go(-1)">Abbrechen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Selectize from 'vue2-selectize'
import UserApi from "@/api/userApi";
import CategoryApi from "@/api/categoryApi";
import TagApi from "@/api/tagApi";

const userApi = new UserApi();
const categoryApi = new CategoryApi();
const tagApi = new TagApi();

export default {
  name: "Profile",
  components: {
    Selectize
  },
  data: function () {
    return {
      displayedProfile: {
        email: "",
        password: "",
        passwordRepeat: "",
        availableWeekDays: [],
        categories: [],
        tags: [],
        bio: "",
        wantsToHelpActive: false
      },
      points: 0,
      availableDates: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
      datesEnglish: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"],
      availableCategories: [],
      categorySettings: {selectOnTab: true, maxItems: 5, highlight: true},
      availableTags: [],
      tagSettings: {selectOnTab: true, maxItems: 5, highlight: true},
      availableDatesSettings: {selectOnTab: true, maxItems: 7, highlight: true}
    }
  },
  computed: {
    isValid: function () {
      let passOK = this.displayedProfile.password === this.displayedProfile.passwordRepeat;
      return passOK;
    }
  },
  methods: {
    saveUser: async function () {
      this.displayedProfile.availableWeekDays = this.displayedProfile.availableWeekDays.map(day => this.datesEnglish[this.availableDates.indexOf(day)]);

      if (this.displayedProfile.password === "") {
        delete this.displayedProfile.password;
      }

      try {
        let updatedUser = await userApi.updateCurrentUser(this.displayedProfile);
        userApi.setCurrentUser(updatedUser);
        this.displayedProfile = updatedUser;
        this.displayedProfile.categories = this.displayedProfile.categories.map(cat => cat.name) || [];
        this.displayedProfile.tags = this.displayedProfile.tags.map(tag => tag.name) || [];
        this.displayedProfile.availableWeekDays = this.displayedProfile.availableWeekDays.map(day => this.availableDates[this.datesEnglish.indexOf(day)]);
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
          await this.$router.push("/")
        }
      } catch (e) {
        this.$swal(
          'Fehler beim Löschen.',
          'Konto konnte nicht gelöscht werden.',
          'error'
        )
      }
    },
    fetchPoints: async function() {
      this.points = await userApi.getPoints(userApi.getCurrentUser().email);
    },
    logout: async function () {
      await userApi.logout();
      await this.$router.push("/");
    }
  },
  beforeMount: async function() {
    this.availableCategories = await categoryApi.fetchCategories();
    this.availableTags = await tagApi.fetchTags()
    this.displayedProfile = await categoryApi.getCurrentUser();
    await this.fetchPoints();
    this.displayedProfile.categories = this.displayedProfile.categories.map(cat => cat.name) || [];
    this.displayedProfile.tags = this.displayedProfile.tags.map(tag => tag.name) || [];
    this.displayedProfile.availableWeekDays = this.displayedProfile.availableWeekDays.map(day => this.availableDates[this.datesEnglish.indexOf(day)]);
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