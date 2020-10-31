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
              <select multiple size="5" v-model="request.categories">
                <option v-for="cat in availableCategories" :key="cat.name" :value="cat">{{cat.name}}</option>
              </select>
            </div>
          </div>
          <p class="help">Mehrere mit CTRL+Click auswählen</p>
        </div>

        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <input disabled class="input" type="text" placeholder="z.B. sbb, billet, zvv">
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
          <button class="button">Abbrechen</button>
        </div>

        <div class="field has-text-left">
          <match-notification v-model="availableMatches"></match-notification>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import MatchNotification from "@/components/MatchNotification";
import api from "@/api";

export default {
  name: "CreateRequest",
  components: {
    MatchNotification
  },
  data: function() {
    return {
      request: {
        author: {},
        title: "",
        categories: [],
        tags: [],
        dueDate: "",
        description: ""
      },
      availableCategories: [],
      availableMatches: [],
      currentJob: {},
      isModalOpen: false
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
        } catch (e) {
          // TODO: Tell user that no match was found
          console.error(e);
        }

      } catch (e) {
        // TODO: Tell user that job failed to add
        console.error(e);
      }
    },
    selectHelper: async function (helper) {

      try {
        await api.setHelperForJobId(this.currentJob.id, helper.email);

        await this.$router.push("/requests");
      } catch (e) {
        // TODO: Inform user about failure
        console.error(e);
      } finally {
        this.isModalOpen = false;
      }

    },
  },
  beforeMount: async function() {
    this.availableCategories = await api.fetchCategories();
  }
};
</script>

<style scoped>

.modal-card {
  width: 60vw;
}

</style>
