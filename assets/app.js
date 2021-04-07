class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.kickaudio = document.querySelector(".kick-sound");
        this.snareaudio = document.querySelector(".snare-sound");
        this.hihataudio = document.querySelector(".hihat-sound");
        this.playBtn = document.querySelector(".play")
        this.index = 0;
        this.bpm = 150;
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // loop over pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.4s alternate ease-in-out 2`;
            // check if pads are active
            if (bar.classList.contains("active")) {
                // check each sound
                if (bar.classList.contains("kick-pad")) {
                    this.kickaudio.currentTime = 0;
                    this.kickaudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareaudio.currentTime = 0;
                    this.snareaudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihataudio.currentTime = 0;
                    this.hihataudio.play();
                }
            }
        })
        this.index++
    }
    start(){
        const interval = (60/this.bpm) * 1000
        setInterval(() => {
            this.repeat();
        }, interval);
    }
    activePad(){
        this.classList.toggle("active")
    }
}
const drum = new Drumkit();
drum.pads.forEach(pad =>{
    pad.addEventListener("click",drum.activePad);
    pad.addEventListener("animationend",function () {
        this.style.animation = ""
    })
});
drum.playBtn.addEventListener("click",()=>{
    drum.start();
    
});