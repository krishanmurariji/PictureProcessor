import React from 'react';
import { Settings, Zap, Image as ImageIcon, FileType } from 'lucide-react';

interface ProcessingControlsProps {
  width: string;
  height: string;
  quality: number;
  format: string;
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onQualityChange: (value: number) => void;
  onFormatChange: (value: string) => void;
}

export default function ProcessingControls({
  width,
  height,
  quality,
  format,
  onWidthChange,
  onHeightChange,
  onQualityChange,
  onFormatChange,
}: ProcessingControlsProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-6 border border-gray-700">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-700">
        <Settings className="w-5 h-5 text-cyan-400" />
        <h3 className="text-xl font-semibold text-gray-200">Processing Options</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-medium text-gray-300">Dimensions</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => onWidthChange(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all"
                placeholder="Auto"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => onHeightChange(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all"
                placeholder="Auto"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-medium text-gray-300">Quality</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Low</span>
              <span>{quality}%</span>
              <span>High</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => onQualityChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileType className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-medium text-gray-300">Format</h4>
          </div>
          <select
            value={format}
            onChange={(e) => onFormatChange(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all"
          >
            <option value="webp">WebP</option>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
          </select>
        </div>
      </div>
    </div>
  );
}