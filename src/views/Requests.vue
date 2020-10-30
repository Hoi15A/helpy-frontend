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
    fetchUserJobs: async function () {
      let currentUser = "ahmed_miri@gmx.net";
      let res = await fetch(`http://${this.$baseURL}/api/job/author/${currentUser}`);
      let jobs = await res.json();

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

      let res = await fetch(`http://${this.$baseURL}/api/job/remove/${jobList[i].id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        jobList.splice(i, 1);
      } else {
        alert("Unable to delete job");
      }
    }
  },
  beforeMount: function() {
    this.fetchUserJobs();
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
