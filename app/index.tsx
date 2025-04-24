import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/app/(tabs)" />;
}