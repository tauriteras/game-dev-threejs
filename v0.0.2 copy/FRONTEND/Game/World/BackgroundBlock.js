import * as THREE from 'three';

import { game } from '../Index.js';

import blockmap from './blockdata.js';

class BackgroundBlock {
    constructor() {

        this.width = 1;
        this.height = 1;

    }
    
    create(blockID) {
    
        const backgroundPlane = new THREE.PlaneGeometry(this.width, this.height);

        // console.log('bg', blockID)

        const backgroundMaterial = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,

        });

        // backgroundMaterial.map = blockmap[blockID].texture;

        if (blockID === 0) {
            backgroundMaterial.opacity = 0;
        }

        if (blockID === 7) {

            backgroundMaterial.map = new THREE.TextureLoader().load(blockmap[blockID].texture)

            // backgroundMaterial.map = new THREE.Texture.load(blockmap[blockID].texture);
        }

        const backgroundBlock = new THREE.Mesh(backgroundPlane, backgroundMaterial);
    
        backgroundBlock.position.x = 50;
        backgroundBlock.position.y = 30;
        backgroundBlock.position.z = -0.0001;
    
        backgroundBlock.name = 'Background Block';
    
        return backgroundBlock; 
    
    }
    
};

export default BackgroundBlock;