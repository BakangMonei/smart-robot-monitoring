import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, RefreshControl } from 'react-native';
import AlertItem from '@/components/AlertItem';
import { useRouter } from 'expo-router';
import { Filter, X } from 'lucide-react-native';

const mockAlerts = [
  {
    id: 'alert-001',
    type: 'human',
    title: 'Person Detected',
    message: 'Unidentified person detected at front entrance. Facial recognition initiated.',
    timestamp: '10 min ago',
    robotName: 'Sentinel Alpha',
    robotId: 'RB-2023-001',
    severity: 'high',
    imageUrl: 'https://images.pexels.com/photos/3205568/pexels-photo-3205568.jpeg',
  },
  {
    id: 'alert-002',
    type: 'motion',
    title: 'Motion Detected',
    message: 'Movement detected in backyard area. No clear visual identification.',
    timestamp: '32 min ago',
    robotName: 'Guardian Beta',
    robotId: 'RB-2023-002',
    severity: 'medium',
  },
  {
    id: 'alert-003',
    type: 'system',
    title: 'Low Battery Warning',
    message: 'Guardian Beta battery level below 50%. Please consider recharging soon.',
    timestamp: '1 hour ago',
    robotName: 'Guardian Beta',
    robotId: 'RB-2023-002',
    severity: 'low',
  },
  {
    id: 'alert-004',
    type: 'animal',
    title: 'Animal Detected',
    message: 'Cat detected in the yard. No security concerns.',
    timestamp: '2 hours ago',
    robotName: 'Sentinel Alpha',
    robotId: 'RB-2023-001',
    severity: 'low',
    imageUrl: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
  },
  {
    id: 'alert-005',
    type: 'human',
    title: 'Recognized Face',
    message: 'Authorized person (John Doe) identified at side entrance.',
    timestamp: '3 hours ago',
    robotName: 'Guardian Beta',
    robotId: 'RB-2023-002',
    severity: 'low',
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  },
  {
    id: 'alert-006',
    type: 'object',
    title: 'Vehicle Detected',
    message: 'Unknown vehicle parked in driveway. License plate recognition initiated.',
    timestamp: '5 hours ago',
    robotName: 'Sentinel Alpha',
    robotId: 'RB-2023-001',
    severity: 'medium',
    imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
  },
  {
    id: 'alert-007',
    type: 'system',
    title: 'Camera Obstruction',
    message: 'Possible camera obstruction detected. Please check camera lens.',
    timestamp: '6 hours ago',
    robotName: 'Sentinel Gamma',
    robotId: 'RB-2023-003',
    severity: 'medium',
  },
  {
    id: 'alert-008',
    type: 'motion',
    title: 'Rapid Movement',
    message: 'Fast movement detected at rear perimeter. Switching to high frame rate.',
    timestamp: '8 hours ago',
    robotName: 'Sentinel Alpha',
    robotId: 'RB-2023-001',
    severity: 'medium',
  },
];

type FilterType = 'all' | 'human' | 'animal' | 'motion' | 'system' | 'object';
type SeverityType = 'all' | 'high' | 'medium' | 'low';

export default function AlertsScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityType>('all');
  const [showFilters, setShowFilters] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleAlertPress = (alertId: string) => {
    router.push(`/alert/${alertId}`);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setTypeFilter('all');
    setSeverityFilter('all');
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    return matchesType && matchesSeverity;
  });

  const getFilterButtonStyle = (filter: string, activeFilter: string) => [
    styles.filterButton,
    filter === activeFilter && styles.activeFilterButton,
  ];

  const getFilterTextStyle = (filter: string, activeFilter: string) => [
    styles.filterButtonText,
    filter === activeFilter && styles.activeFilterButtonText,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.filterToggleContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.filterToggleButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={toggleFilters}
          >
            <Filter size={18} color="#0A84FF" />
            <Text style={styles.filterToggleText}>Filters</Text>
          </Pressable>

          {(typeFilter !== 'all' || severityFilter !== 'all') && (
            <Pressable
              style={({ pressed }) => [
                styles.resetButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={resetFilters}
            >
              <X size={18} color="#FF453A" />
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
          )}
        </View>

        {showFilters && (
          <View style={styles.filtersContainer}>
            <View>
              <Text style={styles.filterSectionTitle}>Alert Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
                <Pressable
                  style={getFilterButtonStyle('all', typeFilter)}
                  onPress={() => setTypeFilter('all')}
                >
                  <Text style={getFilterTextStyle('all', typeFilter)}>All</Text>
                </Pressable>
                <Pressable
                  style={getFilterButtonStyle('human', typeFilter)}
                  onPress={() => setTypeFilter('human')}
                >
                  <Text style={getFilterTextStyle('human', typeFilter)}>Human</Text>
                </Pressable>
                <Pressable
                  style={getFilterButtonStyle('animal', typeFilter)}
                  onPress={() => setTypeFilter('animal')}
                >
                  <Text style={getFilterTextStyle('animal', typeFilter)}>Animal</Text>
                </Pressable>
                <Pressable
                  style={getFilterButtonStyle('motion', typeFilter)}
                  onPress={() => setTypeFilter('motion')}
                >
                  <Text style={getFilterTextStyle('motion', typeFilter)}>Motion</Text>
                </Pressable>
                <Pressable
                  style={getFilterButtonStyle('system', typeFilter)}
                  onPress={() => setTypeFilter('system')}
                >
                  <Text style={getFilterTextStyle('system', typeFilter)}>System</Text>
                </Pressable>
                <Pressable
                  style={getFilterButtonStyle('object', typeFilter)}
                  onPress={() => setTypeFilter('object')}
                >
                  <Text style={getFilterTextStyle('object', typeFilter)}>Object</Text>
                </Pressable>
              </ScrollView>
            </View>

            <View style={styles.severityContainer}>
              <Text style={styles.filterSectionTitle}>Severity</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
                <Pressable
                  style={getFilterButtonStyle('all', severityFilter)}
                  onPress={() => setSeverityFilter('all')}
                >
                  <Text style={getFilterTextStyle('all', severityFilter)}>All</Text>
                </Pressable>
                <Pressable
                  style={getFilterButtonStyle('high', severityFilter)}
                  onPress={() => setSeverityFilter('high')}
                >
                  <Text style={getFilterTextStyle('high', severityFilter)}>High</Text>
                </Pressable>
                <Pressable
                  style={getFilterButtonStyle('medium', severityFilter)}
                  onPress={() => setSeverityFilter('medium')}
                >
                  <Text style={getFilterTextStyle('medium', severityFilter)}>Medium</Text>
                </Pressable>
                <Pressable
                  style={getFilterButtonStyle('low', severityFilter)}
                  onPress={() => setSeverityFilter('low')}
                >
                  <Text style={getFilterTextStyle('low', severityFilter)}>Low</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.alertsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
          />
        }
      >
        <Text style={styles.resultsText}>
          {filteredAlerts.length} {filteredAlerts.length === 1 ? 'alert' : 'alerts'} found
        </Text>

        {filteredAlerts.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No alerts match your filters</Text>
          </View>
        ) : (
          filteredAlerts.map(alert => (
            <AlertItem
              key={alert.id}
              id={alert.id}
              type={alert.type as any}
              title={alert.title}
              message={alert.message}
              timestamp={alert.timestamp}
              robotName={alert.robotName}
              robotId={alert.robotId}
              severity={alert.severity as any}
              imageUrl={alert.imageUrl}
              onPress={() => handleAlertPress(alert.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  filterToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
  },
  filterToggleText: {
    color: '#0A84FF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
  },
  resetButtonText: {
    color: '#FF453A',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  filtersContainer: {
    marginTop: 16,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  filterScrollView: {
    marginBottom: 12,
  },
  severityContainer: {
    marginTop: 4,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#2C2C2E',
  },
  activeFilterButton: {
    backgroundColor: '#0A84FF',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  activeFilterButtonText: {
    fontWeight: '600',
  },
  alertsList: {
    flex: 1,
  },
  resultsText: {
    fontSize: 14,
    color: '#8E8E93',
    padding: 16,
    paddingBottom: 8,
  },
  noResults: {
    padding: 32,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});