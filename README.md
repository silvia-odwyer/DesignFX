# Graphic Design App

A graphic design app, with decentralized storage, and pre-built templates. 

This app allows you to create graphics, complete with elements, text, and imagery, and resize these graphics 
for social media and beyond. 

Features:
- **Import images from Unsplash**
- **Save/export** final graphics, and design layouts as JSON
- **Resize** graphics for social media

Dev Notes:
- **No UI library**, allows for more flexible styling, and a more lightweight codebase
- **Decentralized storage.** Your designs are private and always yours.
- **Powered by Vue.**

Images will be generated using the gdl WebAssembly library, which allows for faster conversion of the canvas to an image. 

## Known Bugs
- Offline loading of fonts. Text does not display until the fonts have loaded, however if the user does not have an Internet
connection, they will be unable to view the text.
- Clicking on the Text pane without clicking on text leads to no text options popup.

## Build Setup
``` bash
# install dependencies
# previously we used yarn install. This is no longer supported.
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build
```
## Linting & Unit test

``` bash
# Lints and fixes files
npm run lint

# Run your unit tests
npm run test:unit
```