import { Link } from 'expo-router';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';

export default function LandingScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/mother.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/baby_hand.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>C-SECTION{'\n'}Wound Tracker</Text>
            <Text style={styles.subtitle}>
              For Every New Mother
            </Text>
          </View>

          <View style={styles.mainFeature}>
            <Text style={styles.featureHighlight}>
              Track what 82% of mothers{'\n'}are never told about{'\n'}C-section recovery
            </Text>
          </View>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>
                AI-Powered Wound Monitoring
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureText}>
                Instant Health Alerts
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureText}>
                Expert Recovery Guidance
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Link href="/(auth)/register" asChild>
              <Button variant="primary" onPress={() => {}} style={styles.button} title="Start Your Recovery Journey" />
            </Link>
            <Link href="/(auth)/login" asChild>
              <Button variant="secondary" onPress={() => {}} style={styles.button} title="Login" />
            </Link>
          </View>
        </ScrollView>
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Very subtle white overlay to ensure text readability
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 20,
    color: '#8B4D47', // Deeper warm tone
    marginTop: 8,
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  mainFeature: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  featureHighlight: {
    fontSize: 24,
    textAlign: 'center',
    color: '#8B4D47', // Deeper warm tone
    lineHeight: 32,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  features: {
    marginBottom: 20,
  },
  featureItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderColor: 'rgba(212, 117, 109, 0.3)',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  featureText: {
    fontSize: 18,
    color: '#8B4D47', // Deeper warm tone
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  actions: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button: {
    marginBottom: 8,
    borderRadius: 12,
  },
});
