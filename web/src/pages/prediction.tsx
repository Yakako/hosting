import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2, AlertCircle } from 'lucide-react';

// Updated interface to match your API response
interface PredictionResponse {
  predicted_class: string;
  confidence: number;
  all_predictions: Record<string, number>;
  prediction_id: number;
  image_path: string;
  message: string;
}

const PredictionPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection and generate preview
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // The POST request to your API
  const handleDetect = async () => {
    if (!selectedFile) return;

    setDetecting(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile); // Ensure key matches your backend ('file' or 'image')

    try {
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to identify the car. Please try again.');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setResult(null);
    } finally {
      setDetecting(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 xl:px-8 py-8 max-w-4xl xl:max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Car Brand Detection</h1>
        <p className="text-blue-200">Upload a car image and let AI identify the brand</p>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Error Message UI */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 flex items-center gap-3">
            <AlertCircle className="text-red-500 w-5 h-5" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {!preview ? (
          <div className="p-6 md:p-12">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">Upload Car Image</h3>
              <p className="text-gray-500">Click to browse or drag and drop</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          </div>
        ) : (
          <div className="p-4 md:p-8">
            <div className="xl:flex xl:gap-8">
              <div className="xl:flex-1">
                <div className="relative mb-6">
                  <img src={preview} alt="Preview" className="w-full h-64 md:h-96 object-contain rounded-lg bg-gray-100" />
                  <button onClick={handleReset} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="xl:flex-1">
                {result && (
                  <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Detection Result</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Brand:</span>
                        <span className="text-2xl font-bold text-blue-600">{result.predicted_class}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="text-lg font-semibold text-green-600">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 italic">ID: {result.prediction_id}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleDetect}
                    disabled={detecting || !!result}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    {detecting ? <Loader2 className="animate-spin" /> : <Camera />}
                    {detecting ? 'Analyzing...' : result ? 'Analysis Complete' : 'Detect Brand'}
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg"
                  >
                    Upload New
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;