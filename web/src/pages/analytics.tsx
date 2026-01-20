import React, { useMemo, useState, useEffect } from 'react';
import { Lock, AlertCircle, TrendingUp, BarChart3, X } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

interface StatsResponse {
  total_predictions: number;
  average_confidence: number;
  most_common_class: string;
  predictions_today: number;
  class_distribution: Record<string, number>;
}

// Mocking the Prediction type from your existing setup
interface Prediction {
  id: number;
  timestamp: string;
  brand: string;
  model: string;
  confidence: number;
}

interface AnalyticsPageProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  predictions: Prediction[]; // Still used for the history table
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
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* ------------------- Data Fetching ------------------- */
  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/stats');
      if (!response.ok) throw new Error('Failed to fetch analytics data');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Connection error');
      // Auto-hide snackbar after 5 seconds
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------- Chart Data Preparation ------------------- */
  const barData = useMemo(() => {
    if (!stats) return [];
    return Object.entries(stats.class_distribution).map(([name, value]) => ({
      name,
      value,
    })).sort((a, b) => b.value - a.value);
  }, [stats]);

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];

  /* ------------------- Admin Login UI ------------------- */
  if (!isAdmin) {
    return (
        // ... (Keep your existing Login UI code here)
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Admin Access</h2>
                    <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg mb-4 text-black"
                        placeholder="Password"
                    />
                    <button onClick={onAdminLogin} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Login</button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl relative">
      
      {/* SNACKBAR / ERROR MESSAGE */}
      {errorMessage && (
        <div className="fixed bottom-5 right-5 bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 z-50 animate-bounce">
          <AlertCircle className="w-6 h-6" />
          <span className="font-semibold">{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">System Analytics</h1>
        <button onClick={() => setIsAdmin(false)} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-md">Logout</button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Predictions" value={stats?.total_predictions || 0} color="blue" icon={<TrendingUp />} />
        <StatCard title="Avg Confidence" value={`${((stats?.average_confidence || 0) * 100).toFixed(1)}%`} color="emerald" icon={<TrendingUp />} />
        <StatCard title="Most Common" value={stats?.most_common_class || 'N/A'} color="purple" icon={<BarChart3 />} />
        <StatCard title="Activity Today" value={stats?.predictions_today || 0} color="orange" icon={<BarChart3 />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Class Distribution Bar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 className="text-blue-600" /> Brand Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fill: '#4b5563', fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Area Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-600" /> Confidence Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictions.slice(-10)}>
                <defs>
                  <linearGradient id="confGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="id" tick={false} />
                <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v*100).toFixed(0)}%`} />
                <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} labelStyle={{display:'none'}} />
                <Area type="monotone" dataKey="confidence" stroke="#10b981" fillOpacity={1} fill="url(#confGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* ... Keep the Prediction Table from original code ... */}
    </div>
  );
};

const StatCard = ({ title, value, color, icon }: { title: string; value: string | number; color: string; icon: React.ReactNode }) => (
  <div className={`bg-white rounded-2xl p-6 shadow-xl border-b-4 border-${color}-500`}>
    <div className={`text-${color}-500 mb-2`}>{icon}</div>
    <div className="text-2xl font-black text-gray-800">{value}</div>
    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</div>
  </div>
);

export default AnalyticsPage;