<template>
    <div class="textOptions">
        <h2>Text Options</h2>
        <label>Font</label>
            <select v-model="fontFamily" v-on:change="changeFont">
              <option v-for="fontFamily in availableFonts" v-bind:key="fontFamily">{{fontFamily}}</option>
            </select> 

        <label>Text Content</label>
        <TextInputField :text="selectedNode.text" @updateTextValue="changeTextContent"></TextInputField>

        <label>Font Size</label>
        <TextInputField :text="selectedNode.fontSize" @updateTextValue="changeFontSize"></TextInputField>

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
import { userSession } from '../userSession';
import colorPicker from '@caohenghu/vue-colorpicker';
import TextInputField from "@/components/TextInputField.vue";
import { isNumber } from 'util';

export default {
  name: 'textOptions',
  props: ['user', 'canvas_to_json', 'designTemplates', 'allShapes', 'transformer', 'ifTextOptions', 'changesMade', 'selectedNode'],
  components: {
      colorPicker, TextInputField
  },
  watch : {
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    },
    selectedNode: function(selectedNode) {
        if (selectedNode != null) {
            if (selectedNode.name.startsWith("text")) {
                // Update text options
                this.textContent = selectedNode.text;
                this.textColor = selectedNode.textColor;
                this.fontFamily = selectedNode.fontFamily;
                this.fontSize = selectedNode.fontSize;
            }
        }
        this.textNode =  this.canvas_to_json_mut.text.find(elem => elem.name === selectedNode.name);
    }
  },
  data () {
    return {
        canvas_to_json_mut: this.canvas_to_json,
        mutableIfTextOptions: false,
        fontSize: 120,
        textColor: "black",
        textNode: null,
        fontFamily: "Roboto",
        availableFonts: ["Helvetica", "Times New Roman", "Arial", "Roboto", "Oswald"],
        headingTextElem: {fontSize: 100, fontFamily: "Roboto"},
        secondaryHeadingTextElem: {fontSize: 40, fontFamily: "Roboto"},
        paragraphTextElem: {fontSize: 20, fontFamily: "Helvetica"},
        textContent: "sample text",
        textSize: ""
    }
  },
  mounted() {
    this.textNode =  this.canvas_to_json_mut.text.find(elem => elem.name === this.selectedNode.name);
  },
  methods: {
      
    changeColor(color) {
      let hex = color.rgba.toHexString();
      this.textColor = hex;
      if (this.selectedNode != undefined || this.selectedNode != null ) {
        this.textNode.fill = hex;
        this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
      }
    },

    changeFont() {
      if (this.selectedNode != undefined || this.selectedNode != null ) {
        this.textNode.fontFamily = this.fontFamily;
        this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    }
    },
    changeTextContent: function(value) {
      if (this.selectedNode != undefined || this.selectedNode != null ) {
        this.textNode.text = value;
        this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
      }
    },
    changeFontSize: function(value) {
      if (this.selectedNode != undefined || this.selectedNode != null ) {

        this.textNode.fontSize = Number(value);
        this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
        
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
  margin-left: 3vh;
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
  font-family: "Lato", sans-serif;
  color: lightgray;
}

button:hover{
  color: gainsboro;
}

</style>