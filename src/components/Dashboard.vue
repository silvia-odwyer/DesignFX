<template>
  <div class="dashboard">
    <div class="default">
      <Header :user="user" :transformer="$refs.transformer" :canvas_to_json="canvas_to_json" @updateCanvasToJson="updateCanvas"></Header>

      <div class="under_header">
        <Sidebar class="sidebar" :canvas_to_json="canvas_to_json" :allShapes="allShapes" :transformer="$refs.transformer" 
                  :image_template="image_template" :ifTextOptions="ifTextOptions" :selectedNode="selectedNode" :designTemplates="designTemplates"
                  @updateCanvasToJson="updateCanvas" :changesMade="changesMade" @toggleModal="toggleModal" @editChangesMade="editChangesMade"></Sidebar>
            
            <div class="main">
              <div class="main_content">
              
                <section class="content">
                  
                  <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" id="stage" >
                    
                    <v-layer ref="layer2">
                      <v-image :config="image_template" />

                    </v-layer>

                    <v-layer>
                      <v-rect :config="canvas_to_json.background"/>

                    </v-layer>

                    <v-layer ref="layer">
                      <v-image v-for="img in canvas_to_json.images" :config="img" v-on:dragEnd="updateNodePosition(img)"/>
                      <v-rect v-for="item in canvas_to_json.elements.rectangles" :config="item" v-on:dragEnd="updateNodePosition(item)" />
                      
                      <div v-if="textFontsLoaded">
                        <v-text v-for="item in canvas_to_json.text" :key="item.name" :config="item" v-on:dblclick="editText(item)" 
                        v-on:dragEnd="updateNodePosition(item)"
                        v-on:click="showTextOptions"/>
                      </div>

                      <div v-if="!textFontsLoaded">
                        <v-circle v-for="item in canvas_to_json.elements.circles" :key="item.id" :config="item" v-on:dragEnd="updateNodePosition(item)"></v-circle>
                      </div>
                      
                      <v-line v-for="item in canvas_to_json.elements.lines" :config="item"/>
  
                      <v-circle v-for="item in canvas_to_json.elements.circles" :key="item.id" :config="item" v-on:dragEnd="updateNodePosition(item)"></v-circle>
                      
                      <v-ellipse v-for="item in canvas_to_json.elements.ellipses" :key="item.id" :config="item" v-on:dragEnd="updateNodePosition(item)"></v-ellipse>

                      <v-transformer ref="transformer" />
                    </v-layer>

                  </v-stage>
                </section>
            </div>
              <button v-on:click="save">Save</button>
              <button v-on:click="toggleModal">Show Modal</button>
            </div>
            </div>
            <Modal v-if="showModal" @close="toggleModal"></Modal>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import designTemplatesJSON from "@/assets/json/designTemplates.json"
import { userSession } from '../userSession'
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue";
import Modal from "@/components/Modal.vue";

var STORAGE_FILE = 'notes.json'
var IMAGE_STORAGE_FILE = "image.PNG";
import image from "@/assets/daisies_small.jpg";
import layout1 from "@/assets/travel.png";
import layout2 from "@/assets/lemonade.png";
import layout3 from "@/assets/summer_collection.png";
import layout4 from "@/assets/travel.png";
import layout5 from "@/assets/lemonade.png";
import layout6 from "@/assets/summer_collection.png";

import WebFontLoader from 'webfontloader';

const width = window.innerWidth;
const height = window.innerHeight;

export default {
  name: 'dashboard',
  props: ['user'],
  components: {
    Header,
    Sidebar,
    Modal
  },
  created() {
    WebFontLoader.load({
      google: {
        families: ['Oswald', 'Droid Serif', 'Montserrat', 'Lato']
      },
      active: this.setFontLoaded,
    });
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
      image_template: null,
      currentSidebarComponent: "designs",
      list: [],
      designTemplates: designTemplatesJSON["designTemplates"],
      canvas_to_json: {
        filename: "",
        elements: {
          rectangles: [],
          circles: [],
          lines : [],
          ellipses: [],
        },
        text: [],
        images: [],
        background: {},
        backgroundColor: "#FFFFFF"
      },
      textFontsLoaded: false,
      showModal: false,
      changesMade: false
    }
  },
  watch: {
    notes: {
      handler: function (notes) {
        // encryption is now enabled by default
        return userSession.putFile(STORAGE_FILE, JSON.stringify(notes) );
      },
      deep: true
    }
  },
  mounted () {
    // this.fetchData();
    // this.loadDesign();
    console.log("mounted dashboard", this.canvas_to_json);
    this.initCanvas();

    this.initDefaultFonts();
  },
  methods: {
    displayLayout(img) {
      const image = new window.Image();
      image.src = img.img_src;
      image.onload = () => {
        // set image only when it is loaded
        this.image_template = {image: image, draggable: true, name: img.layout_name};
      };
    },

    initDefaultFonts() {
      if (this.textFontsLoaded) {
        return;
      }
    },

    // Initialise the canvas by creating a background rect, etc.,
    initCanvas() {
      let backgroundColor = this.canvas_to_json.backgroundColor;

      let backgroundRect = {
              x: 0,
              y: 0,
              width: this.stageSize.width,
              height: this.stageSize.height,
              fill: "",
              name: "backgroundRect",
            };
      this.canvas_to_json.background = backgroundRect;
    },
    
    updateCanvas: function(canvas_to_json) {

      // Changes have been made to the canvas, therefore it must be saved
      // so that auto-saving can occur, etc.,
      this.changesMade = true;
      this.resetAllShapes();      

      let backgroundColor = canvas_to_json.backgroundColor;
      console.log("background color", backgroundColor);
      let backgroundRect = {
        x: 0,
        y: 0,
        width: this.stageSize.width,
        height: this.stageSize.height,
        fill: backgroundColor,
        name: "backgroundRect",
      };
      canvas_to_json.background = backgroundRect;

      this.canvas_to_json = canvas_to_json;
      this.updateAllShapes();
    },
    showTextOptions() {

      this.ifTextOptions = true;
    },
    save() {

      localStorage.setItem('storage', JSON.stringify(this.canvas_to_json));
    },
    loadDesign() {
      var data = localStorage.getItem('storage') || '[]';
      data = JSON.parse(data);

      if (data.length != 0) {
        if (data.rectangles != []) {
          this.canvas_to_json.elements = data.elements;
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

      console.log("THIS.ALLSHAPES", this.allShapes);
      
      const rect = this.allShapes.find(r => r.name === name);

      this.changeSidebarComponent(rect);
      this.selectedNode = rect;
      console.log("SELECTED NODE IS NOW", this.selectedNode);

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
  
    addNote () {
      if (!this.note.trim()) {
        return
      }
      this.notes.unshift({
        id: this.uidCount++,
        text: this.note.trim(),
        completed: false
      })
      this.note = ''
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
        if (this.canvas_to_json.elements.rectangles.includes(selectedNode)) {
          console.log("is a rect");
          this.currentSidebarComponent = "elements";
        }
        else {
          console.log("not a rect");
        }
    },
    drawToCanvas() {
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      
      var imageElem = new Image();

      imageElem.onload = () => {
        context.drawImage(imageElem, 0, 0);
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        var array = imageData.data; // array is a Uint8ClampedArray
        var buffer = imageData.data.buffer; // buffer is a ArrayBuffer
                    
        userSession.putFile("image1.PNG", buffer);
      }
      imageElem.src = this.image;
     
    },
    updateAllShapes() {
      let elem_keys = Object.keys(this.canvas_to_json.elements);

      for (var i = 0; i < elem_keys.length; i++) {
        let elem_key = elem_keys[i];
        var vals = this.canvas_to_json.elements[elem_key];

        for (var k = 0; k < vals.length; k++) {
          let shape = vals[k];
          this.allShapes.push(shape);
        }
      };


      console.log("imgsds", this.canvas_to_json.images);
      for (var j = 0; j < this.canvas_to_json.images.length; j++) {
        let img = this.canvas_to_json.images[j];

        this.allShapes.push(img);
      //   console.log("all shapes from imgs", this.allShapes);
      }

      for (var i = 0; i < this.canvas_to_json.text.length; i++) {
        this.allShapes.push(this.canvas_to_json.text[i]);
      }
      console.log("updated all shapes", this.allShapes);

    },
    editText(text_elem) {
      text_elem.isVisible = false;

    },
    resetAllShapes() {
      this.allShapes = [];

    },
    resetCanvasToJson() {
      this.canvas_to_json = {
        filename: "",
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
     displayTemplate(img) {
      console.log("display template")
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      
      var imageElem = new Image();

      imageElem.onload = () => {
        context.drawImage(imageElem, 0, 0);
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        var array = imageData.data; // array is a Uint8ClampedArray
        var buffer = imageData.data.buffer; // buffer is a ArrayBuffer
                    
      }
      imageElem.src = img.img_src;
     
    },
    stageToJSON() {
      const transformerNode = this.$refs.transformer.getStage();
      const stage = transformerNode.getStage();
      
      var image = stage.toImage({
        callback(img) {
          console.log(img);
        }
      });
    
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

    signOut () {
      userSession.signUserOut(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,500,600,700|Oswald");

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
</style>