"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Users,
  Activity,
  TrendingUp,
  Zap,
  BarChart3,
  MessageSquare,
  ChevronRight,
  Circle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Lead = {
  id: string;
  name: string;
  agency: string;
  status: "cold" | "warm" | "hot" | "demo";
  platform: string;
  mrr: number;
};

type Agent = {
  id: string;
  name: string;
  division: string;
  status: "active" | "idle" | "running";
  lastRun: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const LEADS: Lead[] = [
  { id: "1", name: "Stefan M.", agency: "Social Masters GmbH", status: "hot", platform: "Instagram + TikTok", mrr: 2500 },
  { id: "2", name: "Julia K.", agency: "KreativHub", status: "demo", platform: "TikTok", mrr: 1500 },
  { id: "3", name: "Markus B.", agency: "B2B Growth AG", status: "warm", platform: "LinkedIn", mrr: 3000 },
  { id: "4", name: "Anna S.", agency: "Content Factory", status: "cold", platform: "Instagram", mrr: 1500 },
];

const AGENTS: Agent[] = [
  { id: "1", name: "Content DNA Analyzer", division: "Analysis", status: "active", lastRun: "vor 2h" },
  { id: "2", name: "Instagram Coach", division: "Analytics", status: "running", lastRun: "läuft gerade" },
  { id: "3", name: "TikTok Coach", division: "Analytics", status: "active", lastRun: "vor 1h" },
  { id: "4", name: "LinkedIn Competitors", division: "Intel", status: "idle", lastRun: "vor 8h" },
  { id: "5", name: "Reddit Scraper", division: "Lead Gen", status: "active", lastRun: "vor 30min" },
];

const NORTH_STAR = "Bringt das uns näher zu zahlenden DACH-Kunden?";
const TARGET_MRR = 5000;
const CURRENT_MRR = 0;
const PIPELINE_VALUE = LEADS.reduce((sum, l) => sum + (l.status !== "cold" ? l.mrr : 0), 0);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  cold:  { label: "Cold",  color: "bg-neutral-200 text-neutral-600" },
  warm:  { label: "Warm",  color: "bg-amber-100  text-amber-700"   },
  hot:   { label: "Hot",   color: "bg-red-100    text-red-700"     },
  demo:  { label: "Demo",  color: "bg-emerald-100 text-emerald-700" },
};

const AGENT_STATUS = {
  active:  { dot: "bg-emerald-500", label: "Aktiv"  },
  running: { dot: "bg-blue-500 animate-pulse", label: "Läuft" },
  idle:    { dot: "bg-neutral-300", label: "Idle"   },
};

// ─── Subcomponents ────────────────────────────────────────────────────────────

function MetricCard({ icon: Icon, label, value, sub, color = "text-neutral-900" }: {
  icon: React.ElementType; label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm"
    >
      <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-semibold uppercase tracking-widest mb-2">
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-xs text-neutral-400 mt-0.5">{sub}</div>}
    </motion.div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const cfg = STATUS_CONFIG[lead.status];
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{lead.name}</div>
        <div className="text-xs text-neutral-400 truncate">{lead.agency}</div>
      </div>
      <div className="flex items-center gap-2 ml-3 shrink-0">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>
          {cfg.label}
        </span>
        <span className="text-sm font-bold text-emerald-600">€{lead.mrr.toLocaleString()}</span>
      </div>
    </div>
  );
}

function AgentRow({ agent }: { agent: Agent }) {
  const cfg = AGENT_STATUS[agent.status];
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-neutral-100 last:border-0">
      <div className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{agent.name}</div>
        <div className="text-xs text-neutral-400">{agent.division} · {agent.lastRun}</div>
      </div>
      <span className="text-xs text-neutral-400 shrink-0">{cfg.label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CommandCenter() {
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "agents">("overview");
  const progress = Math.min((CURRENT_MRR / TARGET_MRR) * 100, 100);

  return (
    <div className="min-h-screen bg-neutral-50 pb-24 font-sans">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-neutral-100 shadow-sm px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span className="text-lg font-bold tracking-tight">FlowGen</span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">Command Center v1.0</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-neutral-400">Nordstern</div>
            <div className="text-xs font-medium text-neutral-600 max-w-[160px] text-right leading-tight">
              {NORTH_STAR}
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 pt-5 space-y-5 max-w-lg mx-auto">

        {/* MRR Goal Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl text-white shadow-md"
        >
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-widest mb-3">
            <Target className="w-4 h-4" />
            <span>MRR Ziel</span>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-5xl font-bold">€{CURRENT_MRR.toLocaleString()}</span>
            <span className="text-emerald-300 text-sm mb-1">/ €{TARGET_MRR.toLocaleString()} Ziel</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-emerald-800 rounded-full h-2 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="bg-white h-2 rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs text-emerald-300">
            <span>{progress.toFixed(0)}% erreicht</span>
            <span>Pipeline: €{PIPELINE_VALUE.toLocaleString()}</span>
          </div>
        </motion.section>

        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <MetricCard icon={TrendingUp} label="Pipeline" value={`€${PIPELINE_VALUE.toLocaleString()}`} color="text-amber-600" />
          <MetricCard icon={Users} label="Leads" value={`${LEADS.length}`} sub={`${LEADS.filter(l => l.status === "hot" || l.status === "demo").length} warm+`} />
          <MetricCard icon={Activity} label="Agents" value={`${AGENTS.filter(a => a.status !== "idle").length}/${AGENTS.length}`} sub="aktiv" color="text-emerald-600" />
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-xl border border-neutral-100 p-1 shadow-sm">
          {(["overview", "leads", "agents"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {tab === "overview" ? "Übersicht" : tab === "leads" ? "Leads" : "Agents"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Top Leads */}
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold">Top Leads</h2>
                  <button onClick={() => setActiveTab("leads")} className="text-xs text-emerald-600 flex items-center gap-0.5">
                    Alle <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                {LEADS.filter(l => l.status !== "cold").map(lead => (
                  <LeadRow key={lead.id} lead={lead} />
                ))}
              </div>

              {/* Active Agents */}
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold">Aktive Agents</h2>
                  <button onClick={() => setActiveTab("agents")} className="text-xs text-emerald-600 flex items-center gap-0.5">
                    Alle <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                {AGENTS.filter(a => a.status !== "idle").map(agent => (
                  <AgentRow key={agent.id} agent={agent} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "leads" && (
            <motion.div
              key="leads"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5"
            >
              <h2 className="text-sm font-bold mb-3">Lead Pipeline</h2>
              {LEADS.map(lead => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </motion.div>
          )}

          {activeTab === "agents" && (
            <motion.div
              key="agents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5"
            >
              <h2 className="text-sm font-bold mb-3">Agent Swarm</h2>
              {AGENTS.map(agent => (
                <AgentRow key={agent.id} agent={agent} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
