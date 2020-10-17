<template>
  <div id="requests">
    <label>Vorgeschlagene Anträge</label>
    <table class="table is-fullwidth is-hoverable">
    <thead>
    <tr>
      <th>Name</th>
      <th>Helfer/in</th>
      <th>Matchingdatum</th>
      <th>Bearbeiten</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in tableData1" v-bind:key="item">
      <td v-if="!item.editing">{{item.request_title}}</td>
      <td v-if="!item.editing">{{item.helper}}</td>
      <td v-if="!item.editing">{{item.match_date}}</td>

      <td v-if="item.editing"><input type="text" class="input" v-model="item.request_title"></td>
      <td v-if="item.editing"><input type="text" class="input" v-model="item.helper"></td>
      <td v-if="item.editing"><input type="date" class="input" v-model="item.match_date"></td>

      <td v-if="!item.editing">
        <button class="button" v-on:click="item.editing = !item.editing">Bearbeiten</button>
        <button class="button" v-on:click="removeRow1(index)">Löschen</button>
      </td>
      <td v-if="item.editing"><button class="button" v-on:click="item.editing = !item.editing">Speichern</button></td>

    </tr>
    </tbody>
    </table>

    <label>Offene Anträge</label>

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
      <tr v-for="(item, index) in tableData2" v-bind:key="item">
        <td v-if="!item.editing">{{item.request_title}}</td>
        <td v-if="!item.editing">{{item.helper}}</td>
        <td v-if="!item.editing">{{item.create_date}}</td>

        <td v-if="item.editing"><input type="text" class="input" v-model="item.request_title"></td>
        <td v-if="item.editing"><input type="text" class="input" v-model="item.helper"></td>
        <td v-if="item.editing"><input type="date" class="input" v-model="item.create_date"></td>

        <td v-if="!item.editing">
          <button class="button" v-on:click="item.editing = !item.editing">Bearbeiten</button>
          <button class="button" v-on:click="removeRow2(index)">Löschen</button>
        </td>
        <td v-if="item.editing"><button class="button" v-on:click="item.editing = !item.editing">Speichern</button></td>
      </tr>
      </tbody>
    </table>

    <label>Abgeschlossene Anträge</label>
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
      <tr v-for="item in tableData3" v-bind:key="item">
        <td v-if="!item.editing">{{item.request_title}}</td>
        <td v-if="!item.editing">{{item.helper}}</td>
        <td v-if="!item.editing">{{item.create_date}}</td>
        <td v-if="!item.editing">{{item.rating}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Requests",
  data: function() {
    return {
      tableData1: [
        { request_title: "Brauche Hilfe ein SBB-Abo zu lösen", helper: "Bab Mortin", match_date: "12.12.2020", editing: false },
        { request_title: "Brauche Hilfe in der Arbeit", helper: "Donald Biden", match_date: "12.12.2020", editing: false },
        { request_title: "Help, I need somebody, HELP, not just anybody", helper: "Joey Sixpack", match_date: "12.12.2020", editing: false },
      ],
      tableData2: [
        { request_title: "Ich brauche eine Wohnsitzbestätigung", helper: "Rick Astley", create_date: "12.12.2020", editing: false },
        { request_title: "Hilarys Emails leaked", helper: "Donald Biden", create_date: "12.12.2020", editing: false },
        { request_title: "Wheres my Ritalin", helper: "Joe Trump", create_date: "12.12.2020", editing: false },
      ],
      tableData3: [
        { request_title: "Im waaaalkin' 'ere", helper: "Cousin Nicky", create_date: "12.12.2020", rating: "5/5", editing: false },
      ]
    };
  },
  methods: {
    removeRow1: function(index) {
      console.log("Removing", index);
      this.tableData1.splice(index, 1);
    },
    removeRow2: function(index) {
      console.log("Removing", index);
      this.tableData2.splice(index, 1);
    }
  }
};

</script>


<style>
label {
  margin-bottom: 40px;
  margin-top: 70px;
  font-size: 1.5em;
}
#requests {
  display: flex;
  flex-direction: column;
}
</style>