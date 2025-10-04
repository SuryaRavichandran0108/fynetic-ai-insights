import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AskFyneticMinimal from "./pages/AskFyneticMinimal";
import ExplorePlayers from "./pages/ExplorePlayers";
import PropBuilderNew from "./pages/PropBuilderNew";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { GameTicker } from "@/components/ticker/GameTicker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-bg">
          <MinimalHeader />
          <GameTicker />
          <main>
            <Routes>
              {/* Core routes */}
              <Route path="/" element={<Navigate to="/ask" replace />} />
              <Route path="/ask" element={<AskFyneticMinimal />} />
              <Route path="/players" element={<ExplorePlayers />} />
              <Route path="/props" element={<PropBuilderNew />} />
              
              {/* Legacy redirects */}
              <Route path="/dashboard" element={<Navigate to="/ask" replace />} />
              <Route path="/research" element={<Navigate to="/ask" replace />} />
              <Route path="/prop-builder" element={<Navigate to="/props" replace />} />
              
              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/ask" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
