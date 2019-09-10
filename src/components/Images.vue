<template>
  <div class="images">      
    <article class="not_signed_in" v-if="!user">
      <h2>Not Logged In</h2>
      <p>If you would like to upload images and save designs, you can login to 
        Blockstack.
      </p>
      <button v-on:click="signIn">Sign In To Blockstack</button>
    </article>
    <BlockstackImages v-if="user" :user='user' :allShapes='allShapes' :canvas_to_json='canvas_to_json' :selectedNode='selectedNode'></BlockstackImages>     
    </div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import image from "@/assets/daisies_small.jpg";
import LoadingAnimation from "@/components/LoadingAnimation.vue";
import BlockstackImages from "@/components/BlockstackImages.vue";
var IMAGE_LIST_FILE = "image_list.json";

export default {
  name: 'designs',
  props: ['allShapes', 'canvas_to_json', 'selectedNode'],
  data () {
    return {
        img: null,
        user_images: [],
        img_num: 0,
        images: [],
        imageList: [],
        blockstack: window.blockstack,
        uidCount: 0,
        canvas_to_json_mut: this.canvas_to_json,
        imagesLoaded: false,
        user: this.$store.getters.user
    }
  },
  mounted() {
    console.log("user", this.user);
  },
  components: {
    LoadingAnimation, BlockstackImages
  },
  watch: {
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    },
  },
  methods: {
    signIn() {
      userSession.redirectToSignIn();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
* {
  font-family: "Lato", sans-serif;
}

.images {
  margin-left: 4vh;
}

button {
  padding: 1em;
  border: solid transparent 0.1em;
  border-radius: 0.3em;
  cursor: pointer;
  margin-left: 0;
  margin-right: 1em;
  font-size: 1em;
  font-family: "Inter var", sans-serif;
}

.pulse {
  z-index: 1;
  position: relative;
  padding: 0.5em 1em;
  outline: none;
  background-color: rgb(0, 0, 175);
  /* background-color: rgb(255, 51, 102); */
}

button:hover {
  cursor: pointer;
}

.pulse::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 4px solid rgb(0, 0, 175);
  transform-origin: center;
  transform: scale(1);
}

.pulse:hover::before {
  transition: all 0.75s ease-in-out;
  transform-origin: center;
  transform: scale(1.75);
  opacity: 0;
}

.not_signed_in {
  margin-top: 5vh;
}

</style>