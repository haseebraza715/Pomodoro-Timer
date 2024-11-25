import React from "react";
import "./Analytics.css";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import {  Bar } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Analytics = ({ sessionHistory }) => {
  // Group session data
  const sessionData = sessionHistory.reduce(
    (acc, session) => {
      acc[session.sessionType] += 1;
      return acc;
    },
    { Work: 0, "Short Break": 0, "Long Break": 0 }
  );

  // Chart data
  const data = {
    labels: ["Work", "Short Break", "Long Break"],
    datasets: [
      {
        label: "Completed Sessions",
        data: [
          sessionData.Work,
          sessionData["Short Break"],
          sessionData["Long Break"],
        ],
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
        borderWidth: 1,
        borderColor: "#333333",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#444444",
        },
      },
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#444444",
        },
      },
    },
  };

  return (
    <div className="analytics-box">
      <h2 className="analytics-title">Pomodoro Analytics</h2>
      <div className="analytics-chart">
        <Bar data={data} options={options} />
      </div>
      <div className="analytics-content">
        {sessionHistory.length > 0 ? (
          <ul className="session-history">
            {sessionHistory.map((session, index) => (
              <li key={index} className="session-item">
                {session.sessionType} completed on {session.timestamp}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-sessions">No sessions completed yet.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
