import * as THREE from 'three';
import { game } from '../Index';

import AudioEngine from '../AudioHandler/AudioEngine';

// import TextSprite from '@seregpie/three.text-sprite';

class Player {
    constructor() {

        name: null;

        this.mouseButtonAction = 'punch';

        this.wannaJump = false;

        this.hasTouchedGround = false;
        this.hasJumped = false;

        this.canDoubleJump = false;
        this.hasDoubleJumped = false;

        this.puncHoldTimer = 0;
        this.punchCooldown = 0.25;

        this.sprite = null;
        this.size = {
            width: 0.75,
            height: 1
        };
        this.position = {
            x: 0,
            y: 0,
            z: 0.01
        };
        this.collisions= {
            left: false,
            right: false,
            top: false,
            bottom: false
        };

        this.velocity = 3;

        this.airTime = 0;

        this.goingLeft = false;
        this.goingRight = false;

        this.faceCollides = false;

        this.facingDirection = '';

        spriteDirection: null;
        faceVectorStartPoint: null;

        holdingMouseRight: false;

        this.clickedElement = null;

        this.mouseX = 0;
        this.mouseY = 0;

        this.standingon = null;

        this.audioPlayer = null;
    };


    create(name) {

        // for debugging \/
        console.log('Creating player')
        
        const playerPlane = new THREE.PlaneGeometry(this.size.width, this.size.height);

        const playerMaterial = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('../Images/Player/player.png'),
            transparent: true,
         });

        let playerSprite = new THREE.Mesh(playerPlane, playerMaterial);

        playerSprite.position.x = this.position.x;
        playerSprite.position.y = this.position.y;
        playerSprite.position.z = this.position.z;

        playerSprite.renderOrder = 100;

        playerSprite.name = 'Player';

        playerSprite.userData = {
            objectType: 'Player',
            name: name,
            dateCreated: Date.now()
        };

        this.audioPlayer = new AudioEngine();

        this.sprite = playerSprite;
        this.name = name;

        game.player = this;
    
    }

    setMousePosition(event) {

        this.mouseX = -1 + (event.clientX / game.canvas.width) * 2 ; 
        this.mouseY = 1 - (event.clientY / game.canvas.height) * 2 ;

        // console.log(this.mouseX, this.mouseY)

    }

    jump() {

        // for debugging \/
        // console.log('Jumping')

        if (this.airTime < 3 && this.collisions.top === false) {

            // if (this.hasTouchedGround === false) { return; }

            // if (this.hasTouchedGround === false && this.canDoubleJump === false) { return; }

            if (game.delta === 0) { return; }
            game.physics.gravityStrength = 0;


            this.airTime += game.delta;
            this.position.y += (4 - (1 * (this.airTime * this.airTime))) * game.delta;

            if (this.airTime > 2) {
                this.hasJumped = true;
                this.wannaJump = false;
                game.physics.gravityStrength = 1;
            }

            return;
        }

    }

    punch() {

        let mousePoint = new THREE.Vector2();
        mousePoint.x = this.mouseX - 0.1;
        mousePoint.y = this.mouseY - 0.1;

        this.puncHoldTimer += game.delta;

        this.getClickedElement(mousePoint);

        if (this.puncHoldTimer > this.punchCooldown) {

            this.audioPlayer.init('../Audio/punch_block.wav', false);

            console.log('Punching')

            this.puncHoldTimer = 0;

            if (this.clickedElement.userData.objectType === 'Block') { 

                console.log(this.clickedElement.userData)

                if (this.clickedElement.userData.breakable === false) { 

                    this.audioPlayer.init('../Audio/unbreakable.wav', false);
                    console.log('Not breakable')

                    return;

                }

                this.audioPlayer.init('../Audio/hit_block.wav', false);

                this.clickedElement.userData.punchCount += 1;

                console.log(this.clickedElement.userData)

                if (this.clickedElement.userData.punchCount == this.clickedElement.userData.hardness) {

                    this.audioPlayer.init('../Audio/break_block.wav', false);

                    // console.log(collision)
                    this.clickedElement.userData.breakable = false;
                    this.clickedElement.userData.interactable = false;
                    this.clickedElement.userData.interactable_type = 'none';
                    this.clickedElement.userData.objectType = 'Empty_Block';
                    this.clickedElement.userData.sub_type = 'Empty_Block';

                    this.clickedElement.userData.punchCount = 0;

                    this.clickedElement.material.map = new THREE.TextureLoader().load('../Images/Blocks/transparent.png');
                    this.clickedElement.material.opacity = 0;
                    this.clickedElement.userData.collides = {
                        top: false,
                        bottom: false,
                        left: false,
                        right: false
                    };
                }
            }
        }
    }
    
    place() {

        let mousePoint = new THREE.Vector2();
        mousePoint.x = this.mouseX - 0.1;
        mousePoint.y = this.mouseY - 0.1;

        this.getPlaceableTile(mousePoint);

        console.log('Placing');

        if (this.clickedElement === null) { return; }

        if (this.clickedElement.userData.objectType === 'Empty_Block') {

            this.audioPlayer.init('../Audio/break_block.wav', false);

            this.clickedElement.userData.breakable = true;
            this.clickedElement.userData.interactable = true;
            this.clickedElement.userData.interactable_type = 'none';
            this.clickedElement.userData.objectType = 'Block';
            this.clickedElement.userData.sub_type = 'Solid Block';

            this.clickedElement.userData.punchCount = 0;

            this.clickedElement.visible = true;

            this.clickedElement.material.map = new THREE.TextureLoader().load('../Images/Blocks/dirt.png');

            this.clickedElement.userData.collides = {
                top: true,
                bottom: true,
                left: true,
                right: true
            };

        }

    }

    getClickedElement(mousePoint) {

        // console.log(mousePoint);

        game.raycaster.setFromCamera(mousePoint, game.camera);

        let collisionResults = game.raycaster.intersectObjects(game.scene.children);

        // console.log(collisionResults)
                
            for (let i = 0; i < collisionResults.length; i++) {

                let collision = collisionResults[i].object;

                if (collision.name === 'Background') { return; }

                if (collision === undefined) { return; }

                if (collision.name === 'Block') {

                    this.clickedElement = collision;
            
                }
    
                // console.log(this.clickedElement)
                // console.log(this.position)
            }

    }

    getPlaceableTile(mousePoint) {

        // console.log('Getting placeable tile')
        // console.log(mousePoint);

        game.raycaster.setFromCamera(mousePoint, game.camera);
        
        let collisionResults = game.raycaster.intersectObjects(game.scene.children);

        for (let i = 0; i < collisionResults.length; i++) {

            let collision = collisionResults[i].object;

            // console.log(collision.userData)

            if (collision.userData.objectType === 'Empty_Block') {

                console.log('clicked', collision)

                this.clickedElement = collision;

                return;

            }
        }

    }

    moveLeft() {
            
        this.goingLeft = true;
        this.goingRight = false;
    
        this.facingDirection = new THREE.Vector3(-1, 0, 0);
        this.collisions.right = false;
    
        game.physics.checkCollisionInPlayerWalkDirection();
    
        if(this.collisions.left == false) {

            // this.audioPlayer.init('../Audio/Parditiigi park 62.wav', false);
    
            this.position.x -= this.velocity * game.delta;
    
        }
    
    }

    moveRight() {

        game.player.facingDirection = new THREE.Vector3(1, 0, 0);
        game.player.collisions.left = false;

        game.physics.checkCollisionInPlayerWalkDirection();

        // console.log(game.player.collisions)

        if(game.player.collisions.right == false) {

             game.player.position.x += game.player.velocity * game.delta;

        }

    }

    standingOn() {

        let playerCenter = new THREE.Vector3(this.position.x, this.position.y, this.position.z);
        let raycasterDirectionVector = new THREE.Vector3(0, 0, -1);

        game.raycaster.set(playerCenter, raycasterDirectionVector);

        let collisionResults = game.raycaster.intersectObjects(game.scene.children);

        if (collisionResults === undefined) { return; }

        // console.log(collisionResults)

        for (let i = 0; i < collisionResults.length; i++) {
                
                let collision = collisionResults[i].object;
    
                if (collision === undefined) { return; }
    
                if (collision.userData.sub_type === 'Text') {
    
                    this.standingon = collision;
                    console.log(collision.userData.text)
    
                }
    
            }

    }

}


export default Player;


// function getPunchDirectionVector() {
    
//     const mousePoint = new THREE.Vector2(Player.mouseX, Player.mouseY);

//     raycaster.set(Player.sprite, mousePoint);

//     const directionVector = raycaster.ray.direction;

//     return directionVector;

// }

// export function mouseHoldEvent(event, camera, scene) {

//     punch();


//     // for debugging \/
//     // console.log('mouse down event')
//     // console.log(Player.clickedElement)
// }

    // TODO: Make the punch animation work
    // let punchAnimationDirection = getPunchDirectionVector();


    // for debugging \/
    // console.log(punchAnimationDirection);


    // if (Player.clickedElement === null) { return; }

    // console.log(Player.clickedElement.userData);

    // if (Player.clickedElement.userData.objectType === 'Block') {

    //     Player.clickedElement.material.color.setHex(0xff0000);

    // }
