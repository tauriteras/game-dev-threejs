import * as THREE from 'three';


class AudioEngine {

    constructor() {

        this.listener = new THREE.AudioListener()
        this.audio = new THREE.Audio(this.listener);

    }

    init(stream, loop) {
    // AUDIO
    var audioLoader = new THREE.AudioLoader();
    var listener = new THREE.AudioListener();
    var audio = new THREE.Audio(listener);

    audioLoader.load(stream, function(buffer) {

        audio.setBuffer(buffer);
        audio.setLoop(loop === undefined ? false : loop);
        audio.play();

    });

    }
}

export default AudioEngine;