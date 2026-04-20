// ==========================================
// PlantCare AI — Database Service (Supabase)
// ==========================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { DiagnosisResult, HistoryItem } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient | null = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

// ==========================================
// Database Types
// ==========================================

interface DbHistoryItem {
  id: string;
  user_id: string;
  date: string;
  image_url: string;
  plant_type: string;
  result: DiagnosisResult;
  created_at: string;
}

interface DbUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

// ==========================================
// Database Service
// ==========================================

export class DatabaseService {
  private client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  // ================= HISTORY =================

  async getHistory(userId: string): Promise<HistoryItem[]> {
    const { data, error } = await this.client
      .from('history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Failed to fetch history:', error);
      return [];
    }

    return (data as DbHistoryItem[]).map(item => ({
      id: item.id,
      date: item.date,
      image: item.image_url,
      plantType: item.plant_type,
      result: item.result,
    }));
  }

  async addHistory(userId: string, item: Omit<HistoryItem, 'id'>): Promise<HistoryItem | null> {
    const { data, error } = await this.client
      .from('history')
      .insert({
        user_id: userId,
        date: item.date,
        image_url: item.image,
        plant_type: item.plantType,
        result: item.result,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to add history:', error);
      return null;
    }

    return {
      id: data.id,
      date: data.date,
      image: data.image_url,
      plantType: data.plant_type,
      result: data.result,
    };
  }

  async deleteHistory(userId: string, historyId: string): Promise<boolean> {
    const { error } = await this.client
      .from('history')
      .delete()
      .eq('id', historyId)
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to delete history:', error);
      return false;
    }

    return true;
  }

  async clearHistory(userId: string): Promise<boolean> {
    const { error } = await this.client
      .from('history')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to clear history:', error);
      return false;
    }

    return true;
  }

  // ================= SENSOR DATA =================

  async saveSensorReading(data: {
    deviceId: string;
    temperature: number;
    humidity: number;
    soilMoisture: number;
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    location?: { lat: number; lng: number };
  }): Promise<boolean> {
    const { error } = await this.client
      .from('sensor_readings')
      .insert({
        device_id: data.deviceId,
        temperature: data.temperature,
        humidity: data.humidity,
        soil_moisture: data.soilMoisture,
        ph: data.ph,
        nitrogen: data.nitrogen,
        phosphorus: data.phosphorus,
        potassium: data.potassium,
        location: data.location ? { type: 'Point', coordinates: [data.location.lng, data.location.lat] } : null,
      });

    if (error) {
      console.error('Failed to save sensor reading:', error);
      return false;
    }

    return true;
  }

  async getLatestSensorReading(deviceId: string): Promise<any | null> {
    const { data, error } = await this.client
      .from('sensor_readings')
      .select('*')
      .eq('device_id', deviceId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Failed to fetch sensor reading:', error);
      return null;
    }

    return data;
  }

  async getSensorHistory(deviceId: string, hours: number = 24): Promise<any[]> {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

    const { data, error } = await this.client
      .from('sensor_readings')
      .select('*')
      .eq('device_id', deviceId)
      .gte('created_at', cutoff)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch sensor history:', error);
      return [];
    }

    return data;
  }

  // ================= OFFLINE DISEASES =================

  async getOfflineDiseases(): Promise<any[]> {
    const { data, error } = await this.client
      .from('offline_diseases')
      .select('*')
      .order('id');

    if (error) {
      console.error('Failed to fetch diseases:', error);
      return [];
    }

    return data;
  }

  // ================= USER SETTINGS =================

  async getUserSettings(userId: string): Promise<Record<string, any> | null> {
    const { data, error } = await this.client
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Failed to fetch settings:', error);
      return null;
    }

    return data;
  }

  async updateUserSettings(userId: string, settings: Record<string, any>): Promise<boolean> {
    const { error } = await this.client
      .from('user_settings')
      .upsert({
        user_id: userId,
        ...settings,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to update settings:', error);
      return false;
    }

    return true;
  }
}

export const db = supabase ? new DatabaseService(supabase) : null;

// ==========================================
// Sync Service (Offline → Online)
// ==========================================

export class SyncService {
  private pendingOperations: Array<{ type: string; data: any; timestamp: number }> = [];
  private isOnline: boolean = navigator.onLine;

  constructor() {
    // Load pending operations from IndexedDB
    this.loadPending();

    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.sync();
    });
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  private loadPending(): void {
    const stored = localStorage.getItem('pending_sync');
    if (stored) {
      try {
        this.pendingOperations = JSON.parse(stored);
      } catch { /* ignore */ }
    }
  }

  private savePending(): void {
    localStorage.setItem('pending_sync', JSON.stringify(this.pendingOperations));
  }

  async queueOperation(type: string, data: any): Promise<void> {
    this.pendingOperations.push({ type, data, timestamp: Date.now() });
    this.savePending();

    if (this.isOnline && db) {
      await this.sync();
    }
  }

  async sync(): Promise<void> {
    if (!this.isOnline || !db || this.pendingOperations.length === 0) return;

    const operations = [...this.pendingOperations];
    this.pendingOperations = [];
    this.savePending();

    for (const op of operations) {
      try {
        switch (op.type) {
          case 'add_history':
            // Will be handled by auth context
            break;
          case 'delete_history':
            // Will be handled by auth context
            break;
          case 'sensor_reading':
            await db.saveSensorReading(op.data);
            break;
        }
      } catch (error) {
        console.error('Sync failed for operation:', op, error);
        // Re-queue on failure
        this.pendingOperations.push(op);
      }
    }

    this.savePending();
  }

  getPendingCount(): number {
    return this.pendingOperations.length;
  }
}

export const syncService = new SyncService();
