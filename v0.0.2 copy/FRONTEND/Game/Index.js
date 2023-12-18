import * as THREE from 'three';

import { io } from 'socket.io-client';

import Camera from './Player/Camera.js';
import World from './World/World.js';
import Player from './Player/Player.js';
import PhysicsEngine from './Physics/PhysicsEngine.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let canvas = document.querySelector('canvas');

const clock = new THREE.Clock();
const player = new Player();

var game;


let serverURL = "https://half-baked-game.web.app"
let localURL = "http://localhost:3069"


class Game {
     constructor() {

          this.game = null;
          this.canvas = canvas;
          
          camera: null;
          this.delta = 0;
          world: null;
          scene: null;
          player: null;

          raycaster: null;

          physics: null;

          this.server = null;
          this.connected = false;

     }

     init() {

          const physics = new PhysicsEngine();
          this.physics = physics;

          const camera = new Camera();
          this.camera = camera.Camera();

          const raycaster = new THREE.Raycaster();
          this.raycaster = raycaster;

          const server = io(localURL);
          this.server = server;
     
          this.world = new World();

          this.scene = scene;

          scene.add(this.camera);

          // console.log(this.camera);
          // console.log(this.world);
          // console.log(this.scene);

          game.server.on('connect', () => {

               console.log('connected');
               
               game.connected = true;

               game.server.on('returnWorld', (worldData) => {

                    console.log(worldData)

                    player.create('@dev');
     
                    game.world.unpackWorldDataAndThenLoad(worldData);

                    // console.log(game.player);
                    // console.log(worldData);
     
               });

          });

          animationLoop();
     }

}

document.addEventListener('DOMContentLoaded', () => {

     document.addEventListener('request-world-data', () => {

          console.log('req world')
     
          let searchBar = document.getElementById('worldname-input');
          let worldName = searchBar.value;

          console.log(worldName)
     
          game.server.emit('getWorld', worldName);
     
     });

     game = new Game();
     game.game = game;

     console.log(game)

     game.init();

});

document.addEventListener('keydown', (event) => {
     

     let key = event.key.toUpperCase();

     if (key === 'W' || key === ' ') {

          if (game.physics.gravityStrength === 0) { return; }

          game.physics.gravityStrength = 0;

          game.player.jump();
          game.player.wannaJump = true;


          // game.player.position.y += 1;


     }

     if (key === 'D') {

          game.player.facingDirection = new THREE.Vector3(1, 0, 0);

          game.player.goingRight = true;

     }

     if (key === 'A') {

          game.player.facingDirection = new THREE.Vector3(-1, 0, 0);

          game.player.goingLeft = true;

     }

     if (key === 'S') {

          game.player.position.y -= 1;

     }


     if (key === 'X') {

          game.camera.zoomingOut = true;

     }

     if (key === 'Z') {

          game.camera.zoomingIn = true;

     }

});

document.addEventListener('keyup', (event) => {
     
     let key = event.key.toUpperCase();

     if (key === 'W' || key === ' ') {

          game.player.wannaJump = false;
          game.player.hasJumped = false;

          game.physics.gravityStrength = 1;
          game.player.airTime = 0;

     }

     if (key === 'P') {

          if (game.player.mouseButtonAction === 'punch') {
                    
               game.player.mouseButtonAction = 'place';

               console.log('place')

               return;
     
          };

          if (game.player.mouseButtonAction === 'place') {
                         
               game.player.mouseButtonAction = 'punch';

               console.log('punch')

               return;
          
          };

     }

     if (key === 'D') {

          game.player.goingRight = false;

     }

     if (key === 'A') {

          game.player.goingLeft = false;

     }

     if (key === 'X') {

          game.camera.zoomingOut = false;

     }

     if (key === 'Z') {

          game.camera.zoomingIn = false;

     }

});

canvas.addEventListener('pointermove', (event) => {


     if (game.player === undefined) { return; }

     game.player.setMousePosition(event);

});

document.addEventListener('pointerdown', (event) => {
          
     if (game.player === undefined) { return; }

     game.player.holdingMouseRight = true;

     // update the picking ray with the camera and pointer position

});

document.addEventListener('pointerup', (event) => {


     if (game.player === undefined) { return; }

     game.player.holdingMouseRight = false;

});

function animationLoop() {

     // console.log(game.player.position);


     game.delta = clock.getDelta();


     if (!game.world.isLoaded || game.player === undefined) {

          requestAnimationFrame(animationLoop);
          renderer.render(scene, game.camera);
          return;
     }


     game.physics.update();


     if (game.player.goingRight && game.player.position.x < 99.25) {

          game.player.moveRight();

     }

     if (game.player.goingLeft && game.player.position.x > -0.1) {

          game.player.moveLeft();

     }

     if (game.player.holdingMouseRight && game.player.mouseButtonAction === 'punch') {

          game.player.punch();

     }

     if (game.player.holdingMouseRight && game.player.mouseButtonAction === 'place') {
               
               game.player.place();

     }

     if (game.player.wannaJump) {

          if (game.player.canDoubleJump === false && game.player.hasTouchedGround === false && game.player.hasJumped === true) { return; }

          game.player.jump();

     }


     if (game.camera.zoomingIn === true) {

          console.log(game.camera.position.z)

          if (game.camera.position.z > 2) { 
               
               game.camera.position.z -= 5 * game.delta;

          }
     
     }

     if (game.camera.zoomingOut === true) {

          console.log(game.camera.position.z)

          if (game.camera.position.z < 12) { 

               game.camera.position.z += 5 * game.delta;

          }
     
     }

     game.camera.position.x = game.player.position.x;
     game.camera.position.y = game.player.position.y;

     game.player.sprite.position.x = game.player.position.x;
     game.player.sprite.position.y = game.player.position.y;

     game.player.standingOn();


     requestAnimationFrame(animationLoop);
     renderer.render(scene, game.camera);

}

export { game };

export default Game;