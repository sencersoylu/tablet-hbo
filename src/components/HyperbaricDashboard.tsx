import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SensorData {
  pressure: number; // ATA
  oxygen: number; // %
  temperature: number; // °C
  humidity: number; // %
}

const HyperbaricDashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    pressure: 2.4,
    oxygen: 95.5,
    temperature: 22.3,
    humidity: 45.2,
  });

  const [timestamp, setTimestamp] = useState<Date>(new Date());

  // Simüle edilmiş veri güncelleme (gerçek uygulamada sensörlerden gelecek)
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        pressure: 2.0 + Math.random() * 1.0,
        oxygen: 90 + Math.random() * 10,
        temperature: 20 + Math.random() * 5,
        humidity: 40 + Math.random() * 20,
      });
      setTimestamp(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSensorStatus = (
    type: keyof SensorData,
    value: number,
  ): 'normal' | 'warning' | 'critical' => {
    switch (type) {
      case 'pressure':
        if (value < 1.5 || value > 3.0) return 'critical';
        if (value < 2.0 || value > 2.8) return 'warning';
        return 'normal';
      case 'oxygen':
        if (value < 85 || value > 100) return 'critical';
        if (value < 90 || value > 98) return 'warning';
        return 'normal';
      case 'temperature':
        if (value < 18 || value > 26) return 'critical';
        if (value < 20 || value > 24) return 'warning';
        return 'normal';
      case 'humidity':
        if (value < 30 || value > 70) return 'critical';
        if (value < 35 || value > 60) return 'warning';
        return 'normal';
      default:
        return 'normal';
    }
  };

  const getStatusColor = (
    status: 'normal' | 'warning' | 'critical',
  ): string[] => {
    switch (status) {
      case 'normal':
        return ['#10b981', '#059669'];
      case 'warning':
        return ['#f59e0b', '#d97706'];
      case 'critical':
        return ['#ef4444', '#dc2626'];
    }
  };

  const SensorCard: React.FC<{
    title: string;
    value: number;
    unit: string;
    icon: string;
    type: keyof SensorData;
  }> = ({title, value, unit, icon, type}) => {
    const status = getSensorStatus(type, value);
    const colors = getStatusColor(status);

    return (
      <LinearGradient
        colors={['#1e293b', '#334155']}
        style={styles.sensorCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{icon}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardValue}>{value.toFixed(1)}</Text>
          <Text style={styles.cardUnit}>{unit}</Text>
        </View>
        <LinearGradient colors={colors} style={styles.statusBar}>
          <Text style={styles.statusText}>
            {status === 'normal'
              ? 'NORMAL'
              : status === 'warning'
              ? 'UYARI'
              : 'KRİTİK'}
          </Text>
        </LinearGradient>
      </LinearGradient>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155']}
        style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HİPERBARİK KABİN KONTROL PANELİ</Text>
          <Text style={styles.headerSubtitle}>
            {timestamp.toLocaleTimeString('tr-TR')} -{' '}
            {timestamp.toLocaleDateString('tr-TR')}
          </Text>
        </View>

        {/* Sensor Grid */}
        <View style={styles.sensorGrid}>
          <View style={styles.row}>
            <SensorCard
              title="BASINÇ"
              value={sensorData.pressure}
              unit="ATA"
              icon="⚡"
              type="pressure"
            />
            <SensorCard
              title="OKSİJEN"
              value={sensorData.oxygen}
              unit="%"
              icon="💨"
              type="oxygen"
            />
          </View>
          <View style={styles.row}>
            <SensorCard
              title="SICAKLIK"
              value={sensorData.temperature}
              unit="°C"
              icon="🌡️"
              type="temperature"
            />
            <SensorCard
              title="NEM"
              value={sensorData.humidity}
              unit="%"
              icon="💧"
              type="humidity"
            />
          </View>
        </View>

        {/* System Status */}
        <View style={styles.footer}>
          <LinearGradient
            colors={['#1e293b', '#334155']}
            style={styles.statusPanel}>
            <View style={styles.statusRow}>
              <View style={styles.statusIndicator}>
                <View style={[styles.dot, {backgroundColor: '#10b981'}]} />
                <Text style={styles.statusLabel}>Sistem Aktif</Text>
              </View>
              <View style={styles.statusIndicator}>
                <View style={[styles.dot, {backgroundColor: '#3b82f6'}]} />
                <Text style={styles.statusLabel}>Sensörler Çalışıyor</Text>
              </View>
              <View style={styles.statusIndicator}>
                <View style={[styles.dot, {backgroundColor: '#10b981'}]} />
                <Text style={styles.statusLabel}>Veri Aktarımı</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  gradient: {
    flex: 1,
    width: 1920,
    height: 1080,
  },
  header: {
    padding: 40,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#475569',
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f1f5f9',
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 24,
    color: '#94a3b8',
    marginTop: 10,
  },
  sensorGrid: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  sensorCard: {
    width: 880,
    height: 320,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#475569',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#cbd5e1',
    letterSpacing: 1,
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 96,
    fontWeight: 'bold',
    color: '#f1f5f9',
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  cardUnit: {
    fontSize: 36,
    color: '#94a3b8',
    marginTop: 10,
  },
  statusBar: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  footer: {
    padding: 40,
    paddingBottom: 30,
  },
  statusPanel: {
    borderRadius: 15,
    padding: 25,
    borderWidth: 1,
    borderColor: '#475569',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  statusLabel: {
    fontSize: 22,
    color: '#e2e8f0',
  },
});

export default HyperbaricDashboard;
