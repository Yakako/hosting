import React from 'react';
import { Camera } from 'lucide-react';

interface HomePageProps {
  onStartPrediction: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartPrediction }) => (
  <div className="min-h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-8 ">
    <div className="text-center max-w-4xl xl:max-w-7xl 2xl:max-w-[90rem] w-full">
      <div className="mb-8 xl:mb-12">
        <Camera className="w-16 h-16 md:w-24 xl:w-32 2xl:w-40 2xl:h-40 text-blue-400 mx-auto mb-6 xl:mb-8" />
        <h1 className="text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-4 xl:mb-6 leading-tight">
          Welcome to Car Brand System
        </h1>
        <p className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-blue-200 mb-8 xl:mb-12 max-w-2xl xl:max-w-4xl 2xl:max-w-5xl mx-auto leading-relaxed">
          Advanced System car brand detection at your fingertips. Upload any car image and get instant brand recognition with high accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 mb-12 xl:mb-16">
        <div className="bg-slate-800 p-6 xl:p-8 2xl:p-10 rounded-xl border border-blue-700 hover:border-blue-600 transition-colors">
          <div className="text-4xl xl:text-5xl 2xl:text-6xl mb-3">🚗</div>
          <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-white mb-2">Fast Detection</h3>
          <p className="text-blue-200 text-sm xl:text-base 2xl:text-lg">Get results in seconds</p>
        </div>
        <div className="bg-slate-800 p-6 xl:p-8 2xl:p-10 rounded-xl border border-blue-700 hover:border-blue-600 transition-colors">
          <div className="text-4xl xl:text-5xl 2xl:text-6xl mb-3">🎯</div>
          <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-white mb-2">High Accuracy</h3>
          <p className="text-blue-200 text-sm xl:text-base 2xl:text-lg">AI-powered precision</p>
        </div>
        <div className="bg-slate-800 p-6 xl:p-8 2xl:p-10 rounded-xl border border-blue-700 hover:border-blue-600 transition-colors">
          <div className="text-4xl xl:text-5xl 2xl:text-6xl mb-3">🌍</div>
          <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-white mb-2">Global Brands</h3>
          <p className="text-blue-200 text-sm xl:text-base 2xl:text-lg">Supports 100+ car brands</p>
        </div>
        <div className="bg-slate-800 p-6 xl:p-8 2xl:p-10 rounded-xl border border-blue-700 hover:border-blue-600 transition-colors xl:col-span-1">
          <div className="text-4xl xl:text-5xl 2xl:text-6xl mb-3">⚡</div>
          <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-white mb-2">Real-time</h3>
          <p className="text-blue-200 text-sm xl:text-base 2xl:text-lg">Instant processing</p>
        </div>
      </div>

      <button
        onClick={onStartPrediction}
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-bold py-4 px-8 md:px-12 xl:px-16 2xl:px-20 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full md:w-auto"
      >
        Start Detecting Cars →
      </button>
    </div>
  </div>
);

export default HomePage;