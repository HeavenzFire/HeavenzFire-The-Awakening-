import React, { useState, useEffect, useRef } from 'react';
import { PILLARS } from '../constants';
import Card from './Card';
import { GoogleGenAI, Type } from '@google/genai';

// AI instance for the frequency player
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// The new, enhanced FrequencyPlayer component
const FrequencyPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [frequency, setFrequency] = useState(528);
    const [isPulsing, setIsPulsing] = useState(false);
    const [bpm, setBpm] = useState(60);
    const [resonanceEnabled, setResonanceEnabled] = useState(false);
    const [resonanceDepth, setResonanceDepth] = useState(10); // Cents for detune
    const [resonanceRate, setResonanceRate] = useState(5); // Hz for LFO frequency

    const [aiGoal, setAiGoal] = useState('');
    const [isTuning, setIsTuning] = useState(false);
    const [aiExplanation, setAiExplanation] = useState('');

    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const lfoRef = useRef<OscillatorNode | null>(null);
    const lfoGainRef = useRef<GainNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        // Cleanup on component unmount
        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    const handleAiTune = async () => {
        if (!aiGoal.trim() || isTuning) return;
        setIsTuning(true);
        setAiExplanation('Matrix is calculating optimal resonance...');
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Based on the user's goal of "${aiGoal}", provide the optimal frequency, resonance depth, and resonance rate. The frequency should be between 100 and 1000 Hz. The resonance depth (detune in cents) should be between 1 and 50. The resonance rate (LFO frequency) should be between 0.5 and 20 Hz. Provide a brief, one-sentence explanation for your choices.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            frequency: { type: Type.NUMBER, description: "The base audio frequency in Hz." },
                            resonanceDepth: { type: Type.NUMBER, description: "The depth of the LFO modulation in cents." },
                            resonanceRate: { type: Type.NUMBER, description: "The speed of the LFO modulation in Hz." },
                            explanation: { type: Type.STRING, description: "A brief explanation of the choices." }
                        },
                        required: ["frequency", "resonanceDepth", "resonanceRate", "explanation"]
                    }
                }
            });

            const result = JSON.parse(response.text);
            setFrequency(result.frequency);
            setResonanceDepth(result.resonanceDepth);
            setResonanceRate(result.resonanceRate);
            setAiExplanation(result.explanation);
            if (!resonanceEnabled) setResonanceEnabled(true);

        } catch (error) {
            console.error("AI Tuning Error:", error);
            setAiExplanation("Error: Could not calculate resonance. Please try again.");
        } finally {
            setIsTuning(false);
        }
    };


    const setupAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const audioContext = audioContextRef.current;
        
        // Main Oscillator
        oscillatorRef.current = audioContext.createOscillator();
        oscillatorRef.current.type = 'sine';
        oscillatorRef.current.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        // Main Gain
        gainRef.current = audioContext.createGain();
        gainRef.current.gain.setValueAtTime(0, audioContext.currentTime);

        // LFO (Low-Frequency Oscillator) for Resonance
        lfoRef.current = audioContext.createOscillator();
        lfoRef.current.frequency.setValueAtTime(resonanceRate, audioContext.currentTime);
        
        // LFO Gain (controls resonance depth)
        lfoGainRef.current = audioContext.createGain();
        lfoGainRef.current.gain.setValueAtTime(resonanceDepth, audioContext.currentTime);

        // Analyser for visualization
        analyserRef.current = audioContext.createAnalyser();
        analyserRef.current.fftSize = 2048;

        // Connections
        lfoRef.current.connect(lfoGainRef.current);
        if (resonanceEnabled) {
            lfoGainRef.current.connect(oscillatorRef.current.detune);
        }
        oscillatorRef.current.connect(gainRef.current);
        gainRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContext.destination);

        oscillatorRef.current.start();
        lfoRef.current.start();
    };

    const drawVisualizer = () => {
        if (!analyserRef.current || !canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        if (ctx) {
            analyserRef.current.getByteTimeDomainData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            
            const hue = (frequency / 1000) * 360;
            ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`;
            ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
            ctx.shadowBlur = 10;
            
            ctx.beginPath();
            
            const sliceWidth = canvas.width * 1.0 / bufferLength;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * canvas.height / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        }
        
        animationFrameId.current = requestAnimationFrame(drawVisualizer);
    };

    const togglePlay = () => {
        if (!audioContextRef.current) {
            setupAudio();
        }

        const audioContext = audioContextRef.current!;
        const targetGain = isPlaying ? 0 : (isPulsing ? 0 : 0.5);
        
        gainRef.current?.gain.cancelScheduledValues(audioContext.currentTime);
        gainRef.current?.gain.linearRampToValueAtTime(targetGain, audioContext.currentTime + 0.1);
        
        setIsPlaying(!isPlaying);
    };
    
    useEffect(() => {
        if (isPlaying && audioContextRef.current && gainRef.current) {
            const audioContext = audioContextRef.current;
            const interval = 60 / bpm;
            gainRef.current.gain.cancelScheduledValues(audioContext.currentTime);

            if (isPulsing) {
                gainRef.current.gain.setValueAtTime(0, audioContext.currentTime);
                for (let i = 0; i < 10; i++) { // Schedule a few pulses ahead
                    const startTime = audioContext.currentTime + i * interval;
                    gainRef.current.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
                    gainRef.current.gain.linearRampToValueAtTime(0, startTime + interval * 0.5);
                }
            } else {
                gainRef.current.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
            }
        } else if (!isPlaying && gainRef.current) {
            gainRef.current.gain.cancelScheduledValues(audioContextRef.current!.currentTime);
            gainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current!.currentTime + 0.1);
        }
    }, [isPlaying, isPulsing, bpm]);

    useEffect(() => {
        if (oscillatorRef.current && audioContextRef.current) {
            oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
        }
    }, [frequency]);

    useEffect(() => {
        if (lfoRef.current && audioContextRef.current) {
            lfoRef.current.frequency.setValueAtTime(resonanceRate, audioContextRef.current.currentTime);
        }
    }, [resonanceRate]);

    useEffect(() => {
        if (lfoGainRef.current && audioContextRef.current) {
            lfoGainRef.current.gain.setValueAtTime(resonanceDepth, audioContextRef.current.currentTime);
        }
    }, [resonanceDepth]);
    
    useEffect(() => {
        if (lfoGainRef.current && oscillatorRef.current) {
            if (resonanceEnabled) {
                try {
                   lfoGainRef.current.disconnect();
                } catch(e) {}
                lfoGainRef.current.connect(oscillatorRef.current.detune);
            } else {
                try {
                    lfoGainRef.current.disconnect(oscillatorRef.current.detune);
                } catch(e) { /* ignore if not connected */ }
            }
        }
    }, [resonanceEnabled]);

    useEffect(() => {
        if (isPlaying) {
            animationFrameId.current = requestAnimationFrame(drawVisualizer);
        } else {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                const canvas = canvasRef.current;
                const ctx = canvas?.getContext('2d');
                if (canvas && ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
        }
        return () => {
             if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        }
    }, [isPlaying, frequency]);

    return (
        <div className="p-6 text-center flex flex-col items-center h-full">
            <div className="mb-4">{PILLARS[1].icon}</div>
            <h3 className="text-xl font-bold text-cyan-300 mb-2">{PILLARS[1].title}</h3>
            
            <canvas ref={canvasRef} width="300" height="80" className="rounded-lg bg-black/30 border border-purple-500/30 mb-4"></canvas>

            <div className="w-full space-y-3 text-xs text-gray-400">
                {/* AI Tuning Section */}
                <div className="space-y-2 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <label htmlFor="aiGoal" className="block text-cyan-300 font-semibold text-sm">AI Sonic Tuning</label>
                    <div className="flex space-x-2">
                        <input 
                            id="aiGoal"
                            type="text"
                            value={aiGoal}
                            onChange={e => setAiGoal(e.target.value)}
                            placeholder="e.g., 'Enhance Focus'"
                            className="flex-1 bg-black/50 border border-gray-600 rounded px-2 py-1 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                        <button onClick={handleAiTune} disabled={isTuning} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-1 px-3 rounded disabled:bg-gray-600">
                            {isTuning ? '...' : 'Tune'}
                        </button>
                    </div>
                    {aiExplanation && <p className="text-purple-300 text-xs text-left pt-1">{aiExplanation}</p>}
                </div>

                {/* Manual Controls */}
                <div className="flex items-center space-x-4 pt-2">
                    <button onClick={togglePlay} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded w-20">
                        {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                    <div className="flex-1 text-left">
                        <label htmlFor="freq" className="block">Frequency: {frequency.toFixed(0)} Hz</label>
                        <input id="freq" type="range" min="100" max="1000" value={frequency} onChange={e => setFrequency(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="pulseMode" checked={isPulsing} onChange={() => setIsPulsing(!isPulsing)} />
                    <label htmlFor="pulseMode">Pulse Mode</label>
                </div>
                {isPulsing && (
                     <div className="flex-1 text-left">
                        <label htmlFor="bpm" className="block">BPM: {bpm}</label>
                        <input id="bpm" type="range" min="30" max="180" value={bpm} onChange={e => setBpm(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>
                )}
                
                <div className="flex items-center space-x-2 pt-2 border-t border-purple-500/20">
                    <input type="checkbox" id="resonanceMode" checked={resonanceEnabled} onChange={() => setResonanceEnabled(!resonanceEnabled)} />
                    <label htmlFor="resonanceMode">Resonance Effect</label>
                </div>
                {resonanceEnabled && (
                    <>
                        <div className="flex-1 text-left">
                            <label htmlFor="resDepth" className="block">Resonance Depth: {resonanceDepth}</label>
                            <input id="resDepth" type="range" min="1" max="50" value={resonanceDepth} onChange={e => setResonanceDepth(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                        </div>
                        <div className="flex-1 text-left">
                            <label htmlFor="resRate" className="block">Resonance Rate: {resonanceRate.toFixed(1)} Hz</label>
                            <input id="resRate" type="range" min="0.5" max="20" step="0.1" value={resonanceRate} onChange={e => setResonanceRate(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const Pillars: React.FC = () => {
  return (
    <section id="pillars" className="py-20 md:py-32 bg-[#101024]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 uppercase tracking-wider">Our Pillars</h2>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => (
            <Card key={pillar.title}>
              {pillar.title === 'Quantum & Esoteric Computing' ? (
                <FrequencyPlayer />
              ) : (
                <div className="p-8 text-center flex flex-col items-center h-full">
                  <div className="mb-6">{pillar.icon}</div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-4">{pillar.title}</h3>
                  <p className="text-gray-400 flex-grow">{pillar.description}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
