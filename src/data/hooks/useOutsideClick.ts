import { useRef, useEffect } from "react";

const useOutsideClick = (callback: Function) => {
    const ref = useRef<any>();

    useEffect(() => {
        const handleClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [callback, ref]);

    return ref;
};

export default useOutsideClick;