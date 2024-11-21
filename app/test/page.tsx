'use client';

import { useState } from 'react';
import { FeaturesSection } from '@/components/Sections/Features-Section';

export default function UploadPage() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/pinecone/processfile', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response:', data);
      setResponse(JSON.stringify(data, null, 2));
      
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Test File Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" accept=".csv,.pdf,.docx,.txt" />
        <button 
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Upload
        </button>
      </form>

      {error && <div className="mt-4 text-red-500">{error}</div>}
      {response && <pre className="mt-4 p-4 bg-gray-100 rounded">{response}</pre>}

      <FeaturesSection />
    </div>
  );
}