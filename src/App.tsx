import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import PredictionPage from './pages/prediction';
import AnalyticsPage from './pages/analytics';
import type { Prediction, DetectionResult } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([
    { id: 1, timestamp: '2026-01-16 10:30', brand: 'Tesla', model: 'Model 3', confidence: 0.95 },
    { id: 2, timestamp: '2026-01-16 11:15', brand: 'BMW', model: 'X5', confidence: 0.92 },
    { id: 3, timestamp: '2026-01-16 14:20', brand: 'Mercedes', model: 'C-Class', confidence: 0.88 },
    { id: 4, timestamp: '2026-01-15 16:45', brand: 'Audi', model: 'A4', confidence: 0.91 },
    { id: 5, timestamp: '2026-01-15 09:30', brand: 'Toyota', model: 'Camry', confidence: 0.94 },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleDetect = async () => {
  if (!selectedImage) return;

  setDetecting(true);

  try {
    const formData = new FormData();
    formData.append('image', selectedImage);

    const response = await fetch('http://localhost:8000/api/detect', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Detection failed');
    }

    const data = await response.json();

    // Backend response example:
    // {
    //   brand: "Tesla",
    //   model: "Model 3",
    //   confidence: 0.952
    // }

    const newResult: DetectionResult = {
      brand: data.brand,
      model: data.model,
      confidence: data.confidence,
    };

    setResult(newResult);

    // Save prediction history
    const newPrediction: Prediction = {
      id: predictions.length + 1,
      timestamp: new Date().toLocaleString(),
      brand: data.brand,
      model: data.model,
      confidence: data.confidence,
    };

    setPredictions((prev) => [newPrediction, ...prev]);
  } catch (error) {
    alert('Error detecting image');
    console.error(error);
  } finally {
    setDetecting(false);
  }
};


  const handleReset = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAdminLogin = () => {
    // Simple password check - replace with real authentication
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setCurrentPage('analytics');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage onStartPrediction={() => setCurrentPage('prediction')} />}
      {currentPage === 'prediction' && (
        <PredictionPage
          selectedImage={selectedImage}
          preview={preview}
          detecting={detecting}
          result={result}
          onImageSelect={handleImageSelect}
          onDetect={handleDetect}
          onReset={handleReset}
        />
      )}
      {currentPage === 'analytics' && (
        <AnalyticsPage
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          predictions={predictions}
          onAdminLogin={handleAdminLogin}
        />
      )}
    </div>
  );
}

export default App;