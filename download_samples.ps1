$outDir = "g:\Creados\Drumbox\www\assets\sounds"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir }

$files = @(
    @{ url = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/kick.wav"; name = "heavy_kick.wav" },
    @{ url = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/snare.wav"; name = "heavy_snare.wav" },
    @{ url = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/hihat.wav"; name = "heavy_hihat.wav" },
    @{ url = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/openhat.wav"; name = "heavy_crash.wav" },
    @{ url = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/boom.wav"; name = "bass_e.wav" },
    @{ url = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tom.wav"; name = "bass_a.wav" },
    @{ url = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tink.wav"; name = "bass_d.wav" },
    @{ url = "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/ride.wav"; name = "bass_g.wav" },
    @{ url = "https://tonejs.github.io/audio/casio/A1.mp3"; name = "guitar_power.wav" },
    @{ url = "https://tonejs.github.io/audio/casio/C2.mp3"; name = "guitar_mute.wav" },
    @{ url = "https://tonejs.github.io/audio/casio/E2.mp3"; name = "guitar_lead.wav" },
    @{ url = "https://tonejs.github.io/audio/casio/G2.mp3"; name = "guitar_slide.wav" },
    @{ url = "https://tonejs.github.io/audio/casio/A2.mp3"; name = "voice_scream.wav" },
    @{ url = "https://tonejs.github.io/audio/casio/C3.mp3"; name = "voice_growl.wav" },
    @{ url = "https://tonejs.github.io/audio/casio/E3.mp3"; name = "voice_yeah.wav" },
    @{ url = "https://tonejs.github.io/audio/casio/G3.mp3"; name = "voice_grunt.wav" }
)

foreach ($file in $files) {
    $outPath = Join-Path $outDir $file.name
    Write-Host "Downloading $($file.url) to $outPath"
    try {
        Invoke-WebRequest -Uri $file.url -OutFile $outPath -UseBasicParsing
    } catch {
        Write-Host "Failed to download $($file.url)"
    }
}
Write-Host "Done downloading samples."
