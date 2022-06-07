import { useReducer, useRef, useEffect } from "react";
import range from "lodash/range";
import { random } from "lodash";

const initialState = {
  min: 0,
  max: 10,
  playing: false,
  temporaryResult: [],
  currentList: [],
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    case "reset":
      return {
        ...state,
        loading: false,
        result: null,
        currentList: range(Number(state.min), Number(state.max) + 1),
        temporaryResult: [],
      };
    default:
      return state;
  }
}

export const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const mainAudio = useRef();
  const loadingRef = useRef();
  const showResult = useRef();

	const { min, max, playing, temporaryResult, currentList, loading, result } = state

  function onUpdate(key, value) {
    dispatch({ type: "update", payload: { [key]: value } });
  }

  function onReset() {
    dispatch({ type: "reset" });
  }

  useEffect(() => {
    mainAudio.current = new Audio("/nhacchiecnonkydieu.mp3");
  }, []);

  useEffect(() => {
    if (min < 0) onUpdate("min", 0);
    // if (max < min) onUpdate("max", Number(min) + 1);
    onUpdate("currentList", range(Number(min), Number(max) + 1));
  }, [min, max]);

  function handleStop() {
    onUpdate("playing", false);
    clearInterval(loadingRef.current);
    mainAudio.current.pause();
  }

  const handleStart = () => {
		if (Number(min) >= Number(max)) {
			alert('max phải lớn hơn min')
		}
    if (currentList.length === 1) {
      onUpdate("result", currentList[0]);
    } else {
      onUpdate("loading", true);
      mainAudio.current.currentTime = 0;
      mainAudio.current.play();
      onUpdate("playing", true);

      loadingRef.current = setInterval(() => {
        const index = random(0, currentList.length - 1);
        onUpdate("result", currentList[index]);
      }, 50);
      setTimeout(handleStop, 4000);
    }
  };

  useEffect(() => {
    clearTimeout(showResult.current);
    if ((result || result === 0) && !playing) {
      showResult.current = setTimeout(() => {
        onUpdate("temporaryResult", [...temporaryResult, result]);
        const newList = currentList.filter((it) => it !== result);
        onUpdate("currentList", newList);
      }, 300);
    }
  }, [result, playing]);

  return {
    state,
    onUpdate,
    onReset,
    handleStart,
    handleStop,
    mainAudio,
    loadingRef,
    showResult,
  };
};
