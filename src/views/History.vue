<template>
  <div class="history">
    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <h1>Verlauf</h1>
        <table class="table is-fullwidth is-hoverable">
          <thead>
          <tr>
            <th scope="col">Antrag</th>
            <th scope="col">Geholfene/r</th>
            <th scope="col">Bewertung</th>
            <th scope="col">Punkte</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="entry in historyItems" :key="entry">
              <td>{{entry.antrag}}</td>
              <td>{{entry.helpseeker}}</td>
              <td>{{entry.rating}}</td>
              <td>{{entry.points}} Punkte</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "History",
  data: function () {
    return {
      historyItems: []
    }
  },
  beforeMount: function() {
    setTimeout(() => {
      this.historyItems = [
        { antrag: "Ich brauche Hilfe ein SBB-Jahresabo zu lösen", helpseeker: "Max Musterfrau", rating: 7, points: 12},
        { antrag: "Ich brauche Hilfe ein ZVV-Jahresabo zu lösen", helpseeker: "Max Mustermann", rating: 4, points: 122},
        { antrag: "Ich brauche Hilfe ein DB-Jahresabo zu lösen", helpseeker: "Maxine Musterfrau", rating: 5, points: 4},
        { antrag: "Ich brauche Hilfe ein TGV-Jahresabo zu lösen", helpseeker: "Chad Thundercock", rating: 1, points: 0}
      ];
    }, 1000);
  }
};
</script>

<style scoped></style>
