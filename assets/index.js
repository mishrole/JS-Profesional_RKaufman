import MediaPlayer from './MediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';

const video = document.querySelector('video');
// Instancia de MediaPlayer
const player = new MediaPlayer({ el: video, plugins: [new AutoPlay()] });

const play = document.querySelectorAll('button')[0];
const mute = document.querySelectorAll('button')[1];
play.onclick = () => player.togglePlay();
mute.onclick = () => player.toggleMute();