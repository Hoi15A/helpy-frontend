<template>
  <div id="requests">

    <div class="columns is-centered">
      <div class="column is-three-quarters">


        <div class="tabs is-medium">
          <ul>
            <li><a href="#" @click.prevent="selectedRole = 'HelpSeeker'">Ich suche Hilfe</a></li>
            <li><a href="#" @click.prevent="selectedRole = 'Helper'">Ich leiste Hilfe</a></li>
          </ul>
        </div>


        <div v-if="selectedRole === 'Helper'">
          <h2 class="has-text-left table-label">Anträge als Helfer</h2>
          <table class="table is-fullwidth is-hoverable">
            <thead class="has-text-left">
            <tr>
              <th>Antrag</th>
              <th>Helfer/in</th>
              <th>Erstelldatum</th>
              <th class="has-text-centered">Bearbeiten</th>
            </tr>
            </thead>
            <tbody class="has-text-left">
            <tr v-for="(currentHelperJobs, index) in currentHelperJobs" v-bind:key="currentHelperJobs.index">
              <td>{{ currentHelperJobs.title }}</td>
              <td>{{ currentHelperJobs.matchedHelper.firstname }}</td>
              <td>{{ currentHelperJobs.created }}</td>

              <td>
                <div class="buttons">
                  <button class="button" @click="deleteJob(currentHelperJobs, index)">Löschen</button>
                  <button disabled class="button">Bearbeiten (WIP)</button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-if="selectedRole === 'HelpSeeker'">
          <h2 class="has-text-left table-label">Laufende Anträge (IN_PROGRESS)</h2>
          <table class="table is-fullwidth is-hoverable">
            <thead class="has-text-left">
            <tr>
              <th>Antrag</th>
              <th>Helfer/in</th>
              <th>Erstelldatum</th>
              <th class="has-text-centered">Bearbeiten</th>
            </tr>
            </thead>
            <tbody class="has-text-left">
            <tr v-for="(inProgressJob, index) in inProgressJobs" v-bind:key="inProgressJob.index">
              <td>{{ inProgressJob.title }}</td>
              <td>{{ inProgressJob.matchedHelper.firstname }}</td>
              <td>{{ inProgressJob.created }}</td>

              <td>
                <div class="buttons">
                  <button class="button" @click="deleteJob(inProgressJobs, index)">
                    Löschen
                  </button>
                  <button disabled class="button">
                    Bearbeiten (WIP)
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-if="selectedRole === 'HelpSeeker'">
        <h2 class="has-text-left table-label">Offene Anträge (OPEN)</h2>
        <table class="table is-fullwidth is-hoverable">
          <thead class="has-text-left">
          <tr>
            <th>Antrag</th>
            <th>Helfer/in</th>
            <th>Erstelldatum</th>
            <th class="has-text-centered">Bearbeiten</th>
          </tr>
          </thead>
          <tbody class="has-text-left">
          <tr v-for="(openJob, index) in openJobs" v-bind:key="openJob.index">
            <td>{{ openJob.title }}</td>
            <td>{{ "Unbekannt" }}</td>
            <td>{{ openJob.created }}</td>
            <td>
              <div class="buttons">
                <button class="button" @click="deleteJob(openJobs, index)">Löschen</button>
                <button class="button" @click="findMatch(openJobs, index)">Match</button>
                <button disabled class="button">Bearbeiten (WIP)</button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
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
            <tr v-for="(item, index) in availableMatches" v-bind:key="item">
              <td>{{ item.firstname + " " + item.lastname }}</td>
              <td>{{ item.biographie }}</td>
              <td>{{ item.plz }}</td>
              <td>
                <button class="button" @click="selectHelper(openJobs, index, item)">Auswählen</button>
              </td>
            </tr>
            </tbody>
          </table>
          <p class="modal-card-body" v-else>Sie können ihren Antrag unter Anträge nochmals matchen</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="isModalOpen=false">Schliessen</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>

import api from "@/api";

export default {
  name: "Requests",
  data: function() {
    return {
      openJobs: [],
      inProgressJobs: [],
      availableMatches: [],
      closedJobs: [],
      currentHelperJobs: [],
      isModalOpen: false,
      helperFound: false,
      selectedRole: 'Helper'
    };
  },
  methods: {
    loadUserJobs: async function () {

      let jobs = await api.fetchCurrentUserJobs();
      let helperJobs = await api.fetchCurrentHelperJobs();

      for (let i = 0; i < helperJobs.length; i++) {
        this.currentHelperJobs.push(helperJobs[i]);
      }

      for (let i = 0; i < jobs.length; i++) {
        switch (jobs[i].status) {
          case "OPEN":
            this.openJobs.push(jobs[i]);
            break;
          case "IN_PROGRESS":
            this.inProgressJobs.push(jobs[i]);
            break;
          case "CLOSED":
            this.closedJobs.push(jobs[i]);
            break;
          default:
            console.error("Job without status was received: ", jobs[i])
        }
      }
    },
    findMatch: async function(openJobs, i) {
      try {
          this.availableMatches = await api.findHelperForJobId(this.openJobs[i].id);
          this.isModalOpen = true;
          this.helperFound = ((this.availableMatches.length >= 1))
        } catch (e) {
          // TODO: Tell user that no match was found
          console.error(e);
        }
    },
    selectHelper: async function (openJobs, i, item) {
      try {
        await api.setHelperForJobId(this.openJobs[i].id, item.email);
        await this.$router.go()

      } catch (e) {
        console.error(e);
      } finally {
        this.isModalOpen = false;
      }

    },
    deleteJob: async function(jobList, i) {
      try {
        await api.deleteJobById(jobList[i].id);
        jobList.splice(i, 1);
      } catch (e) {
        console.error(e);
      }
    }
  },
  beforeMount: function() {
    this.loadUserJobs();
  }
};
</script>

<style scoped>
.table-label {
  margin-bottom: 40px;
  margin-top: 40px;
}
#requests {
  display: flex;
  flex-direction: column;
}
</style>
