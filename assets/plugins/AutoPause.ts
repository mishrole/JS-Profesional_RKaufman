import MediaPlayer from "../MediaPlayer";

class AutoPause {
    private threshold: number;
    private pausedByVisibility: boolean;
    player: MediaPlayer;
    // Como vamos a usar el valor de threshold en varios lugares, lo definimos en un constructor
    constructor() {
        this.threshold = 0.25
        // Definimos quién es this permanentemente para referirnos a la instancia del plugin
        this.handleIntersection = this.handleIntersection.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        
        // Manejamos el estado si es pausado por cambio de pestaña
        this.pausedByVisibility = false;
    }

    run(player) {
        // Vamos a necesitar usar los métodos del player, por eso los guardamos en una instancia de la clase
        this.player = player;

        const observer = new IntersectionObserver(
            this.handleIntersection, {
                threshold: this.threshold
            }
        )
        
        observer.observe(this.player.media)

        document.addEventListener("visibilitychange", this.handleVisibilityChange)
    }

    // Pausa si se sale de la vista, y reanuda si regresa
    private handleIntersection(entries: IntersectionObserverEntry[]) {
        const entry = entries[0];
        const isVisible = entry.intersectionRatio >= this.threshold;
        // Como tenemos la instancia de la clase, podemos usar play y pause
        if(isVisible) {
            this.player.play();
        } else {
            this.player.pause();
        }
    }

    // Pausa si cambia de pestaña, y reanuda si regresa
    private handleVisibilityChange() {
        const isVisible = document.visibilityState === "visible";
        
        if(isVisible) {
            if(this.pausedByVisibility) {
                this.player.play();
            }
        } else {
            if(!this.player.media.paused) {
                this.player.pause();
                this.pausedByVisibility = true;
            } else {
                this.pausedByVisibility = false;
            }
        }
    }
}

export default AutoPause;