
const musicData = [
    {
        MusicID: 1,
        UserID: 1,
        MusicName: "我還年輕 我還年輕",
        Singer: "老王樂團",
        Album: "吾十有五而志於學",
        MusicType: "搖滾",
        MusicTime: "5:55",
        MusicImage: "./img/我還年輕我還年輕.jpeg",
        MusicMp3: "./Music/老王樂團-我還年輕 我還年輕.mp3"
    },
    {
        MusicID: 2,
        UserID: 2,
        MusicName: "魚",
        Singer: "怕胖團PAPUN BAND",
        Album: "青春只差兩撇",
        MusicType: "情歌",
        MusicTime: "4:43",
        MusicImage: "./img/怕胖團-魚.png",
        MusicMp3: "./Music/怕胖樂團-魚.mp3"
    },
    {
        MusicID: 3,
        UserID: 3,
        MusicName: "稀有品種",
        Singer: "麋先生MIXER",
        Album: "麋先生MIXER【嗜愛動物Loveholic】2020",
        MusicType: "抒情",
        MusicTime: "5:03",
        MusicImage: "./img/麋先生-稀有品種.png",
        MusicMp3: "./Music/稀有品種.mp3"
    },
    {
        MusicID: 4,
        UserID: 2,
        MusicName: "鴦 The Left Alone ",
        Singer: "怕胖團PAPUN BAND",
        Album: "青春只差兩撇",
        MusicType: "抒情",
        MusicTime: "5:08",
        MusicImage: "./img/怕胖樂團-鴦.png",
        MusicMp3: "./Music/怕胖團PAPUN BAND 《 鴦 The Left Alone Lovebird》Official Music Video.mp3"
    },
    {
        MusicID: 5,
        UserID: 2,
        MusicName: "月旁月光",
        Singer: "怕胖團PAPUN BAND",
        Album: "青春只差兩撇",
        MusicType: "抒情",
        MusicTime: "4:33",
        MusicImage: "./img/怕胖樂團-月旁月光.png",
        MusicMp3: "./Music/怕胖團PAPUN BAND《 月旁月光 》 MUSIC VIDEO.mp3"
    },
]




// const myVideo = document.getElementById('myVideo')
const rotate = document.getElementById('rotate')
const play = document.querySelector('#play') //圖片改變播放,停止
const btnRandom = document.getElementById('btnRandom')
const controlData = document.getElementById('control')
const btnNext = document.getElementById('btnNext') //下一首按鈕
const btnBack = document.getElementById('btnBack') //上一首按鈕
const totalTime = document.getElementById('totalTime') //總時長

// 40. 網頁全部內容載入後觸發 window.onload 事件
window.onload = function () {

    const audio = document.getElementById('audio')
    var MusicIndex = 0

    myAudio()
    controlInfo()
    initMusic()
    myVideo.play();
    document.getElementById('play').src = './icon/pause-solid 1.png';
    //播放結束
    myVideo.onended = function () {
        MusicIndex += 1
        myAudio()
        controlInfo()
        myVideo.play();
        initMusic()
        document.getElementById('play').src = './icon/pause-solid 1.png'
    };


    // > 點擊時 下一首
    btnNext.onclick = function () {
        next()
        myVideo.onended = function () {
            next()
        };
    }

    // < 點擊時 上一首 
    btnBack.onclick = function () {
        back()
        myVideo.onended = function () {
            next()
        };
    }
    // 隨機播放 

    btnRandom.onclick = function () {
        MusicIndex = Math.floor(Math.random() * (musicData.length))
        myAudio()
        controlInfo()
        myVideo.play();
        initMusic()
        document.getElementById('play').src = './icon/pause-solid 1.png';
        myVideo.onended = function () {
            next()
        };
    }


    //拖曳進度 時間 音量 
    function initMusic() {

        inputVolume.onchange = function () {
            myVideo.volume = inputVolume.value;//影片音量 = input[type=range]的值
        }

        myVideo.ontimeupdate = function () {
            videoProgress.value = myVideo.currentTime / myVideo.duration * 100;
            var time_s = Math.floor(myVideo.currentTime)

            var minute = Math.floor(time_s / 60);
            var rest_seconds = time_s % 60;
            var minTime = minute.toString().padStart(2, '0') + ":" + rest_seconds.toString().padStart(2, '0')
            nowTime.innerText = `${minTime}`


            //總時長
            let ToatalTime = Math.floor(myVideo.duration) //總時長
            let TotalMinute = Math.floor(ToatalTime / 60) //分
            let TotalSec = Math.floor(ToatalTime % 60) //秒
            var TotalMinTime = TotalMinute.toString().padStart(2, '0') + ":" + TotalSec.toString().padStart(2, '0')
            totalTime.innerText = `${TotalMinTime}`
        }
        function scrub(e) {

            const scrubTime = (e.offsetX / videoProgress.offsetWidth) * myVideo.duration;
            myVideo.currentTime = scrubTime;
        }


        let mousedown = false;
        videoProgress.addEventListener('click', scrub);
        videoProgress.addEventListener('mousemove', (e) => mousedown && scrub(e));
        videoProgress.addEventListener('mousedown', () => mousedown = true);
        videoProgress.addEventListener('mouseup', () => mousedown = false);
    }

    btnPlay.onclick = function () {


        if (myVideo.paused == true) { //當前為暫停播放 點擊時 播放
            myVideo.play();
            document.getElementById('play').src = './icon/pause-solid 1.png'
            document.querySelector('.rotate').style = 'animation: rotation 10s infinite linear;'
        } else {
            myVideo.pause();
            document.getElementById('play').src = './icon/Vector.png'
            document.querySelector('.rotate').style = 'animation-play-state: paused; '

        }
    }

    // 52. 透過 video物件 的 muted 屬性取得當前影片是否為靜音
    volume.onclick = function () {
        if (myVideo.muted == false) {
            myVideo.muted = true;
            document.getElementById('volume').src = './icon/volume-xmark-solid.png'
        } else {
            myVideo.muted = false;
            document.getElementById('volume').src = './icon/volume-low-solid.png'
        }
    }




    //下一首function
    function next() {
        //循環播放 當歌曲為編號最後就回到第一首開始
        if (MusicIndex + 1 >= musicData.length) {
            MusicIndex = 0
        } else {
            MusicIndex += 1
        }

        myAudio()
        controlInfo()
        myVideo.play();
        initMusic()
        document.getElementById('play').src = './icon/pause-solid 1.png'

    }
    //上一首function
    function back() {
        if (MusicIndex - 1 < 0) {
            MusicIndex = musicData.length
        } else {
            MusicIndex -= 1
        }
        myAudio()
        controlInfo()
        myVideo.play();
        initMusic()
        document.getElementById('play').src = './icon/pause-solid 1.png';
    }


    //control圖片
    function controlInfo() {
        controlData.innerHTML = `
                <img src="${musicData[MusicIndex].MusicImage}" alt="" />
                <div class="control-text">
                    <p>${musicData[MusicIndex].MusicName}</p>
                    <small>${musicData[MusicIndex].Singer}</small>
                </div>
                `
    }


    //audio音源
    function myAudio() {
        //主要控制唱片圓圈大小
        audio.innerHTML = `  
                <div ="col-12"></div>
                <div class=" square col-12 col-sm-10 col-md-8">
                    <img id="rotate" class="rotate" src="${musicData[MusicIndex].MusicImage}" alt="" />
                </div>
                <div ="col"></div>

                <audio  id="myVideo" src="${musicData[MusicIndex].MusicMp3}"></audio>
                `;
    }

}




