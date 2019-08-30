<template>
    <div class="textOptions">
        <h2>Text Options</h2>
        <label>Font</label>
            <select v-model="fontFamily" v-on:change="changeFont">
              <option v-for="fontFamily in availableFonts" v-bind:key="fontFamily">{{fontFamily}}</option>
            </select> 

        <label>Text Content</label>
        <input value="text" v-model="textContent" v-on:input="changeTextContent"/>

        <label>Font Size</label>
        <input value="text" v-model="fontSize" v-on:change="changeFontSize"/>

        <div>
            <colorPicker
                :color="textColor"
                @changeColor="changeColor"
            />
        </div>
    </div>  
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  name: 'textOptions',
  props: ['user', 'canvas_to_json', 'designTemplates', 'allShapes', 'transformer', 'ifTextOptions', 'changesMade', 'selectedNode'],
  components: {
      colorPicker
  },
  watch : {
  },
  data () {
    return {
        canvas_to_json_mut: this.canvas_to_json,
        mutableIfTextOptions: false,
        fontSize: 120,
        textColor: "black",
        fontFamily: "Roboto",
        availableFonts: ["Helvetica", "Times New Roman", "Arial", "Roboto", "Oswald"],
        headingTextElem: {fontSize: 100, fontFamily: "Roboto"},
        secondaryHeadingTextElem: {fontSize: 40, fontFamily: "Roboto"},
        paragraphTextElem: {fontSize: 20, fontFamily: "Helvetica"},
        textContent: "sample text",
    }
  },
  mounted() {
  },
  methods: {
    changeColor(color) {
      let hex = color.rgba.toHexString();
      this.textColor = hex;
      if (this.selectedNode != undefined || this.selectedNode != null ) {
        this.selectedNode.fill = hex;
      }
    },

    changeFont() {
      if (this.selectedNode != undefined || this.selectedNode != null ) {

        this.selectedNode.fontFamily = this.fontFamily;
      }
    },
    changeTextContent() {
      if (this.selectedNode != undefined || this.selectedNode != null ) {
        this.selectedNode.text = this.textContent;
      }
    },
    changeFontSize() {
      if (this.selectedNode != undefined || this.selectedNode != null ) {
        this.selectedNode.fontSize = this.fontSize;
      }
    },
  }
}

</script>

<style>

section{
  margin-left: 2vh;
}

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
  display: block;
}

.textOptions {
  padding-top: 3vh;
}

button {
  background-color: black;
  padding: 2vh;
  color: white;
  border: none;
  border-radius: 0.2vh;
  cursor: pointer;
  margin-left: 2vh;
}

h2 {
  font-size: 2.5vh;
}

button:hover{
  color: gainsboro;
}

</style>