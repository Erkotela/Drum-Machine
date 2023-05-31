const audioClips = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [volume, setVolume] = React.useState(0.5);
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  return (
    <div className="bg-danger min-vh-100 text-white" id="drum-machine">
      <div className="text-center" id="display">
        <h2>Drum Machine</h2>
        <br />
        <h6>Volume</h6>
        <input
          className="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <div className="drum-pad">
          {audioClips.map((clip) => {
            return <Pad clip={clip} key={clip.id} volume={volume} />;
          })}
        </div>
      </div>
    </div>
  );
}
function Pad({ clip, volume }) {
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode == clip.keyCode) {
      playAudio();
    }
  };
  const playAudio = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    audioTag.currentTime = 0;
    audioTag.volume = volume;
    audioTag.play();
  };
  return (
    <div className="btn btn-warning p-4 m-3" key={clip.id} onClick={playAudio}>
      <audio className="clip" src={clip.url} id={clip.keyTrigger} />
      {clip.keyTrigger}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
