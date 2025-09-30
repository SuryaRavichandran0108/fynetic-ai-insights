import { useState } from "react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import AskFyneticMinimal from "./AskFyneticMinimal";
import ExplorePlayers from "./ExplorePlayers";
import PropBuilderNew from "./PropBuilderNew";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("ask");

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
      <MinimalHeader currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;
