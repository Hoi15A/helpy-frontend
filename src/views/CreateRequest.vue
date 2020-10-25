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
          <label class="label">Beschreibung</label>
          <div class="control">
            <textarea class="textarea" v-model="request.description" placeholder="Ich brauche hilfe mit ..."></textarea>
          </div>
        </div>

        <div class="buttons">
          <button class="button is-info" @click="saveRequest()">Antrag Erstellen</button>
          <button class="button">Abbrechen</button>
        </div>

        <div class="modal" v-bind:class="{ 'is-active': isModalOpen }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Helper gefunden!</p>
            </header>
            <section class="modal-card-body">
              <table class="table is-fullwidth is-hoverable">
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
            </section>
            <footer class="modal-card-foot">
            </footer>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateRequest",
  data: function() {
    return {
      request: {
        author: {},
        title: "",
        categories: [],
        tags: [],
        description: ""
      },
      availableCategories: [],
      availableMatches: [],
      currentJob: {},
      isModalOpen: false
    }
  },
  methods: {
    fetchCategories: async function () {
      let res = await fetch(`http://${this.$baseURL}/api/category/all`);
      this.availableCategories = await res.json();
    },
    saveRequest: async function () {
      this.request.author = await this.fetchUser();
      let res = await fetch(`http://${this.$baseURL}/api/job/add`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.request)
      });

      if (res.ok) {
        this.currentJob = await res.json();

        let matchRes = await fetch(`http://${this.$baseURL}/api/job/id/${this.currentJob.id}/find-helper`);

        if (matchRes.ok) {
          this.availableMatches = await matchRes.json();
          this.isModalOpen = true;
        } else {
          alert("something went wrong, see console");
          console.log(matchRes);
        }

      } else {
        alert("something went wrong, see console");
        console.log(res);
      }

      console.log(res);
    },
    selectHelper: async function (helper) {
      let res = await fetch(`http://${this.$baseURL}/api/job/id/${this.currentJob.id}/set-helper/${helper.email}`, {
        method: "PUT"
      });

      if (res.ok) {
        this.isModalOpen = false;
        this.$router.push("/requests");
      } else {
        alert("something went wrong, see console");
        console.log(res);
      }
    },
    fetchUser: async function () { // TODO: Same as everywhere else, make user cached
      let currentUser = "ahmed_miri@gmx.net";
      let res = await fetch(`http://${this.$baseURL}/api/user/${currentUser}`);
      return res.json();
    },
  },
  beforeMount: function() {
    this.fetchCategories();
  }
};
</script>

<style scoped>

.modal-card {
  width: 60vw;
}

</style>
