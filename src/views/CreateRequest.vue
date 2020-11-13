<template>
  <div id="create-request">
    <h1>Antrag Erstellen</h1>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter has-text-left">
        <div class="field">
          <label class="label">Titel</label>
          <div class="control">
            <input class="input" v-model="request.title" type="text" placeholder="Titel">
          </div>
        </div>

        <div class="field">
          <label class="label">Kategorien</label>
          <div class="control">
            <div class="select is-multiple is-fullwidth">
              <selectize persist v-model="request.categories" :settings="request.categorySettings">
                <option v-for="cat in availableCategories" :key="cat.name" :value="cat.name">{{cat.name}}</option>
              </selectize>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
           <selectize v-model="request.tags" :settings="request.tagSettings">
              <option v-for="tag in availableTags" :key="tag.name" :value="tag.name">{{tag.name}}</option>
            </selectize>
          </div>
        </div>

        <div class="field">
          <label class="label">Ablaufdatum</label>
          <div class="control">
            <input class="input" v-model="request.dueDate" type="date" placeholder="Verfügbarkeit">
          </div>
        </div>

        <div class="field">
          <label class="label">Beschreibung</label>
          <div class="control">
            <textarea class="textarea" v-model="request.description" placeholder="Ich brauche hilfe mit ..."></textarea>
          </div>
        </div>

        <div class="buttons">
          <button class="button is-info" @click="saveRequest()">Antrag Erstellen</button>
          <button class="button" @click="$router.push('/')">Abbrechen</button>
        </div>

        <div class="modal" v-bind:class="{ 'is-active': isModalOpen }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title" v-if="helperFound">Helper gefunden!</p>
              <p class="modal-card-title" v-else>Es wurde leider noch kein Helfer für Sie gefunden</p>
            </header>
            <section class="modal-card-body">
              <table class="table is-fullwidth is-hoverable" v-if="helperFound">
                <thead>
                <tr>
                  <th>Helfer/in</th>
                  <th>Biografie</th>
                  <th>Standort</th>
                  <th>Auswählen</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in availableMatches" v-bind:key="item">
                  <td>{{ item.firstname + " " + item.lastname }}</td>
                  <td>{{ item.biographie }}</td>
                  <td>{{ item.plz }}</td>
                  <td>
                    <button class="button" @click="selectHelper(item)">Auswählen</button>
                  </td>
                </tr>
                </tbody>
              </table>
              <p class="modal-card-body" v-else>Sie können ihren Antrag unter Anträge nochmals matchen</p>
            </section>
            <footer class="modal-card-foot">
              <button class="button" @click="$router.push('/requests')" v-if="!helperFound">Anträge</button>
              <button class="button" @click="$router.push('/')">Schliessen</button>
            </footer>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Selectize from 'vue2-selectize'


export default {
  name: "CreateRequest",
  components: {
    Selectize
  },
  data: function() {
    return {
      request: {
        author: {},
        title: "",
        categories: [],
        tags: [],
        dueDate: "",
        description: "",
        categorySettings: {selectOnTab: true, maxItems: 5, highlight: true},
        tagSettings: {selectOnTab: true, maxItems: 5, highlight: true},
      },
      availableCategories: [],
      availableTags: [],
      availableMatches: [],
      currentJob: {},
      isModalOpen: false,
      helperFound: false
    }
  },
  methods: {
    saveRequest: async function () {
      this.request.author = await api.getCurrentUser();

      try {
        this.currentJob = await api.addJob(this.request);

        try {
          this.availableMatches = await api.findHelperForJobId(this.currentJob.id);
          this.isModalOpen = true;
          this.helperFound = ((this.availableMatches.length >= 1))
        } catch (e) {
          this.$swal(
            'API-Fehler etwas ist schiefgelaufen.',
            e.message,
            'error'
          )
        }

      } catch (e) {
        this.$swal(
          'Job konnte nicht erstellt werden.',
          e.message,
          'error'
        )
      }
    },
    selectHelper: async function (helper) {

      try {
        await api.setHelperForJobId(this.currentJob.id, helper.email);

        await this.$router.push("/requests");
      } catch (e) {
        this.$swal(
          'Helper konnte nicht dem Antrag zugeteilt werden.',
          e.message,
          'error'
        )
      } finally {
        this.isModalOpen = false;
      }

    },
  },
  beforeMount: async function() {
    this.availableCategories = await api.fetchCategories();
    this.availableTags = await api.fetchTags();
  }
};
</script>

<style scoped>

.modal-card {
  width: 60vw;
}

</style>
