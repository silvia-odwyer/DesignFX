<template>
    <div class="sidebar">
        <div class="sidebar_content">
            <div class="sidebar_left_bar">
                <div>
                    <li @click="setSidebarItem('designs')" id="currentComponentBtn" :class="{ active : activeBtn == 'designs' }">
                          <font-awesome-icon icon="layer-group" size="2x"/>
                        Designs
                    </li>
                    <li @click="setSidebarItem('elements')" :class="{ active : activeBtn == 'elements' }">
                          <font-awesome-icon icon="shapes" size="2x"/>
                          Elements 
                    </li>
                    <li @click="setSidebarItem('images')" :class="{ active : activeBtn == 'images' }">
                          <font-awesome-icon icon="images" size="2x"/>
                        Images 
                    </li>
                    <li @click="setSidebarItem('text')" :class="{ active : activeBtn == 'text' }">
                          <font-awesome-icon icon="align-justify" size="2x"/>
                        Text 
                    </li>
                    <li @click="setSidebarItem('background')" :class="{ active : activeBtn == 'background' }">
                        <font-awesome-icon icon="align-justify" size="2x"/>
                        Background 
                    </li>
                </div>
            </div>

        <div class="sidebar_right_bar"> 

            <!-- Current chosen component is inserted here. Options include Rich Text Editor, project board, to-do, etc., -->
            <component v-bind:is="sidebarNameToComponent[currentSidebarComponent]" 
            :canvas_to_json="canvas_to_json" 
            :allShapes="allShapes"
            :image_template="image_template"
            :ifTextOptions="mutableIfTextOptions"
            :selectedNode="selectedNode"
            :transformer="transformer"
            :designTemplates="designTemplates"
            :changesMade="changesMade"
            @updateCanvasToJson="updateCanvas"
            @toggleModal="toggleModal"
            @editChangesMade="editChangesMade"
            ></component>

            <!-- Content -->
            <slot />
        </div>

    </div>
          
</div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import Designs from "@/components/Designs.vue";
import Elements from "@/components/Elements.vue";
import Text from "@/components/Text.vue";
import Images from "@/components/Images.vue";
import Background from "@/components/Background.vue";

export default {
  name: 'header',
  props: ['user', 'canvas_to_json', 'designTemplates', 'allShapes', 'transformer', 'image_template', 'ifTextOptions', 'changesMade', 'selectedNode'],
  components: {
      Designs, Elements, Text, Images
  },
  watch : {
    selectedNode : function (node) {
      // Update selected node
      if (node == null) {
        return;
      };
      
      if (node.name.startsWith("circle") || node.name.startsWith("rect")) {
        this.setSidebarItem("elements");
      }
      else if (node.name.startsWith("text")) {
        this.setSidebarItem("text");
        this.mutableIfTextOptions = true;
      }
    }
  },
  data () {
    return {
        sidebarNameToComponent: {"designs": Designs, "elements": Elements, "text": Text, "images": Images, "background" : Background},
        currentSidebarComponent: 'designs',
        activeBtn: "designs",
        canvas_to_json_mut: this.canvas_to_json,
        mutableIfTextOptions: false
    }
  },
  mounted() {
      console.log("canvas to json", this.canvas_to_json);

      console.log("if text options", this.ifTextOptions);
  },
  methods: {
    setSidebarItem(name) {
      this.currentSidebarComponent = name;

      this.activeBtn = name;
    },
    updateCanvas: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    },
    toggleModal: function() {
      this.$emit("toggleModal");
    },
    editChangesMade: function(result) {
      this.$emit("editChangesMade", result);
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.sidebar_content {
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: auto;
  grid-template-areas: "sidebar_left sidebar_right";
}

.sidebar {
  height: 100%;
  width: 60vh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(31, 31, 31);
  overflow-x: hidden;
  padding-top: 20px;
}

.sidebar {
  display: block;
  color: rgb(105, 105, 105);
}

.sidebar_left_bar {
  grid-area: sidebar_left;
  margin-left: 0;
  background-color: rgb(14, 19, 24);
}

.sidebar_right_bar {
  grid-area: sidebar_right;
  margin-left: 0;
  background-color: rgb(41, 48, 57);
}

a {
  text-decoration: none;
  color: #f2f2f2;
}

li:hover{
  cursor: pointer;
}

.sidebar_left_bar li {
  margin-bottom: 8vh;
  font-family: "Roboto", sans-serif;
  padding-top: 3vh;
  padding-right: 1vh;
  
}

.sidebar_left_bar li {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}

.sidebar_left_bar li:hover {
  color: silver;
}

.sidebar_content {
  padding-top: 6vh;
  height: 90%;
}

ul {
    margin: 0;
}

.active {
  color: aliceblue;
}

 /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
} 
</style>