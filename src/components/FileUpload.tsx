import React from 'react'

interface FileUploadProps {
  onFileUpload: (file: File) => void
  accept: string
  label: string
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, accept, label }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className="relative">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id={`file-upload-${label}`}
      />
      <label
        htmlFor={`file-upload-${label}`}
        className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        {label}
      </label>
    </div>
  )
}

export default FileUpload