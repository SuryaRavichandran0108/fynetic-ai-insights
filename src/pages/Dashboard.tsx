import { TodaysSlate } from "@/components/dashboard/TodaysSlate";
import { WelcomeHero } from "@/components/dashboard/WelcomeHero";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ConfidenceSnapshot } from "@/components/dashboard/ConfidenceSnapshot";
import { SimplifiedActivity } from "@/components/dashboard/SimplifiedActivity";
import { useAdvancedMode } from "@/hooks/useAdvancedMode";

export default function Dashboard() {
  const { isAdvanced } = useAdvancedMode();

  const handleViewSlate = () => {
    // Scroll to slate section
    const slateSection = document.getElementById('todays-slate');
    slateSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    // Navigate to Research
    console.log('Navigate to Research');
  };

  const handleBuildPropClick = () => {
    // Navigate to Prop Builder
    console.log('Navigate to Prop Builder');
  };

  const handleAskFyneticClick = () => {
    // Navigate to Ask FYNETIC
    console.log('Navigate to Ask FYNETIC');
  };

  const handleSeeWhy = () => {
    // Show insights explanation
    console.log('Show insights explanation');
  };

  const handleViewAllActivity = () => {
    // Navigate to Activity page
    console.log('Navigate to Activity');
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      {/* Welcome Hero */}
      <WelcomeHero 
        userName="Surya"
        gamesCount={3}
        onViewSlate={handleViewSlate}
      />

      {/* Quick Actions */}
      <QuickActions
        onExploreClick={handleExploreClick}
        onBuildPropClick={handleBuildPropClick}
        onAskFyneticClick={handleAskFyneticClick}
      />

      {/* Confidence Snapshot */}
      <ConfidenceSnapshot
        insights="2 games trend high-scoring, 1 defensive matchup"
        onSeeWhy={handleSeeWhy}
      />

      {/* Today's Slate */}
      <div id="todays-slate">
        <TodaysSlate games={[]} isAdvanced={isAdvanced} />
      </div>

      {/* Simplified Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Space for future dashboard content */}
        </div>
        <SimplifiedActivity onViewAll={handleViewAllActivity} />
      </div>
    </div>
  );
}