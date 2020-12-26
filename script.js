'use strict'

const pause = document.getElementById('pause');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
let audio_keys = document.getElementById('keys');
const keys = document.querySelectorAll('.key');
let currentTrack;//this will be a boolean
const controller = document.querySelector('header');
const footer = document.querySelector('footer');
const now_playing = document.querySelector('#now-playing');
const track_time = document.querySelector('#track-time');
const local_play = document.querySelector('#local-play');
const local_pause = document.querySelector('#local-pause');

function format_time(time){
    let sec = Math.floor(time);
    let min = Math.floor( sec / 60 );
    if (min < 10) {
        min = '0' + min;
    }
    sec = Math.floor( sec % 60 );
    if (sec < 10) {
        sec = '0' + sec;
    }
    return min + ":"+ sec;
}

function innerStopSound(audio){
    audio.pause();
    audio.currentTime = 0;
    audio.classList.remove('paused')
    audio.classList.remove('now-playing')
    play.classList.remove('hidden');
    pause.classList.add('hidden'); 
}

function currentTrackInfo (audio_track){
    audio_track.addEventListener('timeupdate', () => {
            const currentTime = Math.floor(audio_track.currentTime);
            const duration = Math.floor(audio_track.duration);
            track_time.innerText = `${format_time(currentTime)} / ${format_time(duration)}`;
            console.log(audio_track);
    }, false);
}

function controlSound(audio_track){
    //every line of code in this function will happen each time function is run
    //either by clicking a track icon or by pressing a key

    [...audio_track.parentElement.children].forEach(function (e) {//the spread operator creates an array from the node list which we can then loop through    
        //for every audio track on which the event handler wasn't called
        if(e!== audio_track){
            e.classList.remove('now-playing');
            e.classList.remove('paused');
            e.pause();
            e.currentTime = 0; 
        }
    })

    //each time the function is run, we either add or remove track
    //depending on what it was before
    audio_track.classList.add('now-playing');
    audio_track.currentTime = 0;

    if (audio_track.classList.contains('now-playing')){
        audio_track.classList.remove('paused')
        audio_track.play();
        currentTrack = 'true';

    }
    // else{
    //     audio_track.pause();
    //     audio_track.classList.add('paused')
    //     currentTrack = 'false';
    // }; 
    
    if (currentTrack === 'true'){
        local_play.classList.add('hidden');
        local_pause.classList.remove('hidden');
    }

    else{
        local_play.classList.remove('hidden');
        local_pause.classList.add('hidden');
    }
}

function keyPressSound (e){
    const audio = document.querySelector(`audio[data-key = "${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)

    if(!audio) {
        return;//this stops the function from running
    }
    
    key.classList.add('playing');
    footer.classList.remove('hidden');
    now_playing.innerText = `${key.firstElementChild.innerText}`;

    currentTrackInfo(audio);

    controlSound(audio);
    
}

function clickTrackIcon (e){
    const audio = document.querySelector(`audio[id = "${e.target.innerText}"]`)
    const key = document.querySelector(`kbd[id = "${e.target.innerText}"]`)
    if(!audio) return;
    
    key.parentNode.classList.add('playing');
    footer.classList.remove('hidden');
    now_playing.innerText = `${key.innerText}`;

    currentTrackInfo(audio);
    controlSound(audio);
}
    
function clickPlaySound (){
    const audio = document.querySelector('.paused');
    audio.play();
    local_play.classList.add('hidden');
    local_pause.classList.remove('hidden');
    audio.classList.add('now-playing');
    //audio.classList.remove('paused');
}

//we use the clickPauseSound function only on the pause button
function clickPauseSound (){
    const audio = document.querySelector('.now-playing');
    //const key_2 = document.querySelector(`#${e.target.innerText}`)
    audio.pause();
    local_play.classList.remove('hidden');
    local_pause.classList.add('hidden');
    audio.classList.add('paused');
    audio.classList.remove('now-playing')
//    key_2.parentNode.classList.add('playing');
}

function clickStopSound (){
    const audio_1= document.querySelector('.now-playing');
    const audio_2= document.querySelector('.paused');
    let audio;
    //const key_2 = document.querySelector(`#${e.target.innerText}`)
    if (audio_1 === null){
        audio = audio_2;
    }
    else audio = audio_1;

    innerStopSound(audio);
    
//    key_2.parentNode.classList.add('playing');
}

for (let i = 0; i < keys.length; i++){
    keys[i].addEventListener('click', clickTrackIcon)
}

local_play.addEventListener('click', clickPlaySound);

window.addEventListener('keydown', keyPressSound);
// window.addEventListener('click', clickPlaySound);
local_pause.addEventListener('click', clickPauseSound);

stop.addEventListener('click', clickStopSound);


//now-playing.forEach(now-playing => now-playing.addEventListener('click', clickPauseSound));
// window.addEventListener('click', clickPlaySound);

//the removeTransition function takes an event as parameter
function removeTransition (e){
    if (e.propertyName !== 'transform') return;//this skips the event if it's not a transform event
    this.classList.remove('playing');
}


//we use forEach to listen for an event on each key press
keys.forEach(key => key.addEventListener('transitionend', removeTransition))//the function removeTransition is run when the transition ends


//sticky navigation

// const initialCoords = audio_keys.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function(){
//     console.log(window.scrollY);

//     if(window.scrollY > initialCoords.top){
//         controller.classList.add('sticky');
//         // current_track.classList.add('sticky');
//     }
//     else{
//         controller.classList.remove('sticky');
//         // current_track.classList.remove('sticky');        
//     }
// })



// const stickyNav = function(entries){
//     const [entry] = entries;
//     console.log(entry);
    
//     if(!entry.isIntersecting){
//         header.classList.add('sticky');
//     }
//     else{
//         header.classList.remove('sticky');
//     }
// }

// const obsOptions = {
//     root:null,
//     threshold: 0.5,
// }

// const audio_keysObserver = new IntersectionObserver (stickyNav, obsOptions);
// audio_keysObserver.observe(audio_keys);