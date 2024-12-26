import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">RIA Back Office</div>
            <p className="mt-2 text-slate-500">Welcome to the demo!</p>
            <div className="mt-4">
              <button
                onClick={() => setCount(c => c + 1)}
                className="px-4 py-2 font-semibold text-sm bg-emerald-500 text-white rounded-lg shadow-sm"
              >
                Count is {count}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);