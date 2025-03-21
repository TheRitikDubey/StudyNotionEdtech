import { useEffect } from "react";

export default function useOnClickOutside(ref,handler){
    useEffect(() =>{
        const listener = (event) =>{
            if(!ref || ref.current.contains(event)){
                return;
            }
            handler(event)
        }

        document.addEventListener("mousedown",listener);

        document.addEventListener("touchstart",listener);
        return ()=>{
            document.removeEventListener("mousedown",listener);

            document.removeEventListener("touchstart",listener);
        }
    },[ref,handler])
}
