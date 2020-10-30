<template>
  <div id="home">
    <h1>Willkommen {{username}}</h1>
    <hr>
    <div class="info-text">
      <p>Neue Matches:</p>
      <p>Ihre letzte Bewertung:</p>
      <p>Sie haben 12 Punkte in diesem Monat gesammelt:</p>
    </div>
    <hr>
    <label>Die besten Helfer des Monats</label>
    <table class="table is-fullwidth is-hoverable">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Aktion</th>
        <th>Points</th>


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
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      tableData: [
        { name: "Bob Martin", age: 9, rank: 1, points: 12, editing: false },
        { name: "Mob Bartin", age: 11, rank: 2, points: 11, editing: false },
        { name: "Schlob Klartin", age: 12, rank: 3, points: 1, editing: false },
        ],
      username: ""
    };
  },
  methods: {
    fetchUser: async function () {
      let currentUser = "ahmed_miri@gmx.net";
      let res = await fetch(`http://${this.$baseURL}/api/user/${currentUser}`);
      let user = await res.json();

      // TODO: This is not efficient, user should be stored once on login and reused to reduce requests
      this.username = user.firstname + " " + user.lastname;
    }
  },
  beforeMount: function() {
    this.fetchUser();
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
