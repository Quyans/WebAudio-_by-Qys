/**
 * Created by 延松松松松 on 2017/7/22.
 */
var context = new AudioContext();
var source = null;
var buffersource = null;
var playtime = 0
var audioBuffer = null;
var PresentSong;
var SongTime = 0;
var gainNode = context.createGain();
//改变进度条
var timeSec = 0 ;
var timeFloat
var AllIndex;
var state = 1;
var timeSecTemper;
var interval ;
function stopSound() {
    if (source) {
        source.stop(0); //立即停止

    }
}
function playSound(startTime,total) {
console.log(startTime);
    source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;
    source.connect(context.destination);
    source.start(0,startTime); //立即播放
    source.connect(gainNode );
    // console.log(state)
    timeSec = startTime;
    console.log()
   interval = setInterval(function () {
            if (state == 1) {


                // console.log(timeSec)
                timeSec = timeSec + 0.1;
                timeFloat = timeSec.toFixed(1);
                document.getElementById("timeShow").innerHTML = "时间" + timeFloat + "s"

                document.getElementById("ChangeSchedule").value = (timeSec / SongTime) * 1000;
                // console.log(timeSec)

            }else {
                // console.log(timeSec)
                return
            }
    },100);
    return;

    // console.log("没有return" )
} gainNode.connect(context.destination);

//    暂停播放
function pauseSong() {
    state = 0;
    stopSound();
    clearInterval(interval);
   timeSecTemper = timeSec;
   console.log(timeSec);

}

function  continueSong() {
    state = 1;
    // console.log(state);
    playSound(timeSecTemper,1);
}
// function initSound(arrayBuffer) {
//     context.decodeAudioData(arrayBuffer, function(buffer) { //解码成功时的回调函数
//         audioBuffer = buffer;
//         playSound();
//     }, function(e) { //解码出错时的回调函数
//         console.log('Error decoding file', e);
//     });
// }
function loadAudioFile(url,startTime) {
    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
    xhr.open('GET', url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e) { //下载完成
        context.decodeAudioData(this.response, function(buffer) {//解码成功时的回调函数
            audioBuffer = buffer;


            playSound(0,SongTime);
            SongTime = audioBuffer.duration;  //获取歌曲时间
            console.log("歌曲长度为"+SongTime)
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
                 AllIndex = index

             }

        })(i));
    }


    function preSong() {
        console.log(PresentSong);
        if(PresentSong>=1){


                stopSound();
                var lastSong = PresentSong -1;
            loadAudioFile("music/"+lastSong+".mp3",0);


        }
    }

    function nextSong() {
        if(PresentSong<=1){

                stopSound();
                var nextSong = PresentSong +1;
                loadAudioFile("music/"+nextSong+".mp3",0);


        }
    }

    //改变音量大小
function changeVoice() {
    var value = document.getElementById("ChangeVoice").value;
    var percent = value/100;
    gainNode.gain.value = percent;
    console.log(value,"",gainNode.gain.value)
}
//改变进度条
function changeSchedule() {
    stopSound();
    var percent = (document.getElementById("ChangeSchedule").value/1000) * SongName
    loadAudioFile("music/"+AllIndex+".mp3",percent);
}




