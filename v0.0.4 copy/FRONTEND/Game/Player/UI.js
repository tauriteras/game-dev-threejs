import * as THREE from 'three'

import { game } from '../Index.js'
import blockmap from '../World/blockdata.js';

class UI {
    constructor() {
    }

    load() {
        console.log('loading gui')
        createInventoryTile();
    }

    openTextPopup() {
        let body = document.getElementById('body');

        let popup = document.createElement('div');
        popup.classList.add('popup')
        popup.id = 'popup'

        let textarea = document.createElement('input')
        textarea.type = 'text'
        textarea.value = game.player.clickedElement.userData.text

        let closeBtn = document.createElement('button');
        closeBtn.id = 'popup_close'
        closeBtn.innerHTML = 'Close'

        closeBtn.addEventListener('click', () => {
            let removeElem = document.getElementById('popup')
            document.removeChild(removeElem);
        })

        popup.appendChild(textarea)
        popup.appendChild(closeBtn)

        body.appendChild(popup)
    }


}

function createInventoryTile(e) {
    let inventory = document.getElementById('inventory');
    let invButtons = document.getElementById('inventory').children

    let punchBtn = document.getElementById('punch')
    let settingsBtn = document.getElementById('settings')

    punchBtn.addEventListener('click', (e) => {

        for (let i = 0; invButtons.length > i; i++) {
            if (invButtons[i].classList.contains('active')){
                invButtons[i].classList.remove('active');
            };
        };

        if (e.target.classList.contains('inventory_img')) {
            e.target.parentElement.classList.add('active')
        } else {
            e.target.classList.add('active')
        }

        game.player.mouseButtonAction = 'punch';
        game.player.activeItem = 0;


    });

    settingsBtn.addEventListener('click', (e) => {

        for (let i = 0; invButtons.length > i; i++) {
            if (invButtons[i].classList.contains('active')){
                invButtons[i].classList.remove('active');
            };
        };

        if (e.target.classList.contains('inventory_img')) {
            e.target.parentElement.classList.add('active')
        } else {
            e.target.classList.add('active')
        }

        game.player.mouseButtonAction = 'settings';
        game.player.activeItem = 0;

    })

    for (let i = 0; game.player.inventory.length > i; i++) {
        console.log(game.player.inventory[i])

        let invTile = document.createElement('div');
        invTile.classList.add('inventory_tile')

        let tileImg = document.createElement('img');
        tileImg.src = blockmap[game.player.inventory[i][0]].texture;
        tileImg.classList.add('inventory_img')

        invTile.appendChild(tileImg)

        invTile.dataset.invBtnItem = blockmap[game.player.inventory[i][0]].type;
        invTile.dataset.invBtnItemId = game.player.inventory[i][0]


        invTile.addEventListener('click', (e) => {

            let invButtons = document.getElementById('inventory').children
            for (let i = 0; invButtons.length > i; i++) {
                if (invButtons[i].classList.contains('active')){
                    invButtons[i].classList.remove('active');
                };
            };

            console.log(e.target);

            let button;

            if (e.target.classList.contains('inventory_img')) {
                button = e.target.parentElement;
                e.target.parentElement.classList.add('active');
            } else {
                button = e.target;
                e.target.classList.add('active');
            }

            console.log('item', button.dataset.invBtnItem)
            console.log('itemId', button.dataset.invBtnItemId)

            if (button.dataset.invBtnItem === 'Block') {

                game.player.mouseButtonAction = 'place';
                game.player.activeItem = button.dataset.invBtnItemId;

            }

            console.log('player', game.player.mouseButtonAction, game.player.activeItem)

        });

        inventory.appendChild(invTile);

    }
}




export default UI;