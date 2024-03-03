const apiurl = "https://mp3quran.net/api/v3";
const endPoint = 'reciters';
const language = 'ar';


async function getReciters() {
    const chooseReciter = document.querySelector("#chooseReciter")
    const res = await fetch(`${apiurl}/reciters?language=${language}`)
    const data = await res.json()
    // console.log(data)
    chooseReciter.innerHTML = `<Option value = "">اختر القارئ</Option> `
    data.reciters.forEach(reciter => chooseReciter.innerHTML += `<Option value = "${reciter.id}">${reciter.name}</Option> `);
    chooseReciter.addEventListener('change', e => getMoshaf(e.target.value))
}
getReciters()

async function getMoshaf(reciter) {
    const chooseMoshaf = document.querySelector("#chooseMoshaf")
    const res = await fetch(`${apiurl}/reciters?language=${language}&reciter=${reciter}`)
    const data = await res.json()
    const moshaf = data.reciters[0].moshaf;
    chooseMoshaf.innerHTML = `<Option value = "">اخترالرواية </Option> `
    moshaf.forEach(moshaf => {
        chooseMoshaf.innerHTML += `<Option value = "${moshaf.id}" data-server = "${moshaf.server}" data-surahlist = "${moshaf.surah_list}" > ${moshaf.name} </Option> `
    });

    chooseMoshaf.addEventListener('change', e => {
        const selectedMoshaf = chooseMoshaf.options[chooseMoshaf.selectedIndex]
        const surahServer = selectedMoshaf.dataset.server;
        const surahList = selectedMoshaf.dataset.surahlist;
        getSurah(surahServer, surahList)
    })

}

async function getSurah(surahServer, surahList){
    const chooseSurah = document.querySelector("#chooseSurah");
    const res = await fetch(`https://mp3quran.net/api/v3/suwar`)
    const data = await res.json()
    const SurahName = data.suwar;
    surahList = surahList.split(',')
    chooseSurah.innerHTML = `<Option value = "">اخترالسورة </Option> `
    surahList.forEach(surah => {
        const padSurah = surah.padStart(3 , '0')
        SurahName.forEach(SurahName => {
            if(SurahName.id == surah){chooseSurah.innerHTML += `<Option value = "${surahServer}${padSurah}.mp3"> ${SurahName.name} </Option> `}
        })
    })

    chooseSurah.addEventListener('change', e => {
        const selectedSurah = chooseSurah.options[chooseSurah.selectedIndex]
        playSurah(selectedSurah.value)
    })
}

function playSurah(surahMp3) {
    const audioPlayer = document.querySelector("#audioPlayer");
    audioPlayer.src = surahMp3;
    audioPlayer.play();
    
}
function Playlive(channle){
    if(Hls.isSupported()) {
        var video = document.getElementById('LiveVideo');
        var hls = new Hls();
        hls.loadSource(`${channle}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
    }  
}
















