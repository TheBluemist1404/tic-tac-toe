import { useMemo } from "react";
import "./Streak.css";
import flameGif from "/flame.gif";

const MAX_STREAK: number = 5;

export default function Streak({ streak }: { streak: number }) {
  const streakDisplay: number = useMemo(() => {
    return streak <= MAX_STREAK ? streak : 5;
  }, [streak]);
  return (
    <div style={{width: "100%", display: "flex", flexDirection:"row", gap: "10px", alignItems: "center"}}>
      <div className="streak-bar">
        <div
          className="streak-progress"
          style={{ width: `${(100 * streakDisplay) / 5}%` }}
        ></div>
      </div>
      <img style={{opacity: streak >= 5 ? "1": "0"}} className="flame" src={flameGif} alt="max streak"/>
    </div>
  );
}
