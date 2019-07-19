<template>
  <div class="dashboard">
    
      <div class="default">
          <nav class="topnav">
              <ul>
                <li id="change_img">Change Image</li>
                <li><a>Docu</a></li>
                <li><a href="https://github.com/silvia-odwyer/photon">GitHub</a></li>
              </ul>
          <h1>
            <img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class="avatar">
            <small><span class="sign-out">(<a href="#" @click.prevent="signOut">Sign Out</a>)</span></small>
          </h1>
          <h2 class="user-info">
            <small>
            {{ user.username ? user.username : user.identityAddress }}
            </small>

          </h2>
            
            </nav>
        <div class="sidebar">
            <h3 class="logo">Photon</h3>
            <ul>
        
              <h3>Design Templates</h3>
              <ul>
                <li v-on:click="addRectangle('red')">Add Red Rectangle</li>
                <li v-on:click="addRectangle('green')">Add Green Rectangle</li>
                <li v-on:click="addText()">Add Text</li>
                <li v-on:click="addImage()">Add Image</li>

                <li v-for="img in layout_imgs" v-on:click="displayTemplate(img)">
                  <p>{{img.layout_name}}</p>
                  <img :src="img.img_src" height="200" width="300">
                </li>
              </ul>

              
          </ul>
          </div>

          
          <div class="main">
            <div class="main_content">
            
              <section class="content">
                
                <!-- <canvas id="canvas" width="800" height="700"></canvas> -->
                <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown">
                  
                  <v-layer ref="layer2">
                    <v-image v-for="item in images" :key="item.id" :config="item" />

                  </v-layer>
                  
                  <v-layer ref="layer">
                    <v-rect v-for="item in rectangles" :key="item.id" :config="item" />
                    <v-text v-for="item in text" :key="item.id" :config="item" />
                    <v-transformer ref="transformer" />
                  </v-layer>

                </v-stage>
                 <!-- <form @submit.prevent="addNote" :disabled="! note">
                  <div>
                    <input v-model="note" type="text" class="form-control" placeholder="Write a note..." autofocus>
                    <span class="input-group-btn">
                      <button class="btn btn-default bg-light" type="submit" :disabled="! note">Add</button>
                    </span>
                  </div>
                </form>

                <ul>
                  <li v-for="note in notes"
                    class="list-group-item"
                    :class="{completed: note.completed}"
                    :key="note.id">
                    <label>
                      <input type="checkbox" v-model="note.completed">{{ note.text }}
                    </label>
                    <a @click.prevent="notes.splice(notes.indexOf(note), 1)"
                      class="delete float-right"
                      href="#">X</a>
                  </li>
                </ul> -->
              </section>

         
          </div>
          
          </div>
          
          </div>

      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
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
  data () {
    return {
      notes: [],
      note: '',
      uidCount: 0,
      image: image,
      layout_imgs: [{img_src: layout1, layout_name: "Travel"}, {img_src: layout2, layout_name: "Lemonade"}, 
      {img_src: layout3,  layout_name: "Summer Collection"}],
      stageSize: {
              width: width,
              height: height
            },
      rectangles: [],
      text: [],
      images: [],
      allShapes: [],
      selectedShapeName: '',
      image: null
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
    this.fetchData();
  },
  methods: {

    addImage() {
      let app = this;
      console.log("add new img")
      var imageObj = new Image();
      imageObj.onload = function() {
        let img = {
          x: 50,
          y: 50,
          image: imageObj,
          width: layout5.width,
          height: layout5.height,
          draggable: true
        };

        app.allShapes.push(img);
        app.images.push(img);
      }
      imageObj.src = layout5;

    },
    addRectangle(color) {
      let name = `rect${this.rectangles.length}`
      
      let rect = {
                x: 10,
                y: 10,
                width: 100,
                height: 100,
                fill: color,
                name: name,
                draggable: true
              }
      
      this.rectangles.push(rect);
      this.allShapes.push(rect);
    },
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
        name: name
      };
    this.text.push(simpleText);

    this.allShapes.push(simpleText);
    
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

      userSession.getFile("image1.PNG") // decryption is enabled by default
        .then((buffer) => {
          var canvas = document.getElementById("canvas");
          var context = canvas.getContext("2d");
          var imageData2 = context.createImageData(canvas.width, canvas.height);
          imageData2.data.set(buffer);
          console.log(imageData2);

          context.putImageData(imageData2, 0, 0);

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
    


.main-sidebar, .main-navbar, .dark {
  background-color: rgb(34, 34, 34);
  color: rgb(105, 105, 105);
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

.sidebar {
  height: 100%;
  width: 40vh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(31, 31, 31);
  overflow-x: hidden;
  padding-top: 20px;
}

.sidebar li {
  display: block;
  color: rgb(105, 105, 105);
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

.logo {
  color: white;
  font-size: 1em;
  margin-left: 1em;
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

.benchmarks {
  color: white;
  font-size: 2em;
  grid-area: "main_right";
}

.main_content {
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: auto;
  grid-template-areas: "main_left main_right";
}

#code {
  font-size: 0.5em;
  font-family: 'Courier New', Courier, monospace;
}

a {
  text-decoration: none;
  color: #f2f2f2;
}

li:hover{
  cursor: pointer;
}

.topnav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>