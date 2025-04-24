import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Card from './ui/Card';

interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface StatisticsCardProps {
  title: string;
  stats: StatItem[];
  style?: ViewStyle;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  stats,
  style,
}) => {
  return (
    <Card title={title} style={[styles.card, style]}>
      <View style={styles.statsList}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={[styles.statValue, { color: stat.color || '#FFFFFF' }]}>
              {stat.value}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 0,
  },
  statsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  statItem: {
    width: '33.33%',
    marginBottom: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

export default StatisticsCard;