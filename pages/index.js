import toString from "lodash/toString";
import { Description, Title } from "../components/title";
import { useAppState } from "../components/reducer";

export default function Home() {
  const {
    state: { min, max, playing, temporaryResult, currentList, loading, result },
    onUpdate,
    onReset,
    handleStart,
  } = useAppState();

  return (
    <div className="main">
      <div className="container">
        <img alt="" className="logo" id="logo1" src="/logo.png" />
        <img alt="" className="logo" id="logo2" src="/logo.png" />
        <Title />
        <Description />
        <div className="result">{toString(result) || "--"}</div>
        <div className="form">
          <div className="inputs">
            <label>
              <span>Min:</span>
              <input
                disabled={loading}
                value={min}
                onChange={(e) => onUpdate("min", e.target.value)}
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
                onChange={(e) => onUpdate("max", e.target.value)}
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
            <button disabled={playing} onClick={onReset} id="start">
              Reset
            </button>
          </div>
        </div>
        {!!temporaryResult.length && (
          <div className="results">
            {`Kết quả: ${temporaryResult.join(", ")}`}
          </div>
        )}
        <p className={'author'}>Tác giả: Nguyễn Huy Cường</p>
      </div>
    </div>
  );
}
