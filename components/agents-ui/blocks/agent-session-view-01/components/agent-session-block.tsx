'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Leaf, Mic2, Sparkles } from 'lucide-react';
import { AnimatePresence, type MotionProps, motion } from 'motion/react';
import { useAgent, useSessionContext, useSessionMessages } from '@livekit/components-react';
import { AgentChatTranscript } from '@/components/agents-ui/agent-chat-transcript';
import {
  AgentControlBar,
  type AgentControlBarControls,
} from '@/components/agents-ui/agent-control-bar';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { cn } from '@/lib/shadcn/utils';

const LANGUAGES = ['English'];
const MODES = [
  "Find Buddha's Birthday Restaurant",
  'Check Buddhist Vegetarian Suitability',
  'Choose Dishes',
];

const MotionMessage = motion.create(Shimmer);

const BOTTOM_VIEW_MOTION_PROPS: MotionProps = {
  variants: {
    visible: {
      opacity: 1,
      translateY: '0%',
    },
    hidden: {
      opacity: 0,
      translateY: '100%',
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: 'easeOut',
  },
};

const CHAT_MOTION_PROPS: MotionProps = {
  variants: {
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        ease: 'easeOut',
        duration: 0.3,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

const SHIMMER_MOTION_PROPS: MotionProps = {
  variants: {
    visible: {
      opacity: 1,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
        delay: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
        delay: 0,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        'from-background pointer-events-none h-4 bg-linear-to-b to-transparent',
        top && 'bg-linear-to-b',
        bottom && 'bg-linear-to-t',
        className
      )}
    />
  );
}

export interface AgentSessionView_01Props {
  /**
   * Message shown above the controls before the first chat message is sent.
   *
   * @default 'Agent is listening, ask it a question'
   */
  preConnectMessage?: string;
  /**
   * Enables or disables the chat toggle and transcript input controls.
   *
   * @default true
   */
  supportsChatInput?: boolean;
  /**
   * Enables or disables camera controls in the bottom control bar.
   *
   * @default true
   */
  supportsVideoInput?: boolean;
  /**
   * Enables or disables screen sharing controls in the bottom control bar.
   *
   * @default true
   */
  supportsScreenShare?: boolean;
  /**
   * Shows a pre-connect buffer state with a shimmer message before messages appear.
   *
   * @default true
   */
  isPreConnectBufferEnabled?: boolean;

  /** Selects the visualizer style rendered in the main tile area. */
  audioVisualizerType?: 'bar' | 'wave' | 'grid' | 'radial' | 'aura';
  /** Primary hex color used by supported audio visualizer variants. */
  audioVisualizerColor?: `#${string}`;
  /** Hue shift intensity used by certain visualizers. */
  audioVisualizerColorShift?: number;
  /** Number of bars to render when `audioVisualizerType` is `bar`. */
  audioVisualizerBarCount?: number;
  /** Number of rows in the visualizer when `audioVisualizerType` is `grid`. */
  audioVisualizerGridRowCount?: number;
  /** Number of columns in the visualizer when `audioVisualizerType` is `grid`. */
  audioVisualizerGridColumnCount?: number;
  /** Number of radial bars when `audioVisualizerType` is `radial`. */
  audioVisualizerRadialBarCount?: number;
  /** Base radius of the radial visualizer when `audioVisualizerType` is `radial`. */
  audioVisualizerRadialRadius?: number;
  /** Stroke width of the wave path when `audioVisualizerType` is `wave`. */
  audioVisualizerWaveLineWidth?: number;
  /** Optional class name merged onto the outer `<section>` container. */
  className?: string;
}

export function AgentSessionView_01({
  preConnectMessage = 'Agent is listening, ask it a question',
  supportsChatInput = true,
  supportsVideoInput = true,
  supportsScreenShare = true,
  isPreConnectBufferEnabled = true,

  audioVisualizerType,
  audioVisualizerColor,
  audioVisualizerColorShift,
  audioVisualizerBarCount,
  audioVisualizerGridRowCount,
  audioVisualizerGridColumnCount,
  audioVisualizerRadialBarCount,
  audioVisualizerRadialRadius,
  audioVisualizerWaveLineWidth,
  ref,
  className,
  ...props
}: React.ComponentProps<'section'> & AgentSessionView_01Props) {
  const session = useSessionContext();
  const { messages } = useSessionMessages(session);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [mode, setMode] = useState(MODES[0]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { state: agentState } = useAgent();
  const chatOpen = true;

  void [
    supportsChatInput,
    audioVisualizerType,
    audioVisualizerColor,
    audioVisualizerColorShift,
    audioVisualizerBarCount,
    audioVisualizerGridRowCount,
    audioVisualizerGridColumnCount,
    audioVisualizerRadialBarCount,
    audioVisualizerRadialRadius,
    audioVisualizerWaveLineWidth,
  ];

  const controls: AgentControlBarControls = {
    leave: true,
    microphone: true,
    chat: false,
    camera: supportsVideoInput,
    screenShare: supportsScreenShare,
  };

  useEffect(() => {
    const lastMessage = messages.at(-1);
    const lastMessageIsLocal = lastMessage?.from?.isLocal === true;

    if (scrollAreaRef.current && lastMessageIsLocal) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section
      ref={ref}
      className={cn(
        'relative z-10 h-full w-full overflow-hidden bg-[radial-gradient(circle_at_top,#def7c5_0%,#f6fbef_35%,#edf6e6_74%,#dfead7_100%)] text-[#13351f]',
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-[#1f8a53] text-white shadow-lg shadow-emerald-900/10">
              <Leaf className="size-5" />
            </div>
            <div>
              <p className="leading-tight font-bold">VeggieGuide</p>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#5d7d62] uppercase">
                Buddha&apos;s Birthday Restaurant Guide
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[#c9dfbe] bg-white/75 px-4 py-2 text-sm font-semibold text-[#2e5d3a] shadow-sm backdrop-blur md:flex">
            <span className="size-2 rounded-full bg-[#35b86f]" />
            Connected
          </div>
        </header>

        <div className="grid min-h-0 flex-1 gap-5 py-4 lg:grid-cols-[300px_1fr]">
          <aside className="flex flex-col gap-4">
            <div className="rounded-[28px] border border-white/80 bg-white/75 p-4 shadow-xl shadow-emerald-950/8 backdrop-blur">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[#204b2c]">
                <Sparkles className="size-4 text-[#ef9d2f]" />
                Session setup
              </div>
              <label className="block space-y-2">
                <span className="text-xs font-bold tracking-[0.18em] text-[#64806a] uppercase">
                  Language
                </span>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="h-11 w-full rounded-2xl border border-[#c9dfbe] bg-[#fbfff8] px-3 text-sm font-semibold text-[#173820] ring-[#77c58e] transition outline-none focus:ring-4"
                >
                  {LANGUAGES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="mt-4 block space-y-2">
                <span className="text-xs font-bold tracking-[0.18em] text-[#64806a] uppercase">
                  Mode
                </span>
                <select
                  value={mode}
                  onChange={(event) => setMode(event.target.value)}
                  className="h-11 w-full rounded-2xl border border-[#c9dfbe] bg-[#fbfff8] px-3 text-sm font-semibold text-[#173820] ring-[#77c58e] transition outline-none focus:ring-4"
                >
                  {MODES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <span className="block text-xs leading-5 font-medium text-[#5d7d62]">
                  Sets whether VeggieGuide should find a restaurant, check strict suitability, or
                  suggest dishes.
                </span>
              </label>
            </div>

            <div className="rounded-[28px] border border-[#cfe3c4] bg-[#153d23] p-5 text-white shadow-xl shadow-emerald-950/10">
              <div className="grid size-16 place-items-center rounded-full bg-[#d5f7c2] text-[#15502b] shadow-[0_0_44px_rgba(126,226,168,0.35)]">
                <Mic2 className="size-7" />
              </div>
              <p className="mt-5 text-lg font-black">Speak naturally.</p>
              <p className="mt-2 text-sm leading-6 text-[#d7f0dd]">
                Ask about Po Lin, Chi Lin, LockCha, YUAN, Woodlands, or strict Buddhist vegetarian
                needs.
              </p>
            </div>
          </aside>

          <div className="flex min-h-0 flex-col rounded-[32px] border border-white/80 bg-white/80 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d9e8d0] pb-4">
              <div>
                <p className="text-sm font-bold tracking-[0.18em] text-[#66836c] uppercase">
                  Live transcript
                </p>
                <h2 className="text-2xl font-black text-[#12341d]">
                  Buddha&apos;s Birthday guide chat
                </h2>
              </div>
              <div className="rounded-full bg-[#e4f5d8] px-4 py-2 text-sm font-bold text-[#22683d]">
                {agentState}
              </div>
            </div>

            <div ref={scrollAreaRef} className="relative min-h-[360px] flex-1 overflow-hidden">
              <AnimatePresence>
                <motion.div
                  {...CHAT_MOTION_PROPS}
                  className="flex h-full w-full flex-col gap-4 transition-opacity duration-300 ease-out"
                >
                  {messages.length === 0 && (
                    <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
                      <div>
                        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-[#e4f5d8] text-[#1f8a53]">
                          <Leaf className="size-6" />
                        </div>
                        <p className="text-lg font-black text-[#183a23]">
                          Your live transcript will appear here.
                        </p>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5b785f]">
                          Try asking where to go for Buddha&apos;s Birthday, what to order at Chi
                          Lin, or whether a restaurant can support strict Buddhist vegetarian needs.
                        </p>
                      </div>
                    </div>
                  )}
                  <AgentChatTranscript
                    agentState={agentState}
                    messages={messages}
                    className="h-full w-full [&_.is-user>div]:rounded-[22px] [&>div>div]:px-1 [&>div>div]:py-5 md:[&>div>div]:px-2"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <motion.div
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="absolute inset-x-3 bottom-3 z-50 md:bottom-5"
      >
        {/* Pre-connect message */}
        {isPreConnectBufferEnabled && (
          <AnimatePresence>
            {messages.length === 0 && (
              <MotionMessage
                key="pre-connect-message"
                duration={2}
                aria-hidden={messages.length > 0}
                {...SHIMMER_MOTION_PROPS}
                className="pointer-events-none mx-auto block w-full max-w-2xl pb-4 text-center text-sm font-semibold"
              >
                {preConnectMessage}
              </MotionMessage>
            )}
          </AnimatePresence>
        )}
        <div className="relative mx-auto max-w-2xl">
          <AgentControlBar
            variant="livekit"
            controls={controls}
            isChatOpen={chatOpen}
            isConnected={session.isConnected}
            onDisconnect={session.end}
          />
        </div>
      </motion.div>
    </section>
  );
}
