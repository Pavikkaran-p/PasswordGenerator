'use client'

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function PassGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  const { toast } = useToast();

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecialChars) charset += '!@#$%^&*()_+{}[]|:;<>,.?/~';

    if (charset === '') {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    navigator.clipboard.writeText(newPassword);

    toast({
      title: 'Password copied to clipboard',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: 'Password copied to clipboard',
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Strong Password Generator</h2>
      <p className="text-gray-600 mb-4">Generate a secure, random password</p>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Generated Password
        </label>
        <div className="flex items-center mt-2">
          <input
            type="text"
            id="password"
            value={password}
            readOnly
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={copyToClipboard}
            className="ml-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Password Length: {length}
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <div className="mb-4">
        <span className="block text-sm font-medium text-gray-700">Include:</span>
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center">
            <input
              id="uppercase"
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="uppercase" className="ml-2 block text-sm text-gray-700">Uppercase</label>
          </div>

          <div className="flex items-center">
            <input
              id="lowercase"
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="lowercase" className="ml-2 block text-sm text-gray-700">Lowercase</label>
          </div>

          <div className="flex items-center">
            <input
              id="numbers"
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="numbers" className="ml-2 block text-sm text-gray-700">Numbers</label>
          </div>

          <div className="flex items-center">
            <input
              id="special"
              type="checkbox"
              checked={includeSpecialChars}
              onChange={(e) => setIncludeSpecialChars(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="special" className="ml-2 block text-sm text-gray-700">Special Characters</label>
          </div>
        </div>
      </div>

      <button
        onClick={generatePassword}
        className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
      >
        Generate Password
      </button>
    </div>
  );
}
