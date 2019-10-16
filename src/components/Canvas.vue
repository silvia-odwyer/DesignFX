<template>

    <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" id="stage" >

        <v-layer>
            <v-rect :config="canvas_to_json_mut.background"/>
        </v-layer>

        <v-layer ref="layer">
            <v-image v-for="img in canvas_to_json_mut.images" :config="img" v-on:dragEnd="updateNodePosition(img)"/>
            <v-rect v-for="item in canvas_to_json_mut.elements.rectangles" :config="item" v-on:dragEnd="updateNodePosition(item)" />
                      
            <div v-if="textFontsLoaded">
                <v-text v-for="item in canvas_to_json_mut.text" :key="item.name" :config="item" v-on:dblclick="editText(item)" 
                v-on:dragEnd="updateNodePosition(item)"
                />
            </div>

            <div v-if="!textFontsLoaded">
                <v-circle v-for="item in canvas_to_json_mut.elements.circles" :key="item.id" :config="item" v-on:dragEnd="updateNodePosition(item)"></v-circle>
            </div>
                      
            <v-line v-for="item in canvas_to_json_mut.elements.lines" :config="item"/>
  
            <v-circle v-for="item in canvas_to_json_mut.elements.circles" :key="item.id" :config="item" v-on:dragEnd="updateNodePosition(item)"></v-circle>
                      
            <v-ellipse v-for="item in canvas_to_json_mut.elements.ellipses" :key="item.id" :config="item" v-on:dragEnd="updateNodePosition(item)"></v-ellipse>

            <v-transformer ref="transformer" />
        </v-layer>

    </v-stage>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue";
import Modal from "@/components/Modal.vue";
var STORAGE_FILE = 'notes.json'
var IMAGE_STORAGE_FILE = "image.PNG";

import WebFontLoader from 'webfontloader';

const width = window.innerWidth;
const height = window.innerHeight;

export default {
  name: 'dashboard',
  props: ['user', 'canvas_to_json', 'textFontsLoaded'],
  components: {
    Header,
    Sidebar,
    Modal
  },
  created() {
  },
  data () {
    return {
      notes: [],
      note: '',
      uidCount: 0,
      stageSize: {
              width: width * 0.52,
              height: height * 0.82
            },
      allShapes: [],
      selectedShapeName: '',
      selectedNode: null,
      ifTextOptions: false,
      currentSidebarComponent: "designs",
      list: [],
      showModal: false,
      changesMade: false,
      canvas_to_json_mut: this.canvas_to_json
    }
  },
  watch: {
    canvas_to_json_mut : function (canvas_to_json) {
        this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
        }  
    },
  mounted () {
    this.initCanvas();
  },
  methods: {
    // Initialise the canvas by creating a background rect, etc.,
    initCanvas() {
      let backgroundColor = this.canvas_to_json_mut.backgroundColor;

      let backgroundRect = {
              x: 0,
              y: 0,
              width: this.stageSize.width,
              height: this.stageSize.height,
              fill: backgroundColor,
              name: "backgroundRect",
            };
      this.canvas_to_json_mut.background = backgroundRect;
    },
    
    updateCanvas: function(canvas_to_json) {
      // Changes have been made to the canvas, therefore it must be saved
      // so that auto-saving can occur, etc.,
      this.changesMade = true;
      this.resetAllShapes();      
      let backgroundColor = canvas_to_json.backgroundColor;
      let backgroundRect = {
        x: 0,
        y: 0,
        width: this.stageSize.width,
        height: this.stageSize.height,
        fill: backgroundColor,
        name: "backgroundRect",
      };
      canvas_to_json.background = backgroundRect;
      this.canvas_to_json_mut = canvas_to_json;
      this.updateAllShapes();
    },

    save() {
      localStorage.setItem('storage', JSON.stringify(this.canvas_to_json));
    },
    loadDesign() {
      var data = localStorage.getItem('storage') || '[]';
      data = JSON.parse(data);

      if (data.length != 0) {
        if (data.rectangles != []) {
          this.canvas_to_json_mut.elements = data.elements;
        }
        if (data.text != []) {
          this.text = data.text;
        }
        if (data.images != []) {
          // this.images = data.images;
        }

        this.updateAllShapes();
      }

    },
    toggleModal() {
      console.log("toggle modal")
      this.showModal = !this.showModal;
    },

    setFontLoaded() {
      console.log("Google Font Loaded");
      this.$emit('font-loaded');
      this.textFontsLoaded = true;
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear the current selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';

        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its name
      const name = e.target.name();

      const rect = this.allShapes.find(r => r.name === name);

      this.changeSidebarComponent(rect);
      this.selectedNode = rect;

      if (rect) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = '';
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getStage();
      const stage = transformerNode.getStage();

      const { selectedShapeName } = this;

      const selectedNode = stage.findOne('.' + selectedShapeName);

      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.attachTo(selectedNode);
      } else {
        // remove transformer
        transformerNode.detach();

        // set selected node back to null
        this.selectedNode = null;
      }
      transformerNode.getLayer().batchDraw();
    },
    updateNodePosition(item) {
      const transformerNode = this.$refs.transformer.getStage();
      const stage = transformerNode.getStage();
      
      const selectedNode = stage.findOne('.' + item.name);

      let newPos = selectedNode.absolutePosition();
      item.x = newPos.x;
      item.y = newPos.y;
      
    },

    changeSidebarComponent(selectedNode) {
        if (this.canvas_to_json_mut.elements.rectangles.includes(selectedNode)) {
          console.log("is a rect");
          this.currentSidebarComponent = "elements";
        }
        else {
        }
    },
    updateAllShapes() {
      let elem_keys = Object.keys(this.canvas_to_json_mut.elements);

      for (var i = 0; i < elem_keys.length; i++) {
        let elem_key = elem_keys[i];
        var vals = this.canvas_to_json_mut.elements[elem_key];

        for (var k = 0; k < vals.length; k++) {
          let shape = vals[k];
          this.allShapes.push(shape);
        }
      };
      for (var j = 0; j < this.canvas_to_json_mut.images.length; j++) {
        let img = this.canvas_to_json_mut.images[j];

        this.allShapes.push(img);

      }

      for (var i = 0; i < this.canvas_to_json_mut.text.length; i++) {
        this.allShapes.push(this.canvas_to_json_mut.text[i]);
      }

    },
    editText(text_elem) {
      text_elem.isVisible = false;

    },
    resetAllShapes() {
      this.allShapes = [];
    },
    resetCanvasToJson() {
      this.canvas_to_json_mut = {
        filename: "Design1",
        elements: {
          rectangles: [],
          circles: [],
          lines : [],
          ellipses: [],
        },
        text: [],
        images: [],
        backgroundColor: "#000000"
      }
    },
    removeTransformer() {
      const transformerNode = this.$refs.transformer.getStage();

      // remove transformer
      transformerNode.detach();
      
    },
    editChangesMade: function(result) {
      console.log("changes made DASH", result);
      this.changesMade = result;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@font-face {
    font-family: 'FontAwesome';
    src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/fonts/fontawesome-webfont.ttf');
    font-weight: normal;
    font-style: normal;
}

label {
  margin-bottom: 0;
  // width: 100%;
  cursor: pointer;
  input[type="checkbox"] {
    margin-right: 5px;
  }
}
.list-group-item {
  &.completed label {
    text-decoration: line-through;
  }

  .delete {
    display: none;
  }

  &:hover .delete {
    display: inline;
    color: grey;
    &:hover {
      text-decoration: none;
      color: red;
    }
  }
}

.main {
  margin-left: 70vh;
  padding: 0px 10px;
  background-color: lightgray;
  height: 100%;
}

.main_content {
  padding-top: 14vh;
}

@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
    .sidebar a {font-size: 18px;}
  }

ul li {
  text-decoration: none;
  list-style: none;
  padding-right: 4em;
}

ul li:hover {
  color: silver;
}

.tab_nav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 0;
}

h2, h3, h4, h5 {
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}

h4 {
  text-transform: uppercase;
  font-size: 0.7em;
  letter-spacing: 4px;
}



.colour_scheme {
  border: solid transparent 0.1em;
  border-radius: 0.5em;
  background-color: rgb(29, 27, 27);
  padding: 2em;
  padding-right:4em;
  padding-left: 4em;
}

// .under_header {
//   display: grid;
//   grid-template-columns: 20% 80%;
//   grid-template-rows: auto;
//   grid-template-areas: "sidebar_area main_area";
// }

// .sidebar {
//   grid-area: "sidebar_area";
// }

// .main {
//   grid-area: "main_area";
// }

.content {
  background-color: white;
  width: 80%;
}

#stage {
  margin-left: auto;
  margin-right: auto;
}


.preloader{
   width:100%;
   height:100vh;
   background-color: "black";
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items:center;
   color: white;
   font-family: 'Lato', sans-serif;
   position: relative;
   }

.frontpage{
   height: 100vh;
   background: #34495e;
}


</style>