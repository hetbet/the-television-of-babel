/**
 * @type {HTMLVideoElement}
 */
const video = document.querySelector("#VideoSrc");

/**
 * @type {HTMLImageElement}
 */
const staticImage = document.querySelector("#ImageSrc");

/**
 * @type {HTMLAudioElement}
 */
const staticAudio = document.querySelector("#StaticFX");

/**
 * @type {HTMLAudioElement}
 */
const splashText = document.querySelector("#SplashText");
const splashTexts = [
    "The tiktok aggregate!",
    "4 > F12 > Developer console > :)",
    "SKIN! SKIN! SKIN!",
    "Poo + 2",
    "One of the websites of all time!",
    "100% stolen content",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "Are you manually dragging and dropping the changes?",
    "console.log('REMOVE SKIN');",
    "*may cause internal bleeding",
    "happy birthday ern",
    "where am i?",
    "i hope ye like leather"
];

let inStatic = false;

async function fetchVideo() {
    try {
        let videoUrl = await fetch("/getvideo", {
            "method": "GET"
        });

        return await videoUrl.text();
    } catch (err) {
        return null;
    }
}

async function toggleVideo() {
    let videoUrl = await fetchVideo();
    if (!videoUrl) return;

    inStatic = true;
    video.style.display = "none";
    video.src = ""
    staticImage.style.display = "block";
    staticAudio.play();

    setTimeout(() => {
        inStatic = false;
        video.style.display = "block";
        staticImage.style.display = "none";
        staticAudio.pause();
        staticAudio.currentTime = 0;
        video.src = videoUrl

        clearInterval(toggler);
    }, 2000);
}

function splashTextUpdater(){
    var randomSplash = Math.floor((Math.random() * splashTexts.length));
    splashText.textContent = splashTexts[randomSplash];
}

addEventListener("keypress", event => {
    console.log(event.key);
    if (event.key == "4") {
        console.log("         .-\"\"\"\"\"\"-.\n" +
        "       .'          '.\n" +
        "      /   O      O   \\\n" +
        "     :                :\n" +
        "     |                |\n" +
        "     : ',          ,' :\n" +
        "      \\  '-......-'  /\n" +
        "       '.          .'\n" +
        "         '-......-'\n");
    } else if (event.key == " " && !inStatic) {
        toggleVideo();
    }
});

let toggler = setInterval(() => {
    staticAudio.play().then(() => {
        clearInterval(toggler);
    });
}, 100);


staticAudio.volume = 0.1;
video.volume = 0.1;
splashTextUpdater();
toggleVideo();

let splashTick = 0;
setInterval(() => {
    let splashSize = 0 + (Math.sin(splashTick) * 0.25);
    splashTick += 0.05;
    splashText.style.transform = `rotate(${splashSize}deg)`;
}, 10);