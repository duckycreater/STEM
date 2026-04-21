// ==========================================
// PlantCare AI — Vietnamese Translations (i18n)
// ==========================================

export type Language = 'vi' | 'en';

interface Translations {
  nav: {
    home: string;
    dashboard: string;
    market: string;
    plants: string;
    settings: string;
  };
  common: {
    appName: string;
    scan: string;
    analyze: string;
    loading: string;
    error: string;
    retry: string;
    save: string;
    cancel: string;
    close: string;
    settings: string;
    history: string;
    offline: string;
    online: string;
  };
  home: {
    title: string;
    subtitle: string;
    takePhoto: string;
    uploadPhoto: string;
    selectPlant: string;
    voiceNote: string;
    recording: string;
    tapToStop: string;
    analyzing: string;
    todayAlert: string;
    viewTreatment: string;
    stats: {
      totalScans: string;
      todayScans: string;
      diseasesDB: string;
    };
    dragDrop: string;
  };
  diagnosis: {
    diseaseName: string;
    severity: string;
    cause: string;
    treatment: string;
    prevention: string;
    severityLevels: {
      low: string;
      medium: string;
      high: string;
      unknown: string;
    };
    confidence: string;
    couldNotIdentify: string;
  };
  chat: {
    title: string;
    placeholder: string;
    offlinePlaceholder: string;
    send: string;
    quickActions: {
      diagnose: string;
      weather: string;
      price: string;
    };
    aiThinking: string;
    imageAttached: string;
  };
  dashboard: {
    title: string;
    iotFarm: string;
    live: string;
    realTimeMetrics: string;
    aiAnalysis: string;
    refresh: string;
    soilMoisture: string;
    airHumidity: string;
    phLevel: string;
    npk: string;
    farmMap: string;
    generateInsight: string;
  };
  settings: {
    title: string;
    darkMode: string;
    largeFont: string;
    ruralMode: string;
    language: string;
    about: string;
    version: string;
  };
  diseases: {
    dictionary: string;
    search: string;
    noResults: string;
    tryKeywords: string;
  };
  market: {
    title: string;
    priceTrend: string;
    crop: string;
    price: string;
    trend: string;
    change: string;
  };
  errors: {
    networkError: string;
    apiKeyMissing: string;
    imageRequired: string;
    processingError: string;
    tryAgain: string;
  };
};

const translations: Record<Language, Translations> = {
  vi: {
    nav: {
      home: 'Chẩn đoán',
      dashboard: 'Nông trại',
      market: 'Thị trường',
      plants: 'Từ điển',
      settings: 'Cài đặt',
    },
    common: {
      appName: 'PlantCare AI',
      scan: 'Quét',
      analyze: 'Phân tích',
      loading: 'Đang tải...',
      error: 'Lỗi',
      retry: 'Thử lại',
      save: 'Lưu',
      cancel: 'Hủy',
      close: 'Đóng',
      settings: 'Cài đặt',
      history: 'Lịch sử',
      offline: 'Ngoại tuyến',
      online: 'Trực tuyến',
    },
    home: {
      title: 'PlantCare AI',
      subtitle: 'Phát hiện bệnh thông minh & Quản lý trang trại IoT',
      takePhoto: 'Chụp ảnh',
      uploadPhoto: 'Tải ảnh lên',
      selectPlant: 'Chọn loại cây',
      voiceNote: '🎤 Ghi âm ghi chú',
      recording: 'Đang ghi âm...',
      tapToStop: 'Chạm để dừng',
      analyzing: 'Đang ph��n tích bệnh...',
      todayAlert: '⚠️ Cảnh báo hôm nay',
      viewTreatment: 'Xem cách xử lý',
      stats: {
        totalScans: 'Tổng lần quét',
        todayScans: 'Hôm nay',
        diseasesDB: 'Cơ sở bệnh',
      },
      dragDrop: 'Hoặc kéo & thả hình ảnh',
    },
    diagnosis: {
      diseaseName: 'Tên bệnh',
      severity: 'Mức độ nghiêm trọng',
      cause: 'Nguyên nhân',
      treatment: 'Cách điều trị',
      prevention: 'Cách phòng ngừa',
      severityLevels: {
        low: 'Nhẹ',
        medium: 'Trung bình',
        high: 'Nghiêm trọng',
        unknown: 'Không rõ',
      },
      confidence: 'Độ tin cậy',
      couldNotIdentify: 'Không thể nhận diện (Chế độ ngoại tuyến)',
    },
    chat: {
      title: 'Trợ lý AI',
      placeholder: 'Hỏi tôi bất cứ điều gì về nông nghiệp...',
      offlinePlaceholder: 'Tìm kiếm offline...',
      send: 'Gửi',
      quickActions: {
        diagnose: 'Chẩn đoán bệnh',
        weather: 'Mẹo thời tiết',
        price: 'Kiểm tra giá',
      },
      aiThinking: 'AI đang suy nghĩ...',
      imageAttached: 'Ảnh đã đính kèm',
    },
    dashboard: {
      title: 'IoT Farm',
      iotFarm: 'Nông trại IoT',
      live: 'Trực tiếp',
      realTimeMetrics: 'Số liệu thời gian thực',
      aiAnalysis: 'Phân tích AI',
      refresh: 'Làm mới',
      soilMoisture: 'Độ ẩm đất',
      airHumidity: 'Độ ẩm không khí',
      phLevel: 'Mức pH',
      npk: 'N-P-K',
      farmMap: 'Bản đồ trang trại',
      generateInsight: 'Tạo phân tích',
    },
    settings: {
      title: 'Cài đặt',
      darkMode: 'Chế độ tối',
      largeFont: 'Chữ lớn',
      ruralMode: 'Chế độ nông thôn (tiết kiệm dữ liệu)',
      language: 'Ngôn ngữ',
      about: 'Về ứng dụng',
      version: 'Phiên bản',
    },
    diseases: {
      dictionary: 'Từ điển bệnh cây',
      search: 'Tìm kiếm bệnh...',
      noResults: 'Không tìm thấy kết quả',
      tryKeywords: 'Thử từ khóa: đạo ống, vàng lụt, sâu ve, bệnh thối...',
    },
    market: {
      title: 'Thị trường',
      priceTrend: 'Xu hướng giá',
      crop: 'Cây trồng',
      price: 'Giá',
      trend: 'Xu hướng',
      change: 'Thay đổi',
    },
    errors: {
      networkError: 'Lỗi kết nối mạng',
      apiKeyMissing: 'Thiếu API key',
      imageRequired: 'Vui lòng chọn ảnh',
      processingError: 'Lỗi xử lý ảnh',
      tryAgain: 'Vui lòng thử lại',
    },
  },
  en: {
    nav: {
      home: 'Diagnose',
      dashboard: 'Farm',
      market: 'Market',
      plants: 'Dictionary',
      settings: 'Settings',
    },
    common: {
      appName: 'PlantCare AI',
      scan: 'Scan',
      analyze: 'Analyze',
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      settings: 'Settings',
      history: 'History',
      offline: 'Offline',
      online: 'Online',
    },
    home: {
      title: 'PlantCare AI',
      subtitle: 'Smart Disease Detection & IoT Farm Management',
      takePhoto: 'Take Photo',
      uploadPhoto: 'Upload Photo',
      selectPlant: 'Select Plant Type',
      voiceNote: '🎤 Voice Note',
      recording: 'Recording...',
      tapToStop: 'Tap to stop',
      analyzing: 'Scanning for diseases...',
      todayAlert: '⚠️ Today\'s Alert',
      viewTreatment: 'View Treatment',
      stats: {
        totalScans: 'Total Scans',
        todayScans: 'Today',
        diseasesDB: 'Diseases DB',
      },
      dragDrop: 'Or drag & drop an image',
    },
    diagnosis: {
      diseaseName: 'Disease Name',
      severity: 'Severity',
      cause: 'Cause',
      treatment: 'Treatment',
      prevention: 'Prevention',
      severityLevels: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        unknown: 'Unknown',
      },
      confidence: 'Confidence',
      couldNotIdentify: 'Cannot identify (Offline Mode)',
    },
    chat: {
      title: 'AI Assistant',
      placeholder: 'Ask me anything about agriculture...',
      offlinePlaceholder: 'Search offline...',
      send: 'Send',
      quickActions: {
        diagnose: 'Diagnose disease',
        weather: 'Weather tips',
        price: 'Price check',
      },
      aiThinking: 'AI is thinking...',
      imageAttached: 'Image attached',
    },
    dashboard: {
      title: 'IoT Farm',
      iotFarm: 'IoT Farm',
      live: 'Live',
      realTimeMetrics: 'Real-time Metrics',
      aiAnalysis: 'AI Analysis & Tips',
      refresh: 'Refresh',
      soilMoisture: 'Soil Moisture',
      airHumidity: 'Air Humidity',
      phLevel: 'pH Level',
      npk: 'N-P-K',
      farmMap: 'Farm Satellite Map',
      generateInsight: 'Generate Insight',
    },
    settings: {
      title: 'Settings',
      darkMode: 'Dark Mode',
      largeFont: 'Large Font',
      ruralMode: 'Rural Mode (data saving)',
      language: 'Language',
      about: 'About',
      version: 'Version',
    },
    diseases: {
      dictionary: 'Plant Disease Dictionary',
      search: 'Search diseases...',
      noResults: 'No results found',
      tryKeywords: 'Try keywords: blast, yellowing, thrips, rust, mildew...',
    },
    market: {
      title: 'Market',
      priceTrend: 'Price Trends',
      crop: 'Crop',
      price: 'Price',
      trend: 'Trend',
      change: 'Change',
    },
    errors: {
      networkError: 'Network error',
      apiKeyMissing: 'API key missing',
      imageRequired: 'Please select an image',
      processingError: 'Image processing error',
      tryAgain: 'Please try again',
    },
  },
};

// Current language state
let currentLanguage: Language = 'vi';

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
}

export function getLanguage(): Language {
  const saved = localStorage.getItem('language') as Language;
  if (saved) {
    currentLanguage = saved;
  } else {
    // Auto-detect Vietnamese browser language
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    currentLanguage = browserLang.startsWith('vi') ? 'vi' : 'en';
  }
  return currentLanguage;
}

export function t(key: string): string {
  const keys = key.split('.') as Array<keyof any>;
  let value: any = translations[currentLanguage];

  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      // Fallback to English
      value = translations['en'];
      for (const fallbackKey of keys) {
        if (value && value[fallbackKey] !== undefined) {
          value = value[fallbackKey];
        }
      }
      break;
    }
  }

  return typeof value === 'string' ? value : key;
}

export function getTranslations(): Translations {
  return translations[currentLanguage];
}
