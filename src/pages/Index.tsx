import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Dashboard from "./Dashboard";
import Research from "./Research";
import PropBuilder from "./PropBuilder";

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
        return (
          <div className="container mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Ask FYNETIC</h1>
            <p className="text-muted-foreground">AI Chat Assistant Coming Soon</p>
          </div>
        );
      case "bet-tracker":
        return (
          <div className="container mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Bet Tracker</h1>
            <p className="text-muted-foreground">Track Your Bets Coming Soon</p>
          </div>
        );
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
