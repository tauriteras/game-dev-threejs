let blockmap = {

    0: {
        name: 'Empty_Block',
        texture: '../Images/Blocks/dirt.png',
        type: 'Empty_Block',
        sub_type: 'Empty_Block',

        hardness: 3,
        punchCount: 0,

        collides: {
            top: false,
            bottom: false,
            left: false,
            right: false
        },

        breakable: false,
        interactable: false,
        interactable_type: 'none'
        
    },

    1: {
        name: 'Bedrock',
        texture: '../Images/Blocks/bedrock.png',
        type: 'Block',
        sub_type: 'Solid Block',

        hardness: 3,
        punchCount: 0,

        collides: {
            top: true,
            bottom: true,
            left: true,
            right: true
        },

        breakable: false,
        interactable: false,
        interactable_type: 'none'

    },

    2: {
        name: 'Dirt',
        texture: '../Images/Blocks/dirt.png',
        alt_texture: '../Images/Blocks/dirt2.png',
        type: 'Block',
        sub_type: 'Solid Block',

        hardness: 3,
        punchCount: 0,

        collides: {
            top: true,
            bottom: true,
            left: true,
            right: true
        },

        breakable: true,
        interactable: false,
        interactable_type: 'none'

    },

    3: {
        name: 'Rock',
        texture: '../Images/Blocks/rock.png',
        type: 'Block',
        sub_type: 'Solid Block',

        hardness: 3,
        punchCount: 0,

        collides: {
            top: true,
            bottom: true,
            left: true,
            right: true
        },

        breakable: true,
        interactable: false,
        interactable_type: 'none'

    },

    4: {
        name: 'Entry Portal',
        texture: '../Images/Blocks/entry-portal.png',
        type: 'Block',
        sub_type: 'Door',

        hardness: 3,
        punchCount: 0,

        collides: {
            top: false,
            bottom: false,
            left: false,
            right: false
        },

        breakable: false,
        interactable: true,
        interactable_type: 'click'

    },

    5: {
        name: 'Sign',
        texture: '../Images/Blocks/sign.png',
        type: 'Block',
        sub_type: 'Text',

        hardness: 3,
        punchCount: 0,

        text: 'Sample text',

        collides: {
            top: false,
            bottom: false,
            left: false,
            right: false
        },

        breakable: true,
        interactable: true,
        interactable_type: 'click'

    },

    6: {
        name: 'Radio',
        texture: '../Images/Blocks/radio.png',
        type: 'Block',
        sub_type: 'Music',

        hardness: 3,
        punchCount: 0,

        collides: {
            top: false,
            bottom: false,
            left: false,
            right: false
        },

        breakable: true,
        interactable: true,
        interactable_type: 'punch'

    },

    7: {
        name: 'Cave Background',
        texture: '../Images/Background blocks/rock.png',
        type: 'Background Block',
        sub_type: 'Background',

        hardness: 3,
        punchCount: 0,

        collides: {
            top: false,
            bottom: false,
            left: false,
            right: false
        },

        breakable: true,
        interactable: false,
        interactable_type: 'none'

    }
};

export default blockmap;