import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, Video, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  uploadFileWithRetry,
  handleFileDrop,
  handleFileInput,
  formatFileSize,
  type UploadOptions,
} from '@/utils/upload';

interface FileUploadProps {
  onUpload: (url: string) => void;
  type: 'image' | 'document' | 'video';
  accept?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface UploadingFile {
  file: File;
  progress: number;
  url?: string;
  error?: string;
  uploading: boolean;
}

export function FileUpload({
  onUpload,
  type,
  accept,
  multiple = false,
  className,
  disabled = false,
  children,
}: FileUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getAcceptString = () => {
    if (accept) return accept;

    switch (type) {
      case 'image':
        return 'image/jpeg,image/jpg,image/png,image/webp,image/gif';
      case 'document':
        return 'application/pdf,.doc,.docx';
      case 'video':
        return 'video/mp4,video/webm,video/quicktime,video/avi';
      default:
        return '*/*';
    }
  };

  const getTypeIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (fileType.startsWith('video/')) return <Video className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const handleFiles = async (files: File[]) => {
    if (disabled) return;

    const newUploadingFiles = files.map((file) => ({
      file,
      progress: 0,
      uploading: true,
    }));

    setUploadingFiles((prev) => [...prev, ...newUploadingFiles]);

    // Upload files one by one
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileIndex = uploadingFiles.length + i;

      try {
        const result = await uploadFileWithRetry({
          file,
          type,
          maxRetries: 3,
          onProgress: (progress) => {
            setUploadingFiles((prev) =>
              prev.map((f, idx) => (idx === fileIndex ? { ...f, progress } : f))
            );
          },
          onComplete: (url) => {
            setUploadingFiles((prev) =>
              prev.map((f, idx) => (idx === fileIndex ? { ...f, url, uploading: false } : f))
            );
            onUpload(url);
          },
          onError: (error) => {
            setUploadingFiles((prev) =>
              prev.map((f, idx) => (idx === fileIndex ? { ...f, error, uploading: false } : f))
            );
          },
        });

        if (!result.success) {
          setUploadingFiles((prev) =>
            prev.map((f, idx) =>
              idx === fileIndex ? { ...f, error: result.error, uploading: false } : f
            )
          );
        }
      } catch (error) {
        setUploadingFiles((prev) =>
          prev.map((f, idx) =>
            idx === fileIndex
              ? {
                  ...f,
                  error: 'Upload failed',
                  uploading: false,
                }
              : f
          )
        );
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadingFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const retryUpload = (index: number) => {
    const fileToRetry = uploadingFiles[index];
    if (fileToRetry) {
      handleFiles([fileToRetry.file]);
      removeFile(index);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        className={cn(
          'rounded-lg border-2 border-dashed p-6 text-center transition-colors',
          isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-gray-400'
        )}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          setIsDragOver(false);
          if (!disabled) {
            handleFileDrop(e, handleFiles);
          }
        }}
        onClick={() => {
          if (!disabled) inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={getAcceptString()}
          multiple={multiple}
          className="hidden"
          disabled={disabled}
          onChange={(e) => handleFileInput(e, handleFiles)}
        />

        {children || (
          <div className="space-y-2">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Klik untuk upload atau drag & drop file</p>
              <p className="mt-1 text-xs text-gray-500">
                {type === 'image' && 'JPG, PNG, WEBP hingga 10MB'}
                {type === 'document' && 'PDF, DOC, DOCX hingga 20MB'}
                {type === 'video' && 'MP4, WEBM, MOV hingga 100MB'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Uploading Files List */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-3">
          {uploadingFiles.map((uploadingFile, index) => (
            <div key={index} className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
              {getTypeIcon(uploadingFile.file.type)}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{uploadingFile.file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(uploadingFile.file.size)}</p>

                {uploadingFile.uploading && (
                  <div className="mt-2 space-y-1">
                    <Progress value={uploadingFile.progress} className="h-1" />
                    <p className="text-xs text-gray-500">
                      Uploading... {Math.round(uploadingFile.progress)}%
                    </p>
                  </div>
                )}

                {uploadingFile.error && (
                  <p className="mt-1 text-xs text-red-500">{uploadingFile.error}</p>
                )}

                {uploadingFile.url && (
                  <p className="mt-1 text-xs text-green-600">✓ Upload berhasil</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {uploadingFile.uploading && (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                )}

                {uploadingFile.error && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => retryUpload(index)}
                    className="text-xs"
                  >
                    Retry
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
