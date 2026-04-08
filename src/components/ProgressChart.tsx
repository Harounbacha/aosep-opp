"use client";

import { useEffect, useRef } from "react";

interface ProgressChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  height?: number;
  showLabels?: boolean;
}

export default function ProgressChart({ data, height = 200, showLabels = true }: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = (rect.width / data.length) * 0.6;
    const barSpacing = (rect.width / data.length) * 0.4;
    const chartHeight = height - 40; // Leave space for labels

    // Draw bars
    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight;
      const x = index * (barWidth + barSpacing) + barSpacing / 2;
      const y = chartHeight - barHeight;

      // Draw bar with rounded top
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.moveTo(x, y + 8);
      ctx.quadraticCurveTo(x + 4, y, x + 8, y);
      ctx.lineTo(x + barWidth - 8, y);
      ctx.quadraticCurveTo(x + barWidth - 4, y, x + barWidth, y + 8);
      ctx.lineTo(x + barWidth, chartHeight);
      ctx.lineTo(x, chartHeight);
      ctx.closePath();
      ctx.fill();

      // Draw value on top of bar
      if (showLabels) {
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
      }

      // Draw label below bar
      if (showLabels) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'center';
        
        // Truncate long labels
        const maxWidth = barWidth;
        let label = item.label;
        if (ctx.measureText(label).width > maxWidth) {
          while (ctx.measureText(label + '...').width > maxWidth && label.length > 0) {
            label = label.slice(0, -1);
          }
          label += '...';
        }
        
        ctx.fillText(label, x + barWidth / 2, chartHeight + 20);
      }
    });

  }, [data, height, showLabels]);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}
