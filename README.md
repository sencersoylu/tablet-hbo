# Hiperbarik Kabin Dashboard

React Native ile geliştirilmiş 1920x1080 çözünürlükte hiperbarik kabin kontrol paneli.

## Özellikler

- **Basınç Göstergesi**: ATA cinsinden basınç ölçümü
- **Oksijen Seviyesi**: Yüzde olarak O2 seviyesi
- **Sıcaklık**: Celsius cinsinden sıcaklık
- **Nem**: Yüzde olarak nem oranı

Her sensör için:
- Gerçek zamanlı değer gösterimi
- Renk kodlu durum göstergesi (Normal/Uyarı/Kritik)
- Otomatik güncelleme

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# iOS için
npm run ios

# Android için
npm run android
```

## Gereksinimler

- Node.js >= 18
- React Native CLI
- iOS: Xcode 14+
- Android: Android Studio

## Çözünürlük

Uygulama 1920x1080 tablet ekranı için optimize edilmiştir.

## Teknolojiler

- React Native 0.73
- TypeScript
- React Native Linear Gradient
- React Hooks

## Sensör Sınırları

### Basınç (ATA)
- Normal: 2.0 - 2.8
- Uyarı: 1.5 - 2.0 veya 2.8 - 3.0
- Kritik: < 1.5 veya > 3.0

### Oksijen (%)
- Normal: 90 - 98
- Uyarı: 85 - 90 veya 98 - 100
- Kritik: < 85 veya > 100

### Sıcaklık (°C)
- Normal: 20 - 24
- Uyarı: 18 - 20 veya 24 - 26
- Kritik: < 18 veya > 26

### Nem (%)
- Normal: 35 - 60
- Uyarı: 30 - 35 veya 60 - 70
- Kritik: < 30 veya > 70
