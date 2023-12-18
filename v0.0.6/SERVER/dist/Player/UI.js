import * as THREE from 'three'

import { game } from '../Index.js'
import blockmap from '../Data/blockdata.js';

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

        closeBtn.addEventListener('click', (e) => {

            let parent = e.target.parentElement;
            let body = document.getElementById('body')

            console.log(parent, body, parent.children)

            game.player.clickedElement.userData.text = parent.children[0].value;

            console.log(parent.children[0].value)

            game.player.clickedElement.userData.interacted = false;

            body.removeChild(parent);

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
    let plantBtn = document.getElementById('plant')
    let plantBtn2 = document.getElementById('plant2')
    let consumeableBtn = document.getElementById('consume')

    consumeableBtn.addEventListener('click', (e) => {

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

        game.player.mouseButtonAction = 'consume';
        game.player.activeItem = 0;

    })

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

    plantBtn.addEventListener('click', (e) => {
        for (let i = 0; invButtons.length > i; i++) {
            if (invButtons[i].classList.contains('active')){
                invButtons[i].classList.remove('active');
            };
        };

        let button;

        if (e.target.classList.contains('inventory_img')) {
            button = e.target.parentElement;
            e.target.parentElement.classList.add('active');
        } else {
            button = e.target;
            e.target.classList.add('active');
        }

        // data-inv-btn-item-id
        if (button.dataset.invBtnItem === 'seed') {

            game.player.mouseButtonAction = 'place';
            game.player.seedId = parseInt(button.dataset.invBtnItemId);


            console.log('seed ID', game.player.seedId)
        }


        game.player.mouseButtonAction = 'plant';
    })

    plantBtn2.addEventListener('click', (e) => {
        for (let i = 0; invButtons.length > i; i++) {
            if (invButtons[i].classList.contains('active')){
                invButtons[i].classList.remove('active');
            };
        };

        let button;

        if (e.target.classList.contains('inventory_img')) {
            button = e.target.parentElement;
            e.target.parentElement.classList.add('active');
        } else {
            button = e.target;
            e.target.classList.add('active');
        }

        // data-inv-btn-item-id
        if (button.dataset.invBtnItem === 'seed') {

            game.player.mouseButtonAction = 'place';
            game.player.seedId = parseInt(button.dataset.invBtnItemId);


            console.log('seed ID', game.player.seedId)
        }


        game.player.mouseButtonAction = 'plant';
    })

    for (let i = 0; game.player.inventory.length > i; i++) {
        console.log(game.player.inventory[i])

        let invTile = document.createElement('div');
        invTile.classList.add('inventory_tile')
        invTile.classList.add('blocks')

        let tileImg = document.createElement('img');
        tileImg.src = blockmap[game.player.inventory[i][0]].texture;
        tileImg.classList.add('inventory_img')

        let blockCount = document.createElement('p')
        blockCount.innerHTML = game.player.inventory[i][1]
        blockCount.classList.add('item-count')

        invTile.appendChild(tileImg)
        invTile.appendChild(blockCount)


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

            let iteminfoPopup = document.createElement('span')
            iteminfoPopup.classList.add('iteminfo_popup')
            iteminfoPopup.innerHTML = blockmap[parseInt(button.dataset.invBtnItemId)].name + ' (Complexity: ' + blockmap[parseInt(button.dataset.invBtnItemId)].complexity + ')'

            button.appendChild(iteminfoPopup)

        });

        inventory.appendChild(invTile);

    }

    inventory.style.opacity = 1;

}




export default UI;