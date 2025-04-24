import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { ChevronRight, Bell, Camera, Lock, Shield, Wifi, BatteryCharging, CloudUpload, CircleHelp as HelpCircle, Info } from 'lucide-react-native';
import Card from '@/components/ui/Card';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  onPress?: () => void;
  hasChevron?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  description,
  hasToggle = false,
  toggleValue = false,
  onToggleChange,
  onPress,
  hasChevron = true,
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.settingsItem,
      pressed && styles.settingsItemPressed,
      !onPress && styles.settingsItemDisabled,
    ]}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.settingsItemIcon}>
      {icon}
    </View>
    
    <View style={styles.settingsItemContent}>
      <Text style={styles.settingsItemTitle}>{title}</Text>
      {description && <Text style={styles.settingsItemDescription}>{description}</Text>}
    </View>
    
    {hasToggle && (
      <Switch
        value={toggleValue}
        onValueChange={onToggleChange}
        trackColor={{ false: '#3A3A3C', true: '#34C759' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#3A3A3C"
      />
    )}
    
    {!hasToggle && hasChevron && onPress && (
      <ChevronRight size={18} color="#8E8E93" />
    )}
  </Pressable>
);

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [motionAlerts, setMotionAlerts] = useState(true);
  const [faceRecognition, setFaceRecognition] = useState(true);
  const [animalDetection, setAnimalDetection] = useState(false);
  const [vehicleDetection, setVehicleDetection] = useState(true);
  const [nightMode, setNightMode] = useState(true);
  const [highDefinition, setHighDefinition] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [autoPatrol, setAutoPatrol] = useState(true);
  const [lowBatteryReturn, setLowBatteryReturn] = useState(true);
  const [cloudBackup, setCloudBackup] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <SettingsSection title="Notifications">
        <SettingsItem
          icon={<Bell size={22} color="#FF9500" />}
          title="Push Notifications"
          description="Receive alerts on your device"
          hasToggle
          toggleValue={notificationsEnabled}
          onToggleChange={setNotificationsEnabled}
        />
        <SettingsItem
          icon={<Camera size={22} color="#FF375F" />}
          title="Motion Detection Alerts"
          description="Get notified when motion is detected"
          hasToggle
          toggleValue={motionAlerts}
          onToggleChange={setMotionAlerts}
        />
      </SettingsSection>
      
      <SettingsSection title="AI Detection Settings">
        <SettingsItem
          icon={<Shield size={22} color="#5E5CE6" />}
          title="Face Recognition"
          description="Identify known individuals"
          hasToggle
          toggleValue={faceRecognition}
          onToggleChange={setFaceRecognition}
        />
        <SettingsItem
          icon={<Shield size={22} color="#5E5CE6" />}
          title="Animal Detection"
          description="Identify and classify animals"
          hasToggle
          toggleValue={animalDetection}
          onToggleChange={setAnimalDetection}
        />
        <SettingsItem
          icon={<Shield size={22} color="#5E5CE6" />}
          title="Vehicle Detection"
          description="Identify and classify vehicles"
          hasToggle
          toggleValue={vehicleDetection}
          onToggleChange={setVehicleDetection}
        />
      </SettingsSection>
      
      <SettingsSection title="Camera Settings">
        <SettingsItem
          icon={<Camera size={22} color="#30D158" />}
          title="Night Vision Mode"
          description="Automatically enable in low light"
          hasToggle
          toggleValue={nightMode}
          onToggleChange={setNightMode}
        />
        <SettingsItem
          icon={<Camera size={22} color="#30D158" />}
          title="High Definition Recording"
          description="Uses more storage and bandwidth"
          hasToggle
          toggleValue={highDefinition}
          onToggleChange={setHighDefinition}
        />
      </SettingsSection>
      
      <SettingsSection title="Security">
        <SettingsItem
          icon={<Lock size={22} color="#0A84FF" />}
          title="Two-Factor Authentication"
          description="Added security for your account"
          hasToggle
          toggleValue={twoFactorAuth}
          onToggleChange={setTwoFactorAuth}
        />
        <SettingsItem
          icon={<Lock size={22} color="#0A84FF" />}
          title="Biometric Authentication"
          description="Use Face ID or Touch ID to access app"
          hasToggle
          toggleValue={biometricAuth}
          onToggleChange={setBiometricAuth}
        />
        <SettingsItem
          icon={<Lock size={22} color="#0A84FF" />}
          title="Manage Access Permissions"
          description="Control who can access your robots"
          onPress={() => {}}
        />
      </SettingsSection>
      
      <SettingsSection title="Robot Behavior">
        <SettingsItem
          icon={<Wifi size={22} color="#FF9500" />}
          title="Automatic Patrol"
          description="Patrol according to schedule"
          hasToggle
          toggleValue={autoPatrol}
          onToggleChange={setAutoPatrol}
        />
        <SettingsItem
          icon={<BatteryCharging size={22} color="#FF9500" />}
          title="Return to Dock on Low Battery"
          description="Below 15% battery remaining"
          hasToggle
          toggleValue={lowBatteryReturn}
          onToggleChange={setLowBatteryReturn}
        />
      </SettingsSection>
      
      <SettingsSection title="Data & Storage">
        <SettingsItem
          icon={<CloudUpload size={22} color="#5E5CE6" />}
          title="Cloud Backup"
          description="Automatically backup recordings to cloud"
          hasToggle
          toggleValue={cloudBackup}
          onToggleChange={setCloudBackup}
        />
        <SettingsItem
          icon={<CloudUpload size={22} color="#5E5CE6" />}
          title="Storage Management"
          description="Manage video storage and cleanup"
          onPress={() => {}}
        />
        <SettingsItem
          icon={<CloudUpload size={22} color="#5E5CE6" />}
          title="Automatic Updates"
          description="Keep system and firmware updated"
          hasToggle
          toggleValue={autoUpdate}
          onToggleChange={setAutoUpdate}
        />
      </SettingsSection>
      
      <SettingsSection title="Support">
        <SettingsItem
          icon={<HelpCircle size={22} color="#FF9500" />}
          title="Help Center"
          description="Troubleshooting and guides"
          onPress={() => {}}
        />
        <SettingsItem
          icon={<Info size={22} color="#FF9500" />}
          title="About"
          description="Version 1.0.0"
          onPress={() => {}}
        />
      </SettingsSection>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Smart Robot Video Monitoring System
        </Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A84FF',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3C',
  },
  settingsItemPressed: {
    backgroundColor: '#3A3A3C',
  },
  settingsItemDisabled: {
    opacity: 0.7,
  },
  settingsItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(174, 174, 178, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingsItemDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  footer: {
    alignItems: 'center',
    padding: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: '#8E8E93',
  },
});