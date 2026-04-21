// ==========================================
// PlantCare AI — Toast Provider (Sonner)
// ==========================================

import { Toaster, toast } from 'sonner';
import { ReactNode } from 'react';

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        richColors
        closeButton
        expand={false}
        theme="system"
        toastOptions={{
          style: {
            fontFamily: 'inherit',
          },
          className: 'font-sans',
        }}
      />
    </>
  );
}

// ==========================================
// Toast Helper Functions
// ==========================================

export const toastHelper = {
  // Success
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 4000,
    });
  },

  // Error
  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
      duration: 5000,
    });
  },

  // Warning
  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
      duration: 4000,
    });
  },

  // Info
  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
      duration: 3000,
    });
  },

  // Loading
  loading: (message: string) => {
    return toast.loading(message);
  },

  // Diagnosis
  diagnosisSuccess: (diseaseName: string) => {
    toast.success(`✅ Chẩn đoán thành công!`, {
      description: `Phát hiện: ${diseaseName}`,
      duration: 5000,
    });
  },

  diagnosisError: () => {
    toast.error('❌ Chẩn đoán thất bại', {
      description: 'Vui lòng thử lại hoặc kiểm tra kết nối',
      duration: 5000,
    });
  },

  // AI Chat
  chatSending: () => {
    return toast.loading('🤖 AI đang xử lý...');
  },

  chatSuccess: () => {
    toast.success('💬 Phản hồi từ AI');
  },

  // Sensor
  sensorAlert: (alert: string) => {
    toast.warning('⚠️ Cảnh báo IoT', {
      description: alert,
      duration: 8000,
    });
  },

  sensorConnected: () => {
    toast.success('📡 Đã kết nối IoT', {
      description: 'Dữ liệu cập nhật realtime',
      duration: 3000,
    });
  },

  sensorDisconnected: () => {
    toast.error('📡 Mất kết nối IoT', {
      description: 'Đang thử kết nối lại...',
      duration: 5000,
    });
  },

  // Offline
  offline: () => {
    toast.warning('📵 Chế độ Offline', {
      description: 'Một số tính năng bị giới hạn',
      duration: 5000,
    });
  },

  online: () => {
    toast.success('🌐 Đã kết nối mạng', {
      description: 'Tất cả tính năng đã sẵn sàng',
      duration: 3000,
    });
  },

  // Sync
  syncing: () => {
    return toast.loading('🔄 Đang đồng bộ dữ liệu...');
  },

  syncSuccess: () => {
    toast.success('✅ Đồng bộ thành công!');
  },

  syncError: () => {
    toast.error('❌ Đồng bộ thất bại', {
      description: 'Dữ liệu sẽ được đồng bộ khi có mạng',
    });
  },

  // History
  historySaved: () => {
    toast.success('💾 Đã lưu vào lịch sử');
  },

  historyDeleted: () => {
    toast.info('🗑️ Đã xóa khỏi lịch sử');
  },

  // Settings
  settingsSaved: () => {
    toast.success('⚙️ Đã lưu cài đặt');
  },

  // Custom Promise Toast
  promise: (
    promise: Promise<any>,
    messages: {
      loading: string;
      success: string | ((data: any) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, messages);
  },
};

export default toastHelper;
