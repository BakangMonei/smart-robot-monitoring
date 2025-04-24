import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Battery, SignalHigh, Thermometer, MapPin } from 'lucide-react-native';
import Card from './ui/Card';
import StatusBadge from './ui/StatusBadge';
import Button from './ui/Button';

interface RobotCardProps {
  id: string;
  name: string;
  model: string;
  status: 'online' | 'offline' | 'warning' | 'error' | 'patrolling' | 'recording';
  batteryLevel: number;
  signalStrength: number;
  temperature: number;
  location: string;
  lastActive: string;
  imageUrl?: string;
  onViewLiveStream: () => void;
  onViewDetails: () => void;
}

const RobotCard: React.FC<RobotCardProps> = ({
  id,
  name,
  model,
  status,
  batteryLevel,
  signalStrength,
  temperature,
  location,
  lastActive,
  imageUrl,
  onViewLiveStream,
  onViewDetails,
}) => {
  const getBatteryColor = () => {
    if (batteryLevel <= 20) return '#FF453A';
    if (batteryLevel <= 40) return '#FFD60A';
    return '#30D158';
  };

  const getSignalColor = () => {
    if (signalStrength <= 25) return '#FF453A';
    if (signalStrength <= 50) return '#FFD60A';
    return '#30D158';
  };

  const getTemperatureColor = () => {
    if (temperature >= 80) return '#FF453A';
    if (temperature >= 60) return '#FFD60A';
    return '#30D158';
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.model}>{model} • {id}</Text>
        </View>
        <StatusBadge status={status} />
      </View>

      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      )}

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Battery size={16} color={getBatteryColor()} />
            <Text style={styles.infoText}>{batteryLevel}%</Text>
          </View>
          
          <View style={styles.infoItem}>
            <SignalHigh size={16} color={getSignalColor()} />
            <Text style={styles.infoText}>{signalStrength}%</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Thermometer size={16} color={getTemperatureColor()} />
            <Text style={styles.infoText}>{temperature}°C</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <MapPin size={16} color="#8E8E93" />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <Text style={styles.lastActive}>Last active: {lastActive}</Text>
      </View>

      <View style={styles.actionContainer}>
        <Button
          variant="primary"
          size="sm"
          onPress={onViewLiveStream}
          fullWidth
          style={styles.button}
        >
          View Live Stream
        </Button>
        <Button
          variant="outline"
          size="sm"
          onPress={onViewDetails}
          fullWidth
          style={styles.button}
        >
          Details
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  model: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  imageContainer: {
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#FFFFFF',
  },
  lastActive: {
    fontSize: 12,
    color: '#8E8E93',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default RobotCard;