import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { ImageIcon } from 'lucide-react';
import ImageDropzone from './components/ImageDropzone';
import ProcessingControls from './components/ProcessingControls';
import ImagePreview from './components/ImagePreview';

interface ProcessedImage {
  preview: string;
  file: File;
  size: number;
}

function App() {
  const [originalImage, setOriginalImage] = useState<ProcessedImage | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState('webp');
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setOriginalImage({
      preview: URL.createObjectURL(file),
      file,
      size: file.size,
    });
    setProcessedImage(null);
  };

  const processImage = async () => {
    if (!originalImage) return;
    setIsProcessing(true);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: Math.max(Number(width) || 1920, Number(height) || 1080),
      useWebWorker: true,
      fileType: `image/${format}`,
      initialQuality: quality / 100,
    };

    try {
      const compressedFile = await imageCompression(originalImage.file, options);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        const targetWidth = Number(width) || img.width;
        const targetHeight = Number(height) || img.height;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], `processed.${format}`, {
                type: `image/${format}`,
              });
              setProcessedImage({
                preview: URL.createObjectURL(resizedFile),
                file: resizedFile,
                size: resizedFile.size,
              });
              setIsProcessing(false);
            }
          },
          `image/${format}`,
          quality / 100
        );
      };

      img.src = URL.createObjectURL(compressedFile);
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage.preview;
      link.download = `processed.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4 bg-gray-800/30 backdrop-blur-sm px-6 py-2 rounded-full border border-gray-700">
            <ImageIcon className="w-6 h-6 text-cyan-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Picture Processor palindrome
            </h1>
          </div>
          <p className="text-gray-400">There is nothing worse than a sharp image of a fuzzy concept</p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ImageDropzone onDrop={onDrop} />
              
              {originalImage && (
                <>
                  <ProcessingControls
                    width={width}
                    height={height}
                    quality={quality}
                    format={format}
                    onWidthChange={setWidth}
                    onHeightChange={setHeight}
                    onQualityChange={setQuality}
                    onFormatChange={setFormat}
                  />
                  
                  <button
                    onClick={processImage}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Process Image"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </>
              )}
            </div>

            {(originalImage || processedImage) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {originalImage && (
                  <ImagePreview
                    title="Original"
                    imageSrc={originalImage.preview}
                    size={originalImage.size}
                  />
                )}
                {processedImage && (
                  <ImagePreview
                    title="Processed"
                    imageSrc={processedImage.preview}
                    size={processedImage.size}
                    showDownload
                    onDownload={downloadImage}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;