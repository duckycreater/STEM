// ==========================================
// PlantCare AI — IoT Sensor Service
// ==========================================

export interface SensorReading {
  timestamp: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  deviceId: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface AlertRule {
  id: string;
  name: string;
  sensor: keyof Omit<SensorReading, 'timestamp' | 'deviceId' | 'location'>;
  condition: 'above' | 'below' | 'between' | 'equal';
  value: number | [number, number];
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  enabled: boolean;
}

export class IoTService {
  private ws: WebSocket | null = null;
  private readonly url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(url: string = 'ws://localhost:3001') {
    this.url = url;
  }

  connect(onMessage?: (data: SensorReading) => void, onAlert?: (alert: AlertRule & { currentValue: number }) => void): void {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('✅ IoT WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data: SensorReading = JSON.parse(event.data);
          onMessage?.(data);

          // Check alerts
          if (onAlert) {
            this.checkAlerts(data, onAlert);
          }
        } catch (error) {
          console.error('Failed to parse IoT message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('❌ IoT WebSocket disconnected');
        this.attemptReconnect(onMessage, onAlert);
      };

      this.ws.onerror = (error) => {
        console.error('IoT WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect IoT:', error);
    }
  }

  private attemptReconnect(onMessage?: (data: SensorReading) => void, onAlert?: (alert: AlertRule & { currentValue: number }) => void): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting reconnect ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);

    setTimeout(() => {
      this.connect(onMessage, onAlert);
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  sendCommand(command: string, payload?: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ command, payload }));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private checkAlerts(data: SensorReading, onAlert: (alert: AlertRule & { currentValue: number }) => void): void {
    const alerts: AlertRule[] = [
      {
        id: 'temp-high',
        name: 'Nhiệt độ cao',
        sensor: 'temperature',
        condition: 'above',
        value: 35,
        severity: 'high',
        message: 'Nhiệt độ quá cao, cần tưới nước ngay',
        enabled: true,
      },
      {
        id: 'soil-dry',
        name: 'Đất khô',
        sensor: 'soilMoisture',
        condition: 'below',
        value: 30,
        severity: 'critical',
        message: 'Độ ẩm đất thấp, cần tưới ngay',
        enabled: true,
      },
      {
        id: 'ph-warning',
        name: 'pH bất thường',
        sensor: 'ph',
        condition: 'below',
        value: 5.5,
        severity: 'medium',
        message: 'pH đất quá acid, cần bón vôi',
        enabled: true,
      },
      // Add more rules
    ];

    alerts.forEach(alert => {
      if (!alert.enabled) return;

      const currentValue = data[alert.sensor];
      let triggered = false;

      if (alert.condition === 'above' && currentValue > (alert.value as number)) {
        triggered = true;
      } else if (alert.condition === 'below' && currentValue < (alert.value as number)) {
        triggered = true;
      } else if (alert.condition === 'between' && Array.isArray(alert.value)) {
        triggered = currentValue >= alert.value[0] && currentValue <= alert.value[1];
      }

      if (triggered) {
        onAlert({ ...alert, currentValue });
      }
    });
  }
}

export const iotService = new IoTService();
