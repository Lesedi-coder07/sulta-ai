'use client'

import { useState, useCallback } from 'react'
import { Upload, File, X } from 'lucide-react'

export default function FileUploader() {
  const [files, setFiles] = useState<{ name: string; size: number }[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }, [])

  const handleFiles = (selectedFiles: File[]) => {
    setIsUploading(true)
    // Simulating file upload with a timeout
    setTimeout(() => {
      const newFiles = selectedFiles.map(file => ({
        name: file.name,
        size: file.size
      }))
      setFiles(prevFiles => [...prevFiles, ...newFiles])
      setIsUploading(false)
    }, 1500)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="flex h-[400px] w-full max-w-3xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="flex-1 p-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">KnowledgeBase</h2>
        <div
          className={`flex h-48 items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
            isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {isUploading ? (
            <div className="text-center">
              <div className="mb-2 text-xl font-semibold text-gray-700">Uploading...</div>
              <div className="h-2 w-48 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-1/2 animate-[upload_1.5s_ease-in-out_infinite] rounded-full bg-blue-500"></div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto mb-2 h-12 w-12 text-gray-400" />
              <p className="mb-2 text-sm text-gray-600">Drag and drop files here, or click to select files</p>
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Select Files
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="w-64 overflow-y-auto border-l border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">Uploaded Files</h3>
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between rounded-md bg-white p-2 shadow-sm">
              <div className="flex items-center space-x-2">
                <File className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">{file.name}</span>
              </div>
              <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}