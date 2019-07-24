<template>
    <ul>
          
    <h3>Text</h3>
    <ul>
        <li v-on:click="addText">Draw Text</li>

        <div v-if="ifTextOptions">
          <label>Font</label>
          <select v-model="font" v-on:change="changeFont">
            <option v-for="font in availableFonts" v-bind:key="font">{{font}}</option>
          </select> 

          <label>Text Content</label>
          <input value="text" v-model="textContent" v-on:change="changeTextContent"/>

          <label>Font Size</label>
          <input value="text" v-model="fontSize" v-on:change="changeFontSize"/>
        </div>

    </ul>              
    </ul>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import image from "@/assets/daisies_small.jpg";

export default {
  name: 'designs',
  props: ['user', 'text', 'allShapes', 'ifTextOptions'],
  data () {
    return {
    img: null,
    textContent: "Text Value",
    fontSize: 120,
    font: "Comic Sans", // for the memes ok,
    availableFonts: ["Helvetica", "Times New Roman", "Arial", "Roboto"]
    }
  },
  methods: {
    addText() {
      let name = `text_node${this.text.length + 1}`
      
      let simpleText = {
        x: 50,
        y: 50,
        text: 'Simple Text',
        fontSize: 100,
        fontFamily: 'Calibri',
        fill: 'white',
        draggable: 'true',
        name: name,
        isVisible: true
      };
    this.text.push(simpleText);

    this.allShapes.push(simpleText);
    console.log("iftextopts", this.ifTextOptions);
    },
    changeFont() {
      console.log("change font");
      this.text[0].fontFamily = this.font;
    },
    changeTextContent() {
      this.text[0].text = this.textContent;
    },
    changeFontSize() {
      this.text[0].fontSize = this.fontSize;
    },
    fetchData () {
      userSession.getFile(STORAGE_FILE) // decryption is enabled by default
        .then((todosText) => {
          var notes = JSON.parse(todosText || '[]')
          notes.forEach(function (note, index) {
            note.id = index
          })
          this.uidCount = notes.length
          this.notes = notes
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

ul li {
  text-decoration: none;
  list-style: none;
  padding-right: 4em;
  cursor: pointer;
  color: silver;
  font-family: "Helvetica Neue", sans-serif;
}

label {
  color: silver;
  font-family: "Roboto", sans-serif;
}

</style>