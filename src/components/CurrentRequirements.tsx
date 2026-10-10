import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  MapPin, 
  Package, 
  ArrowRight, 
  Plus, 
  Check, 
  Edit3, 
  Trash2, 
  MessageSquare,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { BUYING_REQUIREMENTS, COMPANY_INFO } from '../data/polymerData';
import { BuyingRequirementItem } from '../types';
import { useWordPressCms } from '../context/WordPressCmsContext';

interface CurrentRequirementsProps {
  onOpenRequirementModal: (material?: string) => void;
  onHaveStockOffer: (material: string) => void;
}

const STORAGE_KEY_REQUIREMENTS = 'newways_current_requirements_v1';

export const CurrentRequirements: React.FC<CurrentRequirementsProps> = ({
  onOpenRequirementModal,
  onHaveStockOffer,
}) => {
  const { isEditMode } = useWordPressCms();

  // Load from localStorage or initial BUYING_REQUIREMENTS
  const [requirements, setRequirements] = useState<BuyingRequirementItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REQUIREMENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore error
    }
    return [
      {
        id: 'req-1',
        material: 'POLYMER 5601 / 5603',
        gradeSpec: 'Injection Molding Grade',
        mfiTarget: 'MFI 10–12',
        targetLocation: 'Ex Bhiwandi',
        quantityMt: '60 MT / month',
        targetPrice: 'Competitive Spot Rate',
        timeline: 'Immediate Dispatch',
      },
      {
        id: 'req-2',
        material: 'PE100 REGRIND',
        gradeSpec: 'Clean Black Pipe Regrind',
        mfiTarget: 'MFI 0.2–0.4',
        targetLocation: 'India',
        quantityMt: '100 MT Lot',
        targetPrice: 'Subject to Sample Test',
        timeline: 'Within 7 Days',
      },
      {
        id: 'req-3',
        material: 'HDPE NATURAL MILK BOTTLE',
        gradeSpec: 'Hot Washed Natural Flakes',
        mfiTarget: 'MFI 0.7–0.9',
        targetLocation: 'India',
        quantityMt: '40 MT Lot',
        targetPrice: 'Best Offered Rate',
        timeline: 'Ongoing Contract',
      },
      {
        id: 'req-4',
        material: 'HDPE 200L REGRIND',
        gradeSpec: 'Blue Drum Washed Regrind',
        mfiTarget: 'MFI 0.05–0.08',
        targetLocation: 'India',
        quantityMt: '50 MT Ready Lot',
        targetPrice: 'Ex-Works / Delivered',
        timeline: 'Regular Procurement',
      },
    ];
  });

  // Save to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REQUIREMENTS, JSON.stringify(requirements));
    } catch (e) {
      // ignore
    }
  }, [requirements]);

  // Editing state for dynamic team updates
  const [isAddingReq, setIsAddingReq] = useState(false);
  const [newMaterial, setNewMaterial] = useState('');
  const [newLocation, setNewLocation] = useState('India');
  const [newQuantity, setNewQuantity] = useState('25 MT');
  const [newGrade, setNewGrade] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterial.trim()) return;

    const newReq: BuyingRequirementItem = {
      id: `req-${Date.now()}`,
      material: newMaterial.toUpperCase().trim(),
      gradeSpec: newGrade.trim() || 'Prime / Regrind',
      mfiTarget: 'Standard Spec',
      targetLocation: newLocation.trim() || 'India',
      quantityMt: newQuantity.trim() || '25 MT',
      targetPrice: 'Best Spot Quote',
      timeline: 'Immediate',
    };

    setRequirements((prev) => [newReq, ...prev]);
    setNewMaterial('');
    setNewGrade('');
    setNewQuantity('25 MT');
    setNewLocation('India');
    setIsAddingReq(false);
  };

  const handleDeleteRequirement = (id: string) => {
    if (confirm('Delete this sourcing requirement?')) {
      setRequirements((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSendToWhatsApp = (req: BuyingRequirementItem) => {
    const text = encodeURIComponent(
      `*NEWWAYS ENTERPRISE — SOURCING REQUIREMENT ENQUIRY*\n` +
      `Regarding Active Requirement: *${req.material}*\n` +
      `Location: Requirement • ${req.targetLocation}\n` +
      `Quantity Needed: ${req.quantityMt}\n` +
      `I have available stock / want to supply this material.`
    );
    window.open(`https://wa.me/919879747777?text=${text}`, '_blank');
  };

  return (
    <section id="requirements" className="py-14 md:py-20 bg-gradient-to-b from-[#07162c] via-[#091e38] to-[#07162c] text-white border-y border-sky-900/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/70 border border-blue-500/50 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></span>
              <span>🔵 CURRENT POLYMER REQUIREMENTS</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              We are currently sourcing:
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-2 max-w-xl">
              Verified active procurement inquiries from our nationwide manufacturing network. Have stock? Connect directly with our trading desk.
            </p>
          </div>

          {/* Action Button & Team Management */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRequirementModal()}
              className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-600/30 flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>SUBMIT YOUR REQUIREMENT</span>
            </button>

            {/* Quick button for team to add item in dynamic mode */}
            <button
              onClick={() => setIsAddingReq(!isAddingReq)}
              className="px-4 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Add a new requirement to this dynamic section"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAddingReq ? 'Close Editor' : '+ Add Requirement (Dynamic)'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Add Form for Team */}
        {isAddingReq && (
          <form onSubmit={handleAddRequirement} className="mb-8 p-5 rounded-2xl bg-slate-900/90 border border-sky-500/40 shadow-xl space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Add Live Requirement (Saved in Browser & Exportable to WordPress)
              </span>
              <button 
                type="button" 
                onClick={() => setIsAddingReq(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Material Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PPCP BLACK REGRIND"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Grade / Specification</label>
                <input
                  type="text"
                  placeholder="e.g. Battery Box Flakes"
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Quantity Needed</label>
                <input
                  type="text"
                  placeholder="e.g. 50 MT / month"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Requirement Location</label>
                <input
                  type="text"
                  placeholder="e.g. Ex Bhiwandi / Gujarat"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingReq(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs"
              >
                Publish Requirement
              </button>
            </div>
          </form>
        )}

        {/* 4 Cards Grid - Matches user specification exactly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {requirements.map((req, idx) => (
            <div 
              key={req.id}
              className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#07162c] border border-sky-800/50 hover:border-cyan-400 p-5 shadow-lg transition-all transform hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Header Badge */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-950/90 border border-blue-600/50 text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>LIVE REQUIREMENT</span>
                  </span>

                  {/* Delete button if in edit mode or adding */}
                  {isAddingReq && (
                    <button
                      onClick={() => handleDeleteRequirement(req.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete requirement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Material Headline */}
                <h3 className="text-base md:text-lg font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors uppercase leading-snug">
                  {req.material}
                </h3>

                {/* Subtitle location badge (e.g. Requirement • Ex Bhiwandi or Requirement • India) */}
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Requirement • {req.targetLocation}</span>
                </div>

                {/* Specs list */}
                <div className="mt-4 pt-3 border-t border-sky-900/60 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Volume:</span>
                    <span className="font-semibold text-white">{req.quantityMt}</span>
                  </div>
                  {req.mfiTarget && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Target Spec:</span>
                      <span className="font-semibold text-slate-200">{req.mfiTarget}</span>
                    </div>
                  )}
                  {req.gradeSpec && (
                    <div className="text-[11px] text-slate-400 italic line-clamp-1">
                      {req.gradeSpec}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-sky-900/60 flex items-center gap-2">
                <button
                  onClick={() => onHaveStockOffer(req.material)}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-[11px] uppercase tracking-wider rounded-lg shadow text-center transition-all flex items-center justify-center gap-1"
                >
                  <span>I HAVE STOCK</span>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => handleSendToWhatsApp(req)}
                  className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex-shrink-0"
                  title="Enquire on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic update footnote */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            * This section is updated dynamically by Newways trade desk. Looking for another polymer grade?{' '}
            <button
              onClick={() => onOpenRequirementModal()}
              className="text-cyan-400 hover:text-cyan-300 underline font-semibold ml-1"
            >
              Submit custom buying requirement →
            </button>
          </p>
        </div>

      </div>
    </section>
  );
};
