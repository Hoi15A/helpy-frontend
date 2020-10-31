<template>
  <div class="modal" v-bind:class="{ 'is-active': isModalOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Helper gefunden!</p>
      </header>
      <section class="modal-card-body">
        <table class="table is-fullwidth is-hoverable">
          <thead>
          <tr>
            <th>Helfer/in</th>
            <th>Biografie</th>
            <th>Standort</th>
            <th>Auswählen</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in value" v-bind:key="item">
            <td>{{ item.firstname + " " + item.lastname }}</td>
            <td>{{ item.biographie }}</td>
            <td>{{ item.plz }}</td>
            <td>
              <button class="button" @click="selectHelper(item)">Auswählen</button>
            </td>
          </tr>
          </tbody>
        </table>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="$router.push('/')">Abbrechen</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchNotification",
  props: ["value"]
}
</script>

<style scoped>

.modal-card {
  width: 60vw;
}
</style>