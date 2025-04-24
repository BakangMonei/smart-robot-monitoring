import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Clock, TriangleAlert as AlertTriangle, Image as ImageIcon, User, PawPrint } from 'lucide-react-native';

type AlertType = 'motion' | 'human' | 'animal' | 'object' | 'system';
type AlertSeverity = 'low' | 'medium' | 'high';

interface AlertItemProps {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  timestamp: string;
  robotName: string;
  robotId: string;
  severity: AlertSeverity;
  imageUrl?: string;
  onPress: () => void;
}

const AlertItem: React.FC<AlertItemProps> = ({
  type,
  title,
  message,
  timestamp,
  robotName,
  severity,
  imageUrl,
  onPress,
}) => {
  const getIconForType = () => {
    switch (type) {
      case 'motion':
        return <AlertTriangle size={18} color="#FFD60A" />;
      case 'human':
        return <User size={18} color="#FF453A" />;
      case 'animal':
        return <PawPrint size={18} color="#FF9500" />;
      case 'object':
        return <ImageIcon size={18} color="#0A84FF" />;
      case 'system':
        return <AlertTriangle size={18} color="#5E5CE6" />;
      default:
        return <AlertTriangle size={18} color="#8E8E93" />;
    }
  };

  const getSeverityColor = () => {
    switch (severity) {
      case 'low':
        return '#30D158';
      case 'medium':
        return '#FF9500';
      case 'high':
        return '#FF453A';
      default:
        return '#8E8E93';
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {getIconForType()}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor() }]}>
            <Text style={styles.severityText}>{severity}</Text>
          </View>
        </View>
        
        <Text style={styles.message} numberOfLines={2}>{message}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.robotName}>{robotName}</Text>
          <View style={styles.timestampContainer}>
            <Clock size={12} color="#8E8E93" />
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
      </View>
      
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#2C2C2E',
    marginVertical: 6,
    marginHorizontal: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(174, 174, 178, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  message: {
    fontSize: 14,
    color: '#AEAEB2',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  robotName: {
    fontSize: 12,
    color: '#8E8E93',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default AlertItem;