import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Dashboard from "./Dashboard";
import Research from "./Research";
import PropBuilder from "./PropBuilder";
import AskFynetic from "./AskFynetic";
import BetTracker from "./BetTracker";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "research":
        return <Research />;
      case "prop-builder":
        return <PropBuilder />;
      case "ask-fynetic":
        return <AskFynetic />;
      case "bet-tracker":
        return <BetTracker />;
      case "admin":
        return (
          <div className="container mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
            <p className="text-muted-foreground">Admin Features Coming Soon</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;
