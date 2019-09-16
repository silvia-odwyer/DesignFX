<template>
    <article class="designs_dashboard">
        <section class="hero">
            <nav>
                <h1 class="logo">DesignFX</h1>
            </nav>

            <section class="design_prompt">
                <h1>Create A Design</h1>

                <section class="templates">
                    <router-link  to="/app"  v-for="template in templates" class="template">
                        <article>
                            <img :src="template.img" />
                            <h2>{{template.name}}</h2>
                        </article>
                    </router-link>
                </section>
            </section>
        </section>

        <section class="user_designs">
            <h1 v-if="signedIn">Your Designs </h1>
            
                <section class="designs" v-if="signedIn">
                    <router-link :to="{ name: 'app', params: { id: design.id }}" v-bind:key="design.id" v-for="design in designs" class="design">
                        <article>
                            <!-- <img :src="template.img" /> -->
                            <h2>{{design.filename}}</h2>
                        </article>
                    </router-link> 

                              <div v-for="user_img in user_images" class="img">
            <img :src="user_img.img_src">
            <a @click.prevent="" class="delete pull-right" href="#">x</a> 

          </div>


                </section>

                <section v-if="!signedIn" class="not_signed_in">
                    <h1>Sample Templates </h1>
                    <p>Click on a template to get started.</p>
                    <h2>Not Signed Into Blockstack</h2>
                    <p>It appears you're not signed into Blockstack. 
                        With Blockstack, you can create designs, and save them privately, with end-to-end encryption.
                    </p>
                </section>
        </section>
    </article>
</template>

<script>
import Landing from '@/components/Landing.vue'
import Dashboard from '@/components/Dashboard.vue'
import { Person } from 'blockstack'
import { userSession } from '../userSession'

const STORAGE_FILE = "designs.json";

export default {
  name: 'Home',
  components: { Landing, Dashboard },
  created () {
    this.userSession = userSession
  },
  mounted () {
      if (this.userSession.isUserSignedIn()) {
        this.signedIn = true;
        this.fetchDesigns();
      }
  },
  data () {
    return {
        templates: [{name : "Social Media", img: "https://i.imgur.com/Lh6Api1.png"}, {name: "Poster", img: "https://i.imgur.com/PRmD95Yb.png"}, {name: "Instagram Post", img: "https://i.imgur.com/6nUDrJ3.png"}, {name: "Online Advert", img: "https://i.imgur.com/kHF82hE.png"}],
        designs: [],
        user: this.$store.getters.user,
        user_images: [],
        thumbnailsLoaded: false,
        userData: this.$store.getters.userData,
        signedIn: false
    }
  },
  methods: {
      fetchDesigns() {
        userSession.getFile(STORAGE_FILE) // decryption is enabled by default
            .then((designsText) => {
			    var designs = JSON.parse(designsText || '[]')
				console.log(designs)
                this.designs = designs;
                this.$store.commit('updateDesigns', this.designs);
                // this.fetchImages();
            });
      },
      fetchImages() {
        // No images to fetch
        if (this.designs.length == 0) {
            this.thumbnailsLoaded = true;
        }
        else {
          for (let i = 0; i < this.designs.length; i++) {
              let id = this.designs[i].id;
              let image_name = `${id}_thumbnail.PNG`; 
              let app = this;
              
              userSession.getFile(image_name) // decryption is enabled by default
                    .then((buffer) => {
                        console.log(buffer);
                      if (buffer != null) {
                          var canvas = document.createElement("canvas");
                          canvas.width = 100;
                          canvas.height = 200;
                          var context = canvas.getContext("2d");
                          var imageData = context.createImageData(canvas.width, canvas.height);
                          imageData.data.set(buffer);
                          context.putImageData(imageData, 0, 0);
                          let uri = canvas.toDataURL();
                          let canvasToImg = new Image();
                          canvasToImg.onload = () => {
                            let img_obj = {img_src: uri, name: image_name};
                            app.user_images.push(img_obj);
                            
                            // Check if on last iteration
                            if (i == app.designs.length - 1) {
                              app.thumbnailsLoaded = true;
                            }
                          }
                          canvasToImg.src = uri;
                      }
                      else {
                        // Check if on last iteration
                        if (i == app.designs.length - 1) {
                            app.thumbnailsLoaded = true;
                        }
                      }
                      
                    })
          }
        }  
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    font-family: "Helvetica", sans-serif;
}

.hero {
    background: #6190E8;  /* fallback for old browsers */
    background: -webkit-linear-gradient(90deg, black, navy);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(90deg, black, navy); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: white;
    height: 55vh;
    padding-left: 10vh;
}

nav {
    margin-bottom: 16vh;
    padding-top: 5vh;
    font-family: "Inter", sans-serif;
}

.templates {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.template {
    margin-right: 10em;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    align-self: flex-end;
}

.user_designs {
    padding-left: 10vh;
    margin-top: 5vh;
}

.user_designs h1 {
    font-size: 4vh;
    background-color: white;
}

h1 {
    font-size: 1.5em;
    margin-bottom: 3vh;
}

h2 {
    font-size: 1em;
}

.templates img {
    width: 20vh;
}

.logo {
    font-size: 1.5em;
}

.designs {
    display: flex;
    flex-direction: row;
    margin-top: 10vh;
}

.design {
    padding-right: 10vh;
}

.design:hover h2 {
    color: black;
}
</style>