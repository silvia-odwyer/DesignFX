<template>
    <div class="default">
          <Header :user="user" :transformer="$refs.transformer"></Header>
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
          
</div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'

export default {
  name: 'header',
  props: ['user', 'transformer'],
  data () {
    return {
    }
  },
  methods: {
    exportImage() {
      const transformerNode = this.transformer.getStage();
      const stage = transformerNode.getStage();

      // Detach current node from the transformer
      transformerNode.detach();
      var dataURL = stage.toDataURL();
      this.downloadURI(dataURL, 'new_image.png');

    },
    // Download image.
    downloadURI(uri, name) {
        // Create a link element
        var link = document.createElement('a');
        
        // Download the link with the given name
        link.download = name;

        // Set the link's href to the URI of the stage's canvas
        link.href = uri;

        // Alert the user to the download.
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link;
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
<style lang="scss" scoped>.sidebar_content {
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: auto;
  grid-template-areas: "sidebar_left sidebar_right";
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