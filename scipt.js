let play = document.getElementById("play");
let progressbar = document.getElementById("progress-bar");
let audio = new Audio("Audio/1.mp3")
let currentsong =1;

play.addEventListener('click',()=>{ 
    if(audio.paused || audio.currentTime == 0 ){
        audio.play();
        play.classList.remove('fa-circle-play')
        play.classList.add('fa-circle-pause')
    }else{
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
})
audio.addEventListener('timeupdate',()=>{
    let progress = (audio.currentTime/audio.duration)*100;
    progressbar.value = progress 
    progressbar.style.background = "linear-gradient(to right, #0cc935 ${progress}%, #333 ${progress}%)"
})
progressbar.addEventListener('input',function(){
    let value= this.value
    this.style.background = "linear-gradient(to right, #005813, #333 )"
    audio.currentTime = (progressbar.value * audio.duration)/100;
})
makeallplay = () => {
    playmusic.forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play') 
    })
}

let playmusic = Array.from(document.getElementsByClassName("play-music"))
playmusic.forEach((element) =>{
    element.addEventListener('click',(e) =>{
        makeallplay();
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        play.classList.remove("fa-circle-play")
        play.classList.add("fa-circle-pause")

        index = parseInt(e.target.id);
          
        currentsong = index
        audio.src = `Audio/${index}.mp3`
        audio.currentTime = 0;
        audio.play();
        updatenowbar();
    })
});

let allmusic = Array.from(document.getElementsByClassName("music-card"))
songs = [
    {songName :'Song1',songDesc :'This is description for song 1', songimg :"Images/1.jpg",songAudio:'Audio/1.mp3'},
    {songName :'Song2',songDesc :'This is description for song 2', songimg :"Images/2.jpg",songAudio:'Audio/2.mp3'},
    {songName :'Song3',songDesc :'This is description for song 3', songimg :"Images/3.jpg",songAudio:'Audio/3.mp3'},
    {songName :'Song4',songDesc :'This is description for song 4', songimg :"Images/4.jpg",songAudio:'Audio/4.mp3'},
    {songName :'Song5',songDesc :'This is description for song 5', songimg :"Images/1.jpg",songAudio:'Audio/5.mp3'},
    {songName :'Song6',songDesc :'This is description for song 6', songimg :"Images/2.jpg",songAudio:'Audio/6.mp3'},
    {songName :'Song7',songDesc :'This is description for song 7', songimg :"Images/3.jpg",songAudio:'Audio/7.mp3'},
    {songName :'Song8',songDesc :'This is description for song 8', songimg :"Images/4.jpg",songAudio:'Audio/8.mp3'},
    {songName :'Song9',songDesc :'This is description for song 9', songimg :"Images/1.jpg",songAudio:'Audio/9.mp3'},
    {songName :'Song10',songDesc :'This is description for song 10', songimg :"Images/2.jpg",songAudio:'Audio/10.mp3'},
    {songName :'Song11',songDesc :'This is description for song 11', songimg :"Images/3.jpg",songAudio:'Audio/11.mp3'},
    {songName :'Song12',songDesc :'This is description for song 12', songimg :"Images/4.jpg",songAudio:'Audio/12.mp3'},
    {songName :'Song13',songDesc :'This is description for song 13', songimg :"Images/2.jpg",songAudio:'Audio/13.mp3'},
    {songName :'Song14',songDesc :'This is description for song 14', songimg :"Images/1.jpg",songAudio:'Audio/14.mp3'},
    {songName :'Song15',songDesc :'This is description for song 15', songimg :"Images/3.jpg",songAudio:'Audio/15.mp3'},
    {songName :'Song16',songDesc :'This is description for song 16', songimg :"Images/4.jpg",songAudio:'Audio/16.mp3'},
    {songName :'Song17',songDesc :'This is description for song 17', songimg :"Images/1.jpg",songAudio:'Audio/17.mp3'},
    {songName :'Song18',songDesc :'This is description for song 18', songimg :"Images/4.jpg",songAudio:'Audio/18.mp3'},
    
]
order = [...songs]

allmusic.forEach((element,i) =>{
    element.getElementsByTagName('img')[0].src = songs[i].songimg;
    element.getElementsByClassName('image-titile')[0].innerText = songs[i].songName
    element.getElementsByClassName('image-disc')[0].innerText = songs[i].songDesc
})

let shuffle = document.getElementById("shuffle");
let repeat = document.getElementById("repeat");
let nowBar = document.querySelector(".now-bar")

let songonrepeat = false;
let songonshuffle = false;

function shufflesong(originalorder){
    order = [...originalorder]
    for(i=order.length -1 ;i>0;i--){
        let j =Math.floor((Math.random)*(i + 1))
        [order[i],order[j]]=[order[j],order[i]];
    }
    return order;
}

shuffle.addEventListener('click',()=>{
    if(!songonshuffle){
        songonshuffle = true;
        songonrepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active')

        order = shufflesong(songs)
    }else{
        songonshuffle = false;
        shuffle.classList.remove('active');
        order = songs
    }
})

repeat.addEventListener('click',()=>{
    if(!songonrepeat){
        songonrepeat = true;
        songonshuffle = false
        repeat.classList.add('active');
        shuffle.classList.remove('active')
    }else{
        songonrepeat = false;
        repeat.classList.remove('active');
    }
})

playnextsong = ()=>{
    if(!songonrepeat){
        let nextsong = (currentsong +1) % playmusic.length;
    currentsong  = nextsong ==0 ? 18 : nextsong
    audio.src = order[currentsong-1].songAudio
    audio.currentTime = 0;
    audio.play();
    updatenowbar();
    } else{
        audio.src = order[currentsong-1].songAudio
    audio.currentTime = 0;
    audio.play();
    updatenowbar()
    }
    
}
plyaprevious = ()=>{
    let previous = (currentsong - 1);
    currentsong  = previous ==0 ? 18 : previous
    audio.src = `Audio/${currentsong}.mp3`
    audio.currentTime = 0;
    audio.play();
    updatenowbar()
}

function updatenowbar(){
    nowBar.getElementsByTagName('img')[0].src = order[currentsong-1].songimg;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentsong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentsong -1 ].songDesc
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click',()=>{
    playnextsong();
})

audio.addEventListener('ended',()=>{
    playnextsong();
})

backward.addEventListener('click',()=>{
    plyaprevious()
})