<template>
    <div class="default">

        <nav class="topnav">
          <h3 class="logo">DesignVision</h3>
            <ul>
                <li>
                  <button id="download" v-on:click="exportImage">Download
                    <font-awesome-icon icon="arrow-alt-circle-down" size="s"/>
                  </button>
                </li>
                <!-- <li>
                  <button v-on:click="exportAsJSON">Export As JSON</button>
                </li> -->
            </ul>
          <h1>
            <img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class="avatar">
            <small><span class="sign-out">(<a href="#" @click.prevent="signOut">Sign Out</a>)</span></small>
          </h1>
          <h2 class="user-info">
            <small>
            {{ user.username ? user.username.substring(0, user.username.length - 14) : user.identityAddress }}
            </small>
          </h2>
        </nav>
    </div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'


export default {
  name: 'header',
  props: ['user', 'transformer', 'canvas_to_json'],
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
nav {
  overflow: hidden;
  background-color: rgb(29, 29, 29);
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  z-index: 2;
  width: 100%; /* Full width */
  background-image: linear-gradient(90deg, navy, fuchsia);
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

li:hover{
  cursor: pointer;
}

button {
  margin-top: 0em;
  margin-bottom: 0em;
  font-family: "Roboto";
  background-color: rgb(0, 174, 255);
  border: solid black 0.1vh;
  border-radius: 1vh;
  cursor: pointer;
}

button:hover {
  color: whitesmoke;
}

.topnav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>