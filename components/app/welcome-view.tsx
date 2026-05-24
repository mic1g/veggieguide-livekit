import { useState } from 'react';
import { Leaf, MessageCircle, Mic, Sparkles, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LANGUAGES = ['English'];
const MODES = [
  "Find Buddha's Birthday Restaurant",
  'Check Buddhist Vegetarian Suitability',
  'Choose Dishes',
];

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [mode, setMode] = useState(MODES[0]);

  return (
    <div
      ref={ref}
      className="relative min-h-svh overflow-hidden bg-[radial-gradient(circle_at_top,#dff7c7_0%,#f4fbef_36%,#eff7e9_70%,#e5f0dd_100%)] px-4 py-5 text-[#15381f] sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex min-h-[calc(100svh-40px)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full bg-[#1f8a53] text-white shadow-lg shadow-emerald-900/10">
              <Leaf className="size-5" />
            </div>
            <div>
              <p className="text-lg font-bold leading-tight">VeggieGuide</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52765d]">
                Hong Kong dining guide
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[#c9dfbe] bg-white/70 px-4 py-2 text-sm font-semibold text-[#2e5d3a] shadow-sm backdrop-blur md:flex">
            <span className="size-2 rounded-full bg-[#35b86f]" />
            LiveKit ready
          </div>
        </header>

        <section className="grid flex-1 place-items-center py-10">
          <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div className="mx-auto max-w-3xl text-center lg:text-left">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#cae2bd] bg-white/70 px-4 py-2 text-sm font-semibold text-[#28633b] shadow-sm backdrop-blur lg:mx-0">
                <Sparkles className="size-4 text-[#ef9d2f]" />
                Buddha's Birthday dining by voice
              </div>
              <h1 className="text-balance text-5xl font-black leading-[1.02] text-[#102d19] sm:text-6xl lg:text-7xl">
                Buddha's Birthday Restaurant Guide
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-[#426149] lg:mx-0">
                Find Buddhist-style vegetarian restaurants in Hong Kong, choose suitable dishes,
                and check strict vegetarian needs for Buddha's Birthday.
              </p>

              <div className="mt-8 grid gap-4 rounded-[28px] border border-white/70 bg-white/75 p-4 text-left shadow-xl shadow-emerald-950/8 backdrop-blur md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#64806a]">
                    Language
                  </span>
                  <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#c9dfbe] bg-[#fbfff8] px-4 text-sm font-semibold text-[#173820] outline-none ring-[#77c58e] transition focus:ring-4"
                  >
                    {LANGUAGES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#64806a]">
                    Mode
                  </span>
                  <select
                    value={mode}
                    onChange={(event) => setMode(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#c9dfbe] bg-[#fbfff8] px-4 text-sm font-semibold text-[#173820] outline-none ring-[#77c58e] transition focus:ring-4"
                  >
                    {MODES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <span className="block text-xs font-medium leading-5 text-[#5d7d62]">
                    Sets whether VeggieGuide should find a restaurant, check strict suitability, or
                    suggest dishes.
                  </span>
                </label>
              </div>

              <Button
                size="lg"
                onClick={onStartCall}
                className="mt-7 h-14 rounded-full bg-[#1d8b53] px-8 text-base font-bold text-white shadow-xl shadow-emerald-900/18 hover:bg-[#176f43]"
              >
                <Mic className="mr-2 size-5" />
                {startButtonText}
              </Button>
            </div>

            <div className="mx-auto w-full max-w-[420px] rounded-[32px] border border-white/80 bg-[#fbfff8]/90 p-5 shadow-2xl shadow-emerald-950/12 backdrop-blur">
              <div className="rounded-[24px] bg-[#12391f] p-5 text-white">
                <div className="mb-14 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid size-9 place-items-center rounded-full bg-[#78d99a] text-[#12391f]">
                      <Leaf className="size-4" />
                    </span>
                    <span className="font-bold">VeggieGuide</span>
                  </div>
                  <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold">
                    {language}
                  </span>
                </div>
                <div className="mx-auto grid size-32 place-items-center rounded-full bg-[#d5f7c2] text-[#15502b] shadow-[0_0_60px_rgba(126,226,168,0.45)]">
                  <Utensils className="size-12" />
                </div>
                <p className="mt-10 text-center text-sm font-semibold text-[#d8f2df]">{mode}</p>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Which Buddha's Birthday restaurant should I visit?",
                  'Is Po Lin suitable for strict Buddhist vegetarian food?',
                  'What dishes should I order at LockCha or Chi Lin?',
                ].map((prompt) => (
                  <div
                    key={prompt}
                    className="flex items-center gap-3 rounded-2xl border border-[#dbeace] bg-white px-4 py-3 text-sm font-semibold text-[#38533d]"
                  >
                    <MessageCircle className="size-4 text-[#1f8a53]" />
                    {prompt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 pb-3 md:grid-cols-3">
          {[
            ['1', 'Choose a conversation mode.'],
            ['2', 'Ask for Po Lin, Chi Lin, LockCha, YUAN, or Woodlands recommendations.'],
            ['3', 'Read the live transcript while VeggieGuide suggests restaurants and dishes.'],
          ].map(([step, text]) => (
            <div
              key={step}
              className="rounded-2xl border border-[#cfe3c4] bg-white/70 p-4 shadow-sm backdrop-blur"
            >
              <p className="mb-2 grid size-8 place-items-center rounded-full bg-[#d9f1c8] text-sm font-black text-[#1d6b3f]">
                {step}
              </p>
              <p className="text-sm font-semibold leading-6 text-[#3f6246]">{text}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
