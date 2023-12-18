import * as THREE from 'three';

import { game } from '../Index.js';

import Block from './Block.js';
import BackgroundBlock from './BackgroundBlock.js';

import blockmap from '../Data/blockdata.js';

class World {
     constructor() {

          this.growingTrees = [];
          this.grownTrees = [];

          this.loaded = false;
          this.startedloading = false;

          this.dataIsLoaded = false;

          this.width = 100;
          this.height = 56;

          this.entryPoint = { 
               x: 0,
               y: 0
          };

          this.blocks = [];
          this.backgroundBlocks = [];

     }

     unpackWorldDataAndThenLoad(worldData) {

          for (let i = 0; i < worldData.length; i++) {
     
               game.world.blocks.push(worldData[i][0]);
               game.world.backgroundBlocks.push(worldData[i][1]);
     
          }

          // console.log('World data unpacked', game.world.blocks, game.world.backgroundBlocks)

          this.load();
     
     }

     load() {

          loadWeather();
          loadBlocks(this.blocks);
          loadBackgroundBlocks(this.backgroundBlocks);

          this.isLoaded = true;

          // console.log('World loaded', this.entryPoint.x, this.entryPoint.y)

          game.player.position.x = this.entryPoint.x;
          game.player.position.y = this.entryPoint.y;

          game.scene.add(game.player.sprite);

          game.gui.load();

          game.camera.position.x = game.player.position.x;
          game.camera.position.y = game.player.position.y + 1.5;
     
     }

};

function loadWeather() {

     if (game.scene === undefined) { return; }

     const backgroundPlane = new THREE.PlaneGeometry(105, 65);
     const backgroundMaterial = new THREE.MeshBasicMaterial({ 
          map: new THREE.TextureLoader().load('../Images/background.png'),
      });
     const background = new THREE.Mesh(backgroundPlane, backgroundMaterial);

     background.position.x = 50;
     background.position.y = 30;
     background.position.z = -0.0001;

     background.name = 'Background';

     game.scene.add(background);

}

function loadBackgroundBlocks(backgroundBlocks) {

     const backgroundBlockGroup = new THREE.Group();
     backgroundBlockGroup.name = 'BackgroundBlockGroup';

     let backgroundBlockX = 0;
     let backgroundBlockY = 0;

     for (let i = 0; i < backgroundBlocks.length; i++) {

          const backgroundBlock = new BackgroundBlock();

          let backgroundBlockID = backgroundBlocks[i];

          let backgroundBlockOBJECT = backgroundBlock.create(backgroundBlockID);

          backgroundBlockOBJECT.position.x = backgroundBlockX;
          backgroundBlockOBJECT.position.y = backgroundBlockY;

          backgroundBlockGroup.add(backgroundBlockOBJECT);

          backgroundBlockX += 1;
          if (backgroundBlockX % ( game.world.width ) === 0) { 

               backgroundBlockX = 0; 
               backgroundBlockY += 1;

          };

     }

     game.scene.add(backgroundBlockGroup);


}

function loadBlocks(blocks) {

     if (game.scene === undefined) { return; }

     const blockGroup = new THREE.Group();
     blockGroup.name = 'BlockGroup';

     let blockX = 0;
     let blockY = 0;

    for (let i = 0; i < blocks.length; i++) {

          const block = new Block();

          let blockID = blocks[i];

          let blockOBJECT = block.create(blockID);

          blockOBJECT.position.x = blockX;
          blockOBJECT.position.y = blockY;


          blockOBJECT.userData.hardness = blockmap[blockID].hardness;
          blockOBJECT.userData.punchCount = blockmap[blockID].punchCount;

          blockOBJECT.userData.breakable = blockmap[blockID].breakable;
          blockOBJECT.userData.interactable = blockmap[blockID].interactable;
          blockOBJECT.userData.interactable_type = blockmap[blockID].interactable_type;
          blockOBJECT.userData.interacted = false;

          blockOBJECT.material.map = new THREE.TextureLoader().load(blockmap[blockID].texture);

          blockOBJECT.userData.objectType = blockmap[blockID].type;
          blockOBJECT.userData.sub_type = blockmap[blockID].sub_type;
          blockOBJECT.userData.collides = blockmap[blockID].collides;

          if (blockmap[blockID].sub_type === 'Text') {

               blockOBJECT.userData.text = blockmap[blockID].text;

          }

          if (blockID === 4) {

               // console.log('Entry point found')

               game.world.entryPoint.x = blockX;
               game.world.entryPoint.y = blockY;

          }

          if (blockID === 0) {

               blockOBJECT.material.visible = false;

          }

         blockGroup.add(blockOBJECT);

         blockX += 1;
         if (blockX % ( game.world.width ) === 0) { 

             blockX = 0; 
             blockY += 1;

     };

     //     console.log(blockOBJECT)

         game.scene.add(blockGroup);
         
     }
}

export default World; 
