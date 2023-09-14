let currentNote = 0;
let currentVolume = 0;

const start = () => {
  var voice = new Wad({source : 'mic' }); // At this point, your browser will ask for permission to access your microphone.
  var tuner = new Wad.Poly({
    audioMeter: {
      clipLevel: .98, // the level (0 to 1) that you would consider "clipping".
      averaging: .95, // how "smoothed" you would like the meter to be over time. Should be between 0 and less than 1.
      clipLag: 750, // how long you would like the "clipping" indicator to show after clipping has occured, in milliseconds.
    },
  });
  // tuner.setVolume(0); // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
  tuner.add(voice);

  voice.play(); // You must give your browser permission to access your microphone before calling play().

  tuner.updatePitch() // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.

  var logPitch = function(){
      console.log(tuner.noteName)
      currentNote = noteToIndex(tuner.noteName);
      currentVolume = tuner.audioMeter.volume;
      requestAnimationFrame(logPitch)
  };
  logPitch();
}

function convert(note) {
  if (!note) return;
  const letter = note.substr(0, 1);
  const notes = {
    A: 'Lá',
    B: 'Si',
    C: 'Dó',
    D: 'Ré',
    E: 'Mi',
    F: 'Fá',
    G: 'Sol',
  };
  return notes[letter];
}

function noteToIndex(note) {
  const notes = {
    C5: 0,
    D5: 1,
    E5: 2,
    F5: 3,
    G5: 4,
    A5: 5,
    B5: 6,
    C6: 7,
    D6: 8,
  };
  return notes[note];
}
