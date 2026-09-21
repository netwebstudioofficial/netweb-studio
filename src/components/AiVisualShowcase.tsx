import React, { useState } from "react";
import {
  Bot,
  Cpu,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Send,
  MessageSquare,
  Workflow,
  ShieldCheck,
  Activity,
  Database,
  Calendar,
} from "lucide-react";
import { FaTelegram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MobileCardSlider } from "./MobileCardSlider";

export const AiVisualShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"chatbot" | "automation">("chatbot");

  // Chatbot state for interactive simulation
  const [messages, setMessages] = useState<
    Array<{ sender: "bot" | "user"; text: string; time: string }>
  >([
    {
      sender: "bot",
      text: "Hello! Welcome to NETWEB STUDIO. I'm your autonomous AI concierge. How can I assist your business today?",
      time: "Just now",
    },
    {
      sender: "user",
      text: "Can you build an AI chatbot integrated with Telegram and our CRM?",
      time: "Just now",
    },
    {
      sender: "bot",
      text: "Absolutely. We build multi-turn conversational agents with custom vector knowledge (RAG), seamless Telegram Bot API connectivity, and instant two-way CRM lead logging.",
      time: "Just now",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    "What AI models do you deploy?",
    "Can you automate lead qualification?",
    "How does Telegram booking work?",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      sender: "user" as const,
      text: query,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply =
        "We tailor every AI deployment specifically to your workflow constraints. Our systems maintain sub-200ms latency with 100% data privacy and human escalation fallbacks.";
      if (query.toLowerCase().includes("model") || query.toLowerCase().includes("deploy")) {
        botReply =
          "We deploy state-of-the-art models including Gemini 1.5/2.0 Pro, Claude 3.5 Sonnet, and GPT-4o with custom embeddings and Pinecone vector stores tailored to your exact business documents.";
      } else if (query.toLowerCase().includes("lead") || query.toLowerCase().includes("qualif")) {
        botReply =
          "Our autonomous agents ask targeted qualifying questions, evaluate budget and urgency in real-time, update deal stages in your CRM, and ping high-intent alerts directly to your sales team.";
      } else if (query.toLowerCase().includes("telegram") || query.toLowerCase().includes("book")) {
        botReply =
          "Customers chat naturally on Telegram. The agent checks live slot availability, schedules calendar appointments, captures contact details, and sends instant confirmation notifications.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot" as const,
          text: botReply,
          time: "Just now",
        },
      ]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div
      className="relative rounded-2xl bg-[#0d100d] border border-white/[0.12] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(163,255,18,0.08)]"
      id="ai-visual-showcase"
    >
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-[#A3FF12] via-emerald-400 to-[#A3FF12]" />

      {/* Header with Switcher Tabs */}
      <div className="p-6 sm:p-8 border-b border-white/[0.08] bg-[#090b09] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#141a14] border border-[#A3FF12]/30 text-[#A3FF12] text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE AI SUITE VISUALIZER</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            SEE OUR AI ARCHITECTURE IN ACTION
          </h3>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-[#121612] p-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("chatbot")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "chatbot"
                ? "bg-[#A3FF12] text-[#080A08] shadow-[0_0_15px_rgba(163,255,18,0.3)]"
                : "text-[#A7ADA5] hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Virtual Concierge</span>
          </button>
          <button
            onClick={() => setActiveTab("automation")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "automation"
                ? "bg-[#A3FF12] text-[#080A08] shadow-[0_0_15px_rgba(163,255,18,0.3)]"
                : "text-[#A7ADA5] hover:text-white"
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>Autonomous Pipeline</span>
          </button>
        </div>
      </div>

      {/* Tab 1: AI Chatbot Interactive Simulator */}
      {activeTab === "chatbot" && (
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Chat Simulator Visual */}
          <div className="lg:col-span-7 rounded-xl bg-[#090b09] border border-white/[0.08] overflow-hidden flex flex-col h-[460px] shadow-2xl">
            {/* Top Chat Bar */}
            <div className="p-3.5 bg-[#121612] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#182418] border border-[#A3FF12]/40 flex items-center justify-center text-[#A3FF12]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#A3FF12] border border-[#090b09] animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">NETWEB AI Agent v2.4</p>
                  <p className="text-[10px] font-mono text-[#A3FF12] mt-0.5">Live RAG • Sub-180ms Latency</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#A7ADA5]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ONLINE 24/7</span>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-[#182418] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] sm:max-w-[75%] p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-[#A3FF12] text-[#080A08] font-medium rounded-tr-none"
                        : "bg-[#141914] text-[#E8ECE5] border border-white/[0.08] rounded-tl-none leading-relaxed"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] block mt-1 ${
                        msg.sender === "user" ? "text-black/60 text-right" : "text-[#A7ADA5]"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#A7ADA5] pl-8">
                  <div className="flex items-center gap-1 bg-[#141914] px-3 py-2 rounded-xl border border-white/[0.08]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Sample prompt quick chips */}
            <div className="px-4 py-2 bg-[#0d100d] border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-[#A7ADA5] shrink-0">Try asking:</span>
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="text-[10.5px] px-2.5 py-1 rounded bg-[#161c16] hover:bg-[#1f291f] text-[#A3FF12] border border-[#A3FF12]/20 hover:border-[#A3FF12]/50 whitespace-nowrap transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-[#121612] border-t border-white/[0.08] flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask our AI agent anything about your project..."
                className="flex-1 bg-[#090b09] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-[#A7ADA5]/60 focus:outline-none focus:border-[#A3FF12]"
              />
              <button
                onClick={() => handleSend()}
                className="w-8 h-8 rounded-lg bg-[#A3FF12] text-[#080A08] flex items-center justify-center font-bold hover:bg-[#96f20d] transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Technical Capabilities & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest block mb-1">
                Multi-Channel Deployment
              </span>
              <h4 className="text-2xl font-extrabold text-white tracking-tight">
                OMNICHANNEL CONVERSATIONAL AI
              </h4>
              <p className="text-sm text-[#A7ADA5] mt-2 leading-relaxed">
                Connect your business knowledge directly to customers across website widgets, Telegram, and internal team channels without human latency.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#121612] border border-white/[0.08] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#192419] border border-white/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                  <FaTelegram className="w-4 h-4 text-[#2AABEE]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Direct Telegram Concierge</p>
                  <p className="text-[11px] text-[#A7ADA5] mt-0.5">
                    Takes customer orders, answers FAQs, and books appointments directly inside Telegram.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121612] border border-white/[0.08] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#192419] border border-white/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                  <Database className="w-4 h-4 text-[#A3FF12]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Custom RAG Knowledge Vectorization</p>
                  <p className="text-[11px] text-[#A7ADA5] mt-0.5">
                    Zero hallucinations. Grounded strictly in your pricing sheets, menu PDFs, and policies.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121612] border border-white/[0.08] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#192419] border border-white/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Smart Human Escalation</p>
                  <p className="text-[11px] text-[#A7ADA5] mt-0.5">
                    Seamlessly transfers high-intent enterprise deals to your direct Telegram or phone.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact?service=AI%20Chatbots"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#A3FF12] hover:text-white transition-colors group font-mono"
              >
                <span>DEPLOY AN AI CHATBOT FOR YOUR BUSINESS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Autonomous Automation Pipeline Visualizer */}
      {activeTab === "automation" && (
        <div className="p-6 sm:p-8 space-y-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest block mb-1">
              Architecture Blueprint
            </span>
            <h4 className="text-2xl font-extrabold text-white tracking-tight">
              AUTONOMOUS 5-STAGE BUSINESS ENGINE
            </h4>
            <p className="text-sm text-[#A7ADA5] mt-2 leading-relaxed">
              Eliminate manual data entry, follow-up delays, and lost leads. See how our bespoke AI pipelines process incoming traffic autonomously.
            </p>
          </div>

          {/* Interactive Flow Nodes */}
          <MobileCardSlider
            desktopGridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5"
            cardWidthClassName="w-[78vw] max-w-[280px] sm:w-auto"
            swipeHintLabel="Swipe pipeline"
          >
            {[
              {
                step: "01",
                icon: MessageSquare,
                title: "Traffic Ingestion",
                desc: "Lead submits website form, Telegram inquiry, or email.",
                status: "Incoming Stream",
              },
              {
                step: "02",
                icon: Cpu,
                title: "AI Intent Parsing",
                desc: "LLM parses budget, urgency, sector, and intent.",
                status: "Gemini 2.0 / GPT-4",
              },
              {
                step: "03",
                icon: Database,
                title: "CRM Auto-Sync",
                desc: "Contact is enriched and deal stage is generated automatically.",
                status: "HubSpot / Notion / SQL",
              },
              {
                step: "04",
                icon: Calendar,
                title: "Calendar Booking",
                desc: "Smart slot reservation offered with instant calendar sync.",
                status: "Google / Calendly",
              },
              {
                step: "05",
                icon: Zap,
                title: "Instant Telegram Alert",
                desc: "Founder or sales rep receives instant Telegram summary.",
                status: "Sub-2s Execution",
              },
            ].map((node) => {
              const IconComp = node.icon;
              return (
                <div
                  key={node.step}
                  className="p-5 rounded-xl bg-[#090b09] border border-white/[0.08] hover:border-[#A3FF12]/50 hover:bg-[#121812] transition-all duration-300 relative group flex flex-col justify-between h-full"
                >
                  <div className="absolute top-2 right-3 font-mono text-[11px] font-bold text-[#A3FF12]/70">
                    {node.step}
                  </div>

                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#141a14] border border-white/10 flex items-center justify-center text-[#A3FF12] mb-3 group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h5 className="text-sm font-bold text-white mb-1.5 group-hover:text-[#A3FF12] transition-colors">
                      {node.title}
                    </h5>
                    <p className="text-xs text-[#A7ADA5] leading-relaxed mb-4 font-normal">
                      {node.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#A3FF12]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-ping" />
                    <span>{node.status}</span>
                  </div>
                </div>
              );
            })}
          </MobileCardSlider>

          {/* Bottom Telemetry Metrics Bar */}
          <div className="p-4 rounded-xl bg-[#121612] border border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-[#A3FF12] font-mono">100%</p>
              <p className="text-[11px] text-[#A7ADA5] uppercase font-mono mt-0.5">Automated Data Entry</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">&lt; 1.5s</p>
              <p className="text-[11px] text-[#A7ADA5] uppercase font-mono mt-0.5">Pipeline Processing Time</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-[#A3FF12] font-mono">24 / 7</p>
              <p className="text-[11px] text-[#A7ADA5] uppercase font-mono mt-0.5">Zero Human Downtime</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">0%</p>
              <p className="text-[11px] text-[#A7ADA5] uppercase font-mono mt-0.5">Lost High-Intent Leads</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
