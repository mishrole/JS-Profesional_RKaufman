import MediaPlayer from './MediaPlayer';
import AutoPlay from './plugins/AutoPlay';
import AutoPause from './plugins/AutoPause';

const video = document.querySelector('video');
// Instancia de MediaPlayer
const player = new MediaPlayer({
    el: video,
    plugins: [new AutoPlay(), new AutoPause] });

const play: HTMLElement = document.querySelector('#btnPlay');
const mute: HTMLElement = document.querySelector('#btnMute');
play.onclick = () => player.togglePlay();
mute.onclick = () => player.toggleMute();

// Detectar si el navegador del usuario le da soporte a Service Workers
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js').catch(error => {
        console.error(error.message);
    });
}