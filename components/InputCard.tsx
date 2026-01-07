
import React from 'react';

interface InputCardProps {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
}

const InputCard: React.FC<InputCardProps> = ({ label, unit, value, min, max, onChange }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2 p-5 rounded-2xl bg-[#fbfdfc] dark:bg-[#152e1e] border border-[#eff3f1] dark:border-[#1e402a] shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-1">
        <label className="text-[#111813] dark:text-white tracking-tight text-lg font-extrabold leading-tight">
          {label}
        </label>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-widest">
          {unit}
        </span>
      </div>
      
      <div className="relative flex items-center gap-4">
        <input 
          type="number" 
          value={value}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val <= max) onChange(val);
          }}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-2xl text-[#111813] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/40 border border-[#dbe6df] dark:border-[#2a4d35] bg-white dark:bg-[#102216] focus:border-primary h-16 text-3xl font-black leading-normal text-center shadow-inner transition-all"
        />
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onChange(Math.max(min, value - 1))}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#2a4d35] shadow-sm border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-lg">remove</span>
          </button>
          
          <div className="relative flex-1 h-2 rounded-full bg-[#dbe6df] dark:bg-[#2a4d35] overflow-hidden group cursor-pointer">
            <div 
              className="absolute h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
            <input 
              type="range"
              min={min}
              max={max}
              step={1}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            />
          </div>

          <button 
            onClick={() => onChange(Math.min(max, value + 1))}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#2a4d35] shadow-sm border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputCard;
