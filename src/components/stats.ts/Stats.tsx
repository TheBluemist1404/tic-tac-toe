import { useEffect, useMemo, useState } from "react";
import "./Stats.css";
import type { CellType } from "../../types/cell";
import { getStats, setStats } from "../../utils/stats";
import Streak from "./Streak";

export default function Stats({ winner }: { winner: CellType | "N/A" }) {
  const {
    wins: winsStat,
    losses: lossesStat,
    draws: drawsStat,
    streak: streakStat,
  } = useMemo(() => getStats(), []);

  const [wins, setWins] = useState<number>(winsStat || 0);
  const [losses, setLosses] = useState<number>(lossesStat || 0);
  const [draws, setDraws] = useState<number>(drawsStat || 0);
  const [streak, setStreak] = useState<number>(streakStat || 0);

  useEffect(() => {
    if (winner) {
      switch (winner) {
        case "X": {
          setWins((prev) => prev + 1);
          setStreak((prev) => prev + 1);
          setStats({ wins: wins + 1, losses, draws, streak: streak + 1 });
          break;
        }
        case "O": {
          setLosses((prev) => prev + 1);
          setStreak((_) => 0);
          setStats({ wins, losses: losses + 1, draws, streak });
          break;
        }
        case "N/A": {
          setDraws((prev) => prev + 1);
          setStreak((_) => 0);
          setStats({ wins, losses, draws: draws + 1, streak });
          break;
        }
        default:
          break;
      }
    }
  }, [winner]);

  useEffect(() => {
    console.log(winner, wins, losses, draws);
  }, [wins, losses, draws]);

  return (
    <div className="stats-container">
      <h2>Stats for player X</h2>
      <div style={{display: "flex", flexDirection: "row", gap: "30px", alignItems: "center"}}>
        <div style={{width: "max-content"}}>
          {/* This avoid the Streak-bar push back */}
          <div className="streak">Streak: {streak}</div>
        </div>
        <Streak streak={streak} />
      </div>
      <div>Wins: {wins}</div>
      <div>Losses: {losses}</div>
      <div>Draws: {draws}</div>
    </div>
  );
}
