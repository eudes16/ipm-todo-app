import { useLayoutEffect, useState } from "react";
interface IWindowMetrics {
    width: number;
    height: number;
    offset: number;
}

export default function useWindowSize() {
    const [size, setSize] = useState<IWindowMetrics>({
        width: 0,
        height: 0,
        offset: 0,
    });
    useLayoutEffect(() => {
        function updateSize() {
            setSize((prev: IWindowMetrics) => {
                return {
                    ...prev,
                    with: window.innerWidth,
                    height: window.innerHeight,
                }
            });
        }

        function updateScroll() {
            setSize((prev: IWindowMetrics) => {
                return {
                    ...prev,
                    x: window.scrollY,
                }
            });
        }

        window.addEventListener('resize', updateSize);
        window.addEventListener('scroll', updateScroll);
        updateSize();
        updateScroll();
        return () => {
            window.removeEventListener('resize', updateSize);
            window.removeEventListener('scroll', updateScroll);
        }
    }, []);
    return size;
}

