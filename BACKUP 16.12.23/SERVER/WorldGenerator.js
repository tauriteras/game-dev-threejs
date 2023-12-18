class WorldGenerator {
    constructor() {
        this.blocks = []

        this.blocks = [];
        this.backgroundBlocks = [];


        this.entryPointSet = false;

        this.isReady = false;
    }


    generateWorld() {

        this.blocks = [];
        this.isReady = false;

        this.generateBlocks();

        this.generateBackgroundBlocks();

        for (let i = 0; i < this.blocks.length; i++) {

            let tile = [this.blocks[i], this.backgroundBlocks[i]];
            this.blocks.push(tile);
        }

        this.isReady = true;

        // console.log(this.blocks)

    }

    generateBlocks() {

        this.blocks = [];
        this.entryPointSet = false;

        let rockSpawnRate = 0.025;
        let entryPointX = Math.floor(Math.random() * 99);
        let entryTile = entryPointX + 2600;


        for (let i = 0; i < 5600; i++) {

            if (this.blocks.length >= 2600 && this.blocks.length < 5600) {

                if (this.blocks.length == entryTile && this.entryPointSet === false) {
    
                        this.blocks.push(4);
                        this.entryPointSet = true;

                        this.blocks.push(5);
                        this.blocks.push(6);

                        console.log(entryTile)
                }

                    this.blocks.push(0);
            }

            if (this.blocks.length >= 400 && this.blocks.length < 2600) {

                if (this.blocks.length < 800) {
                    rockSpawnRate = 0.05;
                }


                if (this.blocks.length < 2200) {
                    let randomizer = Math.random() * 1;

                    if (randomizer <= rockSpawnRate) {
                        this.blocks.push(3);
                    }

                    if (randomizer > rockSpawnRate) {
                        this.blocks.push(2);
                    }
                }

                if (this.blocks.length == entryPointX + 2500) {
                    this.blocks.push(1);
                }

                this.blocks.push(2);

            }

            if (this.blocks.length < 400) { 
                this.blocks.push(1);
            }
        }
    }

    generateBackgroundBlocks() {

        this.backgroundBlocks = [];

        for (let i = 0; i < 5600; i++) {

            if (this.blocks.length > 2600) {

                this.backgroundBlocks.push(0);
            }

            if (this.blocks.length < 2600) { 
                this.backgroundBlocks.push(7);
            }
        }

    }

}


function worldGenerator() {

}


export default WorldGenerator;