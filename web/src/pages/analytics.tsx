import React from 'react';
import { Lock } from 'lucide-react';
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
  if (!isAdmin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 xl:p-12 2xl:p-16 max-w-md xl:max-w-lg 2xl:max-w-xl w-full">
          <div className="text-center mb-6 xl:mb-8 2xl:mb-10">
            <Lock className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 text-blue-600 mx-auto mb-4 xl:mb-6" />
            <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-gray-800 mb-2 xl:mb-4">
              Admin Access Required
            </h2>
            <p className="text-gray-600 xl:text-lg 2xl:text-xl">
              Please enter the admin password to view analytics
            </p>
          </div>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onAdminLogin()}
            placeholder="Enter password"
            className="w-full px-4 xl:px-6 2xl:px-8 py-3 xl:py-4 2xl:py-5 border-2 border-gray-300 rounded-lg xl:rounded-xl 2xl:rounded-2xl mb-4 xl:mb-6 focus:outline-none focus:border-blue-500 text-base xl:text-lg 2xl:text-xl text-black"
          />
          <button
            onClick={onAdminLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 xl:py-4 2xl:py-5 rounded-lg xl:rounded-xl 2xl:rounded-2xl transition-colors text-base xl:text-lg 2xl:text-xl"
          >
            Login
          </button>
          <p className="text-sm xl:text-base 2xl:text-lg text-gray-500 text-center mt-4 xl:mt-6 2xl:mt-8">
            Demo password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 xl:px-8 2xl:px-12 py-8 max-w-6xl xl:max-w-full 2xl:max-w-[95rem]">
      <div className="mb-8 xl:mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-2 xl:mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-blue-200 text-sm md:text-base xl:text-lg 2xl:text-xl">
            View all user predictions and detection history
          </p>
        </div>
        <button
          onClick={() => setIsAdmin(false)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 xl:px-8 2xl:px-10 py-2 xl:py-3 2xl:py-4 rounded-lg xl:rounded-xl 2xl:rounded-2xl font-semibold transition-colors w-full md:w-auto text-sm xl:text-base 2xl:text-lg"
        >
          Logout
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 xl:gap-8 2xl:gap-10 mb-8 xl:mb-12">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 md:p-6 xl:p-8 2xl:p-10 text-white shadow-lg">
          <div className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-1 xl:mb-2">{predictions.length}</div>
          <div className="text-blue-100 text-sm xl:text-base 2xl:text-lg">Total Predictions</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 md:p-6 xl:p-8 2xl:p-10 text-white shadow-lg">
          <div className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-1 xl:mb-2">
            {(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length * 100).toFixed(1)}%
          </div>
          <div className="text-green-100 text-sm xl:text-base 2xl:text-lg">Avg Confidence</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 md:p-6 xl:p-8 2xl:p-10 text-white shadow-lg">
          <div className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-1 xl:mb-2">
            {new Set(predictions.map(p => p.brand)).size}
          </div>
          <div className="text-purple-100 text-sm xl:text-base 2xl:text-lg">Unique Brands</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 md:p-6 xl:p-8 2xl:p-10 text-white shadow-lg">
          <div className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-1 xl:mb-2">2</div>
          <div className="text-orange-100 text-sm xl:text-base 2xl:text-lg">Today's Predictions</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-4 md:p-6 xl:p-8 2xl:p-10 text-white shadow-lg xl:col-span-1">
          <div className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-1 xl:mb-2">
            {predictions.filter(p => p.confidence > 0.9).length}
          </div>
          <div className="text-indigo-100 text-sm xl:text-base 2xl:text-lg">High Confidence</div>
        </div>
      </div>

      {/* Predictions Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-gray-50 border-b">
          <h2 className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-bold text-gray-800">Prediction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] xl:min-w-[800px] 2xl:min-w-[1000px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 md:px-6 xl:px-8 2xl:px-10 py-3 xl:py-4 2xl:py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-4 md:px-6 xl:px-8 2xl:px-10 py-3 xl:py-4 2xl:py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Timestamp</th>
                <th className="px-4 md:px-6 xl:px-8 2xl:px-10 py-3 xl:py-4 2xl:py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand</th>
                <th className="px-4 md:px-6 xl:px-8 2xl:px-10 py-3 xl:py-4 2xl:py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Model</th>
                <th className="px-4 md:px-6 xl:px-8 2xl:px-10 py-3 xl:py-4 2xl:py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {predictions.map((pred) => (
                <tr key={pred.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 md:px-6 xl:px-8 2xl:px-10 py-4 xl:py-5 2xl:py-6 whitespace-nowrap text-sm xl:text-base 2xl:text-lg font-medium text-gray-900">
                    #{pred.id}
                  </td>
                  <td className="px-4 md:px-6 xl:px-8 2xl:px-10 py-4 xl:py-5 2xl:py-6 whitespace-nowrap text-sm xl:text-base 2xl:text-lg text-gray-600">
                    {pred.timestamp}
                  </td>
                  <td className="px-4 md:px-6 xl:px-8 2xl:px-10 py-4 xl:py-5 2xl:py-6 whitespace-nowrap">
                    <span className="px-2 md:px-3 xl:px-4 2xl:px-5 py-1 text-xs md:text-sm xl:text-base 2xl:text-lg font-semibold text-blue-700 bg-blue-100 rounded-full">
                      {pred.brand}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 xl:px-8 2xl:px-10 py-4 xl:py-5 2xl:py-6 whitespace-nowrap text-sm xl:text-base 2xl:text-lg text-gray-600">
                    {pred.model}
                  </td>
                  <td className="px-4 md:px-6 xl:px-8 2xl:px-10 py-4 xl:py-5 2xl:py-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 md:w-24 xl:w-32 2xl:w-40 bg-gray-200 rounded-full h-2 xl:h-3 2xl:h-4">
                        <div
                          className="bg-green-500 h-2 xl:h-3 2xl:h-4 rounded-full"
                          style={{ width: `${pred.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs md:text-sm xl:text-base 2xl:text-lg font-semibold text-gray-700">
                        {(pred.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
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

export default AnalyticsPage;
