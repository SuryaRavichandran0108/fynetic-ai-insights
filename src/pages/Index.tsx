import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { GameTicker } from "@/components/ticker/GameTicker";
import AskFyneticMinimal from "./AskFyneticMinimal";
import ExplorePlayers from "./ExplorePlayers";
import PropBuilderNew from "./PropBuilderNew";

const Index = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("ask");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/ask") setCurrentPage("ask");
    else if (path === "/players") setCurrentPage("players");
    else if (path === "/props") setCurrentPage("props");
  }, [location.pathname]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    // Navigate using browser history
    if (page === "ask") window.history.pushState(null, "", "/ask");
    else if (page === "players") window.history.pushState(null, "", "/players");
    else if (page === "props") window.history.pushState(null, "", "/props");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "ask":
        return <AskFyneticMinimal />;
      case "players":
        return <ExplorePlayers />;
      case "props":
        return <PropBuilderNew />;
      default:
        return <AskFyneticMinimal />;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <MinimalHeader currentPage={currentPage} onPageChange={handlePageChange} />
      <GameTicker />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;
