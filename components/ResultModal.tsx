
import React from 'react';
import { BMIResult } from '../types';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: BMIResult | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-sm bg-white dark:bg-[#152e1e] rounded-[2.5rem] p-8 shadow-2xl animate-scale-up overflow-hidden">
        
        {/* Decorative elements */}
        <div 
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: result.color }}
        />

        <div className="flex flex-col items-center text-center">
          <p className="text-[#61896f] dark:text-[#8baaa0] font-bold uppercase tracking-widest text-xs mb-4">
            Your Body Mass Index
          </p>
          
          <div className="relative mb-6">
            <h2 className="text-7xl font-black tracking-tighter" style={{ color: result.color }}>
              {result.score}
            </h2>
          </div>

          <div 
            className="px-6 py-2 rounded-2xl font-black text-lg mb-8"
            style={{ backgroundColor: `${result.color}20`, color: result.color }}
          >
            {result.category}
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#f6f8f6] dark:bg-[#1a3825] p-4 rounded-3xl">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Healthy Range</p>
              <p className="text-sm font-black dark:text-white">18.5 - 24.9</p>
            </div>
            <div className="bg-[#f6f8f6] dark:bg-[#1a3825] p-4 rounded-3xl">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Your Range</p>
              <p className="text-sm font-black dark:text-white">{result.range}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full h-14 rounded-2xl bg-[#111813] dark:bg-primary text-white dark:text-[#083315] font-black text-lg shadow-xl active:scale-95 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
