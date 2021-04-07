class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-plain.wav";
        this.currentCrash = "./sounds/tom-acoustic01.wav";
        this.kickaudio = document.querySelector(".kick-sound");
        this.snareaudio = document.querySelector(".snare-sound");
        this.hihataudio = document.querySelector(".hihat-sound");
        this.playBtn = document.querySelector(".play")
        this.crashaudion = document.querySelector(".crash-sound");
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
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
                if (bar.classList.contains("crash-pad")) {
                    this.crashaudion.currentTime = 0;
                    this.crashaudion.play();
                }
            }
        })
        this.index++
    }
    start(){
        const interval = (60/this.bpm) * 1000
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
            
        }else{
            // remove interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    activePad(){
        this.classList.toggle("active")
    }
    upDateBtn(){
        if (!this.isPlaying) {
            this.playBtn.innerText = "Stop"
        }else{
            this.playBtn.innerText = "Play"
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickaudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareaudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihataudio.src = selectionValue;
                break;
            case "crash-select":
                this.crashaudion.src = selectionValue;
            default:
                break;
        }
    }
    mute(e){
        const muteIndex = e.target.getAtrribute("data-track");
        e.target.classList.toggle("active");

    }
    changeTempo(e){
        const tempoText = document.querySelector(".tempo-nr");
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        this.bpm = e.target.value
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")) this.start() 
    }
}
const drum = new Drumkit();
drum.pads.forEach(pad =>{
    pad.addEventListener("click",drum.activePad);
    pad.addEventListener("animationend",function () {
        this.style.animation = ""
    })
});
//events listeners
drum.selects.forEach(select=>{
    select.addEventListener("click",(e)=>{
        drum.changeSound(e);
    })
})
drum.playBtn.addEventListener("click",()=>{
    drum.upDateBtn();
    drum.start();
    
});
drum.muteBtns.forEach(btn =>{
    btn.addEventListener("click",(e)=>{
    drum.mute(e)
});
});
drum.tempoSlider.addEventListener("input", function(e){
    drum.changeTempo(e)
})