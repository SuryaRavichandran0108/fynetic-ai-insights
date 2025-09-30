import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Research from "./pages/Research";
import PropBuilder from "./pages/PropBuilder";
import PropBuilderNew from "./pages/PropBuilderNew";
import AskFynetic from "./pages/AskFynetic";
import ExplorePlayers from "./pages/ExplorePlayers";
import BetTracker from "./pages/BetTracker";
import Activity from "./pages/Activity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/ask" replace />} />
          <Route path="/ask" element={<AskFynetic />} />
          <Route path="/players" element={<ExplorePlayers />} />
          <Route path="/props" element={<PropBuilderNew />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/research" element={<Research />} />
          <Route path="/prop-builder" element={<PropBuilder />} />
          <Route path="/ask-fynetic" element={<AskFynetic />} />
          <Route path="/bet-tracker" element={<BetTracker />} />
          <Route path="/activity" element={<Activity />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
