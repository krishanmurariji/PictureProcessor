import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage } from 'lucide-react';

interface ImageDropzoneProps {
  onDrop: (files: File[]) => void;
}

export default function ImageDropzone({ onDrop }: ImageDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif']
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all group hover:border-cyan-400 ${
        isDragActive ? 'border-cyan-400 bg-gray-800/50' : 'border-gray-700'
      }`}
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      <div className="relative z-10">
        <div className="bg-gray-800/80 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          {isDragActive ? (
            <FileImage className="w-10 h-10 text-cyan-400" />
          ) : (
            <Upload className="w-10 h-10 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          )}
        </div>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
          {isDragActive ? (
            "Drop your image here..."
          ) : (
            <>
              <span className="text-cyan-400">Drop</span> your image here, or{" "}
              <span className="text-cyan-400">click</span> to select
            </>
          )}
        </p>
        <p className="text-xs text-gray-500 mt-2">Supports PNG, JPG, JPEG, WebP, and GIF</p>
      </div>
    </div>
  );
}