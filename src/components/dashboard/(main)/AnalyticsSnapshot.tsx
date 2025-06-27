"use client";

import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { baseUrl } from "@/constants/baseUrl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const API_BASE = `${baseUrl}/analytics`; // Replace with your backend base URL

export default function AnalyticsSnapshot() {
  const [kpis, setKpis] = useState<any>({});
  const [topPages, setTopPages] = useState<any[]>([]);
  const [trafficSources, setTrafficSources] = useState<any[]>([]);
  const [usersByCity, setUsersByCity] = useState<any[]>([]);
  const [userTypes, setUserTypes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [kpiRes, pageRes, sourceRes, cityRes, typeRes] = await Promise.all([
        fetch(`${API_BASE}/kpis`).then((r) => r.json()),
        fetch(`${API_BASE}/top-pages`).then((r) => r.json()),
        fetch(`${API_BASE}/traffic-sources`).then((r) => r.json()),
        fetch(`${API_BASE}/users-by-city`).then((r) => r.json()),
        fetch(`${API_BASE}/new-vs-returning`).then((r) => r.json()),
      ]);
      setKpis(kpiRes);
      setTopPages(pageRes.data);
      setTrafficSources(sourceRes.data);
      setUsersByCity(cityRes.data);
      setUserTypes(typeRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-4 text-white min-h-screen analytics-snapshot">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Active Users" value={kpis.activeUsers} />
        <KpiCard title="New Users" value={kpis.newUsers} />
        <KpiCard title="Event Count" value={kpis.eventCount} />
        <KpiCard
          title="Avg. Session Duration"
          value={`${Math.floor(
            Number(kpis.avgSessionDuration) / 60
          )}m ${Math.floor(Number(kpis.avgSessionDuration) % 60)}s`}
        />
      </div>

      {/* Top Pages */}
      <div className="bg-white text-black rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Top Pages</h2>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Title</th>
              <th>Views</th>
              <th>Users</th>
              <th>Events</th>
              <th>Bounce</th>
            </tr>
          </thead>
          <tbody>
            {topPages.map((p) => (
              <tr key={p.title} className="border-t">
                <td>{p.title}</td>
                <td className="text-center">{p.views}</td>
                <td className="text-center">{p.activeUsers}</td>
                <td className="text-center">{p.eventCount}</td>
                <td className="text-center">
                  {(p.bounceRate * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Traffic Sources">
          <Doughnut
            data={{
              labels: trafficSources.map((d) => d.source),
              datasets: [
                {
                  label: "Users",
                  data: trafficSources.map((d) => Number(d.users)),
                  backgroundColor: [
                    "#8e44ad",
                    "#c0392b",
                    "#9b59b6",
                    "#f39c12",
                    "#3498db",
                  ],
                },
              ],
            }}
            width={"100%"}
            options={{
              responsive: true,
              plugins: { legend: { display: true } },
            }}
          />
        </ChartCard>

        <ChartCard title="Users by City">
          <Bar
            data={{
              labels: usersByCity.map((d) => d.city),
              datasets: [
                {
                  label: "Users",
                  data: usersByCity.map((d) => Number(d.users)),
                  backgroundColor: "#9b59b6",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: { ticks: { color: "white" } },
                x: { ticks: { color: "white" } },
              },
            }}
          />
        </ChartCard>

        <ChartCard title="New vs Returning">
          <Doughnut
            data={{
              labels: userTypes.map((d) => d.type),
              datasets: [
                {
                  label: "Users",
                  data: userTypes.map((d) => Number(d.users)),
                  backgroundColor: ["#e91e63", "#9c27b0", "#f39c12"],
                },
              ],
            }}
          />
        </ChartCard>
      </div>
    </div>
  );
}

function KpiCard({ title, value }: Readonly<{ title: string; value: any }>) {
  return (
    <div className="bg-white text-purple-900 rounded p-4 shadow text-center">
      <h3 className="text-md font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value ?? "--"}</p>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white text-purple-900 rounded p-4 shadow">
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <div className="h-[300px] w-full">{children}</div>
    </div>
  );
}
