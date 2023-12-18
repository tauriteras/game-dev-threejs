import * as THREE from 'three';
import Player from './Player.js';
import { game } from '../Index.js';

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

    updatePos() {

        let cameraLeft = (game.camera.position.x - (game.cameraViewWidth));
        let cameraRight = (game.camera.position.x + (game.cameraViewWidth));

        console.log('cam edges', cameraRight, cameraLeft)

        // if(game.player.goingRight && cameraRight < 99.8 ) {
        //     return;
        // }

        if (cameraLeft < 1.7) {
            game.camera.position.x = game.cameraViewWidth + 1.7;
        }

        if (cameraRight > 99.45) {
            game.camera.position.x = 99.4 - game.cameraViewWidth;
        }



        if (game.player.goingRight && cameraRight < 99.3) {

            if (game.camera.position.x < game.player.position.x + (1 + game.cameraViewWidth)) {

                game.camera.position.x += 4 * game.delta;

            }

            if (game.camera.position.x === game.player.position.x + (1 + game.cameraViewWidth)) {

                game.camera.position.x += game.player.velocity * game.delta;
                
            }

        }

        if (game.player.goingLeft && cameraLeft > 2 ) {

            if(game.camera.position.x > game.player.position.x - (1 + game.cameraViewWidth)) {

                game.camera.position.x -= 4 * game.delta;

            }

            if(game.camera.position.x === game.player.position.x - (1 + game.cameraViewWidth)) {

                game.camera.position.x -= game.player.velocity * game.delta;

            }

        }

        if (!game.player.goingRight       
            && !game.player.goingLeft) {

                if (game.camera.position.x > game.player.position.x && cameraLeft > 1.8) {

                    game.camera.position.x -= 2 * game.delta;

                }

                if (game.camera.position.x < game.player.position.x && cameraRight < 99.3) {

                    game.camera.position.x += 2 * game.delta;

                }

        }

        game.camera.position.y = game.player.position.y;

    }

};

export default Camera;