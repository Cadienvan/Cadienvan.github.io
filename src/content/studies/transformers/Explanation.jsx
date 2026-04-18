import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight, ArrowDown, Cpu, Layers, Play, StepForward, RefreshCw, Zap, Lock, Eye, EyeOff, MessageSquare, Send, BrainCircuit, Bot, User } from 'lucide-react';

const i18n = {
  it: {
    subtitle: "Pannello interattivo per ispezionare l'architettura Attention Is All You Need.",
    tabAtt: "1. Self-Attention (Q,K,V)",
    tabTrain: "2. Training (Parallelo)",
    tabInf: "3. Inference (Generazione)",
    tabChat: "4. Chat & Decoding",
    attTitle: "Scaled Dot-Product Attention",
    attDesc: "Seleziona una parola per vedere come la sua <strong>Query (Q)</strong> valuta le <strong>Keys (K)</strong> delle altre parole per estrarre il <strong>Value (V)</strong>. L'intensità della linea rappresenta il punteggio Softmax.",
    attQuery: "Cerco il mio contesto...",
    trainTitle: "Training Massivo Parallelo & Masking",
    trainDesc: "Durante il training, l'intera frase in ingresso e in uscita viene processata simultaneamente. Il <strong>Masking</strong> impedisce alla parola attuale di \"vedere\" le parole future nella risposta.",
    trainEnc: "Encoder (Input)",
    trainEncDesc: "Tutti i token vengono processati <strong>simultaneamente</strong> in parallelo (O(1) sequenziale). Nessun vincolo temporale.",
    trainDec: "Decoder (Masked Self-Attention)",
    trainWho: "Chi può vedere chi?",
    trainNote: "* \"Ok,\" può guardare solo se stesso. \"bug!\" può guardare \"Ok,\", \"risolverò\", \"il\" e se stesso. Il futuro è oscurato (-infinito nella softmax).",
    infTitle: "Inference (Generazione Auto-regressiva)",
    infDesc: "A differenza del training, qui la generazione avviene <strong>uno step alla volta</strong>. Ad ogni ciclo, l'output generato finora diventa il nuovo input per il Decoder.",
    infReset: "Reset",
    infNext: "Next Tick",
    infEncTitle: "Encoder elabora la richiesta",
    infUserInput: "Input Utente",
    infEncOut: "Output Encoder",
    infDecTitle: "Decoder genera (Ciclo",
    infWait: "Attesa prossimo tick...",
    infDone: "Generazione Completata:",
    chatTitle: "Simulazione Chat & Multi-Head Decoder",
    chatDesc: "Invia un messaggio per vedere come il Transformer passa dalla fase di 'Thinking' alla generazione auto-regressiva sotto il cofano.",
    chatInput: "Fix the bug",
    chatSend: "Invia",
    chatUserMsg: "Fix the bug",
    chatThinking: "Thinking...",
    chatUnderHood: "Sotto il cofano: Motore di Inferenza",
    chatContext: "Contesto Attuale (Input del Decoder)",
    chatHeads: "Multi-Head Attention (Calcolo Pesi)",
    chatPredict: "Predizione Parola (Softmax)",
    chatRestart: "Riavvia Simulazione"
  },
  en: {
    subtitle: "Interactive panel to inspect the Attention Is All You Need architecture.",
    tabAtt: "1. Self-Attention (Q,K,V)",
    tabTrain: "2. Training (Parallel)",
    tabInf: "3. Inference (Generation)",
    tabChat: "4. Chat & Decoding",
    attTitle: "Scaled Dot-Product Attention",
    attDesc: "Select a word to see how its <strong>Query (Q)</strong> evaluates the <strong>Keys (K)</strong> of other words to extract the <strong>Value (V)</strong>. Line intensity represents the Softmax score.",
    attQuery: "Looking for my context...",
    trainTitle: "Massive Parallel Training & Masking",
    trainDesc: "During training, the entire input and output sentences are processed simultaneously. <strong>Masking</strong> prevents the current word from \"seeing\" future words in the response.",
    trainEnc: "Encoder (Input)",
    trainEncDesc: "All tokens are processed <strong>simultaneously</strong> in parallel (O(1) sequential). No time constraints.",
    trainDec: "Decoder (Masked Self-Attention)",
    trainWho: "Who can see whom?",
    trainNote: "* \"Ok,\" can only see itself. \"bug!\" can see \"Ok,\", \"fixing\", \"the\" and itself. The future is masked (-infinity in softmax).",
    infTitle: "Inference (Auto-regressive Generation)",
    infDesc: "Unlike training, generation here happens <strong>one step at a time</strong>. In each cycle, the generated output becomes the new input for the Decoder.",
    infReset: "Reset",
    infNext: "Next Tick",
    infEncTitle: "Encoder processes the request",
    infUserInput: "User Input",
    infEncOut: "Encoder Output",
    infDecTitle: "Decoder generates (Cycle",
    infWait: "Waiting for next tick...",
    infDone: "Generation Complete:",
    chatTitle: "Chat Simulation & Multi-Head Decoder",
    chatDesc: "Send a message to see how the Transformer moves from 'Thinking' to auto-regressive generation under the hood.",
    chatInput: "Fix the bug",
    chatSend: "Send",
    chatUserMsg: "Fix the bug",
    chatThinking: "Thinking...",
    chatUnderHood: "Under the Hood: Inference Engine",
    chatContext: "Current Context (Decoder Input)",
    chatHeads: "Multi-Head Attention (Computing Weights)",
    chatPredict: "Word Prediction (Softmax)",
    chatRestart: "Restart Simulation"
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('attention');
  const [lang, setLang] = useState('it');
  const t = i18n[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Cpu className="text-indigo-600" size={32} />
              Transformer Visualizer
            </h1>
            <p className="text-slate-600 mt-2">
              {t.subtitle}
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => setLang('it')} 
              className={`text-3xl transition-all duration-300 ${lang === 'it' ? 'grayscale-0 scale-110 drop-shadow-md' : 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100'}`} 
              title="Italiano"
            >
              🇮🇹
            </button>
            <button 
              onClick={() => setLang('en')} 
              className={`text-3xl transition-all duration-300 ${lang === 'en' ? 'grayscale-0 scale-110 drop-shadow-md' : 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100'}`} 
              title="English"
            >
              🇬🇧
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['attention', 'training', 'inference', 'chat'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-indigo-50 border'
              }`}
            >
              {tab === 'attention' && t.tabAtt}
              {tab === 'training' && t.tabTrain}
              {tab === 'inference' && t.tabInf}
              {tab === 'chat' && t.tabChat}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 overflow-hidden">
          {activeTab === 'attention' && <AttentionVisualizer lang={lang} t={t} />}
          {activeTab === 'training' && <TrainingVisualizer lang={lang} t={t} />}
          {activeTab === 'inference' && <InferenceVisualizer lang={lang} t={t} />}
          {activeTab === 'chat' && <ChatVisualizer lang={lang} t={t} />}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 1: SELF-ATTENTION ---
const AttentionVisualizer = ({ lang, t }) => {
  const sentence = lang === 'en' 
    ? ["The", "main", "server", "is", "down"]
    : ["Il", "server", "principale", "è", "down"];
    
  const [focusIndex, setFocusIndex] = useState(4);

  const getWeights = (index) => {
    if (lang === 'en') {
      return {
        0: [1.0, 0.0, 0.0, 0.0, 0.0],
        1: [0.1, 1.0, 0.3, 0.1, 0.6],
        2: [0.0, 0.8, 1.0, 0.0, 0.1],
        3: [0.0, 0.2, 0.0, 1.0, 0.5],
        4: [0.0, 0.1, 0.8, 0.3, 1.0], 
      }[index];
    }
    return {
      0: [1.0, 0.0, 0.0, 0.0, 0.0],
      1: [0.1, 1.0, 0.3, 0.1, 0.6],
      2: [0.0, 0.8, 1.0, 0.0, 0.1],
      3: [0.0, 0.2, 0.0, 1.0, 0.5],
      4: [0.0, 0.8, 0.1, 0.3, 1.0], 
    }[index];
  };

  const weights = getWeights(focusIndex);

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-slate-800 mb-4">{t.attTitle}</h2>
      <p className="text-slate-600 mb-6" dangerouslySetInnerHTML={{ __html: t.attDesc }}></p>

      <div className="flex flex-col items-center gap-12">
        <div className="flex space-x-2">
          {sentence.map((word, idx) => (
            <button
              key={idx}
              onClick={() => setFocusIndex(idx)}
              className={`px-4 py-3 rounded-md text-lg font-semibold transition-all ${
                focusIndex === idx
                  ? 'bg-purple-600 text-white shadow-lg scale-110'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {word}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-3xl border rounded-xl bg-slate-50 p-8 flex justify-between items-center">
          <div className="flex flex-col items-center z-10">
            <div className="bg-purple-100 border-2 border-purple-500 text-purple-800 px-6 py-4 rounded-lg shadow-sm text-center">
              <span className="text-xs uppercase font-bold tracking-wider opacity-70">Query (Q)</span>
              <div className="text-xl font-bold mt-1">"{sentence[focusIndex]}"</div>
              <div className="text-xs mt-2 opacity-80">{t.attQuery}</div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 z-10 w-1/2">
            {sentence.map((word, idx) => {
              const weight = weights[idx];
              return (
                <div key={idx} className="flex items-center w-full relative">
                  <div 
                    className="absolute right-full h-1 bg-purple-500 transition-all duration-300 origin-right rounded-l-full"
                    style={{ 
                      width: '150px', 
                      opacity: weight,
                      height: `${Math.max(1, weight * 8)}px`,
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  />
                  <div className={`w-full flex justify-between items-center px-4 py-2 border rounded-lg transition-all ${
                    weight > 0.5 ? 'bg-indigo-100 border-indigo-400' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase font-bold text-indigo-500">Key (K)</span>
                      <span className="font-semibold text-slate-800">{word}</span>
                    </div>
                    <div className="text-right flex flex-col">
                      <span className="text-xs text-slate-500">Softmax Weight</span>
                      <span className="font-bold text-indigo-700">{(weight * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 2: TRAINING ---
const TrainingVisualizer = ({ lang, t }) => {
  const source = ["Fix", "the", "bug"];
  const target = lang === 'en' ? ["Ok,", "fixing", "the", "bug!"] : ["Ok,", "risolverò", "il", "bug!"];
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-slate-800 mb-4">{t.trainTitle}</h2>
      <p className="text-slate-600 mb-6" dangerouslySetInnerHTML={{ __html: t.trainDesc }}></p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4 text-blue-800 font-bold">
            <Layers />
            <h3>{t.trainEnc}</h3>
          </div>
          <div className="flex gap-2 justify-center mb-6">
            {source.map((w, i) => (
              <div key={i} className="bg-white px-4 py-2 rounded shadow-sm border border-blue-300 text-blue-900 font-medium">
                {w}
              </div>
            ))}
          </div>
          <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded text-center">
            <Zap className="inline w-4 h-4 mr-1" />
            <span dangerouslySetInnerHTML={{ __html: t.trainEncDesc }}></span>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4 text-emerald-800 font-bold">
            <Lock />
            <h3>{t.trainDec}</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-200">
            <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">{t.trainWho}</div>
            <div className="flex flex-col gap-2">
              {target.map((tWord, rowIdx) => (
                <div key={rowIdx} className="flex items-center gap-2">
                  <div className="w-20 font-medium text-emerald-800 text-right">{tWord}</div>
                  <ArrowRight size={16} className="text-slate-400" />
                  <div className="flex gap-1">
                    {target.map((tWord2, colIdx) => (
                      <div 
                        key={colIdx} 
                        className={`w-16 h-8 flex items-center justify-center rounded text-xs font-bold ${
                          colIdx <= rowIdx 
                            ? 'bg-emerald-200 text-emerald-800' 
                            : 'bg-slate-200 text-slate-400 opacity-50'
                        }`}
                      >
                        {colIdx <= rowIdx ? <Eye size={14} /> : <EyeOff size={14} />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4 italic">{t.trainNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 3: INFERENCE ---
const InferenceVisualizer = ({ lang, t }) => {
  const [step, setStep] = useState(0);
  const inputPhrase = "Fix the bug";
  
  const outputSteps = lang === 'en' ? [
    { context: "[START]", prediction: "Ok," },
    { context: "[START] Ok,", prediction: "fixing" },
    { context: "[START] Ok, fixing", prediction: "the" },
    { context: "[START] Ok, fixing the", prediction: "bug!" },
    { context: "[START] Ok, fixing the bug!", prediction: "[END]" }
  ] : [
    { context: "[START]", prediction: "Ok," },
    { context: "[START] Ok,", prediction: "risolverò" },
    { context: "[START] Ok, risolverò", prediction: "il" },
    { context: "[START] Ok, risolverò il", prediction: "bug!" },
    { context: "[START] Ok, risolverò il bug!", prediction: "[END]" }
  ];

  const reset = () => setStep(0);
  const nextStep = () => {
    if (step < outputSteps.length) setStep(step + 1);
  };

  useEffect(() => setStep(0), [lang]);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{t.infTitle}</h2>
          <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: t.infDesc }}></p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors">
            <RefreshCw size={14} /> {t.infReset}
          </button>
          <button 
            onClick={nextStep} 
            disabled={step === outputSteps.length}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
              step === outputSteps.length 
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <StepForward size={14} /> {t.infNext}
          </button>
        </div>
      </div>

      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
            <h3 className="font-bold text-slate-700">{t.infEncTitle}</h3>
          </div>
          <div className="ml-10 bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">{t.infUserInput}</div>
              <div className="text-lg font-mono font-bold text-slate-800">"{inputPhrase}"</div>
            </div>
            <ArrowRight className="text-blue-400" />
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">{t.infEncOut}</div>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-8 bg-blue-500 rounded opacity-70 animate-pulse"></div>
                ))}
              </div>
              <div className="text-[10px] text-blue-500 text-center mt-1">Context Map</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</div>
            <h3 className="font-bold text-slate-700">{t.infDecTitle} {step}/{outputSteps.length})</h3>
          </div>
          <div className="ml-10 space-y-3">
            {outputSteps.slice(0, step).map((s, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm border border-emerald-200">
                <div className="w-48 text-right font-mono text-sm text-slate-500">{s.context}</div>
                <div className="bg-slate-100 px-3 py-1 rounded text-xs flex items-center gap-1 text-slate-500">
                  + <Layers size={12} className="text-blue-500"/> Context
                </div>
                <ArrowRight size={16} className="text-emerald-500" />
                <div className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                  {s.prediction}
                </div>
              </div>
            ))}
            {step < outputSteps.length && (
              <div className="flex items-center gap-4 bg-yellow-50 p-3 rounded-lg shadow-sm border border-yellow-300 opacity-80">
                <div className="w-48 text-right font-mono text-sm text-slate-600 italic">{outputSteps[step].context}</div>
                <div className="bg-white px-3 py-1 rounded text-xs flex items-center gap-1 text-slate-500 border border-slate-200">
                  + <Layers size={12} className="text-blue-500"/> Context
                </div>
                <ArrowRight size={16} className="text-yellow-500 animate-pulse" />
                <div className="font-bold text-slate-400 bg-white px-3 py-1 rounded border border-dashed border-slate-300">
                  {t.infWait}
                </div>
              </div>
            )}
            {step === outputSteps.length && (
              <div className="bg-emerald-500 text-white font-bold p-4 rounded-lg shadow-md text-center">
                {t.infDone} "{lang === 'en' ? 'Ok, fixing the bug!' : 'Ok, risolverò il bug!'}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 4: CHAT & DECODING (NEW) ---
const ChatVisualizer = ({ lang, t }) => {
  const [phase, setPhase] = useState('idle'); 
  const [generatedWords, setGeneratedWords] = useState([]);
  const [activeHeads, setActiveHeads] = useState([false, false, false, false, false, false, false, false]);
  const [showUnderHood, setShowUnderHood] = useState(false);
  
  const targetWords = useMemo(() => lang === 'en' ? ["Ok,", "fixing", "the", "bug!"] : ["Ok,", "risolverò", "il", "bug!"], [lang]);

  const softmaxData = useMemo(() => ({
    en: [
      [{w: "Ok,", p: 82}, {w: "Sure,", p: 12}, {w: "I", p: 6}],
      [{w: "fixing", p: 75}, {w: "resolving", p: 18}, {w: "will", p: 7}],
      [{w: "the", p: 94}, {w: "that", p: 4}, {w: "a", p: 2}],
      [{w: "bug!", p: 88}, {w: "issue!", p: 9}, {w: "error!", p: 3}],
      [{w: "[END]", p: 99}, {w: "now", p: 0.8}, {w: "soon", p: 0.2}]
    ],
    it: [
      [{w: "Ok,", p: 79}, {w: "Sì,", p: 15}, {w: "Risolvo", p: 6}],
      [{w: "risolverò", p: 65}, {w: "sistemo", p: 25}, {w: "aggiusto", p: 10}],
      [{w: "il", p: 92}, {w: "questo", p: 5}, {w: "lo", p: 3}],
      [{w: "bug!", p: 85}, {w: "problema!", p: 12}, {w: "errore!", p: 3}],
      [{w: "[END]", p: 98}, {w: "subito", p: 1.5}, {w: "ora", p: 0.5}]
    ]
  }), []);

  useEffect(() => {
    setPhase('idle');
    setGeneratedWords([]);
  }, [lang]);

  // Controlla se la generazione è completata
  useEffect(() => {
    if (phase === 'generating' && generatedWords.length === targetWords.length) {
      setPhase('done');
      setActiveHeads([false, false, false, false, false, false, false, false]);
    }
  }, [generatedWords.length, phase, targetWords.length]);

  // Gestione indipendente e sicura dei tick
  useEffect(() => {
    let wordInterval;
    let headInterval;

    if (phase === 'generating') {
      headInterval = setInterval(() => {
        setActiveHeads(prev => prev.map(() => Math.random() > 0.5));
      }, 200);

      wordInterval = setInterval(() => {
        setGeneratedWords(prev => {
          if (prev.length < targetWords.length) {
            return [...prev, targetWords[prev.length]];
          }
          return prev;
        });
      }, 1500); 
    }

    return () => {
      clearInterval(wordInterval);
      clearInterval(headInterval);
    };
  }, [phase, targetWords]);

  const handleSend = () => {
    if (phase !== 'idle') return;
    setPhase('userSent');
    setGeneratedWords([]);
    setShowUnderHood(false);
    
    setTimeout(() => {
      setPhase('thinking');
      setShowUnderHood(true);
      
      setTimeout(() => {
        setPhase('generating');
      }, 1500);
    }, 500);
  };

  const handleRestart = () => {
    setPhase('idle');
    setGeneratedWords([]);
    setShowUnderHood(false);
    setActiveHeads([false, false, false, false, false, false, false, false]);
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{t.chatTitle}</h2>
          <p className="text-slate-600">{t.chatDesc}</p>
        </div>
        {phase === 'done' && (
          <button onClick={handleRestart} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold rounded-md transition-colors">
            <RefreshCw size={14} /> {t.chatRestart}
          </button>
        )}
      </div>

      {/* CHAT INTERFACE */}
      <div className="flex-1 bg-slate-100 rounded-t-xl border-x border-t border-slate-200 p-4 min-h-[250px] flex flex-col justify-end space-y-4">
        
        {phase !== 'idle' && (
          <div className="flex items-start gap-3 justify-end animate-fade-in">
            <div className="bg-indigo-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm max-w-[80%]">
              {t.chatUserMsg}
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center shrink-0">
              <User size={16} className="text-indigo-700" />
            </div>
          </div>
        )}

        {(phase === 'thinking' || phase === 'generating' || phase === 'done') && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm">
              <Bot size={18} className="text-white" />
            </div>
            <div className={`p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%] ${phase === 'thinking' ? 'bg-slate-200 text-slate-500 italic' : 'bg-white text-slate-800'}`}>
              {phase === 'thinking' && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                  </div>
                  <span>{t.chatThinking}</span>
                </div>
              )}
              {phase !== 'thinking' && (
                <div className="font-medium text-lg">
                  <span>{generatedWords.join(' ')}</span>
                  {/* Testo Fantasma modificato in "..." */}
                  {phase === 'generating' && generatedWords.length < targetWords.length && (
                    <span className="text-slate-400 opacity-60 italic ml-1 select-none">
                      ...
                    </span>
                  )}
                  {phase === 'generating' && (
                    <span className="inline-block w-2 h-5 bg-emerald-500 ml-1 animate-pulse align-middle"></span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CHAT INPUT */}
      <div className="bg-white border border-slate-200 p-3 rounded-b-xl flex gap-2">
        <div className="flex-1 bg-slate-100 rounded-lg px-4 py-2 text-slate-500 flex items-center">
          {phase === 'idle' ? t.chatInput : t.chatUserMsg}
        </div>
        <button 
          onClick={handleSend}
          disabled={phase !== 'idle'}
          className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${
            phase === 'idle' ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {t.chatSend} <Send size={16} />
        </button>
      </div>

      {/* UNDER THE HOOD: DECODING ANIMATION */}
      <div className={`mt-6 transition-all duration-700 ease-in-out overflow-hidden ${showUnderHood ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-slate-800 rounded-xl shadow-inner p-5 text-slate-200 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <BrainCircuit size={120} />
          </div>

          <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wide text-sm">
            <Zap size={16} /> {t.chatUnderHood}
          </h3>

          <div className="flex flex-col md:flex-row gap-6 relative z-10">
            {/* Step 1: Context */}
            <div className="flex-1 bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="text-xs text-slate-400 font-bold uppercase mb-2">{t.chatContext}</div>
              <div className="font-mono bg-slate-900 p-2 rounded text-slate-300 text-sm h-12 flex items-center">
                [START] {generatedWords.join(' ')}
                {phase === 'generating' && <span className="w-1.5 h-4 bg-slate-500 ml-1 animate-pulse"></span>}
              </div>
            </div>

            {/* Step 2: Multi-Head Attention Processing */}
            <div className="flex-[1.5] bg-slate-700/50 rounded-lg p-4 border border-slate-600 flex flex-col justify-center">
              <div className="text-xs text-slate-400 font-bold uppercase mb-2 text-center">{t.chatHeads}</div>
              <div className="flex justify-center gap-2">
                {activeHeads.map((isActive, i) => (
                  <div key={i} className={`w-6 h-10 rounded-sm border transition-all duration-100 ${
                    isActive && phase === 'generating'
                      ? 'bg-purple-500 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] scale-110' 
                      : 'bg-slate-800 border-slate-600'
                  }`}></div>
                ))}
              </div>
              <div className="text-center mt-2 text-[10px] text-slate-500 uppercase tracking-widest">8 Heads Parallel compute</div>
          </div>

          {/* Step 3: Next Word Softmax */}
          <div className="flex-1 bg-slate-700/50 rounded-lg p-4 border border-emerald-900/50">
            <div className="text-xs text-emerald-400/70 font-bold uppercase mb-2">{t.chatPredict}</div>
            <div className="flex flex-col gap-2 h-full justify-center min-h-[4rem]">
              {(phase === 'generating' || phase === 'done') ? (
                softmaxData[lang][Math.min(generatedWords.length, 4)].map((pred, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className={`w-20 truncate text-right ${idx === 0 ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                      {pred.w}
                    </div>
                    <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${idx === 0 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-slate-500'}`} style={{width: `${pred.p}%`}}></div>
                    </div>
                    <div className={`w-10 text-right text-xs ${idx === 0 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                      {pred.p}%
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-emerald-400 animate-pulse font-bold text-xl flex items-center h-full">...</div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  </div>
);
};

export default App;