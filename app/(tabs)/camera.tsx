import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import CameraView from '@/components/CameraView';
import RobotControlPanel from '@/components/RobotControlPanel';
import { Tabs } from 'react-native-web'; // We need to implement a simple tab view for web
import Card from '@/components/ui/Card';
import { useLocalSearchParams } from 'expo-router';
import { Mic, MicOff, Volume2, VolumeX, ArrowUpRight } from 'lucide-react-native';
import Button from '@/components/ui/Button';

const mockRobots = [
  {
    id: 'RB-2023-001',
    name: 'Sentinel Alpha',
    status: 'online',
    streamUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isRecording: true,
    isPatrolling: true,
    detectedObjects: [
      {
        id: 'obj-1',
        type: 'Person',
        confidence: 0.94,
        boundingBox: { x: 0.3, y: 0.4, width: 0.1, height: 0.3 },
      },
    ],
  },
  {
    id: 'RB-2023-002',
    name: 'Guardian Beta',
    status: 'online',
    streamUrl: 'https://images.pexels.com/photos/8294618/pexels-photo-8294618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isRecording: false,
    isPatrolling: false,
    detectedObjects: [],
  },
  {
    id: 'RB-2023-003',
    name: 'Sentinel Gamma',
    status: 'offline',
    streamUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isRecording: false,
    isPatrolling: false,
    detectedObjects: [],
  },
];

// Simple tab view for Web platform
const SimpleTabs = ({ tabs, activeTab, onChangeTab }: any) => {
  return (
    <View style={tabStyles.container}>
      <View style={tabStyles.tabBar}>
        {tabs.map((tab: any, index: number) => (
          <Text
            key={index}
            style={[
              tabStyles.tabItem,
              activeTab === index && tabStyles.activeTab,
              { color: activeTab === index ? '#0A84FF' : '#8E8E93' }
            ]}
            onPress={() => onChangeTab(index)}
          >
            {tab.title}
          </Text>
        ))}
      </View>
      
      <View style={tabStyles.tabContent}>
        {tabs[activeTab].content}
      </View>
    </View>
  );
};

const tabStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
    backgroundColor: '#1C1C1E',
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0A84FF',
  },
  tabContent: {
    flex: 1,
  },
});

export default function CameraScreen() {
  const { robotId } = useLocalSearchParams();
  const [selectedRobotId, setSelectedRobotId] = useState<string>(robotId as string || 'RB-2023-001');
  const [activeTab, setActiveTab] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  
  const dimensions = useWindowDimensions();
  
  const selectedRobot = mockRobots.find(robot => robot.id === selectedRobotId) || mockRobots[0];

  const handleTogglePatrol = () => {
    // This would connect to a real API to control the robot in a real implementation
    console.log('Toggle patrol mode for robot:', selectedRobotId);
  };

  const handleRobotMovement = (direction: string) => {
    // This would connect to a real API to control the robot in a real implementation
    console.log(`Move robot ${selectedRobotId} ${direction}`);
  };

  const renderRobotsList = () => (
    <ScrollView style={styles.robotsList}>
      {mockRobots.map(robot => (
        <Card 
          key={robot.id}
          title={robot.name}
          subtitle={`ID: ${robot.id} • Status: ${robot.status}`}
          style={[
            styles.robotSelectCard, 
            selectedRobotId === robot.id && styles.selectedRobotCard
          ]}
          onPress={() => setSelectedRobotId(robot.id)}
        >
          <Text style={styles.robotStatusText}>
            {robot.status === 'online' ? 'Connected and Ready' : 'Disconnected'}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );

  const renderControls = () => (
    <ScrollView style={styles.controlsContainer}>
      <RobotControlPanel
        robotId={selectedRobot.id}
        robotName={selectedRobot.name}
        isPatrolling={selectedRobot.isPatrolling}
        onMoveForward={() => handleRobotMovement('forward')}
        onMoveBackward={() => handleRobotMovement('backward')}
        onMoveLeft={() => handleRobotMovement('left')}
        onMoveRight={() => handleRobotMovement('right')}
        onReturnHome={() => handleRobotMovement('home')}
        onTogglePatrol={handleTogglePatrol}
      />
      
      <Card title="Audio Controls" style={styles.audioCard}>
        <View style={styles.audioControls}>
          <Button
            variant={audioEnabled ? 'primary' : 'outline'}
            icon={audioEnabled ? <Volume2 size={18} color="#FFFFFF" /> : <VolumeX size={18} color="#0A84FF" />}
            onPress={() => setAudioEnabled(!audioEnabled)}
          >
            {audioEnabled ? 'Mute Speaker' : 'Enable Speaker'}
          </Button>
          
          <Button
            variant={micEnabled ? 'accent' : 'outline'}
            icon={micEnabled ? <Mic size={18} color="#FFFFFF" /> : <MicOff size={18} color="#FF9500" />}
            onPress={() => setMicEnabled(!micEnabled)}
          >
            {micEnabled ? 'Mute Microphone' : 'Enable Microphone'}
          </Button>
        </View>
        
        <Text style={styles.audioHelpText}>
          Enable two-way audio communication with the robot
        </Text>
      </Card>
    </ScrollView>
  );

  const tabs = [
    {
      title: 'Controls',
      content: renderControls(),
    },
    {
      title: 'Robots',
      content: renderRobotsList(),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.cameraContainer, fullScreen && { height: dimensions.height }]}>
        <CameraView
          robotId={selectedRobot.id}
          robotName={selectedRobot.name}
          isLive={selectedRobot.status === 'online'}
          isRecording={selectedRobot.isRecording}
          streamUrl={selectedRobot.streamUrl}
          isImageRecognitionActive={true}
          detectedObjects={selectedRobot.detectedObjects}
        />
        
        <Button
          variant="ghost"
          icon={<ArrowUpRight size={18} color="#FFFFFF" />}
          onPress={() => setFullScreen(!fullScreen)}
          style={styles.fullscreenButton}
        >
          {fullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </View>
      
      {!fullScreen && (
        <SimpleTabs
          tabs={tabs}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  cameraContainer: {
    height: 300,
  },
  fullscreenButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  controlsContainer: {
    flex: 1,
    padding: 16,
  },
  audioCard: {
    marginTop: 16,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  audioHelpText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
  robotsList: {
    flex: 1,
    padding: 16,
  },
  robotSelectCard: {
    marginBottom: 8,
  },
  selectedRobotCard: {
    borderColor: '#0A84FF',
    borderWidth: 2,
  },
  robotStatusText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});