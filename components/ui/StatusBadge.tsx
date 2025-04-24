import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StatusType = 'online' | 'offline' | 'warning' | 'error' | 'recording' | 'patrolling';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showText = true
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return '#30D158';
      case 'offline':
        return '#8E8E93';
      case 'warning':
        return '#FFD60A';
      case 'error':
        return '#FF453A';
      case 'recording':
        return '#FF375F';
      case 'patrolling':
        return '#5E5CE6';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      case 'recording':
        return 'Recording';
      case 'patrolling':
        return 'Patrolling';
      default:
        return '';
    }
  };

  const getDotSize = () => {
    switch (size) {
      case 'sm':
        return 8;
      case 'md':
        return 10;
      case 'lg':
        return 12;
      default:
        return 10;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 12;
      case 'md':
        return 14;
      case 'lg':
        return 16;
      default:
        return 14;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dot,
          { backgroundColor: getStatusColor(), width: getDotSize(), height: getDotSize() }
        ]}
      />
      {showText && (
        <Text style={[styles.text, { fontSize: getTextSize(), color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 100,
    marginRight: 6,
  },
  text: {
    fontWeight: '500',
  },
});

export default StatusBadge;