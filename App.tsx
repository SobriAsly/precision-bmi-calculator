
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { UnitSystem, BMIRecord, BMIResult, BMICategory } from './types';
import InputCard from './components/InputCard';
import ResultModal from './components/ResultModal';
import HistoryPanel from './components/HistoryPanel';

const App: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  
  // Metric States
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);
  
  // Imperial States
  const [weightLb, setWeightLb] = useState(154);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);

  const [history, setHistory] = useState<BMIRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<BMIResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bmi_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const calculateBMI = useCallback(() => {
    let bmiValue = 0;
    let weightDisplay = 0;
    let heightDisplay = 0;

    if (unitSystem === UnitSystem.METRIC) {
      const heightInMeters = heightCm / 100;
      bmiValue = weightKg / (heightInMeters * heightInMeters);
      weightDisplay = weightKg;
      heightDisplay = heightCm;
    } else {
      const totalInches = (heightFt * 12) + heightIn;
      bmiValue = (weightLb / (totalInches * totalInches)) * 703;
      weightDisplay = weightLb;
      heightDisplay = totalInches;
    }

    const roundedBmi = parseFloat(bmiValue.toFixed(1));
    let category: BMICategory = 'Normal';
    let color = '#13ec5b'; // Green
    let range = '18.5 - 24.9';

    if (roundedBmi < 18.5) {
      category = 'Underweight';
      color = '#3498db'; // Blue
      range = '< 18.5';
    } else if (roundedBmi < 25) {
      category = 'Normal';
      color = '#13ec5b'; // Green
      range = '18.5 - 24.9';
    } else if (roundedBmi < 30) {
      category = 'Overweight';
      color = '#f1c40f'; // Yellow
      range = '25.0 - 29.9';
    } else {
      category = 'Obese';
      color = '#e74c3c'; // Red
      range = '≥ 30.0';
    }

    const result: BMIResult = { score: roundedBmi, category, color, range };
    setCurrentResult(result);
    setShowResult(true);

    const newRecord: BMIRecord = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      bmi: roundedBmi,
      category,
      weight: weightDisplay,
      height: heightDisplay,
      unit: unitSystem
    };

    const updatedHistory = [newRecord, ...history].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem('bmi_history', JSON.stringify(updatedHistory));
  }, [unitSystem, weightKg, heightCm, weightLb, heightFt, heightIn, history]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('bmi_history');
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-white dark:bg-[#102216] shadow-2xl transition-colors duration-300">
      
      {/* Top App Bar */}
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-white/80 dark:bg-[#102216]/80 backdrop-blur-md z-10">
        <div className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-[#111813] dark:text-white">arrow_back</span>
        </div>
        <h2 className="text-[#111813] dark:text-white text-lg font-extrabold leading-tight tracking-[-0.015em] flex-1 text-center">BMI Calculator</h2>
        <div className="flex w-12 items-center justify-center">
          <button 
            onClick={() => setShowHistory(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[#111813] dark:text-white">history</span>
          </button>
        </div>
      </header>

      {/* Main Illustration */}
      <div className="w-full flex justify-center py-6">
        <div className="relative w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-slow">
          <span className="material-symbols-outlined text-primary text-6xl">vital_signs</span>
          <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Unit Selection */}
      <div className="flex px-6 py-2">
        <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#f0f4f2] dark:bg-[#1a3825] p-1 shadow-inner">
          <button
            onClick={() => setUnitSystem(UnitSystem.METRIC)}
            className={`flex-1 h-full rounded-lg text-sm font-bold transition-all duration-300 ${unitSystem === UnitSystem.METRIC ? 'bg-white dark:bg-[#2a4d35] shadow-md text-[#111813] dark:text-white' : 'text-[#61896f] dark:text-[#8baaa0]'}`}
          >
            Metric
          </button>
          <button
            onClick={() => setUnitSystem(UnitSystem.IMPERIAL)}
            className={`flex-1 h-full rounded-lg text-sm font-bold transition-all duration-300 ${unitSystem === UnitSystem.IMPERIAL ? 'bg-white dark:bg-[#2a4d35] shadow-md text-[#111813] dark:text-white' : 'text-[#61896f] dark:text-[#8baaa0]'}`}
          >
            Imperial
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="flex-1 flex flex-col gap-6 px-6 pt-4 pb-32">
        {unitSystem === UnitSystem.METRIC ? (
          <>
            <InputCard 
              label="Weight" 
              unit="kg" 
              value={weightKg} 
              min={20} 
              max={250} 
              onChange={setWeightKg} 
            />
            <InputCard 
              label="Height" 
              unit="cm" 
              value={heightCm} 
              min={100} 
              max={250} 
              onChange={setHeightCm} 
            />
          </>
        ) : (
          <>
            <InputCard 
              label="Weight" 
              unit="lb" 
              value={weightLb} 
              min={50} 
              max={600} 
              onChange={setWeightLb} 
            />
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#fbfdfc] dark:bg-[#152e1e] border border-[#eff3f1] dark:border-[#1e402a] shadow-sm">
               <label className="text-[#111813] dark:text-white tracking-tight text-lg font-bold">Height</label>
               <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-bold px-2">ft</span>
                    <input 
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full h-16 rounded-xl border-[#dbe6df] dark:border-[#2a4d35] bg-white dark:bg-[#102216] text-center text-2xl font-bold"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase font-bold px-2">in</span>
                    <input 
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full h-16 rounded-xl border-[#dbe6df] dark:border-[#2a4d35] bg-white dark:bg-[#102216] text-center text-2xl font-bold"
                    />
                  </div>
               </div>
            </div>
          </>
        )}
      </div>

      {/* Persistent Call-to-Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-[#102216] dark:via-[#102216] pb-8 max-w-md mx-auto z-20">
        <button 
          onClick={calculateBMI}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_8px_20px_rgba(19,236,91,0.4)]"
        >
          <span className="text-[#083315] text-lg font-extrabold tracking-wide">Calculate BMI</span>
          <span className="material-symbols-outlined ml-2 text-[#083315] font-black">arrow_forward</span>
        </button>
      </div>

      {/* Overlays */}
      <ResultModal 
        isOpen={showResult} 
        onClose={() => setShowResult(false)} 
        result={currentResult} 
      />
      <HistoryPanel 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
        history={history} 
        onClear={clearHistory}
      />
    </div>
  );
};

export default App;
