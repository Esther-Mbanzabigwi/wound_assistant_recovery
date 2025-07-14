import React from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { SharedStyles } from '../constants/SharedStyles';

interface AppLayoutProps {
  children: React.ReactNode;
  showIcon?: boolean;
  contentStyle?: ViewStyle;
  scrollEnabled?: boolean;
  /**
   * If true, the content will be rendered directly in a View instead of ScrollView
   * Use this when your content already has its own scrolling mechanism (like FlatList)
   */
  useScrollView?: boolean;
}

export default function AppLayout({
  children,
  showIcon = true,
  contentStyle,
  scrollEnabled = true,
  useScrollView = true,
}: AppLayoutProps) {
  const Content = () => (
    <>
      {showIcon && (
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/baby_hand.png')}
            style={styles.iconImage}
            resizeMode="cover"
          />
        </View>
      )}
      {children}
    </>
  );

  return (
    <ImageBackground
      source={require('../assets/images/mother.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        {useScrollView ? (
          <ScrollView
            style={SharedStyles.container}
            contentContainerStyle={[styles.content, contentStyle]}
            showsVerticalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
          >
            <Content />
          </ScrollView>
        ) : (
          <View style={[SharedStyles.container, styles.content, contentStyle]}>
            <Content />
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  content: {
    padding: 20,
    paddingTop: 40,
    minHeight: '100%',
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 241, 237, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 2,
    alignSelf: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
}); 