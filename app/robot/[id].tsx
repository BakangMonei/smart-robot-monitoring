import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ArrowLeft, Settings, RotateCcw, PowerOff, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import CameraView from '@/components/CameraView';
import RobotControlPanel from '@/components/RobotControlPanel';
import StatisticsCard from '@/components/StatisticsCard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AlertBanner from '@/components/ui/AlertBanner';

// Mock robot data - in a real app this would come from an API
const mockRobotData = {
  'RB-2023-001': {
    id: 'RB-2023-001',
    name: 'Sentinel Alpha',
    model: 'Guardian X1',
    status: 'patrolling',
    batteryLevel: 78,
    signalStrength: 92,
    temperature: 42,
    location: 'Front Entrance',
    lastActive: '2 mins ago',
    firmwareVersion: '2.1.3',
    serialNumber: 'GX1-2023-SA-001',
    purchaseDate: '2023-05-15',
    warrantyDate: '2025-05-15',
    streamUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isRecording: true,
    isPatrolling: true,
    uptime: '24 days',
    detectionCount: {
      human: 142,
      animal: 87,
      vehicle: 65,
      motion: 310,
    },
    maintenanceStatus: 'Good',
    memoryUsage: '45%',
    storageUsage: '63%',
  },
  'RB-2023-002': {
    id: 'RB-2023-002',
    name: 'Guardian Beta',
    model: 'Guardian X1',
    status: 'online',
    batteryLevel: 45,
    signalStrength: 87,
    temperature: 39,
    location: 'Backyard',
    lastActive: 'Just now',
    firmwareVersion: '2.1.2',
    serialNumber: 'GX1-2023-GB-002',
    purchaseDate: '2023-06-23',
    warrantyDate: '2025-06-23',
    streamUrl: 'https://images.pexels.com/photos/8294618/pexels-photo-8294618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isRecording: false,
    isPatrolling: false,
    uptime: '18 days',
    detectionCount: {
      human: 89,
      animal: 124,
      vehicle: 32,
      motion: 245,
    },
    maintenanceStatus: 'Needs Cleaning',
    memoryUsage: '38%',
    storageUsage: '51%',
  },
};

export default function RobotDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(true);

  const robotId = id as string;
  const robot = mockRobotData[robotId as keyof typeof mockRobotData];

  if (!robot) {
    return (
      <View style={styles.notFoundContainer}>
        <AlertTriangle size={48} color="#FF453A" />
        <Text style={styles.notFoundText}>Robot not found</Text>
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

  // These functions would be connected to the robot API in a real app
  const handleRobotMovement = (direction: string) => {
    console.log(`Move robot ${direction}`);
  };

  const handleTogglePatrol = () => {
    console.log('Toggle patrol mode');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: robot.name,
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
          headerRight: () => (
            <Pressable style={styles.settingsButton}>
              <Settings color="#FFFFFF" size={24} />
            </Pressable>
          ),
        }}
      />

      <ScrollView style={styles.container}>
        {showAlert && robot.maintenanceStatus !== 'Good' && (
          <AlertBanner
            type="warning"
            title="Maintenance Required"
            message={`${robot.name} needs cleaning. This might affect detection accuracy.`}
            onClose={() => setShowAlert(false)}
          />
        )}

        <CameraView
          robotId={robot.id}
          robotName={robot.name}
          streamUrl={robot.streamUrl}
          isLive={robot.status !== 'offline'}
          isRecording={robot.isRecording}
          isImageRecognitionActive={true}
          detectedObjects={[
            {
              id: 'obj-1',
              type: 'Person',
              confidence: 0.94,
              boundingBox: { x: 0.3, y: 0.4, width: 0.1, height: 0.3 },
            },
          ]}
        />

        <View style={styles.section}>
          <RobotControlPanel
            robotId={robot.id}
            robotName={robot.name}
            isPatrolling={robot.isPatrolling}
            onMoveForward={() => handleRobotMovement('forward')}
            onMoveBackward={() => handleRobotMovement('backward')}
            onMoveLeft={() => handleRobotMovement('left')}
            onMoveRight={() => handleRobotMovement('right')}
            onReturnHome={() => handleRobotMovement('home')}
            onTogglePatrol={handleTogglePatrol}
          />
        </View>

        <View style={styles.section}>
          <StatisticsCard
            title="Robot Statistics"
            stats={[
              { label: 'Battery', value: `${robot.batteryLevel}%`, color: robot.batteryLevel > 50 ? '#30D158' : robot.batteryLevel > 20 ? '#FF9500' : '#FF453A' },
              { label: 'Signal', value: `${robot.signalStrength}%`, color: robot.signalStrength > 70 ? '#30D158' : robot.signalStrength > 40 ? '#FF9500' : '#FF453A' },
              { label: 'Temp', value: `${robot.temperature}°C`, color: robot.temperature < 50 ? '#30D158' : robot.temperature < 70 ? '#FF9500' : '#FF453A' },
              { label: 'Uptime', value: robot.uptime, color: '#0A84FF' },
              { label: 'Memory', value: robot.memoryUsage, color: '#5E5CE6' },
              { label: 'Storage', value: robot.storageUsage, color: '#FF9500' },
            ]}
            style={styles.statsCard}
          />
        </View>

        <View style={styles.section}>
          <StatisticsCard
            title="Detection Statistics"
            stats={[
              { label: 'Human', value: robot.detectionCount.human, color: '#FF453A' },
              { label: 'Animal', value: robot.detectionCount.animal, color: '#FF9500' },
              { label: 'Vehicle', value: robot.detectionCount.vehicle, color: '#0A84FF' },
              { label: 'Motion', value: robot.detectionCount.motion, color: '#5E5CE6' },
            ]}
            style={styles.statsCard}
          />
        </View>

        <View style={styles.section}>
          <Card title="Robot Information" style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Model</Text>
              <Text style={styles.infoValue}>{robot.model}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Serial Number</Text>
              <Text style={styles.infoValue}>{robot.serialNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Firmware Version</Text>
              <Text style={styles.infoValue}>{robot.firmwareVersion}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Purchase Date</Text>
              <Text style={styles.infoValue}>{robot.purchaseDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Warranty Until</Text>
              <Text style={styles.infoValue}>{robot.warrantyDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Maintenance</Text>
              <Text style={[
                styles.infoValue,
                { color: robot.maintenanceStatus === 'Good' ? '#30D158' : '#FF9500' }
              ]}>
                {robot.maintenanceStatus}
              </Text>
            </View>
          </Card>
        </View>

        <View style={styles.actionButtonsContainer}>
          <Button
            variant="outline"
            icon={<RotateCcw size={18} color="#0A84FF" />}
            style={styles.actionButton}
          >
            Restart Robot
          </Button>
          <Button
            variant="destructive"
            icon={<PowerOff size={18} color="#FFFFFF" />}
            style={styles.actionButton}
          >
            Shutdown
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
  settingsButton: {
    padding: 8,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statsCard: {
    marginVertical: 0,
  },
  infoCard: {
    marginVertical: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
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