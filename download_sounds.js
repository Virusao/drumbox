const fs = require('fs');
const https = require('https');
const path = require('path');

const sounds = [
    { name: 'kick.wav', url: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/kick.wav' },
    { name: 'snare.wav', url: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/snare.wav' },
    { name: 'hihat.wav', url: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/hihat.wav' },
    { name: 'tom.wav', url: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tom.wav' },
    { name: 'boom.wav', url: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/boom.wav' },
    { name: 'clap.wav', url: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/clap.wav' },
    { name: 'openhat.wav', url: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/openhat.wav' },
    { name: 'ride.wav', url: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/ride.wav' },
    { name: 'tink.wav', url: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tink.wav' }
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

async function downloadAll() {
    console.log("Downloading sounds...");
    for (let i = 0; i < sounds.length; i++) {
        const dest = path.join(__dirname, 'assets', 'sounds', sounds[i].name);
        try {
            await download(sounds[i].url, dest);
            console.log(`Downloaded ${sounds[i].name}`);
        } catch (e) {
            console.error(`Failed to download ${sounds[i].name}`, e);
        }
    }
    
    // Create duplicates to fill 16 pads
    const extraPads = ['kick2.wav', 'snare2.wav', 'hihat2.wav', 'tom2.wav', 'clap2.wav', 'ride2.wav', 'openhat2.wav'];
    for(let i = 0; i < extraPads.length; i++) {
        fs.copyFileSync(
            path.join(__dirname, 'assets', 'sounds', sounds[i % sounds.length].name),
            path.join(__dirname, 'assets', 'sounds', extraPads[i])
        );
    }
    console.log("All done.");
}

downloadAll();
