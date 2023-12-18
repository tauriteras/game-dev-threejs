import * as THREE from 'three';
import Player from './Player.js';
import Game from '../Index.js';

class Camera {

    constructor() {

        this.position = {
            x: 0,
            y: 0,
            z: 5
        };

        this.zoomingOut = false;
        this.zoomingIn = false;

    }

    Camera() {

        const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        perspectiveCamera.position.x = this.position.x;
        perspectiveCamera.position.y = this.position.y;
        perspectiveCamera.position.z = this.position.z;

        perspectiveCamera.name = 'Camera';

        return perspectiveCamera;
    }

};

export default Camera;