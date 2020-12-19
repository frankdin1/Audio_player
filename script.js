'use strict'

const pause = document.getElementById('pause');
const play = document.getElementById('play');
let audio_keys = document.getElementsByClassName('keys');
const keys = document.querySelectorAll('.key');
let now_playing = 'true';

// function init(){
//     play.classList.('hidden');
//     pause.classList.add('hidden');
// }

function controlSound(audio_track){
    
    
    

    [...audio_track.parentElement.children].forEach(function (e) {//the spread operator creates an array from the nodelist which we can then loop through    
        if(e!== audio_track){
            e.classList.remove('tracks');
            e.pause();
            e.currentTime = 0; 
             
        }
    })

    audio_track.classList.toggle('tracks')
    
    //play.classList.toggle('hidden');
    //pause.classList.toggle('hidden');

    if (audio_track.classList.contains('tracks')){
        audio_track.play();
        now_playing = 'true';

    }
    else{
        audio_track.pause();
        now_playing = 'false';
        // play.classList.add('hidden');
        // pause.classList.remove('hidden');
    }; 
    console.log(now_playing);
    if (now_playing === 'true'){
        play.classList.add('hidden');
        pause.classList.remove('hidden');
    }

    else{
        play.classList.remove('hidden');
        pause.classList.add('hidden');
    }
}

function keyPressSound (e){
    // console.log(e);//this gives us the entire keypress object
    //console.log(e.keyCode);//this gives us just the ascii character of the key that was pressed
    const audio = document.querySelector(`audio[data-key = "${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    //const key_2 = document.querySelector(`#${e.target.innerText}`)
    //const key_3 = document.querySelector(`.sound`);

    //console.log(this.key_3);
    if(!audio) return;//this stops the function from running
    //audio.currentTime = 0;//this rewinds the playback to the start every time we hit the key
    //audio.stop();
    
    key.classList.add('playing');

    controlSound(audio);
    
}

function clickPlaySound (e){
    //console.log(e.target.innerText)
    const audio_2 = document.querySelector(`audio[id = "${e.target.innerText}"]`)
    const key_2 = document.querySelector(`kbd[id = "${e.target.innerText}"]`)
    if(!audio_2) return;
    
    key_2.parentNode.classList.add('playing');
    
    controlSound(audio_2);
}
    

 
function clickPauseSound (){
    const audio_3 = document.querySelector('.tracks');
    console.log(audio_3)
    //const key_2 = document.querySelector(`#${e.target.innerText}`)
    audio_3.pause();
//    key_2.parentNode.classList.add('playing');
}

function keyPauseSound (){
    const audio_4 = document.querySelector('.tracks');
    console.log(audio_4)
    //const key_2 = document.querySelector(`#${e.target.innerText}`)
    audio_4.pause();
//    key_2.parentNode.classList.add('playing');
}

for (let i = 0; i < audio_keys.length; i++){
    audio_keys[i].addEventListener('click', clickPlaySound)
}
window.addEventListener('keydown', keyPressSound);
// window.addEventListener('click', clickPlaySound);
pause.addEventListener('click', clickPauseSound);
//tracks.forEach(tracks => tracks.addEventListener('click', clickPauseSound));
// window.addEventListener('click', clickPlaySound);

//the removeTransition function takes an event as parameter
function removeTransition (e){
    if (e.propertyName !== 'transform') return;//this skips the event if it's not a transform event
    this.classList.remove('playing');
}


//we use forEach to listen for an event on each key press
keys.forEach(key => key.addEventListener('transitionend', removeTransition))//the function removeTransition is run when the transition ends