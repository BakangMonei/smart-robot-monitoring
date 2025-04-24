import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { X } from 'lucide-react-native';

type AlertType = 'info' | 'warning' | 'error' | 'success';

interface AlertBannerProps {
  type: AlertType;
  title: string;
  message?: string;
  onClose?: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  title,
  message,
  onClose
}) => {
  const getAlertColor = () => {
    switch (type) {
      case 'info':
        return '#0A84FF';
      case 'warning':
        return '#FFD60A';
      case 'error':
        return '#FF453A';
      case 'success':
        return '#30D158';
      default:
        return '#0A84FF';
    }
  };

  const getAlertBgColor = () => {
    switch (type) {
      case 'info':
        return 'rgba(10, 132, 255, 0.1)';
      case 'warning':
        return 'rgba(255, 214, 10, 0.1)';
      case 'error':
        return 'rgba(255, 69, 58, 0.1)';
      case 'success':
        return 'rgba(48, 209, 88, 0.1)';
      default:
        return 'rgba(10, 132, 255, 0.1)';
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getAlertBgColor(), borderLeftColor: getAlertColor() }
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: getAlertColor() }]}>{title}</Text>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>

      {onClose && (
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [
            styles.closeButton,
            pressed && { opacity: 0.7 }
          ]}
        >
          <X color="#8E8E93" size={16} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#8E8E93',
  },
  closeButton: {
    padding: 4,
  },
});

export default AlertBanner;