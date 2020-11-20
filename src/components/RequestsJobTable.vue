<template>
    <table class="table is-fullwidth is-hoverable">
        <thead class="has-text-left">
            <tr>
                <th>Antrag</th>
                <th>Helfer/in</th>
                <th>Erstelldatum</th>
                <th class="has-text-centered">Bearbeiten</th>
            </tr>
        </thead>
        <tbody class="has-text-left">
            <tr v-for="job in jobs" :key="job.id">
                <td>{{ job.title }}</td>
                <td>{{ job.matchedHelper ? job.matchedHelper.firstname : "Unbekannt" }}</td>
                <td>{{ job.created }}</td>

                <td>
                    <div class="buttons" v-if="job.status === 'IN_PROGRESS'">
                        <button class="button is-danger" @click="$emit('delete-job', job)">
                            <span class="icon is-small">
                                <font-awesome-icon icon="trash-alt" />
                            </span>
                            <span>Löschen</span>
                        </button>
                        <button class="button is-info" @click="$emit('close-job', job)">
                            <span class="icon is-small">
                                    <font-awesome-icon icon="clipboard-check" />
                                </span>
                                <span>Job Abschliessen</span>
                        </button>
                    </div>

                    <div class="buttons" v-if="job.status === 'OPEN'">
                        <div class="control">
                            <button class="button is-danger" @click="$emit('delete-job', job)">
                                <span class="icon is-small">
                                    <font-awesome-icon icon="trash-alt" />
                                </span>
                                <span>Löschen</span>
                            </button>
                        </div>
                        <div class="control">
                            <button class="button" @click="$emit('match-job', job)">
                                <span class="icon is-small">
                                    <font-awesome-icon icon="people-arrows" />
                                </span>
                                <span>Match</span>
                            </button>
                        </div>
                        <div class="control">
                            <button class="button is-info" @click="$emit('edit-job', job)">
                                <span class="icon is-small">
                                    <font-awesome-icon icon="edit" />
                                </span>
                                <span>Bearbeiten</span>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPeopleArrows, faEdit, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faTrashAlt, faPeopleArrows, faEdit, faClipboardCheck);

export default {
  name: "RequestsJobTable",
  props: {
      jobs: Array
  }
}
</script>

<style scoped>

</style>