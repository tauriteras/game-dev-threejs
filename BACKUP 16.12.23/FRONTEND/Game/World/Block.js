import * as THREE from 'three';
import { game } from '../Index';


class Block {

    constructor() {
    
        this.width = 1;
        this.height = 1;

    }


    create(blockID) {

        const blockPlane = new THREE.PlaneGeometry(this.width, this.height);
        const blockMaterial = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,
         });
        const blockMesh = new THREE.Mesh(blockPlane, blockMaterial);
        
            blockMesh.position.z = 0.001;
        
            blockMesh.name = 'Block';
        
            // blockMesh.userData = {
            //     objectType: 'Block',
            //     id: blockID
            // };

       return blockMesh;
        
    }
};

export default Block;