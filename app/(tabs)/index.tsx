import React from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { Bell, Shield, Zap, Clock } from 'lucide-react-native';
import RobotCard from '@/components/RobotCard';
import CameraView from '@/components/CameraView';
import AlertItem from '@/components/AlertItem';
import StatisticsCard from '@/components/StatisticsCard';
import AlertBanner from '@/components/ui/AlertBanner';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleViewLiveStream = (robotId: string) => {
    router.push(`/app/(tabs)/camera?robotId=${robotId}`);
  };

  const handleViewRobotDetails = (robotId: string) => {
    router.push(`/robot/${robotId}`);
  };

  const handleAlertPress = (alertId: string) => {
    router.push(`/alert/${alertId}`);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#FFFFFF"
        />
      }
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Status</Text>
        <AlertBanner
          type="info"
          title="System Update Available"
          message="A new firmware update (v2.1.3) is available for your robots."
          onClose={() => { }}
        />

        <StatisticsCard
          title="Security Overview"
          stats={[
            { label: 'Active Robots', value: 3, color: '#0A84FF' },
            { label: 'On Patrol', value: 2, color: '#5E5CE6' },
            { label: 'Today\'s Alerts', value: 12, color: '#FF9500' },
            { label: 'Identified', value: 8, color: '#30D158' },
            { label: 'Battery Avg', value: '72%', color: '#30D158' },
            { label: 'Uptime', value: '98%', color: '#30D158' },
          ]}
          style={styles.statsCard}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Robots</Text>

        <RobotCard
          id="RB-2023-001"
          name="Sentinel Alpha"
          model="Guardian X1"
          status="patrolling"
          batteryLevel={78}
          signalStrength={92}
          temperature={42}
          location="Front Entrance"
          lastActive="2 mins ago"
          imageUrl="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          onViewLiveStream={() => handleViewLiveStream('RB-2023-001')}
          onViewDetails={() => handleViewRobotDetails('RB-2023-001')}
        />

        <RobotCard
          id="RB-2023-002"
          name="Guardian Beta"
          model="Guardian X1"
          status="online"
          batteryLevel={45}
          signalStrength={87}
          temperature={39}
          location="Backyard"
          lastActive="Just now"
          imageUrl="https://images.pexels.com/photos/8294618/pexels-photo-8294618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          onViewLiveStream={() => handleViewLiveStream('RB-2023-002')}
          onViewDetails={() => handleViewRobotDetails('RB-2023-002')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Camera</Text>
        <CameraView
          robotId="RB-2023-001"
          robotName="Sentinel Alpha"
          isLive={true}
          isRecording={true}
          streamUrl="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        <AlertItem
          id="alert-001"
          type="human"
          title="Person Detected"
          message="Unidentified person detected at front entrance. Facial recognition initiated."
          timestamp="10 min ago"
          robotName="Sentinel Alpha"
          robotId="RB-2023-001"
          severity="high"
          imageUrl="https://images.pexels.com/photos/3205568/pexels-photo-3205568.jpeg"
          onPress={() => handleAlertPress('alert-001')}
        />

        <AlertItem
          id="alert-002"
          type="motion"
          title="Motion Detected"
          message="Movement detected in backyard area. No clear visual identification."
          timestamp="32 min ago"
          robotName="Guardian Beta"
          robotId="RB-2023-002"
          severity="medium"
          onPress={() => handleAlertPress('alert-002')}
        />

        <AlertItem
          id="alert-003"
          type="system"
          title="Low Battery Warning"
          message="Guardian Beta battery level below 50%. Please consider recharging soon."
          timestamp="1 hour ago"
          robotName="Guardian Beta"
          robotId="RB-2023-002"
          severity="low"
          onPress={() => handleAlertPress('alert-003')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  statsCard: {
    marginHorizontal: 16,
    marginTop: 8,
  },
});