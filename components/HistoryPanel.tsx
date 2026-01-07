
import React from 'react';
import { BMIRecord } from '../types';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: BMIRecord[];
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose, history, onClear }) => {
  return (
    <div 
      className={`fixed inset-0 z-[60] transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div 
        className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-[#102216] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-black">History</h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                <span className="material-symbols-outlined text-6xl mb-4">history</span>
                <p className="font-bold">No calculations yet</p>
              </div>
            ) : (
              history.map((record) => (
                <div 
                  key={record.id} 
                  className="bg-[#fbfdfc] dark:bg-[#152e1e] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-2xl font-black text-primary">{record.bmi}</p>
                      <p className="text-xs font-bold text-gray-500 uppercase">{record.category}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold">
                      {new Date(record.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-4 text-xs font-bold text-[#61896f]">
                    <span>{record.weight}{record.unit === 'Metric' ? 'kg' : 'lb'}</span>
                    <span>{record.unit === 'Metric' ? `${record.height}cm` : `${Math.floor(record.height/12)}ft ${record.height%12}in`}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {history.length > 0 && (
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={onClear}
                className="w-full py-3 rounded-xl border-2 border-red-500/20 text-red-500 font-bold hover:bg-red-500/10 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;
