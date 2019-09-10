<template>
<div class="hello">
  <main>
    <div class="landing">
      <div class="content">
      <header class="container">
        <h4 class="logo">DesignFX</h4>
        
        <nav class="contright">
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="https://silvia-odwyer.github.io/photon/docs/photon">Docs</a></li>
            <li><a href="demo.html">Demo</a></li>
            <li><a href="https://github.com/silvia-odwyer">GitHub</a></li>
          </ul>
        </nav>
  
      </header>
  
      <article class="landing_hero">
        <article class="landing_text">
          <h1>Supercharge Your Graphic Design</h1>
          <p>Create bold, striking designs in seconds with DesignFX.</p>
          
          <div class="buttons">
            <router-link to="/designs"><button class="btn btn-default btn_fill pulse">Get Started</button></router-link>
            <router-link to="/designs"><button class=" slide">Demo</button></router-link>            
          </div>
        </article>
  
        <article class="landing_image">              
              <div class="tiler">
                <img src="https://i.imgur.com/2An7BAu.png" />
              </div>
              
              
              <div class="tiler">
                <img src="https://i.imgur.com/0C0SxWr.png" />
              </div>
              
              
              <div class="tiler">
                <img src="https://i.imgur.com/InHwyoC.png" />
              </div>
              
              
              <div class="tiler">
                <img src="https://i.imgur.com/oZxfiEI.png" />
              </div>
              
              
              <div class="tiler">
                <img src="https://i.imgur.com/kXjCcK9.png" />
              </div>
              
              
              <div class="tiler">
                <img src="https://i.imgur.com/eePyZ42.png" />
              </div>
        </article>
      </article>
  
      <!-- <article class="guide">
          <h2 class="center">How it works</h2>
    <article class="features">
        <h2>Features</h2>
        <p>Unlike other libraries, this library is built with 100% pure Rust, so security and safety is guaranteed. </p>
  
        <ul class="features_list">
          <li data-aos="fade-up" data-aos-anchor="#demo">
            <h3>Web-Assembly Friendly</h3>
            <p>For web-based image processing, Photon is 4-10x faster than JS, leading to faster results, and less lag.  </p>
            <h5><a href="https://silvia-odwyer.github.io/photon/docs/photon/index.html">Read More </a></h5>
          </li>
  
          <li data-aos="fade-up">
            <h3>Over 90 functions </h3>
            <p>Photon provides functions for every domain of image processing. </p>
            <h5><a href="https://silvia-odwyer.github.io/photon/docs/photon/all.html">Read More</a></h5>
          </li>
  
          <li data-aos="fade-up"> 
            <h3>Call WASM with JS</h3>
            <p>This library's WASM functions can be called via JS, allowing for zero-cost abstraction and faster development.</p>
            <h5><a href="https://github.com/silvia-odwyer/photon#webassembly-use">Read More</a></h5>
          </li>
        </ul>
      </article>
  

          <h2 class="center">How it works</h2>
  
          <section class="guide_pane">
            <section>
              <h2>Write once, run anywhere.</h2>
              <p>Photon can be executed:</p>
              <ul>
                <li>In the browser via JS</li>
                <li>On Node.JS</li>
                <li>Natively on any machine</li>
              </ul>
              <p>Photon compiles to WebAssembly, which allows the execution of native-speed code in the browser and on Node.JS. 
                This means incredible performance and since Photon's core library is written in Rust, it promises security and safety.
              </p>
            </section>
            <div class="tiles">
                <div class="tile">
                    <p>Photon's core library is a Rust crate, available from Cargo.</p>
                </div>
                
  
                <div class="tile">
                    <p>Write code in JS without a single line of Rust.</p>
                </div>

                <div class="tile">
                    <p>JS code gets exported to WebAssembly.</p>          
                </div>

            </div>
          </section>
          
      </article> -->
  
      <footer>
        <div class="footer_lhs">
          <h1>DesignFX</h1>
          <p>Graphic design software.</p>
          <p>&copy; Copyright 2019, Silvia O'Dwyer. All Rights Reserved. Software open-sourced under Apache License 2.0.</p>
  
        </div>
  
        <div class="footer_rhs">
          <ul>
            <li>Home</li>
            <li> <a href="https://github.com/silvia-odwyer">GitHub</a></li>
          </ul>
        </div>
      </footer>
      </div>
     </div>
  </main>
  </div>

</template>

<script>
import Landing from '@/components/Landing.vue'
import Dashboard from '@/components/Dashboard.vue'
import { userSession } from '../userSession'

export default {
  name: 'LandingPage',
  components: {},
  created () {
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    signIn()  {
      userSession.redirectToSignIn();
    }
  }
}
</script>

<style lang="scss" scoped>


html, body {
  margin: 0;
  padding: 0;

}

h1{
  color: white;
}

h1, h2, h3 {
  font-family: "Inter var", sans-serif;
  color: black;
}

p {
  font-family: "Open Sans", sans-serif;

}
.comparison {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.comparison article {
  width: 50%;
}

@viewport {
	width: device-width
}


img {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}


.landing_hero {
  margin-bottom: 10vh;
  height: 70vh;
  margin-top: 10vh;
}

.content {
  margin-left: 15vh;
  font-family: "Inter var", sans-serif;
}

nav ul li {
  text-decoration: none;
  display: inline;
  padding: 1em;
  cursor: pointer;
}

nav {
  position: sticky;
}

nav ul {
  display: flex;
  flex-direction: row;
  margin-left: 20vh;
}

a {
  color: black;
  text-decoration: none;
}

#demo:hover {
  background-color: rgb(245, 245, 245);
}

.landing_hero {
  width: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: auto;
	grid-template-areas: "lhero_left lhero_right";

}

.landing_text {
  grid-area: lhero_left;
  width: 60%;
}

#img, #js_img, #wasm_img, #img3, #img2 {
  display: none;
}


.landing_text h1 {
  font-size: 3em;
}

.landing_image {
  grid-area: lhero_right;
  background-image: linear-gradient(-90deg, rgb(211, 243, 255), lavender)
}

img, canvas {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.container {
  width: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: auto;
	grid-template-areas: "topleft topright";
  color: rgb(192, 192, 192);
  margin-left: 0;
  padding-left: 0;
}

.logo {
  grid-area: topleft;
  align-items: flex-start;
  font-size: 1.2em;
  padding: 0.7em;
  color: black;
}


.contright {
  grid-area: topright;
}

.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1em;
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

.slide {
  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: black;
  padding: 0.5em 1em;
  outline: none;
  border: solid rgb(0, 0, 175) 0.1em;
  background-color: transparent;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.btn_fill {
    background-color: rgb(0, 0, 175);
    color: white;
}

.btn_outline {
  color: rgb(255, 51, 102);
  background-color: transparent;
  border: 2px solid rgb(0, 0, 175);
}

.btn-outline:hover {
  color: white;
  background-color: rgb(0, 0, 175);
}

.features_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  font-size: 1em;
}

.features h2, .features p {
  text-align: center;
}

.features_list li h3 {
  color: white;
}

.features_list h5 {
  color: rgb(255, 51, 102);
  text-transform: uppercase;
  font-size: 0.7em;
  letter-spacing: 3px;
}

.features_list li {
  display: flex;
  flex-direction: column;
  flex: 1 0 33%;
}

.features_list li p {
  width: 70%;
}


.guide_pane section {
  grid-area: "guide_lhs";
  width: 70%;
}

.guide {
  margin-top: 12vh;
}

.center {
  text-align: center;
  margin-bottom: 5vh;
}

.cta {
  width: 40%;
  margin: auto;
}

.cta button {
}

footer {
  width: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: auto;
	grid-template-areas: "footer_text footer_links";
  margin-top: 10vh;
}

.footer_lhs p {
  font-size: 0.9em;
}

footer ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
footer ul li {
  list-style: none;
  padding-right: 5vh;
}

.footer_lhs {
  grid-area: "footer_text";
}

.footer_rhs {
  grid-area: "footer_links";
}

.features_list li p {
  text-align: left;
}

.features_list {
  margin-top: 5vh;
}


.tiles {
  display: flex;
  flex-direction: row;
}

.tiles .tile {
  display: flex;
  flex-direction: column;
  flex: 1 0 33%; /* explanation below */
}

.tiles img {
  width: 50%;
}

.tiler {
  display: inline-block;
  cursor: pointer;
  visibility: hidden;
  width: 33.3%;
  margin: auto;
}

.tiler img { 
  display: block;  
  margin: auto; 
  max-width: 100%;
  visibility: visible;
}

.tiler .cell-grid {
  background-position: center center;
  margin: auto;
  position: fixed;
  top: 1em;
  bottom: 1em;
  left: 1em;
  right: 1em;
  z-index: 10;
  perspective: 30px;

}
</style>