<template>
    <div class="sidebar">
          
        <div class="sidebar_content">
            
            <div class="sidebar_left_bar">
                <div class="">
                    <li @click="setSidebarItem('designs')">
                        <img src="/avatar-placeholder.png" height="30" width="20"/>
                        Designs
                    </li>
                    <li @click="setSidebarItem('elements')">
                        <img src="/avatar-placeholder.png" height="30" width="20"/>
                        Elements 
                    </li>
                    <li @click="setSidebarItem('images')">
                        <img src="/avatar-placeholder.png" height="30" width="20"/>
                        Images 
                    </li>
                    <li @click="setSidebarItem('text')">
                        <img src="/avatar-placeholder.png" height="30" width="20"/>
                        Text 
                    </li>
                </div>
            </div>

        <div class="sidebar_right_bar"> 

            <!-- Current chosen component is inserted here. Options include Rich Text Editor, project board, to-do, etc., -->
            <component v-bind:is="sidebarNameToComponent[sidebarItems]" 
            :rectangles="rectangles" 
            :allShapes="allShapes"
            :text="text" 
            :images="images" 
            :image_template="image_template"
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

export default {
  name: 'header',
  props: ['user', 'rectangles', 'allShapes', 'text', 'images'],
  components: {
      Designs, Elements, Text, Images
  },
  data () {
    return {
        sidebarItems: "designs",
        sidebarNameToComponent: {"designs": Designs, "elements": Elements, "text": Text, "images": Images},
    }
  },
  methods: {
    setSidebarItem(name) {
      this.sidebarItems = name;
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

.sidebar_content {
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: auto;
  grid-template-areas: "sidebar_left sidebar_right";
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
  font-family: "Helvetica Neue", sans-serif;
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
</style>