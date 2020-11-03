<template>
  <div id="requests">

    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <h2 class="table-label">Laufende Anträge (IN_PROGRESS)</h2>
        <table class="table is-fullwidth is-hoverable">
          <thead>
          <tr>
            <th>Antrag</th>
            <th>Helfer/in</th>
            <th>Erstelldatum</th>
            <th>Bearbeiten</th>
          </tr>
          </thead>
          <tbody>
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

        <h2 class="table-label">Offene Anträge (OPEN)</h2>

        <table class="table is-fullwidth is-hoverable">
          <thead>
          <tr>
            <th>Antrag</th>
            <th>Erstelldatum</th>
            <th>Edit</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(openJob, index) in openJobs" v-bind:key="openJob.index">
            <td>{{ openJob.title }}</td>
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

        <h2 class="table-label">Abgeschlossene Anträge (CLOSED)</h2>
        <table class="table is-fullwidth is-hoverable">
          <thead>
          <tr>
            <th>Antrag</th>
            <th>Helfer/in</th>
            <th>Erstelldatum</th>
            <th>Points</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="closedJob in closedJobs" v-bind:key="closedJob.value">
              <td>{{ closedJob.title }}</td>
              <td>{{ closedJob.matchedHelper ? closedJob.firstname : "Kein Helfer" }}</td>
              <td>{{ closedJob.created }}</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
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
      isModalOpen: false,
      helperFound: false,
    };
  },
  methods: {
    loadUserJobs: async function () {
      let jobs = await api.fetchCurrentUserJobs();

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

      console.log(jobs);
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
  margin-top: 70px;
  font-size: 1.5em;
}
#requests {
  display: flex;
  flex-direction: column;
}
</style>
