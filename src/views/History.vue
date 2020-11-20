<template>
  <div class="history">
    <div class="columns is-centered">
      <div class="column is-three-quarters">

        <div class="tabs is-medium">
          <ul>
            <li :class="{ 'is-active': selectedRole == 'HelpSeeker' }"><a href="#" @click.prevent="selectedRole = 'HelpSeeker'">Ich suche Hilfe</a></li>
            <li :class="{ 'is-active': selectedRole == 'Helper' }"><a href="#" @click.prevent="selectedRole = 'Helper'">Ich leiste Hilfe</a></li>
          </ul>
        </div>
        <div v-if="this.selectedRole === 'HelpSeeker'">
          <h2 class="has-text-left table-label">Abgeschlossene Anträge (CLOSED)</h2>
          <table class="table is-fullwidth is-hoverable">
            <thead class="has-text-left">
            <tr>
              <th>Antrag</th>
              <th>Helfer/in</th>
              <th>Erstelldatum</th>
              <th>Points</th>
            </tr>
            </thead>
            <tbody class="has-text-left">
            <tr v-for="closedJob in closedJobs" v-bind:key="closedJob.value">
              <td>{{ closedJob.title }}</td>
              <td>{{ closedJob.matchedHelper ? closedJob.matchedHelper.firstname : "Kein Helfer" }}</td>
              <td>{{ closedJob.created }}</td>
              <td>0</td>
            </tr>
            </tbody>
          </table>
        </div>


        <div v-if="this.selectedRole === 'Helper'">
          <h2 class="has-text-left table-label">Abgeschlossene Anträge als Helper(CLOSED)</h2>
          <table class="table is-fullwidth is-hoverable">
            <thead class="has-text-left">
            <tr>
              <th>Titel</th>
              <th>Helfer/in</th>
              <th>Erstelldatum</th>
              <th>Points</th>
            </tr>
            </thead>
            <tbody class="has-text-left">
            <tr v-for="closedJobAsHelper in closedJobsAsHelper" v-bind:key="closedJobAsHelper.value">
              <td>{{ closedJobAsHelper.title }}</td>
              <td>{{ closedJobAsHelper.matchedHelper ? closedJobAsHelper.matchedHelper.firstname : "Kein Helfer" }}</td>
              <td>{{ closedJobAsHelper.created }}</td>
              <td>{{ "Points" }}</td>
              <td>0</td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import JobApi from "@/jobApi";

const jobApi = new JobApi();

export default {
  name: "History",
  data: function () {
    return {
      closedJobs: [],
      closedJobsAsHelper: [],
      jobsCollector: [],
      selectedRole: "HelpSeeker"
    }
  },
  methods: {
    loadUserJobs: async function () {

      let jobs = await jobApi.fetchCurrentUserJobs();
      let helperJobs = await jobApi.fetchCurrentHelperJobs();

      for (let i = 0; i < helperJobs.length; i++) {
        switch (helperJobs[i].status) {
          case "CLOSED":
            this.closedJobsAsHelper.push(helperJobs[i]);
            break;
          default:
            this.jobsCollector.push(helperJobs[i]);
        }
      }

      for (let i = 0; i < jobs.length; i++) {
        switch (jobs[i].status) {
          case "CLOSED":
            this.closedJobs.push(jobs[i]);
            break;
          default:
            this.jobsCollector.push(jobs[i]);
        }
      }

      console.log(jobs);
    },
  },
  beforeMount: function() {
    this.loadUserJobs();
  }
}
</script>

<style scoped>
.table-label {
  margin-bottom: 40px;
  margin-top: 40px;
}
</style>
