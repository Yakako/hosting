import React, { useMemo } from 'react';
import { Lock } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Prediction } from '../types';

interface AnalyticsPageProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  predictions: Prediction[];
  onAdminLogin: () => void;
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  isAdmin,
  setIsAdmin,
  adminPassword,
  setAdminPassword,
  predictions,
  onAdminLogin,
}) => {

  /* ------------------- Trend Aggregation ------------------- */
  const trendData = useMemo(() => {
    const map: Record<string, number> = {};

    predictions.forEach((p) => {
      const date = p.timestamp.split(' ')[0]; // YYYY-MM-DD
      map[date] = (map[date] || 0) + 1;
    });

    return Object.entries(map)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [predictions]);

  /* ------------------- Admin Login UI ------------------- */
  if (!isAdmin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Admin Access Required
            </h2>
            <p className="text-gray-600">
              Please enter the admin password
            </p>
          </div>

          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onAdminLogin()}
            placeholder="Enter password"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 text-black"
          />

          <button
            onClick={onAdminLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            Login
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Demo password: <b>admin123</b>
          </p>
        </div>
      </div>
    );
  }

  /* ------------------- Admin Dashboard ------------------- */
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-blue-200">
            Prediction usage & detection history
          </p>
        </div>
        <button
          onClick={() => setIsAdmin(false)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Predictions" value={predictions.length} color="blue" />
        <StatCard
          title="Avg Confidence"
          value={
            predictions.length
              ? `${(
                  (predictions.reduce((a, p) => a + p.confidence, 0) /
                    predictions.length) *
                  100
                ).toFixed(1)}%`
              : '0%'
          }
          color="green"
        />
        <StatCard
          title="Unique Brands"
          value={new Set(predictions.map((p) => p.brand)).size}
          color="purple"
        />
        <StatCard
          title="High Confidence"
          value={predictions.filter((p) => p.confidence > 0.9).length}
          color="indigo"
        />
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Prediction Volume Trend
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#trendGradient)"
                name="Predictions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Prediction Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gray-50 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Prediction History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-100">
              <tr>
                {['ID', 'Timestamp', 'Brand', 'Model', 'Confidence'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {predictions.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">#{p.id}</td>
                  <td className="px-6 py-4 text-gray-600">{p.timestamp}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                      {p.brand}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{p.model}</td>
                  <td className="px-6 py-4">
                    {(p.confidence * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ------------------- Reusable Stat Card ------------------- */
const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) => (
  <div className={`bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl p-6 text-white shadow-lg`}>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-sm opacity-90">{title}</div>
  </div>
);

export default AnalyticsPage;
