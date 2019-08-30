<template>
    <section>
          
    <h3>Text</h3>
      <div>
          <button v-on:click="addText">Draw Text</button>

          <h3>Text Elements </h3>
          <ul>
            <li v-on:click="addText(headingTextElem)"><h1>Heading</h1></li>
            <li v-on:click="addText(secondaryHeadingTextElem)"><h2>Secondary Heading</h2></li>
            <li v-on:click="addText(paragraphTextElem)">Paragrafph text</li>
          </ul>

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
      // this.selectedNode = simpleText;
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