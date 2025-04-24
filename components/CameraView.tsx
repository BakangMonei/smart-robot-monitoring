import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Platform } from 'react-native';
import { CameraView as ExpoCameraView } from 'expo-camera';
import { Play, Pause, Camera, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { CameraType } from 'expo-camera';
import Button from './ui/Button';
import StatusBadge from './ui/StatusBadge';

interface CameraViewProps {
  robotId: string;
  robotName: string;
  streamUrl?: string;
  isLive?: boolean;
  isRecording?: boolean;
  showControls?: boolean;
  isImageRecognitionActive?: boolean;
  detectedObjects?: Array<{
    id: string;
    type: string;
    confidence: number;
    boundingBox: { x: number, y: number, width: number, height: number };
  }>;
}

const CameraView: React.FC<CameraViewProps> = ({
  robotId,
  robotName,
  streamUrl,
  isLive = false,
  isRecording = false,
  showControls = true,
  isImageRecognitionActive = false,
  detectedObjects = [],
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // In a real app, we would use the actual camera permission
  const [permission, requestPermission] = useState({ granted: true });

  // This is a mock function since we're not actually connecting to a real stream
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // In a web environment, we'll use an image as a placeholder
  const renderCameraFeed = () => {
    if (Platform.OS === 'web' || !permission.granted) {
      return (
        <Image
          source={{ uri: streamUrl || 'https://images.pexels.com/photos/3205568/pexels-photo-3205568.jpeg' }}
          style={styles.cameraFeed}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      );
    }

    return (
      <ExpoCameraView
        style={styles.cameraFeed}
        facing={CameraType.back}
        onCameraReady={() => setIsLoading(false)}
      />
    );
  };

  // Render detection boxes over identified objects
  const renderDetectionBoxes = () => {
    if (!isImageRecognitionActive || detectedObjects.length === 0) return null;

    return detectedObjects.map(obj => (
      <View
        key={obj.id}
        style={[
          styles.detectionBox,
          {
            left: `${obj.boundingBox.x * 100}%`,
            top: `${obj.boundingBox.y * 100}%`,
            width: `${obj.boundingBox.width * 100}%`,
            height: `${obj.boundingBox.height * 100}%`,
            borderColor: getColorForObjectType(obj.type),
          },
        ]}
      >
        <View style={[styles.detectionLabel, { backgroundColor: getColorForObjectType(obj.type) }]}>
          <Text style={styles.detectionText}>{obj.type} ({Math.round(obj.confidence * 100)}%)</Text>
        </View>
      </View>
    ));
  };

  const getColorForObjectType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'person':
      case 'human':
        return '#FF453A';
      case 'car':
      case 'vehicle':
        return '#0A84FF';
      case 'dog':
      case 'cat':
      case 'animal':
        return '#FF9500';
      default:
        return '#30D158';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.robotName}>{robotName}</Text>
          <Text style={styles.robotId}>ID: {robotId}</Text>
        </View>
        <View style={styles.statusContainer}>
          {isLive && <StatusBadge status="online" size="sm" />}
          {isRecording && (
            <View style={styles.statusBadge}>
              <StatusBadge status="recording" size="sm" />
            </View>
          )}
        </View>
      </View>

      <View style={styles.cameraContainer}>
        {renderCameraFeed()}
        {renderDetectionBoxes()}

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Connecting to camera...</Text>
          </View>
        )}

        {hasError && (
          <View style={styles.errorOverlay}>
            <AlertTriangle size={40} color="#FF453A" />
            <Text style={styles.errorText}>Failed to connect to camera feed</Text>
            <Button variant="outline" size="sm" onPress={() => setHasError(false)}>
              Retry
            </Button>
          </View>
        )}

        {!isLoading && !hasError && isPaused && (
          <View style={styles.pausedOverlay}>
            <Pause size={40} color="#FFFFFF" />
            <Text style={styles.pausedText}>Feed paused</Text>
          </View>
        )}
      </View>

      {showControls && (
        <View style={styles.controls}>
          <Button
            variant="primary"
            icon={isPaused ? <Play size={18} color="#FFFFFF" /> : <Pause size={18} color="#FFFFFF" />}
            onPress={togglePause}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            variant={isRecording ? 'destructive' : 'outline'}
            icon={<Camera size={18} color={isRecording ? '#FFFFFF' : '#FF453A'} />}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  robotName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  robotId: {
    fontSize: 12,
    color: '#8E8E93',
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    marginLeft: 8,
  },
  cameraContainer: {
    height: 240,
    position: 'relative',
  },
  cameraFeed: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 14,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF453A',
    marginVertical: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  pausedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pausedText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
  },
  detectionBox: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  detectionLabel: {
    position: 'absolute',
    top: -20,
    left: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  detectionText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default CameraView;