type StatsProps = {
  wins: number | null;
  losses: number | null;
  draws: number | null;
  streak: number | null;
}

export function getStats(): StatsProps {
  const statsString = localStorage.getItem("stats")
  if (statsString) {
    const stats = JSON.parse(statsString)
    const wins = stats.wins;
    const losses = stats.losses;
    const draws = stats.draws;
    const streak = stats.streak;

    return {wins: wins, losses: losses, draws: draws, streak: streak}
  }

  return {wins: 0, losses: 0, draws: 0, streak: 0}  
}



export function setStats({wins, losses, draws, streak}: StatsProps) {
  // console.log("Set Stats: ", wins, losses, draws)
  const statsString = JSON.stringify({wins: wins, losses: losses, draws: draws, streak: streak});
  localStorage.setItem("stats", statsString);
}