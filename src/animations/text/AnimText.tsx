import { useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";
import RedoAnimText from "./RedoAnimEffect";
import CursorBlinker from "./CursorBlinker";

export interface IAnimTextProps {
  readonly delay: number;
}

export default function AnimText({ delay }: IAnimTextProps) {
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, 60, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeInOut",
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="">
      <RedoAnimText delay={delay + 1} />
      <CursorBlinker />
    </span>
  );
}
