"use client";

import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { baseUrl } from "@/constants/baseUrl";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const API_BASE = `${baseUrl}/analytics`; // update in prod
const COLORS = [
  "#D32F2F", // Dark Red (Warm contrast)
  "#8E24AA", // Deep Purple
  "#BA68C8", // Light Purple
  "#AD1457", // Dark Pink
  "#CE93D8", // Orchid
  "#6A1B9A", // Royal Purple
  "#F06292", // Rose
  "#9C27B0", // Vivid Purple
  "#EC407A", // Pink Accent
  "#7B1FA2", // Grape
];

// ✅ Types
interface PageViewData {
  path: string;
  views: string;
}

interface EventData {
  event: string;
  count: string;
}

interface CountryUserData {
  country: string;
  users: string;
}

interface EstablishmentViewsChartProps {
  establishmentViews: { name: string; views: string }[];
}

export default function AdminAnalyticsDashboard() {
  const [pageViews, setPageViews] = useState<PageViewData[]>([]);
  const [topEvents, setTopEvents] = useState<EventData[]>([]);
  const [activeUsers, setActiveUsers] = useState("0");
  const [usersByCountry, setUsersByCountry] = useState<CountryUserData[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [pv, te, au, cu] = await Promise.all([
          fetch(`${API_BASE}/page-views`).then((res) => res.json()),
          fetch(`${API_BASE}/top-events`).then((res) => res.json()),
          fetch(`${API_BASE}/active-users`).then((res) => res.json()),
          fetch(`${API_BASE}/users-by-country`).then((res) => res.json()),
        ]);
        setPageViews(pv.data);
        setTopEvents(te.data);
        setActiveUsers(au.activeUsers);
        setUsersByCountry(cu.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  const topPageViews = [...pageViews]
    .sort((a, b) => Number(b.views) - Number(a.views))
    .slice(0, 10); // top 10 only

  const establishmentViews = pageViews
    .filter((d) => d.path.startsWith("/establishments/"))
    .map((d) => {
      const slug = d.path.split("/establishments/")[1];
      const name = slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return {
        name,
        views: d.views,
      };
    })
    .sort((a, b) => Number(b.views) - Number(a.views))
    .slice(0, 10); // top 10

  return (
    <div className=" grid grid-cols-12 gap-6">
      {/* 👤 Active Users */}
      <div className="bg-purple-950 p-4 rounded shadow w-full  col-span-12">
        <h2 className="text-lg font-semibold mb-2">Active Users Today</h2>
        <p className="text-4xl font-bold text-blue-600">{activeUsers}</p>
      </div>

      {establishmentViews?.length > 0 && (
        <EstablishmentViewsChart establishmentViews={establishmentViews} />
      )}
      {/* 📈 Page Views */}
      <div className="bg-purple-950 p-4 rounded shadow w-full  max-h-[350px] col-span-6">
        <h2 className="text-lg font-semibold mb-2">Top 10 Page Views</h2>
        <Bar
          data={{
            labels: topPageViews.map((d) =>
              d.path === "/"
                ? "Home"
                : d.path.length > 20
                ? d.path.slice(0, 20) + "..."
                : d.path
            ),
            datasets: [
              {
                label: "Views",
                data: topPageViews.map((d) => Number(d.views)),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
              },
            ],
          }}
          height={200}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                ticks: {
                  callback: function (value, index) {
                    const label = this.getLabelForValue(index);
                    return label.length > 15
                      ? label.slice(0, 15) + "..."
                      : label;
                  },
                  maxRotation: 30,
                  minRotation: 30,
                },
              },
            },
          }}
        />
      </div>

      {/* 🔥 Top Events */}
      <div className="bg-purple-950 p-4 rounded shadow w-full  max-h-[350px] col-span-6">
        <h2 className="text-lg font-semibold mb-2">Top Events</h2>
        <Line
          data={{
            labels: topEvents.map((d) => d.event),
            datasets: [
              {
                label: "Event Count",
                data: topEvents.map((d) => Number(d.count)),
                borderColor: "rgba(255,99,132,1)",
                backgroundColor: "rgba(255,99,132,0.2)",
                fill: true,
                tension: 0.3,
              },
            ],
          }}
          height={200}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>

      {/* 🌍 Country Users */}
      <div className="bg-purple-950 p-4 rounded shadow w-full  max-h-[350px] col-span-6">
        <h2 className="text-lg font-semibold mb-2">Users by Country</h2>
        <Doughnut
          data={{
            labels: usersByCountry.map((d) => d.country),
            datasets: [
              {
                label: "Users",
                data: usersByCountry.map((d) => Number(d.users)),
                backgroundColor: [
                  "#4dc9f6",
                  "#f67019",
                  "#f53794",
                  "#537bc4",
                  "#acc236",
                ],
              },
            ],
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
          height={200}
        />
      </div>
    </div>
  );
}

const EstablishmentViewsChart: React.FC<EstablishmentViewsChartProps> = ({
  establishmentViews,
}) => {
  const barColors = establishmentViews.map((_, i) => COLORS[i % COLORS.length]);

  return (
    <div className="bg-purple-950 p-4 rounded shadow w-full max-h-[600px] col-span-12 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Most Viewed Establishments
      </h2>

      {/* Custom Labels with Color Indicators */}
      <div className="flex flex-wrap mb-4 text-sm font-medium gap-2">
        {establishmentViews.map((d, i) => (
          <div
            key={d.name}
            className="text-center text-white px-3 py-1 rounded relative group"
            style={{
              backgroundColor: barColors[i],
              color: "#fff",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {d.name}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-gray-900 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
              {d.views} views
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <Bar
        data={{
          labels: establishmentViews.map((d) => d.name),
          datasets: [
            {
              label: "Views",
              data: establishmentViews.map((d) => Number(d.views)),
              backgroundColor: barColors,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.raw} views`,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                display: false,
              },
              grid: {
                // color: "rgba(255,255,255,0.2)",
                display: false,
              },
            },
            y: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "rgba(255,255,255,0.2)",
              },
            },
          },
        }}
      />
    </div>
  );
};
