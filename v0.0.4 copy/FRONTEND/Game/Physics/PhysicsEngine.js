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
    
        checkCollisionsAbove();
        checkCollisionsBelow();
        checkCollisionsLeft();
        checkCollisionsRight();

        killPlayerWhenStuck();

    
        if (!game.player.collisions.bottom && game.player.jumping === false) {

            game.player.position.y -= 0.2 + (game.physics.gravityStrength * (game.player.airTime * game.player.airTime)) * game.delta;
    
        }

        if (game.player.collisions.bottom) {

            if (game.player.position.y < 4) { game.player.position.y = 4; }

            game.player.position.y = Math.round(game.player.position.y);

            // console.log('Player position', game.player.position)

        }
    
    }
}

function killPlayerWhenStuck() {
    if (game.world.isLoaded === false) { return; }

    let playerCentre = new THREE.Vector3(game.player.position.x, game.player.position.y, game.player.position.z);
    let direction = new THREE.Vector3(0, 0, -1);
    game.raycaster.set(playerCentre, direction);

    let rawCollisions = game.raycaster.intersectObjects(game.scene.children);

    // console.log(rawCollisions)

    for (let i = 0; i < rawCollisions.length; i++) {

        let collision = rawCollisions[i].object;

        if (collision.userData.objectType === 'Block'){

            if (collision.userData.collides.top === true
                && collision.userData.collides.bottom === true
                && collision.userData.collides.left === true
                && collision.userData.collides.right === true) {

                    game.player.respawn();

            }

        }
    }
}



function checkCollisionsLeft() {

    if (game.world.isLoaded === false) { return; }

    let playerLeft = new THREE.Vector3((game.player.position.x - (game.player.size.width / 2)), game.player.position.y, game.player.position.z);
    let direction = new THREE.Vector3(0, 0, -1);
    game.raycaster.set(playerLeft, direction);

    let rawCollisions = game.raycaster.intersectObjects(game.scene.children);

    // console.log(rawCollisions)

    for (let i = 0; i < rawCollisions.length; i++) {

        let collision = rawCollisions[i].object;

            // console.log('defined', collision.userData)

        if (collision.userData.objectType === 'Block'){

            if (collision.userData.collides.right === true) {
                game.player.collisions.left = true;
                return;
            }

        }

        game.player.collisions.left = false;
    }

}

function checkCollisionsRight() {

    if (game.world.isLoaded === false) { return; }

    let playerLeft = new THREE.Vector3((game.player.position.x + (game.player.size.width / 2)), game.player.position.y, game.player.position.z);
    let direction = new THREE.Vector3(0, 0, -1);
    game.raycaster.set(playerLeft, direction);

    let rawCollisions = game.raycaster.intersectObjects(game.scene.children);

    // console.log(rawCollisions)

    for (let i = 0; i < rawCollisions.length; i++) {

        let collision = rawCollisions[i].object;

            // console.log('defined', collision.userData)

        if (collision.userData.objectType === 'Block'){

            if (collision.userData.collides.left === true)
                game.player.collisions.right = true;
                return;
            }
        }

        game.player.collisions.right = false;

}


function checkCollisionsBelow() {
        
        // for debugging \/
        // console.log('Checking collisions below')
    
        if (game.world.isLoaded === false) { game.player.collisions.bottom = true; return; }
    
        let playerBottom = new THREE.Vector3(game.player.position.x, (game.player.position.y - (game.player.size.height / 2)), game.player.position.z);
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

function checkCollisionsAbove() {

    if (game.world.isLoaded === false) { return; }

    let playerTop = new THREE.Vector3(game.player.position.x, (game.player.position.y + (game.player.size.height / 2)), game.player.position.z);
    let direction = new THREE.Vector3(0, 0, -1);
    game.raycaster.set(playerTop, direction);

    let rawCollisions = game.raycaster.intersectObjects(game.scene.children);

    // console.log(rawCollisions)

    for (let i = 0; i < rawCollisions.length; i++) {

        let collision = rawCollisions[i].object;

            // console.log('defined', collision.userData)

        if (collision.userData.objectType === 'Block'){

            if (collision.userData.collides.bottom === true)
                game.player.collisions.top = true;
                return;
            }
        }

        game.player.collisions.top = false;


}

export default PhysicsEngine;