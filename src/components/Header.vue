<template>
    <div class="default">
        <nav class="topnav">
            <ul>
                <li id="change_img">Change Image</li>
                <li><a>Docu</a></li>
                <li><a href="https://github.com/silvia-odwyer/photon">GitHub</a></li>
                <li v-on:click="save()">Save</li>
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
    </div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'


export default {
  name: 'header',
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
      image_template: null,
      list: [],
    }
  },
  methods: {
    
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