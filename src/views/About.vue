<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ tableData }}

    <table class="table is-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Edit btn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.name">
          <td v-if="!item.editing">{{ item.name }}</td>
          <td v-if="!item.editing">{{ item.mail }}</td>

          <td v-if="item.editing">
            <input type="text" class="input" v-model="item.name" />
          </td>
          <td v-if="item.editing">
            <input type="email" class="input" v-model="item.mail" />
          </td>

          <td v-if="!item.editing">
            <button class="button" v-on:click="item.editing = !item.editing">
              Edit
            </button>
          </td>
          <td v-if="item.editing">
            <button class="button" v-on:click="item.editing = !item.editing">
              Save
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "About",
  data: function() {
    return {
      tableData: []
    };
  },
  beforeMount: function() {
    console.log("Yes");

    setTimeout(() => {
      this.tableData = [
        { name: "austin", mail: "austin@whatever", editing: false },
        { name: "austin2", mail: "austin@whatever2", editing: false },
        { name: "austin3", mail: "austin@whatever3", editing: false }
      ];
    }, 5000);
  }
};
</script>
