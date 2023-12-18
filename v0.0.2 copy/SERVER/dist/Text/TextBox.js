import * as THREE from 'three';
// import TextSprite from 'three.text-sprite';

import { game } from '../Index.js';

class TextBox {
    constructor() {
        this.text = 'Sample text';
    }

    createTextBox(text) {

        let sprite = new THREE.TextSprite({
            text: text,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 12,
            color: '#ffbbff',
          });

          sprite.position.x = game.player.position.x;
          sprite.position.y = game.player.position.y + 1;

          game.scene.add(sprite);

    }

}

export default TextBox;