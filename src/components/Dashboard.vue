<template>
  <div class="dashboard">
    <div class="default">
      <Header :user="user" :transformer="$refs.transformer"></Header>

      <Sidebar :rectangles="rectangles" :allShapes="allShapes" :text="text" :images="images"></Sidebar>
          <div class="main">
            <div class="main_content">
            
              <section class="content">
                
                <!-- <canvas id="canvas" width="800" height="700"></canvas> -->
                <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" id="stage">
                  
                  <v-layer ref="layer2">
                    <v-image :config="image_template" />

                  </v-layer>

                  <v-layer ref="layer">
                    <v-rect v-for="item in rectangles" :config="item" v-on:dragEnd="writeMessage(item)" />
                    <v-text v-for="item in text" :key="item.id" :config="item" v-on:dblclick="editText(item)" v-if="item.isVisible"/>
                    <v-image v-for="img in images" :config="img" />
<!-- 
                            <v-circle
                              v-for="item in list"
                              :key="item.id"
                              :config="{
                                x : item.x, y: item.y, radius: 50, fill: 'red',}"></v-circle> -->


                    <v-transformer ref="transformer" />
                  </v-layer>

                </v-stage>
              </section>
         
          </div>
        
          </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
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
      layout_imgs: [{img_src: layout1, layout_name: "Travel"}, {img_src: layout2, layout_name: "Lemonade"}, 
      {img_src: layout3,  layout_name: "Summer Collection"}],
      stageSize: {
              width: width / 1.5,
              height: height
            },
      rectangles: [],
      text: [],
      images: [],
      allShapes: [],
      selectedShapeName: '',

      image_template: null,
      list: [],
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
    save() {
      console.log("save");

      // create JSON canvas representation
      var canvas_to_json = {
        rectangles: this.rectangles,
        text: this.text,
        images: this.images
      };

      console.log("save list", canvas_to_json);
      localStorage.setItem('storage', JSON.stringify(canvas_to_json));
    },
    loadDesign() {
      var data = localStorage.getItem('storage') || '[]';
      data = JSON.parse(data);
      console.log(data);

      if (data.length != 0) {
        console.log(data.rectangles);
        if (data.rectangles != []) {
          this.rectangles = data.rectangles;
        }
        if (data.text != []) {
          this.text = data.text;
        }
        if (data.images != []) {
          // this.images = data.images;
        }

        console.log("this.rectangles after", this.rectangles);
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
    writeMessage(rect) {
      console.log("write msg");
      console.log(rect);
      const transformerNode = this.$refs.transformer.getStage();
      const stage = transformerNode.getStage();
      let position = stage.getPointerPosition();

      rect.x = position.x;
      rect.y = position.y;
      
      console.log(position);
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
      for (var i = 0; i < this.rectangles.length; i++) {
        this.allShapes.push(this.rectangles[i]);
      }

      for (var i = 0; i < this.text.length; i++) {
        this.allShapes.push(this.text[i]);
      }

      for (var i = 0; i < this.images.length; i++) {
        this.allShapes.push(this.images[i]);
      }
    },
    editText(text_elem) {
      console.log("edit text elem", text_elem);
      text_elem.isVisible = false;

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

      // userSession.getFile("image1.PNG") // decryption is enabled by default
      //   .then((buffer) => {
      //     var canvas = document.getElementById("canvas");
      //     var context = canvas.getContext("2d");
      //     var imageData2 = context.createImageData(canvas.width, canvas.height);
      //     imageData2.data.set(buffer);
      //     console.log(imageData2);

      //     context.putImageData(imageData2, 0, 0);

      //   })
    },

    signOut () {
      userSession.signUserOut(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
input::placeholder {
  color: grey;
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
  margin-left: 40vh;
  padding: 0px 10px;
  background-color: rgb(34, 34, 34);
  height: 100%;
}

.main_content {
  padding-top: 14vh;
}

@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
    .sidebar a {font-size: 18px;}
  }

nav {
  overflow: hidden;
  background-color: rgb(29, 29, 29);
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

nav li {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
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

</style>