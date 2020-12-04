<template>
  <div class="history">
    <div class="columns is-centered">
      <div class="column is-three-quarters">

        <div class="tabs is-medium">
          <ul>
            <li :class="{ 'is-active': selectedRole === 'HelpSeeker' }"><a href="#" @click.prevent="selectedRole = 'HelpSeeker'">Ich suche Hilfe</a></li>
            <li :class="{ 'is-active': selectedRole === 'Helper' }"><a href="#" @click.prevent="selectedRole = 'Helper'">Ich leiste Hilfe</a></li>
          </ul>
        </div>
        <div v-if="this.selectedRole === 'HelpSeeker'">
          <h2 class="has-text-left table-label">Abgeschlossene Anträge</h2>
          <closed-job-table v-bind:jobs="closedJobs"></closed-job-table>
        </div>


        <div v-if="this.selectedRole === 'Helper'">
          <h2 class="has-text-left table-label">Abgeschlossene Anträge als Helper</h2>
          <closed-job-table v-bind:jobs="closedJobsAsHelper"></closed-job-table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ClosedJobTable from "@/components/ClosedJobTable.vue"
import JobApi from "@/api/jobApi";

const jobApi = new JobApi();


export default {
  name: "History",
  components : {
    ClosedJobTable
  },
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
