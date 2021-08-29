import { useRef, useEffect, useState } from "react";
import range from "lodash/range";
import random from "lodash/random";
import toString from "lodash/toString";

export default function Home() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [playing, setPlaying] = useState(false);
  const [temporaryResult, setTemporaryResult] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const mainAudio = useRef();
  const loadingRef = useRef();
  const showResult = useRef();

  const handleReset = () => {
    setLoading(false);
    setResult();
    setCurrentList(range(Number(min), Number(max) + 1));
    setTemporaryResult([]);
  };

  useEffect(() => {
    mainAudio.current = new Audio("/nhacchiecnonkydieu.mp3");
  }, []);

  useEffect(() => {
    if (min < 0) setMin(0);
    if (max < min) setMax(min + 1);
    setCurrentList(range(Number(min), Number(max) + 1));
  }, [min, max]);

  function handleStop() {
    setPlaying(false);
    clearInterval(loadingRef.current);
    mainAudio.current.pause();
  }

  const handleStart = () => {
    if (currentList.length === 1) {
      setResult(currentList[0]);
    } else {
      setLoading(true);
      mainAudio.current.currentTime = 0;
      mainAudio.current.play();
      setPlaying(true);
      loadingRef.current = setInterval(() => {
        const index = random(0, currentList.length - 1);
        setResult(currentList[index]);
      }, 50);
      setTimeout(handleStop, 4000);
    }
  };

  useEffect(() => {
    clearTimeout(showResult.current);
    if (result !== undefined && !playing) {
      showResult.current = setTimeout(() => {
        setTemporaryResult([...temporaryResult, result]);
        const newList = currentList.filter((it) => it !== result);
        setCurrentList(newList);
      }, 300);
    }
  }, [result, playing]);

  return (
    <div className="main">
      <div className="container">
        <img alt="" className="logo" id="logo1" src="/logo.png" />
        <img alt="" className="logo" id="logo2" src="/logo.png" />
        <h1 className="title" style={{ color: "yellow" }}>
          QUAY SỐ TRÚNG THƯỞNG
        </h1>
        <p className="desc">Dành cho khách mời may mắn</p>
        <div className="result">{toString(result) || "--"}</div>
        <div className="form">
          <div className="inputs">
            <label>
              <span>Min:</span>
              <input
                disabled={loading}
                value={min}
                onChange={(e) => setMin(e.target.value)}
                min="0"
                id="min"
                name="min"
                type="number"
              />
            </label>
            <label>
              <span>Max:</span>
              <input
                disabled={loading}
                value={max}
                onChange={(e) => setMax(e.target.value)}
                id="max"
                name="max"
                type="number"
              />
            </label>
          </div>
          <div className="btns">
            <button
              disabled={!currentList.length || playing}
              onClick={handleStart}
              id="start"
            >
              Start
            </button>
            <button disabled={playing} onClick={handleReset} id="start">
              Reset
            </button>
          </div>
        </div>
        {!!temporaryResult.length && (
          <div className="results">
            {`Kết quả: ${temporaryResult.join(", ")}`}
          </div>
        )}
      </div>
    </div>
  );
}
