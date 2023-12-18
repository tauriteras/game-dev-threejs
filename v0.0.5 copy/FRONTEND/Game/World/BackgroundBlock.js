import * as THREE from 'three';

import { game } from '../Index.js';

import blockmap from '../Data/blockdata.js';

class BackgroundBlock {
    constructor() {

        this.width = 1;
        this.height = 1;

    }
    
    create(blockID) {
    
        const backgroundPlane = new THREE.PlaneGeometry(this.width, this.height);

        const backgroundMaterial = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,
        });

        const backgroundBlock = new THREE.Mesh(backgroundPlane, backgroundMaterial);


        if (blockID === 0) {

            backgroundMaterial.opacity = 0;

            backgroundBlock.userData.hardness = 3;
            backgroundBlock.userData.punchCount = 0;
    
            backgroundBlock.userData.breakable = false;
            backgroundBlock.userData.interactable = 'false';
            backgroundBlock.userData.interactable_type = 'none';
    
            backgroundBlock.userData.objectType = 'Empty_Background_Block';
            backgroundBlock.userData.sub_type = 'Background';

            backgroundBlock.userData.collides = {
                top: false,
                bottom: false,
                left: false,
                right: false
            }

        }
        

        if (blockID === 7) {

            backgroundMaterial.map = new THREE.TextureLoader().load(blockmap[blockID].texture)

            backgroundBlock.userData.hardness = blockmap[blockID].hardness;
            backgroundBlock.userData.punchCount = blockmap[blockID].punchCount;
    
            backgroundBlock.userData.breakable = blockmap[blockID].breakable;
            backgroundBlock.userData.interactable = blockmap[blockID].interactable;
            backgroundBlock.userData.interactable_type = blockmap[blockID].interactable_type;
    
            backgroundBlock.userData.objectType = blockmap[blockID].type;
            backgroundBlock.userData.sub_type = blockmap[blockID].sub_type;
            backgroundBlock.userData.collides = blockmap[blockID].collides;

        }

    
        backgroundBlock.position.x = 50;
        backgroundBlock.position.y = 30;
        backgroundBlock.position.z = -0.0001;
    
        backgroundBlock.name = 'Background Block';
    
        return backgroundBlock; 
    
    }
    
};

export default BackgroundBlock;