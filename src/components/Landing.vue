<template>
  <div class="hello">
  <main>
    <div class="landing">
      <div class="content">
      <header class="container">
        <h4 class="logo">DesignVision</h4>
        
        <nav class="contright">
          <ul>
            <li>Home</li>
            <li><a href="https://silvia-odwyer.github.io/photon/docs/photon">Docs</a></li>
            <li><a href="demo.html">Demo</a></li>
            <li><a href="https://github.com/silvia-odwyer">GitHub</a></li>
          </ul>
        </nav>
  
      </header>
  
      <article class="landing_hero">
        <article class="landing_text">
          <h1>Graphic Design Made Easy</h1>
          <p>Supercharge your design process.
          </p>
          
          <div class="buttons">
            <button class="btn btn-default btn_fill pulse" @click.prevent="signIn">Sign In With Blockstack</button>
            <button class=" slide" id="docs"><a href="https://silvia-odwyer.github.io/photon/docs/photon/index.html">Demo</a></button>
          </div>
        </article>
  
        <article class="landing_image">
          <img src="/demo.png" id="img"/>
        </article>
      </article>
  
      <article class="guide">
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
                    <img src="images/cargo.png" id="cargo_logo">
                    <p>Photon's core library is a Rust crate, available from Cargo.</p>
                </div>
              
  
                <div class="tile">
                    <img src="images/js_logo.png" id="js_logo"/>
                    <p>Write code in JS without a single line of Rust.</p>
                </div>
              
                <div class="tile">
                    <img src="images/wasm_logo.png"/>    
                    <p>JS code gets exported to WebAssembly.</p>          
                </div>

            </div>
          </section>
            






      </article>
  

  
      <footer>
        <div class="footer_lhs">
          <h1>Photon</h1>
          <p>Image processing with WebAssembly.</p>
          <p>&copy; Copyright 2019. All Rights Reserved. Software open-sourced under Apache License 2.0.</p>
  
        </div>
  
        <div class="footer_rhs">
          <ul>
            <li>Home</li>
            <li> <a href="https://github.com/silvia-odwyer">GitHub</a></li>
            <li><a href="https://silvia-odwyer.github.io/photon/docs">Docs</a></li>
          </ul>
        </div>
      </footer>
      </div>
     </div>
  </main>
  </div>
</template>

<script>
import { userSession } from '../userSession'

export default {
  name: 'landing',
  methods: {
    signIn () {
      userSession.redirectToSignIn()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap');

html, body {
  margin: 0;
  padding: 0;

  background-color: black;
  color: rgb(204, 204, 204);
}

h1{
  color: white;
}

h1, h2, h3 {
  font-family: "Segoe UI", sans-serif;

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
}

.content {
  margin-left: 15vh;
  font-family: "Roboto", sans-serif;
}

nav ul li {
  text-decoration: none;
  display: inline;
  padding: 1em;
  cursor: pointer;
}

nav ul {
  display: flex;
  flex-direction: row;
  margin-left: 20vh;
}

a {
  color: rgb(204, 204, 204);
  text-decoration: none;
}

a:hover {
  color: rgb(177, 177, 177);
}


.landing_hero {
  width: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: auto;
	grid-template-areas: "lhero_left lhero_right";

  font-family: "Roboto", sans-serif;

}

.landing_text {
  grid-area: lhero_left;
  width: 60%;
  margin-top: 20vh;
}

#img, #js_img, #wasm_img, #img3, #img2 {
  display: none;
}


.landing_text h1 {
  color: white;
  font-size: 3em;
}

.landing_image {
  margin-top: 10vh;
  grid-area: lhero_right;
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
  color: rgb(192, 192, 192);
  font-size: 1.2em;
  padding: 0.7em;
}


.contright {
  grid-area: topright;
}

.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

button {
  padding: 1em;
  border: solid transparent 0.1em;
  border-radius: 0.3em;
  cursor: pointer;
}

.pulse {
  z-index: 1;
  position: relative;
  padding: 0.5em 1em;
  outline: none;
  background-color: rgb(255, 51, 102);
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
  border: 4px solid rgb(255, 51, 102);
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
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: solid rgb(255, 51, 102) 0.1em;
  background-color: transparent;
}


.container {
  position: relative;
  width: 100%;
  height: 100%;
}






.buttons button {
  margin-right: 1em;
}

.btn_fill {
    background-color: rgb(255, 51, 102);
    color: white;
}

.btn_outline {
  color: rgb(255, 51, 102);
  background-color: transparent;
  border: 2px solid rgb(255, 51, 102);
}

.btn-outline:hover {
  color: white;
  background-color: rgb(255, 51, 102);
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
  margin-left: 2vh;
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
</style>
