// ==========================================
// PlantCare AI — API Service Layer
// ==========================================

const API_BASE = '/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.error || 'API Error');
  }

  return data;
}

export const api = {
  // Health check
  health: () => fetchApi('/health'),

  // Diagnosis
  diagnose: (image: string, plantType?: string, audioNote?: string) => {
    const formData = new FormData();
    formData.append('image', image);
    if (plantType) formData.append('plantType', plantType);
    if (audioNote) formData.append('audioNote', audioNote);

    return fetch('/api/diagnose', {
      method: 'POST',
      body: formData,
    }).then(r => r.json());
  },

  // Chat
  chat: async (messages: Array<{role: string; text: string}>, image?: string) => {
    const formData = new FormData();
    formData.append('messages', JSON.stringify(messages));
    if (image) {
      const blob = await fetch(image).then(r => r.blob());
      formData.append('image', blob);
    }

    return fetch('/api/chat', {
      method: 'POST',
      body: formData,
    }).then(r => r.json());
  },

  // Disease search
  searchDiseases: (query: string) =>
    fetchApi('/disease-search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    }),

  // Sensors
  getSensors: () => fetchApi('/sensors'),
  updateSensors: (data: any) =>
    fetchApi('/sensors', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getSensorInsight: (data?: any) =>
    fetchApi('/sensors/insight', {
      method: 'POST',
      body: JSON.stringify(data || {}),
    }),

  // Market
  getMarketPrices: () => fetchApi('/market/prices'),
};

export default api;
