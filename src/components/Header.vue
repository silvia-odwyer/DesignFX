<template>
    <div>

        <nav class="topnav" v-bind:style='gradientStyle'>
          <h3 class="logo">DesignVision</h3>
            <ul>
                <li>
                  <button id="download" v-on:click="exportImage">Download
                    <font-awesome-icon icon="arrow-alt-circle-down" size="s"/>
                  </button>
                </li>
                <!-- <li>
                </li> -->
            </ul>

          <div class="user_dropdown">
            <h1>
              <img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class="avatar">
            </h1>
            <h2 class="user-info" v-on:click="toggleDropdown">
              <small>
                {{ user.username ? user.username.substring(0, user.username.length - 14) : user.identityAddress }}
              </small>
              <font-awesome-icon :icon="dropdownIcon" size="s" />

            </h2>
          </div> 
                <transition name="slide-fade">
                  <div class="w4 mt1" v-if="showDropdown">
                    <ul class="dropdown">
                      <li>
                        <button v-on:click="exportAsJSON">Export As JSON</button>
                      </li>
                      <li v-on:click="showOptions">
                        Options
                      </li>
                      <li v-on:click="changeNavGradient">
                        Change Gradient
                      </li>
                     <li class="list">
                        <a href="#" @click.prevent="signOut">Sign Out</a>
                      </li>
                    </ul>
                </div>
              </transition>
        </nav>
      <Modal v-if="showOptionsModal">
        <p>hi there</p>
      </Modal>
    </div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import Modal from "@/components/Modal.vue"

export default {
  name: 'header',
  props: ['user', 'transformer', 'canvas_to_json'],
  data () {
    return {
      showDropdown: false,
      dropdownIcon: "sort-down",
      showOptionsModal: false,
      gradientStyle: "background-image: linear-gradient(90deg, darkorange, fuchsia)",
      gradients: [["blue", "fuchsia"], ["#3494E6", "#EC6EAD"], ["#67B26F", "#4ca2cd"], ["#36D1DC", "#5B86E5"], ["blue", "fuchsia"], ["#1c92d2", "#f2fcfe"], ["#000000", "#0f9b0f"], ["#CB356B", "#BD3F32"], ["#3A1C71", "#D76D77", "#FFAF7B"], ["#283c86", "#45a247", ["#159957", "#155799"], ["#000046", "#1CB5E0"]]],
      totalGradientStyle: "background: #6190E8;  /* fallback for old browsers */\nbackground: -webkit-linear-gradient(to right, #A7BFE8, #6190E8);  /* Chrome 10-25, Safari 5.1-6 */\nbackground: linear-gradient(to right, #A7BFE8, #6190E8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"
    }
  },
  components: {
    Modal
  },
  methods: {
    exportImage() {
      const transformerNode = this.transformer.getStage();
      const stage = transformerNode.getStage();

      // Detach current node from the transformer
      transformerNode.detach();
      var dataURL = stage.toDataURL({
        pixelRatio: 4
      });
      this.downloadURI(dataURL, 'new_image.png');

    },
    exportAsJSON() {
      let exportObj = this.canvas_to_json;
      let exportName = "Canvas2JSON";

      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      
      var downloadAnchor = document.createElement('a');
      
      downloadAnchor.setAttribute("href", dataStr);
      
      downloadAnchor.setAttribute("download", exportName + ".json");
      
      document.body.appendChild(downloadAnchor); // required for FireFox
      
      downloadAnchor.click();
      
      downloadAnchor.remove();
  
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
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      this.dropdownIcon = this.showDropdown ? "sort-up" : "sort-down";
    },
    changeNavGradient() {
      let substr = this.gradientStyle.substring(0, 41);
      console.log(substr);
      let ran_num = this.getRandomNumber(0, this.gradients.length - 1);
      let gradient_cols = this.gradients[ran_num].join(", ");
      substr += gradient_cols + ")";
      this.gradientStyle = substr;
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
    showOptions() {
      console.log("show options");
      this.showOptionsModal = true;
    },
    signOut () {
      userSession.signUserOut(window.location.href)
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
nav {
  overflow: hidden;
  background-color: rgb(29, 29, 29);
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  z-index: 2;
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
  margin-top: 0em;
  margin-bottom: 0em;
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
  font-family: "Helvetica";
  margin-left: 1em;
  padding: 14px 16px;
  flex-grow: 1;
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

a {
  text-decoration: none;
  color: #f2f2f2;
}

a:hover {
  color: black;
}

li:hover{
  cursor: pointer;
}

button {
  margin-top: 0em;
  margin-bottom: 0em;
  padding: 0.8em;
  font-family: "Roboto";
  background-color: rgb(39, 86, 216);
  border: solid black 0.1vh;
  border-radius: 1vh;
  cursor: pointer;
}

#download:hover {
  background-color: rgb(22, 62, 192);
}

.topnav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s ease;
}
.slide-fade-enter { 
  transform: translateY(-50px);
  opacity: 0;
}
.slide-fade-leave-to {
 transform: translateY(-50px);
  opacity: 0; 
}

font-awesome-icon {
  cursor: pointer;
}

.dropdown {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

}

.user_dropdown {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.7em;
  margin-right: 0.1em;
}

ul, h1, h2 {
  margin-top: 0.2em;
  margin-bottom: 0;
}

ul {
  padding-right: 0em;
  margin-right: 0em;
}

.user-info {
  cursor: pointer;
}

</style>