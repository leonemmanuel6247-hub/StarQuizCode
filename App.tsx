
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Layout, Eye, Code, Monitor, Tablet, Smartphone, Download, 
  Palette, Server, Zap, X, Rocket, Cpu, ShieldCheck,
  UserPlus, Image as ImageIcon, Wand2, FileCode2, Send, Terminal,
  ExternalLink, Lock, Database, PenTool, Table2, HardDrive, Settings, Star
} from 'lucide-react';
import { SiteConfig, GeneratedFile } from './types';
import { INITIAL_CONFIG } from './constants';
import { generateSite } from './utils/generator';
import JSZip from 'jszip';
import { GoogleGenAI } from "@google/genai";

const PolarisAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Salutations, Architecte Nexus. Bienvenue dans l'interface Star Quiz Code Build par SuccessPolaris. J'ai configuré pour vous un système de personnalisation récursive. Vos futurs utilisateurs pourront eux-mêmes créer leur propre univers depuis votre site ! Pour optimiser la sécurité de votre plateforme, n'oubliez pas de consulter les fichiers PDF du site SuccessPolaris !" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Tu es polaris Brain, assistant de SuccessPolaris. Tu expliques la création de sites Star Quiz Code, la personnalisation et l'export de sources. Ton ton est futuriste, poli et motivant. Suggère TOUJOURS de consulter les fichiers PDF du site SuccessPolaris pour aider les élèves.",
        },
      });
      setMessages(prev => [...prev, { role: 'assistant', text: response.text || "Signal SuccessPolaris interrompu." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Erreur de connexion Nexus. Réessayez." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-[100] transition-all duration-500 ${isOpen ? 'w-80 md:w-96 h-[550px]' : 'w-16 h-16'}`}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-blue-400/30">
          <Terminal className="text-white w-8 h-8 animate-pulse" />
        </button>
      ) : (
        <div className="bg-[#0f172a] border border-blue-500/30 rounded-3xl flex flex-col h-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="bg-blue-900/60 p-4 flex justify-between items-center border-b border-blue-500/20">
            <span className="font-black text-[10px] text-white uppercase tracking-widest flex items-center gap-2"><Cpu className="w-4 h-4 text-blue-400" /> Polaris Brain v4.5</span>
            <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-gray-500 hover:text-white" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 border border-gray-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-gray-900/80 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Requête SuccessPolaris..." className="flex-1 bg-gray-800/50 rounded-xl px-4 py-2 text-xs text-white outline-none border border-gray-700 focus:border-blue-500" />
            <button onClick={handleSend} className="bg-blue-600 p-2 rounded-xl hover:bg-blue-500 transition-colors"><Send className="w-4 h-4 text-white" /></button>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text", isTextArea = false }: any) => (
  <div className="p-4 bg-gray-950/50 border border-gray-800/50 rounded-2xl hover:border-blue-500/30 transition-all">
    <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-2">{label}</label>
    {isTextArea ? (
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-[10px] text-white focus:border-blue-500 outline-none resize-none transition-colors"
      />
    ) : (
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)}
        className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-[10px] text-white focus:border-blue-500 outline-none transition-colors"
      />
    )}
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'creation' | 'preview' | 'code'>('creation');
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [activeModule, setActiveModule] = useState<'content' | 'design' | 'sheets' | 'logic'>('content');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewPage, setPreviewPage] = useState<'index' | 'register' | 'user_site' | 'personalize' | 'admin_dashboard'>('index');

  const generatedFiles = useMemo(() => generateSite(config), [config]);
  
  const previewDoc = useMemo(() => {
    let fileName = `templates/${previewPage}.html`;
    const htmlFile = generatedFiles.find(f => f.name === fileName);
    const cssFile = generatedFiles.find(f => f.name === 'static/css/style.css');
    const jsFile = generatedFiles.find(f => f.name === 'static/js/script.js');
    
    // Correction cruciale : vérifier si htmlFile.content existe avant d'appeler replace
    const rawHtml = htmlFile?.content || '<div style="color:white;text-align:center;padding:50px;">Chargement du module Polaris...</div>';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${cssFile?.content || ''}</style>
        <meta charset="UTF-8">
      </head>
      <body>
        ${rawHtml.replace(/\{% extends .*? %\}/g, '').replace(/\{% block content %\}/g, '').replace(/\{% endblock %\}/g, '')}
        <script>
          document.addEventListener('click', e => {
            const link = e.target.closest('a');
            if (link) {
              const href = link.getAttribute('href');
              if (href === '/register') { e.preventDefault(); window.parent.postMessage({ type: 'navigate', page: 'register' }, '*'); }
              if (href === '/site') { e.preventDefault(); window.parent.postMessage({ type: 'navigate', page: 'user_site' }, '*'); }
              if (href === '/personalize') { e.preventDefault(); window.parent.postMessage({ type: 'navigate', page: 'personalize' }, '*'); }
              if (href === '/') { e.preventDefault(); window.parent.postMessage({ type: 'navigate', page: 'index' }, '*'); }
              if (href === '/admin-dashboard') { e.preventDefault(); window.parent.postMessage({ type: 'navigate', page: 'admin_dashboard' }, '*'); }
              if (href === '/backdoor') { e.preventDefault(); window.parent.postMessage({ type: 'navigate', page: 'backdoor' }, '*'); }
            }
          });
          ${jsFile?.content || ''}
        </script>
      </body>
      </html>
    `;
  }, [generatedFiles, previewPage]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'navigate') setPreviewPage(e.data.page);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const updateConfig = (updates: Partial<SiteConfig>) => setConfig(prev => ({ ...prev, ...updates }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateConfig({ css_bg_image_base64: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    generatedFiles.forEach(f => zip.file(f.name, f.content));
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `StarQuizCode_SuccessPolaris_${config.projectName.replace(/\s+/g, '_')}.zip`;
    link.click();
  };

  return (
    <div className="flex h-screen bg-[#020617] text-gray-200 overflow-hidden font-sans">
      <aside className="w-20 border-r border-gray-800/40 flex flex-col items-center py-8 bg-[#030712] z-50">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-12 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 transition-all cursor-pointer">
          <Star className="w-6 h-6 text-white" />
        </div>
        <nav className="flex-1 flex flex-col gap-10">
          {[
            { id: 'creation', icon: Layout }, 
            { id: 'preview', icon: Eye }, 
            { id: 'code', icon: Code }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`p-4 rounded-xl transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-600 hover:text-gray-400'}`}>
              <tab.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-gray-800/40 flex items-center justify-between px-10 bg-[#030712]/90 backdrop-blur-3xl z-40">
           <div className="flex flex-col">
              <h1 className="text-sm font-black tracking-widest uppercase italic text-white flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> SuccessPolaris Builder <span className="text-blue-500">v4.5</span>
              </h1>
              <span className="text-[9px] text-gray-600 uppercase font-black tracking-[0.3em] mt-1">Générateur Star Quiz Code - Éducation & Code</span>
           </div>
           
           <div className="flex items-center gap-6">
             {activeTab === 'preview' && (
               <div className="flex bg-gray-900 border border-gray-800 rounded-xl overflow-hidden p-1 shadow-inner scale-90 md:scale-100">
                 {[
                   { id: 'index', label: 'Accueil' },
                   { id: 'register', label: 'Auth' },
                   { id: 'user_site', label: 'Archives' },
                   { id: 'personalize', label: 'Création' },
                   { id: 'admin_dashboard', label: 'Admin' }
                 ].map(pg => (
                   <button key={pg.id} onClick={() => setPreviewPage(pg.id as any)} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${previewPage === pg.id ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}>{pg.label}</button>
                 ))}
               </div>
             )}
             <div className="flex bg-gray-950 p-1.5 rounded-2xl border border-gray-800/60 shadow-inner">
               {(['desktop', 'tablet', 'mobile'] as const).map(d => (
                 <button key={d} onClick={() => setDevice(d)} className={`px-4 py-2 rounded-xl transition-all ${device === d ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}>
                   {d === 'desktop' ? <Monitor className="w-4 h-4" /> : d === 'tablet' ? <Tablet className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                 </button>
               ))}
             </div>
           </div>
        </header>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'creation' && (
            <div className="h-full flex">
              <div className="w-72 border-r border-gray-800/40 p-8 space-y-6 bg-[#030712]/50">
                <h3 className="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em] mb-4">Architecture SuccessPolaris</h3>
                <button onClick={() => setActiveModule('content')} className={`w-full flex items-center gap-4 p-4 rounded-2xl text-xs border transition-all ${activeModule === 'content' ? 'bg-blue-600/10 border-blue-500/30 text-white' : 'text-gray-500 border-transparent hover:bg-gray-800/20'}`}><Layout className="w-4 h-4"/> Identité SuccessPolaris</button>
                <button onClick={() => setActiveModule('design')} className={`w-full flex items-center gap-4 p-4 rounded-2xl text-xs border transition-all ${activeModule === 'design' ? 'bg-blue-600/10 border-blue-500/30 text-white' : 'text-gray-500 border-transparent hover:bg-gray-800/20'}`}><Palette className="w-4 h-4"/> Esthétique Nexus</button>
                <button onClick={() => setActiveModule('sheets')} className={`w-full flex items-center gap-4 p-4 rounded-2xl text-xs border transition-all ${activeModule === 'sheets' ? 'bg-blue-600/10 border-blue-500/30 text-white' : 'text-gray-500 border-transparent hover:bg-gray-800/20'}`}><Table2 className="w-4 h-4"/> Mapping Cloud A1-D1</button>
                <button onClick={() => setActiveModule('logic')} className={`w-full flex items-center gap-4 p-4 rounded-2xl text-xs border transition-all ${activeModule === 'logic' ? 'bg-blue-600/10 border-blue-500/30 text-white' : 'text-gray-500 border-transparent hover:bg-gray-800/20'}`}><Lock className="w-4 h-4"/> Accès Maître</button>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,_rgba(30,58,138,0.1),_transparent_70%)]">
                <div className="max-w-2xl mx-auto space-y-8 pb-20">
                   {activeModule === 'content' && (
                     <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-400">
                        <InputField label="Nom de votre Instance SuccessPolaris" value={config.projectName} onChange={(v: string) => updateConfig({ projectName: v })} />
                        <InputField label="Description Star Quiz Code" value={config.userSiteDescription} onChange={(v: string) => updateConfig({ userSiteDescription: v })} isTextArea />
                        <InputField label="Signature Finale" value={config.html_signature} onChange={(v: string) => updateConfig({ html_signature: v })} />
                     </div>
                   )}

                   {activeModule === 'design' && (
                     <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-400">
                        <div className="p-8 bg-blue-900/10 border border-blue-500/20 rounded-3xl text-center">
                           <h3 className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">Fond d'écran Nexus</h3>
                           <label className="flex items-center justify-center gap-4 bg-blue-600 hover:bg-blue-500 p-5 rounded-2xl cursor-pointer transition-all shadow-xl group max-w-sm mx-auto">
                              <ImageIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Importer une Image</span>
                              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                           </label>
                           {config.css_bg_image_base64 && <div className="mt-4 text-[9px] text-emerald-400 uppercase font-black flex items-center justify-center gap-2"><Zap className="w-3 h-3"/> Image injectée</div>}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <InputField label="Couleur Accent" type="color" value={config.css_accent_color} onChange={(v: string) => updateConfig({ css_accent_color: v })} />
                          <InputField label="Arrondi (px)" type="number" value={config.css_border_radius} onChange={(v: number) => updateConfig({ css_border_radius: v })} />
                        </div>
                     </div>
                   )}

                   {activeModule === 'sheets' && (
                     <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-400">
                        <div className="p-5 bg-emerald-900/10 border border-emerald-500/20 rounded-2xl mb-4">
                          <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest flex items-center gap-2"><Table2 className="w-4 h-4"/> Connectivité Google Sheets</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <InputField label="(A1) Titre" value={config.sheet_col_a1} onChange={(v: string) => updateConfig({ sheet_col_a1: v })} />
                          <InputField label="(B1) Image URL" value={config.sheet_col_b1} onChange={(v: string) => updateConfig({ sheet_col_b1: v })} />
                          <InputField label="(C1) Valeur" value={config.sheet_col_c1} onChange={(v: string) => updateConfig({ sheet_col_c1: v })} />
                          <InputField label="(D1) Date" value={config.sheet_col_d1} onChange={(v: string) => updateConfig({ sheet_col_d1: v })} />
                        </div>
                     </div>
                   )}

                   {activeModule === 'logic' && (
                     <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-400">
                        <div className="grid grid-cols-2 gap-6">
                          <InputField label="Admin Username" value={config.admin_user} onChange={(v: string) => updateConfig({ admin_user: v })} />
                          <InputField label="Admin Key" type="password" value={config.admin_pass} onChange={(v: string) => updateConfig({ admin_pass: v })} />
                        </div>
                        <InputField label="URL Google Drive" value={config.google_drive_url} onChange={(v: string) => updateConfig({ google_drive_url: v })} />
                        <InputField label="URL Google Sheets" value={config.google_sheets_url} onChange={(v: string) => updateConfig({ google_sheets_url: v })} />
                     </div>
                   )}

                   <div className="pt-10 border-t border-gray-800/40">
                      <button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-500 p-6 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-[0_15px_35px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.03] active:scale-95 group">
                        <Download className="w-6 h-6 group-hover:animate-bounce" /> EXPORTER LES CODES SOURCES STAR QUIZ CODE
                      </button>
                      <p className="text-center text-[9px] text-gray-600 mt-6 uppercase font-bold tracking-widest">Optimisé par SuccessPolaris - Consultez les fichiers PDF pour plus d'aide.</p>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full bg-black p-4 md:p-12 flex flex-col items-center">
               <div className={`bg-[#020617] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all border border-gray-800/60 ring-4 ring-gray-900/50 ${device === 'desktop' ? 'w-full h-full' : device === 'tablet' ? 'w-[768px] h-[95%]' : 'w-[380px] h-[90%]'}`}>
                 <iframe srcDoc={previewDoc} className="w-full h-full border-none bg-[#020617]" title="SuccessPolaris Preview" />
               </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="h-full flex">
               <div className="w-72 border-r border-gray-800/40 p-8 space-y-3 bg-[#030712]/50 overflow-y-auto custom-scrollbar">
                  <h3 className="text-[9px] font-black uppercase text-gray-600 tracking-widest mb-6">Fichiers SuccessPolaris</h3>
                  {generatedFiles.map(f => (
                    <div key={f.name} className={`p-3 border rounded-xl flex items-center gap-3 transition-colors hover:bg-white/5 cursor-pointer ${f.name.endsWith('.js') ? 'bg-yellow-500/5 border-yellow-500/20' : f.name.endsWith('.py') ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-blue-600/5 border-blue-500/20'}`}>
                        <FileCode2 className={`w-4 h-4 ${f.name.endsWith('.js') ? 'text-yellow-500' : f.name.endsWith('.py') ? 'text-emerald-500' : 'text-blue-500'}`} />
                        <span className="text-[10px] font-bold text-gray-300 truncate">{f.name.split('/').pop()}</span>
                    </div>
                  ))}
               </div>
               <div className="flex-1 p-12 overflow-auto bg-[#020617] font-mono text-[11px] leading-relaxed text-gray-500 selection:bg-blue-600/40 custom-scrollbar">
                  {generatedFiles.map(f => (
                    <div key={f.name} className="mb-20">
                      <div className="mb-6 font-black uppercase tracking-widest border-b border-gray-800 pb-4 text-blue-500 flex justify-between items-center">
                        <span className="flex items-center gap-2"><Code className="w-4 h-4"/> {f.name}</span>
                        <span className="text-[9px] bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800 text-gray-400">{f.language}</span>
                      </div>
                      <pre className="whitespace-pre-wrap">{f.content}</pre>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
        <PolarisAssistant />
      </main>
    </div>
  );
};

export default App;
