// ==========================================
// PlantCare AI — React Query Provider
// ==========================================

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// ==========================================
// Custom Hooks with React Query
// ==========================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { DiagnosisResult, HistoryItem } from '../types';

// Query Keys
export const queryKeys = {
  history: ['history'] as const,
  sensorData: ['sensors'] as const,
  marketPrices: ['market', 'prices'] as const,
  diseases: ['diseases'] as const,
};

// Hook: Diagnosis History with React Query
export function useDiagnosisHistory() {
  return useQuery({
    queryKey: queryKeys.history,
    queryFn: async (): Promise<HistoryItem[]> => {
      const data = localStorage.getItem('plantcare_history');
      return data ? JSON.parse(data) : [];
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

// Hook: Sensor Data with polling
export function useSensorData(enabled = true) {
  return useQuery({
    queryKey: queryKeys.sensorData,
    queryFn: async () => {
      const response = await fetch('/api/sensors');
      const data = await response.json();
      return data.success ? data.data : null;
    },
    refetchInterval: 30000, // Poll every 30 seconds
    enabled,
  });
}

// Hook: Market Prices
export function useMarketPrices() {
  return useQuery({
    queryKey: queryKeys.marketPrices,
    queryFn: async () => {
      const response = await fetch('/api/market/prices');
      const data = await response.json();
      return data.success ? data.data : [];
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

// Hook: Offline Diseases
export function useOfflineDiseases() {
  return useQuery({
    queryKey: queryKeys.diseases,
    queryFn: async () => {
      const { offlineDiseases } = await import('../lib/offlineData');
      return offlineDiseases;
    },
    staleTime: Infinity, // Never refetch
  });
}

// Hook: AI Diagnosis
export function useDiagnosis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ image, plantType, audioNote }: { image: string; plantType?: string; audioNote?: string }) => {
      const formData = new FormData();
      formData.append('image', image);
      if (plantType) formData.append('plantType', plantType);
      if (audioNote) formData.append('audioNote', audioNote);

      const response = await fetch('/api/diagnose', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Diagnosis failed');
      return data.data as DiagnosisResult;
    },
    onSuccess: () => {
      // Invalidate history query to refresh
      queryClient.invalidateQueries({ queryKey: queryKeys.history });
    },
  });
}

// Hook: AI Chat
export function useAIChat() {
  return useMutation({
    mutationFn: async ({ messages, image }: { messages: Array<{role: string; text: string}>; image?: string }) => {
      const formData = new FormData();
      formData.append('messages', JSON.stringify(messages));
      if (image) {
        const blob = await fetch(image).then(r => r.blob());
        formData.append('image', blob);
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Chat failed');
      return data.data.reply as string;
    },
  });
}

// Hook: AI Sensor Insight
export function useSensorInsight() {
  return useMutation({
    mutationFn: async (sensorData?: any) => {
      const response = await fetch('/api/sensors/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sensorData || {}),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Insight failed');
      return data.data.insight as string;
    },
  });
}

export default {
  QueryProvider,
  useDiagnosisHistory,
  useSensorData,
  useMarketPrices,
  useOfflineDiseases,
  useDiagnosis,
  useAIChat,
  useSensorInsight,
  queryKeys,
};
