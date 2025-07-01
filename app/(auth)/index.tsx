import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import Button from '../../components/ui/Button';

export default function LandingScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.logo}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>❤️</Text>
          </View>
          <Text style={styles.appName}>WoundTrack</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Your Recovery,{'\n'}Monitored</Text>
          <Text style={styles.subtitle}>
            AI-powered C-section wound monitoring for new mothers. Track your healing progress, 
            get instant health insights, and find nearby medical care when you need it most.
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text>📸</Text>
            </View>
            <Text style={styles.featureTitle}>Smart Monitoring</Text>
            <Text style={styles.featureText}>
              Capture wound photos with your phone camera and get instant AI-powered health assessments
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text>🛡️</Text>
            </View>
            <Text style={styles.featureTitle}>Early Detection</Text>
            <Text style={styles.featureText}>
              Get alerts for potential infections or complications before they become serious
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Link href="/(auth)/register" asChild>
            <Button variant="primary" onPress={() => {}} style={styles.button} title="Start Tracking" />
          </Link>
          <Link href="/(auth)/login" asChild>
            <Button  variant="secondary" onPress={() => {}} style={styles.button} title="Login" />
              
          </Link>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#E8EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 30,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1849D7',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1849D7',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  features: {
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1849D7',
  },
  featureText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
  actions: {
    width: '100%',
  },
  button: {
    marginBottom: 12,
  },
});
