import * as THREE from 'three';
import { game } from '../Index';

import AudioEngine from '../AudioHandler/AudioEngine';

// import TextSprite from '@seregpie/three.text-sprite';

class Player {
    constructor() {

        name: null;

        this.mouseButtonAction = 'punch';

        this.wannaJump = false;
        this.jumping = false;

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
            x: 10,
            y: 10,
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

        this.punchedObjects = [];
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

        if (this.airTime < 3 && this.collisions.top === false && this.hasJumped === false) {

            if (game.delta === 0) { return; }

            this.jumping = true;

            this.airTime += game.delta;
            this.position.y += (4 - (1 * (this.airTime * this.airTime))) * game.delta;

            if (this.airTime > 2) {

                this.airTime = 0;
                this.hasJumped = true;
                game.physics.gravityStrength = 1;

            }

            return;
        }

        if (this.collisions.top === true) {

            this.jumping = false;

            this.airTime = 0;
            this.hasJumped = true;
            game.physics.gravityStrength = 1;
        }

    }

    punch() {

        let mousePoint = new THREE.Vector2();
        mousePoint.x = this.mouseX - 0.1;
        mousePoint.y = this.mouseY - 0.1;

        this.puncHoldTimer += game.delta;

        this.getClickedElement(mousePoint);

        if (this.puncHoldTimer > this.punchCooldown) {

            game.player.audioPlayer.init('../Audio/punch_block.wav', false);

            // console.log('Punching')

            this.puncHoldTimer = 0;

            if (this.clickedElement.userData.objectType === 'Block') { 

                console.log(this.clickedElement)

                punchBlock(this.clickedElement)

            }

            if (this.clickedElement.userData.objectType === 'Background Block') {

                console.log('background punched!')
                console.log(this.clickedElement.userData)

                punchBlock(this.clickedElement)


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

            this.clickedElement.material.visible = true;

            this.clickedElement.material.map = new THREE.TextureLoader().load('../Images/Blocks/dirt.png');

            this.clickedElement.userData.collides = {
                top: true,
                bottom: true,
                left: true,
                right: true
            };

        }

    }

    plant() {

        if (this.clickedElement === null) { return; }

        if (this.clickedElement.userData.objectType === 'Empty_Block') {

            console.log('planting!')

        }

    }

    getClickedElement(mousePoint) {

        var blockTileEmpty = false;

        // console.log(mousePoint);

        game.raycaster.setFromCamera(mousePoint, game.camera);

        let collisionResults = game.raycaster.intersectObjects(game.scene.children);

        // console.log(collisionResults)
                
            for (let i = 0; i < collisionResults.length; i++) {

                let collision = collisionResults[i].object;

                if (collision === undefined) { return; }

                if (collision.userData.objectType === 'Empty_Block') {

                    blockTileEmpty = true;

                }

                if (collision.userData.objectType === 'Block') {

                    this.clickedElement = collision;
            
                }

                if (this.clickedElement === null) { return; }


                if (blockTileEmpty === true
                    && collision.userData.objectType === 'Background Block') {

                    this.clickedElement = collision;

                }

                // console.log('clicked', this.clickedElement.userData.objectType)
                // console.log('collisions', collisionResults)
    
                // console.log('bg or no bg', this.clickedElement)
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
    
        if(this.collisions.left === false) {
    
            this.position.x -= this.velocity * game.delta;
    
        }
    
    }

    moveRight() {

        if(game.player.collisions.right === false) {

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
                    // console.log(collision.userData.text)
    
                }
    
            }

    }

}

function updateBlockBreakingOverlay(block) {

    if (block.userData.punchCount === 0) {

        game.player.punchedObjects.push([block, Date.now()])

        const overlayPlane = new THREE.PlaneGeometry(1, 1);
        const overlayMaterial = new THREE.MeshBasicMaterial({
            transparent: true
        });

        overlayMaterial.map = new THREE.TextureLoader().load('../Images/Breaking/breaking1.PNG');

        const breakOverlay = new THREE.Mesh(overlayPlane, overlayMaterial);

        block.add(breakOverlay);

    }

    block.userData.punchCount += 1;

    let breakingPercent = Math.round((block.userData.punchCount / block.userData.hardness) * 100)
    // console.log(breakingPercent)

    if (breakingPercent > 20 && breakingPercent <= 40) {
        block.children[0].material.map = new THREE.TextureLoader().load('../Images/Breaking/breaking2.PNG');
    }

    if (breakingPercent > 40 && breakingPercent <= 60) {
        block.children[0].material.map = new THREE.TextureLoader().load('../Images/Breaking/breaking3.PNG');
    }

    if (breakingPercent > 60 && breakingPercent <= 80) {
        block.children[0].material.map = new THREE.TextureLoader().load('../Images/Breaking/breaking4.PNG');
    }

    if (breakingPercent > 80 && breakingPercent <= 100) {
        block.children[0].material.map = new THREE.TextureLoader().load('../Images/Breaking/breaking5.PNG');
    }

}

function breakBlock(block) {

    game.player.audioPlayer.init('../Audio/break_block.wav', false);

    // console.log(collision)

    block.remove(block.children[0])

    block.userData.breakable = false;
    block.userData.interactable = false;
    block.userData.interactable_type = 'none';


    if (block.userData.objectType === 'Block') {

        block.userData.objectType = 'Empty_Block';

    }

    if (block.userData.objectType === 'Background Block') {

        // console.log('bg broken')

        block.userData.objectType ='Empty_Background_Block'

    }

    block.userData.punchCount = 0;

    block.material.map = new THREE.TextureLoader().load('../Images/Blocks/transparent.png');
    block.material.visible = false;
    block.userData.collides = {
        top: false,
        bottom: false,
        left: false,
        right: false
    };

}

function punchBlock(block) {

    // console.log(block.userData)

    if (block.userData.breakable === false) { 

        game.player.audioPlayer.init('../Audio/unbreakable.wav', false);
        // console.log('Not breakable')

        return;

    }

    game.player.audioPlayer.init('../Audio/hit_block.wav', false);


    updateBlockBreakingOverlay(block);

    // console.log(block.userData)

    if (block.userData.punchCount == block.userData.hardness) {

        breakBlock(block)

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
