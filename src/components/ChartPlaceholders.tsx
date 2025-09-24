interface TrendlineChartProps {
  data?: number[];
  className?: string;
}

interface BarChartProps {
  data?: Array<{ value: number; type: 'win' | 'loss' }>;
  className?: string;
}

interface DonutChartProps {
  data?: Array<{ label: string; value: number; color: string }>;
  className?: string;
}

export function TrendlineChart({ data = [12, 8, 15, 22, 18, 25, 31], className = "" }: TrendlineChartProps) {
  const maxValue = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 280;
    const y = 80 - (value / maxValue) * 60;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`w-full h-20 ${className}`}>
      <svg width="100%" height="80" viewBox="0 0 280 80" className="overflow-visible">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="hsl(217 19% 23%)" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="280" height="80" fill="url(#grid)" />
        
        {/* Trend line */}
        <polyline
          fill="none"
          stroke="hsl(174 96% 39%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        
        {/* Data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 280;
          const y = 80 - (value / maxValue) * 60;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="hsl(174 96% 39%)"
              className="drop-shadow-sm"
            />
          );
        })}
      </svg>
    </div>
  );
}

export function BarChart({ data = [
  { value: 4, type: 'win' }, { value: 2, type: 'loss' }, { value: 6, type: 'win' }, 
  { value: 3, type: 'loss' }, { value: 5, type: 'win' }, { value: 1, type: 'loss' }, 
  { value: 7, type: 'win' }
], className = "" }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={`w-full h-20 ${className}`}>
      <svg width="100%" height="80" viewBox="0 0 280 80">
        {data.map((bar, index) => {
          const barWidth = 32;
          const x = index * 40 + 4;
          const height = (bar.value / maxValue) * 60;
          const y = 80 - height;
          const color = bar.type === 'win' ? 'hsl(142 71% 45%)' : 'hsl(0 84% 60%)';
          
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={height}
              fill={color}
              rx="2"
              className="drop-shadow-sm"
            />
          );
        })}
      </svg>
    </div>
  );
}

export function DonutChart({ data = [
  { label: 'Passing', value: 45, color: 'hsl(174 96% 39%)' },
  { label: 'Rushing', value: 25, color: 'hsl(217 91% 60%)' },
  { label: 'Receiving', value: 20, color: 'hsl(142 71% 45%)' },
  { label: 'Points', value: 10, color: 'hsl(43 96% 56%)' }
], className = "" }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const arcs = data.map((item) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    currentAngle += angle;
    
    const x1 = 40 + 30 * Math.cos((startAngle - 90) * Math.PI / 180);
    const y1 = 40 + 30 * Math.sin((startAngle - 90) * Math.PI / 180);
    const x2 = 40 + 30 * Math.cos((endAngle - 90) * Math.PI / 180);
    const y2 = 40 + 30 * Math.sin((endAngle - 90) * Math.PI / 180);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return {
      ...item,
      path: `M 40 40 L ${x1} ${y1} A 30 30 0 ${largeArc} 1 ${x2} ${y2} Z`
    };
  });
  
  return (
    <div className={`w-full h-20 flex items-center gap-3 ${className}`}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        {arcs.map((arc, index) => (
          <path
            key={index}
            d={arc.path}
            fill={arc.color}
            className="drop-shadow-sm"
          />
        ))}
        <circle cx="40" cy="40" r="15" fill="hsl(222 42% 8%)" />
      </svg>
      <div className="flex-1 space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.label} {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}