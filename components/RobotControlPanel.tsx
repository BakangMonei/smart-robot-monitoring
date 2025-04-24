import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Chrome as Home, Target, Play, Pause } from 'lucide-react-native';
import Button from './ui/Button';
import Card from './ui/Card';

interface RobotControlPanelProps {
  robotId: string;
  robotName: string;
  isPatrolling?: boolean;
  onMoveForward?: () => void;
  onMoveBackward?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onReturnHome?: () => void;
  onTogglePatrol?: () => void;
}

const RobotControlPanel: React.FC<RobotControlPanelProps> = ({
  robotId,
  robotName,
  isPatrolling = false,
  onMoveForward,
  onMoveBackward,
  onMoveLeft,
  onMoveRight,
  onReturnHome,
  onTogglePatrol,
}) => {
  const [activeDirection, setActiveDirection] = useState<string | null>(null);

  const handlePressIn = (direction: string, callback?: () => void) => {
    setActiveDirection(direction);
    if (callback) callback();
  };

  const handlePressOut = () => {
    setActiveDirection(null);
  };

  return (
    <Card title={`Control Panel - ${robotName}`}>
      <Text style={styles.robotId}>Robot ID: {robotId}</Text>
      
      <View style={styles.controlsContainer}>
        <View style={styles.directionalControls}>
          {/* Top button */}
          <View style={styles.topRow}>
            <Pressable
              style={[
                styles.directionButton,
                activeDirection === 'up' && styles.activeButton
              ]}
              onPressIn={() => handlePressIn('up', onMoveForward)}
              onPressOut={handlePressOut}
            >
              <ArrowUp size={24} color={activeDirection === 'up' ? '#000000' : '#FFFFFF'} />
            </Pressable>
          </View>
          
          {/* Middle row */}
          <View style={styles.middleRow}>
            <Pressable
              style={[
                styles.directionButton,
                activeDirection === 'left' && styles.activeButton
              ]}
              onPressIn={() => handlePressIn('left', onMoveLeft)}
              onPressOut={handlePressOut}
            >
              <ArrowLeft size={24} color={activeDirection === 'left' ? '#000000' : '#FFFFFF'} />
            </Pressable>
            
            <View style={styles.centerButton}>
              <Pressable
                style={[
                  styles.homeButton,
                  activeDirection === 'home' && styles.activeHomeButton
                ]}
                onPressIn={() => handlePressIn('home', onReturnHome)}
                onPressOut={handlePressOut}
              >
                <Home size={24} color={activeDirection === 'home' ? '#000000' : '#FFFFFF'} />
              </Pressable>
            </View>
            
            <Pressable
              style={[
                styles.directionButton,
                activeDirection === 'right' && styles.activeButton
              ]}
              onPressIn={() => handlePressIn('right', onMoveRight)}
              onPressOut={handlePressOut}
            >
              <ArrowRight size={24} color={activeDirection === 'right' ? '#000000' : '#FFFFFF'} />
            </Pressable>
          </View>
          
          {/* Bottom row */}
          <View style={styles.bottomRow}>
            <Pressable
              style={[
                styles.directionButton,
                activeDirection === 'down' && styles.activeButton
              ]}
              onPressIn={() => handlePressIn('down', onMoveBackward)}
              onPressOut={handlePressOut}
            >
              <ArrowDown size={24} color={activeDirection === 'down' ? '#000000' : '#FFFFFF'} />
            </Pressable>
          </View>
        </View>

        <View style={styles.additionalControls}>
          <Button
            variant={isPatrolling ? 'destructive' : 'primary'}
            icon={isPatrolling ? <Pause size={18} color="#FFFFFF" /> : <Play size={18} color="#FFFFFF" />}
            onPress={onTogglePatrol}
            style={styles.patrolButton}
          >
            {isPatrolling ? 'Stop Patrol' : 'Start Patrol'}
          </Button>
          
          <Button
            variant="outline"
            icon={<Target size={18} color="#0A84FF" />}
            style={styles.targetButton}
          >
            Set Target
          </Button>
        </View>
      </View>
      
      <Text style={styles.helpText}>
        Press and hold direction buttons to control robot movement
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  robotId: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  directionalControls: {
    width: '60%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  directionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(174, 174, 178, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#0A84FF',
  },
  centerButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 149, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeHomeButton: {
    backgroundColor: '#FF9500',
  },
  additionalControls: {
    width: '38%',
    justifyContent: 'center',
  },
  patrolButton: {
    marginBottom: 12,
  },
  targetButton: {
    marginBottom: 12,
  },
  helpText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default RobotControlPanel;