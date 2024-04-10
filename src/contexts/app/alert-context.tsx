'use client';

import * as React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { Auth } from 'firebase/auth';

import type { Alert } from '@/types/alert';
import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { logger } from '@/lib/default-logger';

import type { AlertContextValue } from '../types';

export const AlertContext = React.createContext<AlertContextValue | undefined>(undefined);

export interface AlertProviderProps {
  children: React.ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps): React.JSX.Element {
  const [firebaseAuth] = React.useState<Auth>(getFirebaseAuth());

  const [state, setState] = React.useState<{ alert: Alert | null; error: string | null; isLoading: boolean }>({
    alert: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (alert) => {
      logger.debug('[Auth] onAuthStateChanged:', alert);

      setState((prev) => ({
        ...prev,
        alert: alert
          ? ({
            id: alert.uid,
            email: alert.email ?? undefined,
            name: alert.displayName ?? undefined,
            avatar: alert.photoURL ?? undefined,
          } satisfies Alert)
          : null,
        error: null,
        isLoading: false,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, [firebaseAuth]);

  return <AlertContext.Provider value={{ ...state }}>{children}</AlertContext.Provider>;
}

export const AlertConsumer = AlertContext.Consumer;
