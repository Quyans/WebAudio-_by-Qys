/**
 * Created by 延松松松松 on 2017/7/22.
 */
var context = new AudioContext();
var source = null;
var audioBuffer = null;
var PresentSong;
var SongTime = 0;


function stopSound() {
    if (source) {
        source.stop(0); //立即停止
    }
}
function playSound() {
    source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;
    source.connect(context.destination);
    source.start(0); //立即播放
}
// function initSound(arrayBuffer) {
//     context.decodeAudioData(arrayBuffer, function(buffer) { //解码成功时的回调函数
//         audioBuffer = buffer;
//         playSound();
//     }, function(e) { //解码出错时的回调函数
//         console.log('Error decoding file', e);
//     });
// }
function loadAudioFile(url) {
    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
    xhr.open('GET', url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e) { //下载完成
        context.decodeAudioData(this.response, function(buffer) {
            audioBuffer = buffer;
            // initSound(this.response);
            // use the dec​oded data here
            playSound();
            SongTime = audioBuffer.duration;
            console.log(SongTime)
        }, function(e) { //解码出错时的回调函数
            console.log('Error decoding file', e);
        })



    };
    xhr.send();
}
// loadAudioFile("music/0.mp3");

//*************************************
// for(var i = 0;i<showButton_Act.length;i++){
//     showButton_Act[i].addEventListener("click",(function () {
//         console.log(123)
//         var index = i;
//
//
// // console
//         return function () {
//
//             // console.log("我检查到了监听器")
//             // getGroupNumber(index+1);
//             // getGroupIntro(index+1);
//             console.log(index);
//
//             var Intro_title = data.data.activities[index].id;
//             var Intro_Content = data.data.activities[index].introduce;
//             showActDetailIntro(Intro_title,Intro_Content);
//         }
//
//
//     })(i)) ;
//     showPage(ActpageInt,ActpageMax);
// }
//********************************************************************************


    var SongName = document.getElementsByClassName("SongName");
    for(var i = 0; i<SongName.length ; i++)
    {
        SongName[i].addEventListener("click",(function () {

             var index = i;

             return function () {
                 console.log("我检测到了监听器" + index);
                 stopSound();
                 loadAudioFile("music/"+index+".mp3");
                 PresentSong = index

             }

        })(i));
    }


    function preSong() {
        console.log(PresentSong);
        if(PresentSong>=1){


                stopSound();
                var lastSong = PresentSong -1;
            loadAudioFile("music/"+lastSong+".mp3");


        }
    }

    function nextSong() {
        if(PresentSong<=1){

                stopSound();
                var nextSong = PresentSong +1;
                loadAudioFile("music/"+nextSong+".mp3");


        }
    }
