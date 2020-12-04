<template>
  <div id="requests">

    <div class="columns is-centered">
      <div class="column is-three-quarters">

        <div class="tabs is-medium">
          <ul>
            <li :class="{ 'is-active': selectedRole === 'HelpSeeker' }"><a href="#" @click.prevent="selectedRole = 'HelpSeeker'">Ich suche Hilfe</a></li>
            <li :class="{ 'is-active': selectedRole === 'Helper' }"><a href="#" @click.prevent="selectedRole = 'Helper'">Ich leiste Hilfe</a></li>
          </ul>
        </div>

        <div v-if="selectedRole === 'Helper'">
          <h2 class="has-text-left table-label">Anträge als Helfer</h2>
          <table class="table is-fullwidth is-hoverable">
            <thead class="has-text-left">
            <tr>
              <th>Antrag</th>
              <th>Author/in</th>
              <th>Erstelldatum</th>
              <th>Ablaufdatum</th>
              <th class="has-text-centered">Bearbeiten</th>
            </tr>
            </thead>
            <tbody class="has-text-left">
            <tr v-for="(currentHelperJob, index) in currentHelperJobs" v-bind:key="currentHelperJob.id">
              <td>{{ currentHelperJob.title }}</td>
              <td>{{ currentHelperJob.author.firstname }} {{ currentHelperJob.author.lastname }}</td>
              <td>{{ currentHelperJob.created }}</td>
              <td>{{ currentHelperJob.dueDate }}</td>

              <td>
                <div class="buttons">
                  <div class="control">
                    <button class="button is-danger" @click="deleteJob(currentHelperJobs, index)">
                      <span class="icon is-small">
                          <font-awesome-icon icon="trash-alt" />
                      </span>
                      <span>Löschen</span>
                    </button>
                  </div>
                  <div class="control">
                    <button class="button" @click="showHelperJobDetails(currentHelperJob)">
                      <span class="icon is-small">
                          <font-awesome-icon icon="info" />
                      </span>
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-if="selectedRole === 'HelpSeeker'">
          <h2 class="has-text-left table-label">Laufende Anträge<!-- (IN_PROGRESS) --></h2>
          <requests-job-table v-bind:jobs="inProgressJobs"
                              v-on:open-profile="showProfileFromJob"
                              v-on:delete-job="deleteJob"
                              v-on:close-job="openRateJobModal">
          </requests-job-table>
        </div>

        <div v-if="selectedRole === 'HelpSeeker'">
          <h2 class="has-text-left table-label">Offene Anträge<!-- (OPEN) --></h2>
          <requests-job-table v-bind:jobs="openJobs" 
                              v-on:delete-job="deleteJob" 
                              v-on:match-job="findMatch"
                              v-on:edit-job="editJob">
          </requests-job-table>
        </div>
      </div>
    </div>

    <modal :class="{ 'is-active': isEditingJob }" v-if="this.currentJob !== null">
      <template v-slot:title>Antrag editieren</template>

      <template v-slot:content>
        <div class="field">
          <label class="label">Titel</label>
          <div class="control">
            <input class="input" v-model="currentJob.title" type="text" placeholder="Titel">
          </div>
        </div>

        <div class="field">
          <label class="label">Kategorien</label>
          <div class="control">
            <div class="select is-multiple is-fullwidth">
              <selectize persist v-model="currentJob.categories" :settings="categorySettings">
                <option v-for="cat in availableCategories" :key="cat.name" :value="cat.name">{{cat.name}}</option>
              </selectize>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <selectize v-model="currentJob.tags" :settings="tagSettings">
              <option v-for="tag in availableTags" :key="tag.name" :value="tag.name">{{tag.name}}</option>
            </selectize>
          </div>
        </div>

        <div class="field">
          <label class="label">Ablaufdatum</label>
          <div class="control">
            <input class="input" v-model="currentJob.dueDate" type="date" placeholder="Verfügbarkeit">
          </div>
        </div>

        <div class="field">
          <label class="label">Beschreibung</label>
          <div class="control">
            <textarea class="textarea" v-model="currentJob.description" placeholder="Ich brauche hilfe mit ..."></textarea>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <button class="button is-success" @click="updateJob()">Aktualisieren</button>
        <button class="button" @click="isEditingJob=false">Schliessen</button>
      </template>
    </modal>

    <modal :class="{ 'is-active': isMatchingModalOpen }" v-on:close-modal="isMatchingModalOpen = false">
      <template v-slot:title v-if="helperFound">Helfer/in gefunden!</template>
      <template v-slot:title v-else>Es wurde leider noch kein Helfer für Sie gefunden</template>

      <template v-slot:content>
        <table class="table is-fullwidth is-hoverable" v-if="helperFound">
          <thead>
            <tr>
              <th>Helfer/in</th>
              <th>Auswählen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="helper in availableMatches" v-bind:key="helper">
              <td>{{ helper.firstname + " " + helper.lastname }}</td>
              <td>
                <div class="buttons">
                  <button class="button is-success" @click="selectHelper(helper)">Auswählen</button>
                  <button class="button is-info" @click="showProfile(helper)">Profil anzeigen</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>

      <template v-slot:footer>
        <button class="button" @click="isMatchingModalOpen=false">Schliessen</button>
      </template>
    </modal>

    <modal :class="{ 'is-active': jobClosedBySeeker }">
      <template v-slot:title>Bewerten Sie Ihren Helper</template>
      <template v-slot:content>
          <div class="rating">
            <vue-star-rating v-bind:increment="1"
                             v-bind:max-rating="5"
                             :show-rating="false"
                             inactive-color="#858585"
                             active-color="#e9c46a"
                             v-bind:star-size="45"
                             @rating-selected ="setRating">
            </vue-star-rating>
          </div>
      </template>
      <template v-slot:footer>
          <button class="button" @click="jobClosedBySeeker=false">Abbrechen</button>
          <button class="button" @click="closeJob()">Rating bestätigen</button>
      </template>
    </modal>

    <modal :class="{ 'is-active': openMatcherProfileModal }">
      <template v-slot:title>Helfer Profil</template>
      <template v-slot:content>
        <div class="matcherProfile">
          <table class="table is-fullwidth is-hoverable">
            <thead class="has-text-left">
            <tr>
              <th>Profil</th>
            </tr>
            </thead>
            <tbody class="has-text-left">
              <tr><td>{{ "Name: " + tempDisplayedHelper.firstname + " " + tempDisplayedHelper.lastname }}</td></tr>
              <tr><td>{{ "Email: " + tempDisplayedHelper.email }}</td></tr>
              <tr><td>{{ "Biographie: " + tempDisplayedHelper.biographie }}</td></tr>
              <tr><td>{{ "Postleitzahl: " + tempDisplayedHelper.plz }}</td></tr>
              <tr><td>{{ "Jahrgang: " + tempDisplayedHelper.birthdate.slice(0, 4) }}</td></tr>
              <tr><td>{{ "Kategorien: " + tempDisplayedHelper.categories.map(category => ` ${category.name.trim("\"")}`) }}</td></tr>
              <tr><td>{{ "Tags: " + tempDisplayedHelper.tags.map(tag => ` ${tag.name.trim("\"")}`) }}</td></tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-slot:footer>
        <button class="button" @click="openMatcherProfileModal=false">Schliessen</button>
      </template>
    </modal>

  </div>
</template>

<script>

import JobApi from "@/api/jobApi";
import UserApi from "@/api/userApi";
import CategoryApi from "@/api/categoryApi";
import TagApi from "@/api/tagApi";
import Selectize from 'vue2-selectize'
import VueStarRating from "vue-star-rating/src/star-rating";
import Modal from "@/components/ModalComponent.vue";
import RequestsJobTable from "@/components/RequestsJobTable.vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faInfo} from '@fortawesome/free-solid-svg-icons';

const userApi = new UserApi();
const jobApi = new JobApi();
const categoryApi = new CategoryApi();
const tagApi = new TagApi();

library.add(faTrashAlt, faInfo);

export default {
  name: "Requests",
  components: {
    Selectize,
    VueStarRating,
    Modal,
    RequestsJobTable
  },
  data: function() {
    return {
      openJobs: [],
      inProgressJobs: [],
      availableMatches: [],
      closedJobs: [],
      currentHelperJobs: [],
      availableCategories: [],
      availableTags: [],
      isMatchingModalOpen: false,
      isEditingJob: false,
      helperFound: false,
      openMatcherProfileModal: false,
      jobClosedBySeeker: false,
      selectedRole: 'HelpSeeker',
      currentJob: null,
      categorySettings: {selectOnTab: true, maxItems: 5, highlight: true},
      tagSettings: {selectOnTab: true, maxItems: 5, highlight: true},
      tempRating: null,
      tempJob: {},
      tempOpenMatcherJob: {},
      tempDisplayedHelper: {}
    };
  },
  methods: {
    setRating: function(rating){
      this.tempRating = rating;
    },
    loadUserJobs: async function () {

      let jobs = await jobApi.fetchCurrentUserJobs();
      let helperJobs = await jobApi.fetchCurrentHelperJobs();

      for (let i = 0; i < helperJobs.length; i++) {
        this.currentHelperJobs.push(helperJobs[i]);
      }

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
    },
    findMatch: async function(job) {
      try {
          this.tempOpenMatcherJob = await jobApi.getJobById(job.id);
          this.availableMatches = await jobApi.findHelperForJobId(job.id);
          this.isMatchingModalOpen = true;
          this.helperFound = ((this.availableMatches.length >= 1))
        } catch (e) {
          console.error(e);
        }
    },
    closeJob: async function () {
      let tempJob = this.tempJob

      await userApi.addRating(this.tempRating, tempJob.matchedHelper.email);
      await jobApi.closeJobById(tempJob.id);

      let index = this.inProgressJobs.findIndex(j => j.id === tempJob.id);
      this.inProgressJobs.splice(index, 1);
      this.jobClosedBySeeker = false;
    },
    selectHelper: async function (helper) {
      try {
        let updatedJob = await jobApi.setHelperForJobId(this.tempOpenMatcherJob.id, helper.email);
        let index = this.openJobs.findIndex(j => j.id === updatedJob.id);
        this.openJobs.splice(index, 1);
        this.inProgressJobs.push(updatedJob);

      } catch (e) {
        console.error(e);
      } finally {
        this.isMatchingModalOpen = false;
        this.helperFound = false;
      }

    },
    showProfile: async function(helper) {
      try {
        this.tempDisplayedHelper = helper;
        this.openMatcherProfileModal = true;
      } catch (e) {
        console.error(e);
      }
    },
    showProfileFromJob: async function(job) {
      try {
        let tempCurrJob = await jobApi.getJobById(job.id);
        this.tempDisplayedHelper = tempCurrJob.matchedHelper;
        this.openMatcherProfileModal = true;
      } catch (e) {
        console.error(e);
      }
    },
    showHelperJobDetails: function (job) {
      this.$swal({
        title: job.title,
        html: `${job.description}<hr>Kategorien: ${job.categories.map(en => en.name).join(',')}<br>Tags: ${job.tags.map(en => en.name).join(',')}`,
      })
    },
    editJob: async function(job) {
      try {
        let tempCurrJob = await jobApi.getJobById(job.id);
        tempCurrJob.categories = tempCurrJob.categories.map(en => en.name);
        tempCurrJob.tags = tempCurrJob.tags.map(en => en.name);
        this.currentJob = tempCurrJob;
        this.isEditingJob = true
      } catch(e) {
        console.error(e);
      }
    },
    updateJob: async function() {
      try {
        let updatedJob = await jobApi.updateJob(this.currentJob);

        if (updatedJob.status === "OPEN") {
          let index = this.openJobs.findIndex(j => j.id === updatedJob.id);
          this.openJobs.splice(index, 1, updatedJob);
        }

        this.isEditingJob = false;
      } catch (e) {
        console.error(e);
      }
    },
    deleteJob: async function(job) {
      try {
        let result = await this.$swal(
          {
            title: 'Antrag löschen?',
            html: 'Willst du deinen Antrag wirklich löschen?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Löschen`,
            cancelButtonText: `Abbrechen`
          }
        )
        if (result.isConfirmed) {
          await jobApi.deleteJobById(job.id);

          switch (job.status) {
            case "IN_PROGRESS":
              this.inProgressJobs.splice(this.inProgressJobs.indexOf(job), 1);
              break;
            case "OPEN":
              this.openJobs.splice(this.openJobs.indexOf(job), 1);
              break;
            default:
              console.error("Deleted a job that isnt deletable");
              break;
          }
          
          this.$swal(
            {
              title: 'Antrag gelöscht.',
              html: 'Dein Antrag wurde erfolgreich gelöscht.',
              icon: 'success',
              confirmButtonText: `OK`,
            }
          )
        }
      } catch (e) {
         this.$swal(
            {
              title: 'Fehler beim Löschen',
              html: 'Dein Antrag konnte nicht gelöscht werden.',
              icon: 'error'
            }
          )
      }
    },
    openRateJobModal: async function (job) {
      this.jobClosedBySeeker = true;
      this.tempJob = job;
    }
  },
  beforeMount: async function() {
    // noinspection ES6MissingAwait
    this.loadUserJobs();
    this.availableCategories = await categoryApi.fetchCategories();
    this.availableTags = await tagApi.fetchTags();
  }
};
</script>

<style scoped>
.table-label {
  margin-bottom: 40px;
  margin-top: 40px;
}
#requests {
  display: flex;
  flex-direction: column;
}
</style>
