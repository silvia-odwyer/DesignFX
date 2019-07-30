<template>
  <div class="dashboard">
    <div class="default">
      <Header :user="user" :transformer="$refs.transformer"></Header>

      <Sidebar :canvas_to_json="canvas_to_json" :allShapes="allShapes" :text="text" :images="images" :transformer="$refs.transformer" 
                :image_template="image_template" :ifTextOptions="ifTextOptions" :selectedNode="selectedNode" :designTemplates="designTemplates"
                @updateCanvasToJson="updateCanvas"                
        ></Sidebar>
          <div class="main">
            <div class="main_content">
            
              <section class="content">
                
                <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" id="stage">
                  
                  <v-layer ref="layer2">
                    <v-image :config="image_template" />

                  </v-layer>

                  <v-layer ref="layer">
                    <v-rect v-for="item in canvas_to_json.elements.rectangles" :config="item" v-on:dragEnd="updateNodePosition(item)" />
                    <v-text v-for="item in canvas_to_json.text" :key="item.name" :config="item" v-on:dblclick="editText(item)" 
                    v-on:dragEnd="updateNodePosition(item)"
                    v-on:click="showTextOptions" v-if="item.isVisible"/>
                    <v-image v-for="img in canvas_to_json.images" :config="img" v-on:dragEnd="updateNodePosition(img)"/>
                    <v-line v-for="item in canvas_to_json.elements.lines" :config="item"/>
 
                    <v-circle v-for="item in canvas_to_json.elements.circles" :key="item.id" :config="item" v-on:dragEnd="updateNodePosition(item)"></v-circle>
                    
                    <v-ellipse v-for="item in canvas_to_json.elements.ellipses" :key="item.id" :config="item" v-on:dragEnd="updateNodePosition(item)"></v-ellipse>

                    <v-transformer ref="transformer" />
                  </v-layer>

                </v-stage>
              </section>
          </div>
          <button v-on:click="save">Save</button>

          </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import designTemplatesJSON from "@/assets/json/designTemplates.json"
import { userSession } from '../userSession'
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue";

var STORAGE_FILE = 'notes.json'
var IMAGE_STORAGE_FILE = "image.PNG";
import image from "@/assets/daisies_small.jpg";
import layout1 from "@/assets/travel.png";
import layout2 from "@/assets/lemonade.png";
import layout3 from "@/assets/summer_collection.png";
import layout4 from "@/assets/travel.png";
import layout5 from "@/assets/lemonade.png";
import layout6 from "@/assets/summer_collection.png";

const width = window.innerWidth;
const height = window.innerHeight;

export default {
  name: 'dashboard',
  props: ['user'],
  components: {
    Header,
    Sidebar
  },
  data () {
    return {
      notes: [],
      note: '',
      uidCount: 0,
      stageSize: {
              width: width * 0.82,
              height: height * 0.82
            },
      text: [],
      images: [],
      allShapes: [],
      selectedShapeName: '',
      selectedNode: null,
      ifTextOptions: false,
      image_template: null,
      currentSidebarComponent: "designs",
      list: [],
      designTemplates: designTemplatesJSON["designTemplates"],
      canvas_to_json: {
        elements: {
          rectangles: [],
          circles: [],
          lines : [],
          ellipses: [],
        },
        text: [],
        images: []
      }
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
    updateCanvas: function(canvas_to_json) {
      this.canvas_to_json = canvas_to_json;
      console.log("canvas to json UPDATE CANVAS", this.canvas_to_json);
      this.resetAllShapes();
      this.updateAllShapes();
    },
    showTextOptions() {
      console.log("showtextoptions");
      this.ifTextOptions = true;
    },
    save() {
      console.log("save");
      console.log("save list", this.canvas_to_json);
      localStorage.setItem('storage', JSON.stringify(this.canvas_to_json));
    },
    loadDesign() {
      var data = localStorage.getItem('storage') || '[]';
      data = JSON.parse(data);
      console.log(data);

      if (data.length != 0) {
        console.log(data.rectangles);
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
      console.log("selectedNode is: ", rect);
      this.changeSidebarComponent(rect);

      this.selectedNode = rect;
      console.log("ALL SHAPES", this.allShapes);
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


      // console.log("imgsds", this.canvas_to_json.images);
      // for (var j = 0; j < this.canvas_to_json.images.length; j++) {
      //   let img = this.canvas_to_json.images[j];

      //   this.allShapes.push(img);
      //   console.log("all shapes from imgs", this.allShapes);
      // }

      // for (var i = 0; i < this.canvas_to_json.text.length; i++) {
      //   this.allShapes.push(this.canvas_to_json.text[i]);
      // }
      console.log("updated all shapes", this.allShapes);

    },
    editText(text_elem) {
      text_elem.isVisible = false;

    },
    setTemplate(num) {
      this.removeTransformer();
      this.canvas_to_json = this.designTemplates[num];
      this.resetAllShapes();
      this.resetCanvasToJson();
      this.updateAllShapes();
    },
    resetAllShapes() {
      this.allShapes = [];

    },
    resetCanvasToJson() {
      this.canvas_to_json = {
        elements: {
          rectangles: [],
          circles: [],
          lines : [],
          ellipses: [],
        },
        text: [],
        images: []

      }
    },
    removeTransformer() {
      const transformerNode = this.$refs.transformer.getStage();

      // remove transformer
      transformerNode.detach();
      
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
  margin-left: 60vh;
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

.content {
  grid-area: "main_left";
  width: 80%;
     
}

.colour_scheme {
  border: solid transparent 0.1em;
  border-radius: 0.5em;
  background-color: rgb(29, 27, 27);
  padding: 2em;
  padding-right:4em;
  padding-left: 4em;
}

.main_content {
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: auto;
  grid-template-areas: "main_left main_right";
}

.content {
  background-color: white;
  width: 100%;
}

</style>