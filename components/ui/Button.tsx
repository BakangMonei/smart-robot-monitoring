import React from 'react';
import { Text, Pressable, StyleSheet, ActivityIndicator, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  glass?: boolean;
}

const Button = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  glass = false,
}: ButtonProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'accent':
        return styles.accent;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      case 'link':
        return styles.link;
      case 'destructive':
        return styles.destructive;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'accent':
      case 'destructive':
        return styles.textLight;
      case 'outline':
      case 'ghost':
      case 'link':
        return { ...styles.textDark, color: getVariantColor() };
      default:
        return styles.textLight;
    }
  };

  const getVariantColor = () => {
    switch (variant) {
      case 'primary':
        return '#0A84FF';
      case 'secondary':
        return '#5E5CE6';
      case 'accent':
        return '#FF9500';
      case 'destructive':
        return '#FF453A';
      default:
        return '#0A84FF';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'xs':
        return styles.xs;
      case 'sm':
        return styles.sm;
      case 'md':
        return styles.md;
      case 'lg':
        return styles.lg;
      case 'xl':
        return styles.xl;
      default:
        return styles.md;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'xs':
        return styles.textXs;
      case 'sm':
        return styles.textSm;
      case 'md':
        return styles.textMd;
      case 'lg':
        return styles.textLg;
      case 'xl':
        return styles.textXl;
      default:
        return styles.textMd;
    }
  };

  const containerStyles = [
    styles.container,
    getSizeStyle(),
    getVariantStyle(),
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ];

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' || variant === 'link' ? getVariantColor() : '#fff'}
          size="small"
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[getTextStyle(), getTextSizeStyle()]}>{children}</Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </View>
      )}
    </>
  );

  if (glass && Platform.OS !== 'web') {
    return (
      <Pressable
        onPress={!disabled && !loading ? onPress : undefined}
        style={({ pressed }) => [
          ...containerStyles,
          pressed && styles.pressed,
          glass && styles.transparent,
        ]}
        disabled={disabled || loading}
      >
        <BlurView intensity={80} tint="dark" style={styles.blurView}>
          {buttonContent}
        </BlurView>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={!disabled && !loading ? onPress : undefined}
      style={({ pressed }) => [
        ...containerStyles,
        pressed && styles.pressed,
      ]}
      disabled={disabled || loading}
    >
      {buttonContent}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurView: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparent: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  primary: {
    backgroundColor: '#0A84FF',
  },
  secondary: {
    backgroundColor: '#5E5CE6',
  },
  accent: {
    backgroundColor: '#FF9500',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0A84FF',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  destructive: {
    backgroundColor: '#FF453A',
  },
  textLight: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textDark: {
    fontWeight: '600',
  },
  xs: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  md: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  xl: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 10,
  },
  textXs: {
    fontSize: 12,
  },
  textSm: {
    fontSize: 14,
  },
  textMd: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },
  textXl: {
    fontSize: 20,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;