import * as THREE from 'three';
import { game } from '../Index';


class Block {

    constructor() {
    
        this.width = 1;
        this.height = 1;

    }


    create() {

        const blockPlane = new THREE.PlaneGeometry(this.width, this.height);
        const blockMaterial = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,
         });
        const blockMesh = new THREE.Mesh(blockPlane, blockMaterial);
        
            blockMesh.position.z = 0.001;
        
            blockMesh.name = 'Block';

       return blockMesh;
        
    }
};

export default Block;