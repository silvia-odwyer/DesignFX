<template>
    <div class="dashboard">
      <Header :user="user" :transformer="$refs.transformer" :canvas_to_json="canvas_to_json" @updateCanvasToJson="updateCanvas"></Header>

      <section class="under_header">
        <Sidebar :user="user" class="sidebar" :canvas_to_json="canvas_to_json" :allShapes="allShapes" :transformer="$refs.transformer" 
                  :selectedNode="selectedNode" @updateCanvasToJson="updateCanvas" :changesMade="changesMade" @toggleModal="toggleModal" @removeTransformer="removeTransformer"  @editChangesMade="editChangesMade"></Sidebar>
            
            <section class="main">
              <section class="main_content">
                <section class="content">
                  
                  <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" id="stage" >

                    <v-layer>
                      <v-rect :config="canvas_to_json.background"/>
                    </v-layer>

                    <v-layer ref="layer">
                      <v-image v-for="img in canvas_to_json.images" :config="img" v-on:dragEnd="updateNodePosition(img)"/>
                      <v-rect v-for="item in canvas_to_json.elements.rectangles" :config="item" v-on:dragEnd="updateNodePosition(item)" />
                      
                      <div v-if="textFontsLoaded">
                        <v-text v-for="item in canvas_to_json.text" :key="item.name" :config="item" v-on:dblclick="editText(item)" 
                        v-on:dragEnd="updateNodePosition(item)"
                        />
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
            </section>
            </section>

            </section>
            <Modal v-if="showModal" @close="toggleModal"></Modal>
      </div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue";
import Modal from "@/components/Modal.vue";
import WebFontLoader from 'webfontloader';
import { Person } from 'blockstack'

var IMAGE_STORAGE_FILE = "image.PNG";
var DESIGNS_STORAGE_FILE = "designs.json";
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  name: 'dashboard',
  props: [],
  components: {
    Header,
    Sidebar,
    Modal
  },
  created() {
    WebFontLoader.load({
      google: {
        families: ['Oswald', 'Droid Serif', 'Montserrat', 'Lato', 'Open Sans']
      },
      active: this.setFontLoaded,
    });
  },
  data () {
    return {
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
      canvas_to_json: this.$store.getters.new_canvas_to_json,
      textFontsLoaded: false,
      showModal: false,
      changesMade: false,
      userSession: null,
      user: this.$store.getters.user,
      designs: this.$store.getters.designs,
    }
  },
  watch: {
  },
  mounted () {
    // If user is signed in.
    
    if (userSession.isUserSignedIn()) {
        this.userData = userSession.loadUserData()
        this.user = new Person(this.userData.profile)
        this.user.username = this.userData.username
        this.$store.commit('updateUser', this.user);
        this.$store.commit('updateUserData', this.userData);
        this.fetchDesigns();
    } else if (userSession.isSignInPending()) {
        userSession.handlePendingSignIn()
          .then((userData) => {
            window.location = window.location.origin + "/app";
          })
    }
    
  },
  methods: {
    // Initialise the canvas by creating a background rect, etc.,
    initCanvas() {
      let backgroundColor = this.canvas_to_json.backgroundColor;

      let backgroundRect = {
              x: 0,
              y: 0,
              width: this.stageSize.width,
              height: this.stageSize.height,
              fill: backgroundColor,
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
      this.$store.commit('updateCanvas', canvas_to_json);

      this.updateAllShapes();
    },
    fetchDesigns() {
      let app = this;
      userSession.getFile(DESIGNS_STORAGE_FILE) // decryption is enabled by default
          .then((designsText) => {
                let design_id = app.$route.params.id;
                var designs = JSON.parse(designsText || '[]');
                console.log("designs", designs);
                app.designs = designs;
                app.$store.commit('updateDesigns', app.designs);
                
                // Check if a design ID was supplied in the route's path.
                console.log("DESIGN ID", design_id);
                if (design_id != null && design_id != undefined) {
                  let design = app.designs.find(design => design.id == design_id);
                  console.log("design", design);
                  app.canvas_to_json = design;
                  app.updateAllShapes();
                  app.initCanvas()
                }
                // New design
                else {
                  let new_canvas_to_json = app.$store.getters.new_canvas_to_json;
                  app.canvas_to_json = new_canvas_to_json;
                }
      });
    },
    save() {
      localStorage.setItem('storage', JSON.stringify(this.canvas_to_json));
    },
    signIn() {
      userSession.redirectToSignIn();
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
        if (this.canvas_to_json.elements.rectangles.includes(selectedNode)) {
          console.log("is a rect");
          this.currentSidebarComponent = "elements";
        }
        else {
        }
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
      for (var j = 0; j < this.canvas_to_json.images.length; j++) {
        let img = this.canvas_to_json.images[j];

        this.allShapes.push(img);

      }

      for (var i = 0; i < this.canvas_to_json.text.length; i++) {
        this.allShapes.push(this.canvas_to_json.text[i]);
      }

    },
    editText(text_elem) {
      text_elem.isVisible = false;

    },
    resetAllShapes() {
      this.allShapes = [];
    },
    removeTransformer: function() {
      const transformerNode = this.$refs.transformer.getStage();
      // remove transformer
      transformerNode.detach();
      console.log("remove transformer");
    },
    editChangesMade: function(result) {
      console.log("changes made DASH", result);
      this.changesMade = result;
    },
    animatePreloader(){
         let app        = this, 
             height     = this.preloader.height(),
             properties = {
                'margin-top': `-${height}`
             },
             options    = {
                duration: 1000,
                easing: 'swing',
                complete(){
                   app.removePreloader()
                } 
             };
         this.preloader.delay(500).animate(properties, options)
      },
      removePreloader(){
         this.preloader.remove();
         this.body.removeAttr('style');
         this.animateWebsite();
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

@import url('https://rsms.me/inter/inter.css');
html { font-family: 'Inter', sans-serif; }
@supports (font-variation-settings: normal) {
  html { font-family: 'Inter var', sans-serif; }
}

.dashboard {
  background-color: rgb(211, 211, 211);
  height: 100%;
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