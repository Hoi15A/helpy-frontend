<template>
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
            <tr v-for="job in jobs" v-bind:key="job.value">
                <td>{{ job.title }}</td>
                <td>{{ job.matchedHelper ? job.matchedHelper.firstname : "Kein Helfer" }}</td>
                <td>{{ job.created }}</td>
                <td>0</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: "ClosedJobTable",
  props: {
    jobs: Array
  }
};
</script>

<style scoped>

</style>