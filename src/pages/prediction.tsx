import React, { useRef } from 'react';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import type { DetectionResult } from '../types';

interface PredictionPageProps {
  selectedImage: File | null;
  preview: string | null;
  detecting: boolean;
  result: DetectionResult | null;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDetect: () => void;
  onReset: () => void;
}

const PredictionPage: React.FC<PredictionPageProps> = ({
  selectedImage: _selectedImage,
  preview,
  detecting,
  result,
  onImageSelect,
  onDetect,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="container mx-auto px-4 xl:px-8 2xl:px-12 py-8 max-w-4xl xl:max-w-7xl 2xl:max-w-[90rem]">
      <div className="text-center mb-8 xl:mb-12">
        <h1 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-2 xl:mb-4">
          Car Brand Detection
        </h1>
        <p className="text-blue-200 text-sm md:text-base xl:text-lg 2xl:text-xl">
          Upload a car image and let AI identify the brand
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {!preview ? (
          <div className="p-6 md:p-12 xl:p-16 2xl:p-20">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-dashed border-blue-300 rounded-xl p-8 md:p-12 xl:p-16 2xl:p-20 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <Upload className="w-12 h-12 md:w-16 xl:w-20 2xl:w-24 2xl:h-24 text-blue-400 mx-auto mb-4 xl:mb-6" />
              <h3 className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-700 mb-2 xl:mb-4">
                Upload Car Image
              </h3>
              <p className="text-gray-500 mb-4 text-sm md:text-base xl:text-lg 2xl:text-xl">
                Click to browse or drag and drop
              </p>
              <p className="text-sm xl:text-base 2xl:text-lg text-gray-400">
                Supports: JPG, PNG, WebP
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onImageSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="p-4 md:p-8 xl:p-12 2xl:p-16">
            <div className="xl:flex xl:gap-8 2xl:gap-12 xl:items-start">
              {/* Image Preview Section */}
              <div className="xl:flex-1 xl:max-w-2xl 2xl:max-w-3xl">
                <div className="relative mb-6 xl:mb-0">
                  <img
                    src={preview}
                    alt="Selected car"
                    className="w-full h-64 md:h-96 xl:h-[500px] 2xl:h-[600px] object-contain rounded-lg bg-gray-100"
                  />
                  <button
                    onClick={onReset}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 xl:p-3 2xl:p-4 rounded-full shadow-lg transition-colors"
                  >
                    <X className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                  </button>
                </div>
              </div>

              {/* Results Section */}
              <div className="xl:flex-1 xl:pl-8 2xl:pl-12">
                {result && (
                  <div className="mb-6 xl:mb-8 2xl:mb-10 p-4 md:p-6 xl:p-8 2xl:p-10 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                    <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-gray-700 mb-3 xl:mb-4">
                      Detection Result
                    </h3>
                    <div className="space-y-3 xl:space-y-4 2xl:space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                        <span className="text-gray-600 xl:text-lg 2xl:text-xl">Brand:</span>
                        <span className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-blue-600">
                          {result.brand}
                        </span>
                      </div>
                      {result.model && (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                          <span className="text-gray-600 xl:text-lg 2xl:text-xl">Model:</span>
                          <span className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-semibold text-gray-700">
                            {result.model}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                        <span className="text-gray-600 xl:text-lg 2xl:text-xl">Confidence:</span>
                        <span className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-semibold text-green-600">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 xl:gap-6 2xl:gap-8">
                  <button
                    onClick={onDetect}
                    disabled={detecting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 xl:py-5 2xl:py-6 px-6 xl:px-8 2xl:px-10 rounded-lg xl:rounded-xl 2xl:rounded-2xl transition-colors flex items-center justify-center gap-2 text-base xl:text-lg 2xl:text-xl"
                  >
                    {detecting ? (
                      <>
                        <Loader2 className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 animate-spin" />
                        Detecting...
                      </>
                    ) : (
                      <>
                        <Camera className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                        Detect Brand
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 xl:py-5 2xl:py-6 px-6 xl:px-8 2xl:px-10 rounded-lg xl:rounded-xl 2xl:rounded-2xl transition-colors text-base xl:text-lg 2xl:text-xl"
                  >
                    Upload New
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onImageSelect}
                    className="hidden"
                  />
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
