import * as THREE from 'three';

import { game } from '../Index.js';

class PhysicsEngine {
    constructor() {

        this.gravityStrength = 1;

    }

    update() {

        // console.log('Updating physics engine')

        if (game.player === undefined || game.player === null) { return; }

        // console.log('Guard passed')
    
        checkCollisionsBelow();
    
        if (!game.player.collisions.bottom && game.player.wannaJump === false) {

            game.player.position.y -= 0.2 + (game.physics.gravityStrength * (game.player.airTime * game.player.airTime)) * game.delta;
    
        }

        if (game.player.collisions.bottom) {

            if (game.player.position.y < 4) { game.player.position.y = 4; }

            game.player.position.y = Math.round(game.player.position.y);

            // console.log('Player position', game.player.position)

        }
    
    }

    checkCollisionInPlayerWalkDirection() {

        if (game.player.sprite === undefined || game.player.sprite === null) { return; }
        if (game.player.facingDirection === '') { return; }
    
        let facePosition = new THREE.Vector3(0, 0, game.player.position.z);
        facePosition.x += game.player.position.x + 0.26 * game.player.facingDirection.x;
        facePosition.y += game.player.position.y;
    
        // console.log('face position', facePosition)
        // console.log('player position', game.player.position)
    
        let direction = new THREE.Vector3(0, 0, -1);
    
        // console.log('face direction', game.player.facingDirection)
        // console.log('face position', facePosition)
    
        game.raycaster.set(facePosition, direction);
    
        if (game.world.isLoaded === false) { return; }
    
        let collisionResults = game.raycaster.intersectObjects(game.scene.children);
    
    
        // console.log('collision results', collisionResults)
    
    
        if (collisionResults === undefined) { return; }
    
            for (let i = 0; i < collisionResults.length; i++) {
    
                let collision = collisionResults[i].object;
    
                if (collision === undefined) { return; }

                if (collision.userData.collides === undefined) { return; }
    
                if (collision.userData.objectType === 'Block') {

                    console.log(game.player.facingDirection.x)
                                
                    if (game.player.facingDirection.x  == 1) { 

                        console.log('Checking collision right')
                        console.log(collision)

                        if (collision.userData.collides.left === true) { 
                                
                                game.player.collisions.right = true; 
                                game.player.collisions.left = false;
                                return;
                         }
    
                    }   
    
                    if (game.player.facingDirection.x  == -1) { 

                        console.log('Checking collision left')
                        console.log(collision)

                        if (collision.userData.collides.right === true) {

                            game.player.collisions.left = true;
                            game.player.collisions.right = false;
                            return;
                        }
    
                    }
                }
            }
    
        }
}


function checkCollisionsBelow() {
        
        // for debugging \/
        // console.log('Checking collisions below')
    
        if (game.world.isLoaded === false) { game.player.collisions.bottom = true; return; }
    
        let playerBottom = new THREE.Vector3(game.player.position.x, (game.player.position.y - (game.player.size.height / 2) - 0.01), game.player.position.z);
    
        let direction = new THREE.Vector3(0, 0, -1);
    
        game.raycaster.set(playerBottom, direction);
    
        let rawCollisions = game.raycaster.intersectObjects(game.scene.children);
    
        // console.log('raw', rawCollisions)
        // console.log('scene', game.scene.children)
    
        if (rawCollisions === undefined) { return; }
    
        if (rawCollisions.length === 0) { return; }
    
        let filteredCollisionsObjects = [];
    
        for (let i = 0; i < rawCollisions.length; i++) {
    
            let collision = rawCollisions[i].object;
    
            if (collision === undefined) { return; }
    
            if (collision.name === 'Block'){
    
                filteredCollisionsObjects.push(game.scene.getObjectById(collision.id));
    
                // console.log(game.scene.getObjectById(collision.id))
                // console.log(filteredCollisionsObjects)
    
            }
        }
    
        if (filteredCollisionsObjects === undefined) { return; }
    
        if (filteredCollisionsObjects.length > 0) {
            for (let i = 0; i < filteredCollisionsObjects.length; i++) {
                let collision = filteredCollisionsObjects[i];
    
                if (collision === undefined) { return; }
    
    
                if (collision.userData.objectType === 'Block' && collision.userData.collides.top === true) {
    
                    game.player.hasTouchedGround = true;
                    game.player.collisions.bottom = true;
                    game.player.airTime = 0;
    
                    // console.log('Collision below')
    
                    return;
    
                }
            }
        }
    
        game.player.collisions.bottom = false;
        game.player.airTime += game.delta;
    
        // console.log('No collisions below')
    
    }

export default PhysicsEngine;