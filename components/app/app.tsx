'use client';

import { useMemo } from 'react';
import { TokenSource } from 'livekit-client';
import { useSession } from '@livekit/components-react';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr';
import type { AppConfig } from '@/app-config';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/ui/sonner';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { getSandboxTokenSource } from '@/lib/utils';

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const DEMO_ACCESS_CODE_STORAGE_KEY = 'veggieguide-demo-access-code';

type TokenFetchOptions = {
  roomName?: string;
  participantName?: string;
  participantIdentity?: string;
  participantMetadata?: string;
  participantAttributes?: Record<string, string>;
  agentName?: string;
  agentMetadata?: string;
};

function buildTokenRequestBody(options: TokenFetchOptions) {
  return {
    ...(options.roomName ? { room_name: options.roomName } : {}),
    ...(options.participantName ? { participant_name: options.participantName } : {}),
    ...(options.participantIdentity ? { participant_identity: options.participantIdentity } : {}),
    ...(options.participantMetadata ? { participant_metadata: options.participantMetadata } : {}),
    ...(options.participantAttributes
      ? { participant_attributes: options.participantAttributes }
      : {}),
    ...(options.agentName
      ? {
          room_config: {
            agents: [
              {
                agent_name: options.agentName,
                ...(options.agentMetadata ? { metadata: options.agentMetadata } : {}),
              },
            ],
          },
        }
      : {}),
  };
}

async function fetchConnectionDetails(options: TokenFetchOptions) {
  const demoAccessCode = window.sessionStorage.getItem(DEMO_ACCESS_CODE_STORAGE_KEY) ?? '';
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(demoAccessCode ? { 'x-demo-access-code': demoAccessCode } : {}),
    },
    body: JSON.stringify(buildTokenRequestBody(options)),
  });

  if (!response.ok) {
    throw new Error(
      `Error generating token: received ${response.status} / ${await response.text()}`
    );
  }

  return response.json();
}

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();

  return null;
}

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === 'string'
      ? getSandboxTokenSource(appConfig)
      : TokenSource.custom(fetchConnectionDetails);
  }, [appConfig]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined
  );

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="min-h-svh overflow-hidden bg-[#f3faee] text-[#13351f]">
        <ViewController appConfig={appConfig} />
      </main>
      <StartAudioButton label="Start Audio" />
      <Toaster
        icons={{
          warning: <WarningIcon weight="bold" />,
        }}
        position="top-center"
        className="toaster group"
        style={
          {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
          } as React.CSSProperties
        }
      />
    </AgentSessionProvider>
  );
}
