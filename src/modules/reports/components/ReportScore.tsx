// components/GaugeChart.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { GaugeChart, GaugeSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GaugeChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;

interface GaugeChartProps {
  value: number; // Value between 0 and 100
  className?: string;
  height?: string;
  width?: string;
  showGradeInTitle?: boolean;
}

export const GaugeChartComponent: React.FC<GaugeChartProps> = ({
  value = 34,
  className = "",
  height = "200px",
  width = "100%",
  showGradeInTitle = true,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // Determine the grade based on the value
  const getGrade = (score: number): string => {
    if (score >= 75) return "A";
    if (score >= 50) return "B";
    if (score >= 25) return "C";
    return "D";
  };

  // Generate dynamic title with grade if requested
  const getDynamicTitle = (score: number): string => {
    if (showGradeInTitle) {
      const grade = getGrade(score);
      return `Grade ${grade}`;
    }
    return "Grade D";
  };

  useEffect(() => {
    // Initialize chart
    if (chartRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
      }

      const option: EChartsOption = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "75%"],
            radius: "90%",
            min: 0,
            max: 100,
            splitNumber: 4,
            axisLine: {
              lineStyle: {
                width: 8,
                color: [
                  [0.25, "#ef4444"], // red - Grade D
                  [0.5, "#f59e0b"], // yellow/orange - Grade C
                  [0.75, "#3b82f6"], // blue - Grade B
                  [1, "#10b981"], // green - Grade A
                ],
              },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "12%",
              width: 15,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "#555",
              },
            },
            axisTick: {
              length: 8,
              lineStyle: {
                color: "#555",
                width: 1,
              },
            },
            splitLine: {
              length: 15,
              lineStyle: {
                color: "#555",
                width: 2,
              },
            },
            axisLabel: {
              color: "#666",
              fontSize: 14,
              distance: -45,
              rotate: "tangential",
              formatter: function (value: number) {
                if (value === 87.5) {
                  return "Grade A";
                } else if (value === 62.5) {
                  return "Grade B";
                } else if (value === 37.5) {
                  return "Grade C";
                } else if (value === 12.5) {
                  return "Grade D";
                }
                return "";
              },
            },
            title: {
              offsetCenter: [0, "0%"],
              fontSize: 16,
              color: "#333",
            },
            detail: {
              fontSize: 28,
              offsetCenter: [0, "-35%"],
              valueAnimation: true,
              formatter: function (value: number) {
                return value.toFixed(0);
              },
              color: "#333",
            },
            data: [
              {
                value: value,
                name: getDynamicTitle(value),
              },
            ],
          },
        ],
      };

      chartInstance.current.setOption(option);
    }

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, showGradeInTitle]);

  return <div ref={chartRef} className={className} style={{ width, height }} />;
};
