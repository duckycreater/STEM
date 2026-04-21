// ==========================================
// PlantCare AI — Share & Export Utilities
// ==========================================

import type { DiagnosisResult } from '../types';

// ==========================================
// Share Diagnosis Result
// ==========================================

interface ShareOptions {
  title: string;
  text: string;
  url?: string;
  files?: File[];
}

export async function shareContent(options: ShareOptions): Promise<boolean> {
  const { title, text, url, files } = options;

  // Check if Web Share API is available
  if (navigator.share && navigator.canShare) {
    try {
      const shareData: any = { title, text };
      if (url) shareData.url = url;
      if (files?.length) shareData.files = files;

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return true;
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
    }
  }

  // Fallback: Copy to clipboard
  await copyToClipboard(`${title}\n\n${text}${url ? `\n\n${url}` : ''}`);
  return true;
}

// ==========================================
// Share Diagnosis Result
// ==========================================

export async function shareDiagnosis(
  result: DiagnosisResult,
  plantType?: string
): Promise<boolean> {
  const text = generateDiagnosisText(result, plantType);
  
  return shareContent({
    title: `🌿 PlantCare AI - ${result.diseaseName}`,
    text,
    url: window.location.href,
  });
}

// ==========================================
// Copy to Clipboard
// ==========================================

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}

// ==========================================
// Generate Diagnosis Text
// ==========================================

function generateDiagnosisText(result: DiagnosisResult, plantType?: string): string {
  const severity = getSeverityVietnamese(result.severity);
  
  return `
🌿 **PlantCare AI - Kết quả chẩn đoán**

📋 **Bệnh:** ${result.diseaseName}
🌱 **Loại cây:** ${plantType || 'Không xác định'}
⚠️ **Mức độ:** ${severity}

📝 **Nguyên nhân:**
${result.cause}

💊 **Cách điều trị:**
${result.treatment}

🛡️ **Phòng ngừa:**
${result.prevention}

---
🌿 Powered by PlantCare AI v2.0
  `.trim();
}

function getSeverityVietnamese(severity?: string): string {
  const map: Record<string, string> = {
    'low': 'Nhẹ',
    'mild': 'Nhẹ',
    'medium': 'Trung bình',
    'moderate': 'Trung bình',
    'high': 'Nghiêm trọng',
    'severe': 'Nghiêm trọng',
    'critical': 'Nguy hiểm',
  };
  return map[severity?.toLowerCase() || ''] || severity || 'Không rõ';
}

// ==========================================
// Share Image
// ==========================================

export async function shareImage(imageUrl: string): Promise<boolean> {
  try {
    // Fetch image as blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'plantcare-diagnosis.png', { type: 'image/png' });

    return shareContent({
      title: '🌿 PlantCare AI - Hình ảnh chẩn đoán',
      text: 'Kết quả chẩn đoán từ PlantCare AI',
      files: [file],
    });
  } catch (error) {
    console.error('Failed to share image:', error);
    return false;
  }
}

// ==========================================
// Share to Social Media
// ==========================================

export function shareToTwitter(text: string, url?: string) {
  const twitterUrl = new URL('https://twitter.com/intent/tweet');
  twitterUrl.searchParams.set('text', text);
  if (url) twitterUrl.searchParams.set('url', url);
  window.open(twitterUrl.toString(), '_blank');
}

export function shareToFacebook(url?: string) {
  const facebookUrl = new URL('https://www.facebook.com/sharer/sharer.php');
  if (url) facebookUrl.searchParams.set('u', url);
  window.open(facebookUrl.toString(), '_blank');
}

export function shareToWhatsApp(text: string, url?: string) {
  const whatsappUrl = new URL('https://wa.me/');
  whatsappUrl.searchParams.set('text', `${text}${url ? `\n\n${url}` : ''}`);
  window.open(whatsappUrl.toString(), '_blank');
}

export function shareToTelegram(text: string, url?: string) {
  const telegramUrl = new URL('https://t.me/share/url');
  telegramUrl.searchParams.set('url', url || window.location.href);
  telegramUrl.searchParams.set('text', text);
  window.open(telegramUrl.toString(), '_blank');
}

// ==========================================
// Export to JSON
// ==========================================

export function exportToJSON(data: any, filename: string = 'plantcare-export.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, filename);
}

// ==========================================
// Export to CSV
// ==========================================

export function exportToCSV(data: any[], filename: string = 'plantcare-export.csv') {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
        // Escape quotes and wrap in quotes if contains comma
        if (stringValue.includes(',') || stringValue.includes('"')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename);
}

// ==========================================
// Download Blob
// ==========================================

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ==========================================
// Share History
// ==========================================

import type { HistoryItem } from '../types';

export async function shareHistory(history: HistoryItem[]): Promise<boolean> {
  const text = history
    .slice(0, 10)
    .map((item, index) => {
      return `${index + 1}. ${item.result.diseaseName} (${item.plantType || 'Unknown'}) - ${new Date(item.date).toLocaleDateString()}`;
    })
    .join('\n');

  return shareContent({
    title: '🌿 PlantCare AI - Lịch sử chẩn đoán',
    text: `Lịch sử chẩn đoán của tôi:\n\n${text}\n\n---Xem thêm trong app PlantCare AI`,
  });
}

// ==========================================
// Web Share API Check
// ==========================================

export function canShare(): boolean {
  return 'share' in navigator && 'canShare' in navigator;
}

export function canShareFiles(): boolean {
  if (!canShare()) return false;
  return navigator.canShare?.({ files: [new File([], 'test.png')] }) ?? false;
}
