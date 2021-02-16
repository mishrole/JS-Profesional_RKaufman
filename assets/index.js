import MediaPlayer from './MediaPlayer.js';

const video = document.querySelector('video');
// Instancia de MediaPlayer
const player = new MediaPlayer({ el: video });

const button = document.querySelector('button');
button.onclick = () => player.togglePlay();