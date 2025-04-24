import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  glass?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

const Card = ({
  children,
  title,
  subtitle,
  glass = false,
  style,
  onPress,
}: CardProps) => {
  const CardContainer = onPress ? Pressable : View;
  
  const renderContent = () => (
    <>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </>
  );

  if (glass && Platform.OS !== 'web') {
    return (
      <CardContainer
        style={[styles.card, style]}
        onPress={onPress}
      >
        <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
          {renderContent()}
        </BlurView>
      </CardContainer>
    );
  }

  return (
    <CardContainer
      style={[
        styles.card, 
        glass && styles.glassBackground,
        style
      ]}
      onPress={onPress}
    >
      {renderContent()}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#2C2C2E',
    overflow: 'hidden',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  glassBackground: {
    backgroundColor: 'rgba(44, 44, 46, 0.7)',
  },
  blurContainer: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  content: {
    padding: 16,
  },
});

export default Card;