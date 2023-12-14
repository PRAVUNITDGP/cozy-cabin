import { useRef } from "react";
import { useEffect } from "react";
export default function useOutsideClick(handler, listenCapturing = true) {

  const ref = useRef();
  useEffect(function() {
    function handleClick(e) {
      if(ref.current && !ref.current.contains(e.target)){
        console.log("Click Outside")
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    }

  }, [handler, listenCapturing]);
  return ref;
}