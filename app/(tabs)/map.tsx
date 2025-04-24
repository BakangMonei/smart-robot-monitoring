import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import { Eye, EyeOff, Route, PhoneIncoming as HomeIcon, MapPin } from 'lucide-react-native';

const darkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#212121" }]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#212121" }]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9e9e9e" }]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#bdbdbd" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#181818" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#1b1b1b" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#2c2c2c" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#8a8a8a" }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{ "color": "#373737" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#3c3c3c" }]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [{ "color": "#4e4e4e" }]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#000000" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#3d3d3d" }]
  }
];

const mockRobots = [
  {
    id: 'RB-2023-001',
    name: 'Sentinel Alpha',
    status: 'patrolling',
    location: {
      latitude: 37.7858,
      longitude: -122.4064,
    },
    patrolPath: [
      { latitude: 37.7858, longitude: -122.4064 },
      { latitude: 37.7865, longitude: -122.4070 },
      { latitude: 37.7870, longitude: -122.4060 },
      { latitude: 37.7858, longitude: -122.4055 },
      { latitude: 37.7858, longitude: -122.4064 },
    ],
    homeLocation: {
      latitude: 37.7858,
      longitude: -122.4064,
    },
  },
  {
    id: 'RB-2023-002',
    name: 'Guardian Beta',
    status: 'online',
    location: {
      latitude: 37.7870,
      longitude: -122.4075,
    },
    patrolPath: [],
    homeLocation: {
      latitude: 37.7870,
      longitude: -122.4075,
    },
  },
  {
    id: 'RB-2023-003',
    name: 'Sentinel Gamma',
    status: 'offline',
    location: {
      latitude: 37.7853,
      longitude: -122.4080,
    },
    patrolPath: [],
    homeLocation: {
      latitude: 37.7853,
      longitude: -122.4080,
    },
  },
];

export default function MapScreen() {
  const router = useRouter();
  const dimensions = useWindowDimensions();
  const [showPatrolPaths, setShowPatrolPaths] = useState(true);
  const [showHomeLocations, setShowHomeLocations] = useState(true);
  const [selectedRobot, setSelectedRobot] = useState<string | null>(null);

  const selectedRobotData = selectedRobot
    ? mockRobots.find(robot => robot.id === selectedRobot)
    : null;

  const handleRobotPress = (robotId: string) => {
    setSelectedRobot(robotId);
  };

  const handleViewLiveStream = (robotId: string) => {
    router.push(`/app/(tabs)/camera?robotId=${robotId}`);
  };

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'patrolling':
        return '#5E5CE6';
      case 'online':
        return '#30D158';
      case 'offline':
        return '#8E8E93';
      default:
        return '#0A84FF';
    }
  };

  const getStatusBadgeType = (status: string): any => {
    switch (status) {
      case 'patrolling':
        return 'patrolling';
      case 'online':
        return 'online';
      case 'offline':
        return 'offline';
      default:
        return 'online';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.mapContainer, { height: dimensions.height * 0.6 }]}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.7858,
            longitude: -122.4064,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          customMapStyle={darkMapStyle}
        >
          {mockRobots.map(robot => (
            <Marker
              key={robot.id}
              coordinate={robot.location}
              title={robot.name}
              description={`Status: ${robot.status}`}
              pinColor={getMarkerColor(robot.status)}
              onPress={() => handleRobotPress(robot.id)}
            />
          ))}

          {showPatrolPaths && mockRobots.map(robot =>
            robot.patrolPath.length > 0 && (
              <Polyline
                key={`path-${robot.id}`}
                coordinates={robot.patrolPath}
                strokeColor="#5E5CE6"
                strokeWidth={3}
                lineDashPattern={[5, 5]}
              />
            )
          )}

          {showHomeLocations && mockRobots.map(robot => (
            <Marker
              key={`home-${robot.id}`}
              coordinate={robot.homeLocation}
              title={`${robot.name} Base Station`}
              opacity={0.7}
              pinColor="#FF9500"
            />
          ))}
        </MapView>

        <View style={styles.mapControls}>
          <Pressable
            style={[styles.mapControlButton, !showPatrolPaths && styles.disabledControl]}
            onPress={() => setShowPatrolPaths(!showPatrolPaths)}
          >
            {showPatrolPaths ? <Route color="#FFFFFF" size={20} /> : <Route color="#8E8E93" size={20} />}
          </Pressable>

          <Pressable
            style={[styles.mapControlButton, !showHomeLocations && styles.disabledControl]}
            onPress={() => setShowHomeLocations(!showHomeLocations)}
          >
            {showHomeLocations ? <HomeIcon color="#FFFFFF" size={20} /> : <HomeIcon color="#8E8E93" size={20} />}
          </Pressable>
        </View>
      </View>

      <View style={styles.infoContainer}>
        {selectedRobotData ? (
          <Card title={selectedRobotData.name} style={styles.robotInfoCard}>
            <View style={styles.robotInfoHeader}>
              <Text style={styles.robotId}>ID: {selectedRobotData.id}</Text>
              <StatusBadge status={getStatusBadgeType(selectedRobotData.status)} />
            </View>

            <View style={styles.locationInfo}>
              <MapPin size={16} color="#8E8E93" />
              <Text style={styles.locationText}>
                Lat: {selectedRobotData.location.latitude.toFixed(4)},
                Long: {selectedRobotData.location.longitude.toFixed(4)}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <Button
                variant="primary"
                onPress={() => handleViewLiveStream(selectedRobotData.id)}
                style={styles.actionButton}
              >
                View Live Feed
              </Button>
              <Button
                variant="outline"
                icon={selectedRobotData.status === 'patrolling' ? <EyeOff size={18} color="#0A84FF" /> : <Eye size={18} color="#0A84FF" />}
                style={styles.actionButton}
              >
                {selectedRobotData.status === 'patrolling' ? 'Stop Patrol' : 'Start Patrol'}
              </Button>
            </View>
          </Card>
        ) : (
          <Card style={styles.robotInfoCard}>
            <Text style={styles.selectRobotText}>Select a robot on the map to view details</Text>
          </Card>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  mapContainer: {
    width: '100%',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(44, 44, 46, 0.8)',
    borderRadius: 8,
    padding: 4,
  },
  mapControlButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 8,
  },
  disabledControl: {
    opacity: 0.5,
  },
  infoContainer: {
    flex: 1,
    padding: 16,
  },
  robotInfoCard: {
    marginHorizontal: 0,
  },
  robotInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  robotId: {
    fontSize: 14,
    color: '#8E8E93',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  selectRobotText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    padding: 24,
  },
});