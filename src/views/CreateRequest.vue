<template>
  <div id="create-request">
    <h1>Antrag Erstellen</h1>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter has-text-left">
        <div class="field">
          <label class="label">Titel</label>
          <div class="control">
            <input class="input" type="text" placeholder="Titel">
          </div>
        </div>

        <div class="field">
          <label class="label">Kategorien</label>
          <div class="control">
            <div class="select is-multiple is-fullwidth">
              <select multiple size="5">
                <option value="Englisch">Englisch</option>
                <option value="Deutsch">Deutsch</option>
                <option value="Kat1">Kat1</option>
                <option value="Kat2">Kat2</option>
                <option value="Etc">Etc</option>
                <option value="Other">Other</option>
                <option value="Pog">Pog</option>
              </select>
            </div>
          </div>
          <p class="help">Mehrere mit CTRL+Click auswählen</p>
        </div>

        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <input class="input" type="text" placeholder="z.B. sbb, billet, zvv">
          </div>
        </div>

        <div class="field">
          <label class="label">Beschreibung</label>
          <div class="control">
            <textarea class="textarea" placeholder="Ich brauche hilfe mit ..."></textarea>
          </div>
        </div>

        <div class="buttons">
          <button class="button is-info">Antrag Erstellen</button>
          <button class="button">Abbrechen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateRequest"
};
</script>

<style scoped></style>
