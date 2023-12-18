let blockmap = {

    0: {
        name: 'Empty_Block',
        texture: '../Images/Blocks/transparent.png',
        type: 'Empty_Block',
        sub_type: 'Empty_Block',

        complexity: 0,

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

        complexity: 1,

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

        complexity: 1,

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

        complexity: 1,

        hardness: 6,
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

        complexity: 1,

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

        complexity: 1,

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
        interactable_type: 'settings'

    },

    6: {
        name: 'Radio',
        texture: '../Images/Blocks/radio.png',
        type: 'Block',
        sub_type: 'Music',

        complexity: 1,

        hardness: 10,
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
        texture: '../Images/Background blocks/cave_bg.png',
        type: 'Background Block',
        sub_type: 'Background',

        complexity: 1,

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

    },

    8: {
        name: 'Bedrock Tree',
        texture: '../Images/Trees/tree1.png',
        type: 'Block',
        sub_type: 'Tree',

        complexity: 1,

        timeToGrow: 30000,
        timePlanted: 0,
        timeLeft: 0,

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