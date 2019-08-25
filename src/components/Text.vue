<template>
    <section>
          
    <h3>Text</h3>
      <div>
          <button v-on:click="addText">Draw Text</button>

          <h3>Text Elements </h3>
          <ul>
            <li v-on:click="addText(headingTextElem)"><h1>Heading</h1></li>
            <li v-on:click="addText(secondaryHeadingTextElem)"><h2>Secondary Heading</h2></li>
            <li v-on:click="addText(paragraphTextElem)">Paragraph text</li>
          </ul>

          <div v-if="mutableIfTextOptions" class="textOptions">
            <h4>Text Options</h4>
            <label>Font</label>
            <select v-model="fontFamily" v-on:change="changeFont">
              <option v-for="fontFamily in availableFonts" v-bind:key="fontFamily">{{fontFamily}}</option>
            </select> 

            <label>Text Content</label>
            <input value="text" v-model="textContent" v-on:input="changeTextContent"/>

            <label>Font Size</label>
            <input value="text" v-model="fontSize" v-on:change="changeFontSize"/>

            <div>
                <color-picker
                    :color="textColor"
                    @changeColor="changeColor"
                />
            </div>
          </div>

      </div>              
    </section>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import image from "@/assets/daisies_small.jpg";
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  name: 'textOptions',
  props: ['user', 'allShapes', 'ifTextOptions', 'selectedNode', 'canvas_to_json'],
  components: {
    colorPicker
  },
  watch : {
    selectedNode : function (value) {


      if (value != null) {
        if (value.name.startsWith("text")) {
          // Update text options
          this.textContent = value.text
          this.textColor = value.textColor;
          this.fontFamily = value.fontFamily;
          this.fontSize = value.fontSize;

          // make text options visible
          this.mutableIfTextOptions = true;
        }
      }
    },
    ifTextOptions: function(ifTextOptions) {
      this.ifTextOptions = ifTextOptions;
    }
  },
  data () {
    return {
      img: null,
      textContent: "sample text",
      fontSize: 120,
      textColor: "black",
      fontFamily: "Roboto",
      availableFonts: ["Helvetica", "Times New Roman", "Arial", "Roboto", "Oswald"],
      mutableIfTextOptions: this.ifTextOptions,
      headingTextElem: {fontSize: 100, fontFamily: "Roboto"},
      secondaryHeadingTextElem: {fontSize: 40, fontFamily: "Roboto"},
      paragraphTextElem: {fontSize: 20, fontFamily: "Helvetica"}
    }
  },
  mounted() {
    console.log("if text options text comp", this.ifTextOptions);
  },
  methods: {
    
    addText(text_elem) {
      console.log("text canvas to json", this.canvas_to_json);
      let name = `text_node${this.canvas_to_json.text.length + 1}`
      
      let simpleText = {
        x: 50,
        y: 50,
        text: 'Sample Text',
        fill: this.textColor,
        draggable: 'true',
        name: name,
        isVisible: true
      };

      simpleText.fontSize = text_elem.fontSize;
      simpleText.fontFamily = text_elem.fontFamily;
      
      this.canvas_to_json.text.push(simpleText);

      this.allShapes.push(simpleText);
      this.mutableIfTextOptions = true;
      this.selectedNode = simpleText;
    },
    changeColor(color) {
      console.log("changed color");
      let hex = color.rgba.toHexString();
      this.textColor = hex;
      if (this.selectedNode != undefined || this.selectedNode != null ) {
        this.selectedNode.fill = hex;
      }
    },

    changeFont() {
      console.log("change font");
      if (this.selectedNode != undefined || this.selectedNode != null ) {

        this.selectedNode.fontFamily = this.fontFamily;
      }
    },
    changeTextContent() {
      console.log("CURRENT TEXT NODE", this.selectedNode);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

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