import React from 'react';
import { Download } from 'lucide-react';

interface ImagePreviewProps {
  title: string;
  imageSrc: string;
  size: number;
  showDownload?: boolean;
  onDownload?: () => void;
}

export default function ImagePreview({ title, imageSrc, size, showDownload, onDownload }: ImagePreviewProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <p className="text-sm text-cyan-400">
          {(size / 1024).toFixed(2)} KB
        </p>
      </div>
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700 p-2">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      {showDownload && onDownload && (
        <button
          onClick={onDownload}
          className="w-full bg-gray-900/50 border border-gray-700 text-gray-200 py-2 px-4 rounded-lg font-medium hover:bg-gray-800 hover:border-gray-600 transition-all flex items-center justify-center gap-2 group"
        >
          <Download className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          Download
        </button>
      )}
    </div>
  );
}