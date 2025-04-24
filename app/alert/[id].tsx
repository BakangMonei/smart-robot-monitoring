import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ArrowLeft, Clock, TriangleAlert as AlertTriangle, MapPin, Video, User, PawPrint, Image as ImageIcon } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Mock alert details - in a real app this would come from an API
const mockAlerts = {
  'alert-001': {
    id: 'alert-001',
    type: 'human',
    title: 'Person Detected',
    message: 'Unidentified person detected at front entrance. Facial recognition initiated but no match found in the database. The person remained in the area for approximately 45 seconds before leaving the camera field of view.',
    timestamp: '2025-05-15 22:45:32',
    robotName: 'Sentinel Alpha',
    robotId: 'RB-2023-001',
    severity: 'high',
    location: 'Front Entrance - North Gate',
    coordinates: { lat: 37.7858, lng: -122.4064 },
    imageUrl: 'https://images.pexels.com/photos/3205568/pexels-photo-3205568.jpeg',
    videoAvailable: true,
    hasAudio: true,
    detectionConfidence: 98.2,
    objectDetails: {
      boundingBox: { x: 0.3, y: 0.4, width: 0.1, height: 0.3 },
      classification: 'Person',
      attributes: ['Male', 'Adult', 'Medium height'],
    },
  },
  'alert-002': {
    id: 'alert-002',
    type: 'motion',
    title: 'Motion Detected',
    message: 'Movement detected in backyard area. No clear visual identification. The motion was detected near the shed area and continued for approximately 12 seconds.',
    timestamp: '2025-05-15 22:10:15',
    robotName: 'Guardian Beta',
    robotId: 'RB-2023-002',
    severity: 'medium',
    location: 'Backyard - Near Shed',
    coordinates: { lat: 37.7870, lng: -122.4075 },
    imageUrl: null,
    videoAvailable: true,
    hasAudio: false,
    detectionConfidence: 72.5,
    objectDetails: null,
  },
  'alert-003': {
    id: 'alert-003',
    type: 'system',
    title: 'Low Battery Warning',
    message: 'Guardian Beta battery level below 50%. Please consider recharging soon. Estimated remaining operational time: 3 hours 45 minutes.',
    timestamp: '2025-05-15 21:30:08',
    robotName: 'Guardian Beta',
    robotId: 'RB-2023-002',
    severity: 'low',
    location: 'Backyard',
    coordinates: { lat: 37.7870, lng: -122.4075 },
    imageUrl: null,
    videoAvailable: false,
    hasAudio: false,
    detectionConfidence: null,
    objectDetails: null,
  },
  'alert-004': {
    id: 'alert-004',
    type: 'animal',
    title: 'Animal Detected',
    message: 'Cat detected in the yard. No security concerns. The animal appeared to be a domestic cat, approximately 30cm in height. It remained in the area for 3 minutes before leaving.',
    timestamp: '2025-05-15 19:22:47',
    robotName: 'Sentinel Alpha',
    robotId: 'RB-2023-001',
    severity: 'low',
    location: 'Side Yard',
    coordinates: { lat: 37.7858, lng: -122.4060 },
    imageUrl: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    videoAvailable: true,
    hasAudio: true,
    detectionConfidence: 94.7,
    objectDetails: {
      boundingBox: { x: 0.5, y: 0.6, width: 0.15, height: 0.15 },
      classification: 'Cat',
      attributes: ['Domestic', 'Medium size'],
    },
  },
};

export default function AlertDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const alertId = id as string;
  const alert = mockAlerts[alertId as keyof typeof mockAlerts];

  if (!alert) {
    return (
      <View style={styles.notFoundContainer}>
        <AlertTriangle size={48} color="#FF453A" />
        <Text style={styles.notFoundText}>Alert not found</Text>
        <Button
          variant="outline"
          onPress={() => router.back()}
          icon={<ArrowLeft size={18} color="#0A84FF" />}
        >
          Go Back
        </Button>
      </View>
    );
  }

  const handleBackPress = () => {
    router.back();
  };

  const handleViewCamera = () => {
    router.push(`/app/(tabs)/camera?robotId=${alert.robotId}`);
  };

  const handleViewRobot = () => {
    router.push(`/robot/${alert.robotId}`);
  };

  const getIconForType = () => {
    switch (alert.type) {
      case 'human':
        return <User size={24} color="#FF453A" />;
      case 'animal':
        return <PawPrint size={24} color="#FF9500" />;
      case 'motion':
        return <AlertTriangle size={24} color="#FFD60A" />;
      case 'object':
        return <ImageIcon size={24} color="#0A84FF" />;
      case 'system':
        return <AlertTriangle size={24} color="#5E5CE6" />;
      default:
        return <AlertTriangle size={24} color="#8E8E93" />;
    }
  };

  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'high':
        return '#FF453A';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#30D158';
      default:
        return '#8E8E93';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Alert Details',
          headerShown: true,
          headerTitleStyle: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#1C1C1E',
          },
          headerTintColor: '#FFFFFF',
          headerLeft: () => (
            <Pressable onPress={handleBackPress} style={styles.backButton}>
              <ArrowLeft color="#0A84FF" size={24} />
            </Pressable>
          ),
        }}
      />

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.alertTypeContainer}>
            {getIconForType()}
          </View>

          <View style={styles.headerContent}>
            <Text style={styles.title}>{alert.title}</Text>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor() }]}>
              <Text style={styles.severityText}>{alert.severity}</Text>
            </View>
          </View>
        </View>

        {alert.imageUrl && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: alert.imageUrl }} style={styles.image} />

            {alert.objectDetails && (
              <View
                style={[
                  styles.detectionBox,
                  {
                    left: `${alert.objectDetails.boundingBox.x * 100}%`,
                    top: `${alert.objectDetails.boundingBox.y * 100}%`,
                    width: `${alert.objectDetails.boundingBox.width * 100}%`,
                    height: `${alert.objectDetails.boundingBox.height * 100}%`,
                  }
                ]}
              >
                <View style={styles.boxLabel}>
                  <Text style={styles.boxLabelText}>
                    {alert.objectDetails.classification} ({alert.detectionConfidence?.toFixed(1)}%)
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        <Card style={styles.detailsCard}>
          <Text style={styles.message}>{alert.message}</Text>

          <View style={styles.metadataContainer}>
            <View style={styles.metadataItem}>
              <Clock size={16} color="#8E8E93" />
              <Text style={styles.metadataText}>{alert.timestamp}</Text>
            </View>

            <View style={styles.metadataItem}>
              <MapPin size={16} color="#8E8E93" />
              <Text style={styles.metadataText}>{alert.location}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.robotInfo}>
            <Text style={styles.robotInfoLabel}>Detected by:</Text>
            <Text style={styles.robotInfoValue}>{alert.robotName} ({alert.robotId})</Text>
          </View>

          {alert.objectDetails && (
            <>
              <View style={styles.divider} />
              <View style={styles.detectionDetails}>
                <Text style={styles.detectionTitle}>Detection Details</Text>

                <View style={styles.detectionItem}>
                  <Text style={styles.detectionLabel}>Classification:</Text>
                  <Text style={styles.detectionValue}>{alert.objectDetails.classification}</Text>
                </View>

                <View style={styles.detectionItem}>
                  <Text style={styles.detectionLabel}>Confidence:</Text>
                  <Text style={styles.detectionValue}>{alert.detectionConfidence?.toFixed(1)}%</Text>
                </View>

                <View style={styles.detectionItem}>
                  <Text style={styles.detectionLabel}>Attributes:</Text>
                  <Text style={styles.detectionValue}>{alert.objectDetails.attributes.join(', ')}</Text>
                </View>
              </View>
            </>
          )}
        </Card>

        <View style={styles.actionsContainer}>
          {alert.videoAvailable && (
            <Button
              variant="primary"
              icon={<Video size={18} color="#FFFFFF" />}
              style={styles.actionButton}
            >
              View Video
            </Button>
          )}

          <Button
            variant="outline"
            onPress={handleViewCamera}
            style={styles.actionButton}
          >
            Live Camera
          </Button>

          <Button
            variant="outline"
            onPress={handleViewRobot}
            style={styles.actionButton}
          >
            View Robot
          </Button>
        </View>

        <View style={styles.footer}>
          <Button
            variant="destructive"
            size="sm"
          >
            Dismiss Alert
          </Button>

          <Button
            variant="ghost"
            size="sm"
          >
            Mark as False Alarm
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  backButton: {
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  alertTypeContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(174, 174, 178, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  imageContainer: {
    height: 240,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detectionBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FF453A',
    borderStyle: 'solid',
  },
  boxLabel: {
    position: 'absolute',
    top: -20,
    left: 0,
    backgroundColor: '#FF453A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  boxLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  detailsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 16,
  },
  metadataContainer: {
    marginBottom: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metadataText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#2C2C2E',
    marginVertical: 16,
  },
  robotInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  robotInfoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  robotInfoValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  detectionDetails: {
    marginBottom: 8,
  },
  detectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  detectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detectionLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  detectionValue: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  footer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 24,
  },
});