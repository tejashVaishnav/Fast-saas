"use client"
import React, { useState } from 'react';
import Head from 'next/head';

export default function SendNewsletter() {
  const [apiKey, setApiKey] = useState(process.env.CRON_API_KEY!);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/cron/sendEmails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Newsletters sent successfully!');
      } else {
        setStatus(`Error: ${data.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setStatus('Error: Failed to send request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Send Newsletter</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Send Newsletter</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="apiKey" className="block mb-2">API Key:</label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Sending...' : 'Send Newsletter'}
        </button>
      </form>
      {status && (
        <div className={`mt-4 p-3 rounded ${status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {status}
        </div>
      )}
    </div>
  );
}