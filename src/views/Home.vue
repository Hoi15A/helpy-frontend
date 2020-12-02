<template>
  <div id="home">
    <div v-if="loggedIn">
      <h1>Willkommen {{username}}</h1>
      <hr>
      <div class="info-text">
        <p>Jobs mit potenziellen Matches: {{matches}}</p>
        <p>Anzahl offener Anträge: {{openJobCounter}}</p>
        <p>Deine letzte Bewertung: {{rating}}</p>
        <p>Du hast insgesamt {{points}} Punkte.</p>
      </div>
      <hr>
      <label>Die besten Helfer des Monats</label>
      <table class="table is-fullwidth is-hoverable">
        <thead>
        <tr>
          <th>Name</th>
          <th>Alter</th>
          <th>Rang</th>
          <th>Punkte</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tableData" v-bind:key="item.value">
          <td v-if="!item.editing">{{item.name}}</td>
          <td v-if="!item.editing">{{item.age}}</td>
          <td v-if="!item.editing">{{item.rank}}</td>
          <td v-if="!item.editing">{{item.points}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <h1>Willkommen bei Helpy</h1>
      <hr>
      <p>
        Helpy ist eine Hilfeplatform bei der du Hilfe suchen sowie anbieten kannst.
      </p>
      <div class="buttons is-centered">
        <div class="control">
          <button class="button is-info" @click="$router.push('/login')">
            <span>Anmelden</span>
          </button>
        </div>
        <div class="control">
          <button class="button" @click="$router.push('/register')">
            <span>Registrieren</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import UserApi from "@/api/userApi";
import JobApi from "@/api/jobApi"

const userApi = new UserApi();
const jobApi = new JobApi();

export default {
  name: "Home",
  data: function() {
    return {
      tableData: [],
      jobs: [],
      username: "",
      points: 0,
      rating: "Noch keine Bewertung",
      matches: "Noch keine neuen Matches gefunden",
      openJobCounter: 0,
      loggedIn: false
    };
  },
  methods: {
    fetchUser: async function () {
      let user = userApi.getCurrentUser();
      this.username = user.firstname + " " + user.lastname;
    },
    fetchTopUsers: async function () {
      let users = await userApi.getTopTenUsers();
      let rank = 1;
      users.forEach(user => {
        let userDate = new Date(user.birthdate);
        let ageDifMs = Date.now() - userDate.getTime()
        let ageDate = new Date(ageDifMs);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);
        let points = user.ratings.length > 0 ? user.ratings.reduce((x, y) => x + y) : 0;
        this.tableData.push({name: `${user.firstname} ${user.lastname}`, age: age, rank: rank, points: points, editing: false});
        rank++;
      });
    },
    fetchPoints: async function() {
      let points = await userApi.getPoints(userApi.getCurrentUser().email);
      this.points = points;
    },
    getLatestRating: async function() {
      let rating = await userApi.getLatestRating(userApi.getCurrentUser().email);
      if (rating > -1) {
        this.rating = rating;
      }
    },
    getJobs: async function() {
      let jobs = await jobApi.fetchCurrentUserJobs();
      this.jobs = jobs.filter(job => job.status !== "CLOSED");
      let matchesCounter = 0;

      for (let i = 0; i < this.jobs.length; i++) {
        if (this.jobs[i].status == "OPEN") {
          let helpers = await jobApi.findHelperForJobId(this.jobs[i].id);
          if (helpers.length > 0) {
            matchesCounter++;
          }
        }
      }

      this.matches = matchesCounter;
      this.openJobCounter = this.jobs.length;
    },
  },
  beforeMount: async function() {
    try {
      await this.fetchUser();
      await this.fetchTopUsers();
      await this.fetchPoints();
      await this.getLatestRating();
      await this.getJobs();
      this.loggedIn = true;
    } catch (e) {
      // not logged in or other issue
      console.error(e);
    }
  }
};

</script>

<style scoped>
.info-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.info-text p {
  margin: 8px 0px 8px 0px;
}

hr {
  display: flex;
  width: 100%;
}


label {
  margin-bottom: 50px;
  font-size: 1.5em;
}
</style>
