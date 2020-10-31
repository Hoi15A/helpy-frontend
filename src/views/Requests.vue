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
                <button class="button" @click="deleteJob(openJobs, index)">
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
      closedJobs: []
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
