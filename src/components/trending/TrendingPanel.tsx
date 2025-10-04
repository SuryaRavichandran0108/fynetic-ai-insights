import { motion } from "framer-motion";
import { TrendingCard } from "./TrendingCard";

const trendingData = [
  {
    id: 1,
    question: "How has Luka Dončić performed in his last 5 games?",
    playerName: "Luka Dončić",
    propLine: "3P over 2.5",
    team: "DAL",
    avatarSrc: "/avatars/luka-doncic.png",
  },
  {
    id: 2,
    question: "Is Tatum over 6.5 rebounds a good value?",
    playerName: "Jayson Tatum",
    propLine: "REB o/u 6.5",
    team: "BOS",
    avatarSrc: "/avatars/jayson-tatum.png",
  },
  {
    id: 3,
    question: "Compare Jokić vs Embiid over last 10 games.",
    playerName: "Nikola Jokić",
    propLine: "PTS+REB+AST o/u 44.5",
    team: "DEN",
    avatarSrc: "/avatars/nikola-jokic.png",
  },
  {
    id: 4,
    question: "How do injuries & pace affect tonight's total?",
    playerName: "Joel Embiid",
    propLine: "Total o/u 235.5",
    team: "PHI",
    avatarSrc: "/avatars/joel-embiid.png",
  },
];

interface TrendingPanelProps {
  onSelect: (question: string) => void;
}

export function TrendingPanel({ onSelect }: TrendingPanelProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.2 }}
      className="hidden md:block sticky top-[calc(58px+40px+16px)] max-h-[calc(100vh-58px-40px-24px)] overflow-y-auto pr-1"
    >
      <h3 className="text-xs uppercase tracking-[0.12em] text-white/50 mb-3">Trending today</h3>
      <div className="space-y-3">
        {trendingData.map((item) => (
          <TrendingCard
            key={item.id}
            question={item.question}
            playerName={item.playerName}
            propLine={item.propLine}
            team={item.team}
            avatarSrc={item.avatarSrc}
            onClick={() => onSelect(item.question)}
          />
        ))}
      </div>
    </motion.aside>
  );
}
