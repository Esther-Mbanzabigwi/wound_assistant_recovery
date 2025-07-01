import { StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import Button from '../../components/ui/Button';

export default function CaptureScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wound Photo Capture</Text>
        <Text style={styles.subtitle}>
          Take or upload a photo of your C-section wound for AI-powered analysis
        </Text>
      </View>

      <View style={styles.captureArea}>
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.cameraIcon}>📸</Text>
          <Text style={styles.captureText}>Capture Wound Photo</Text>
          <Text style={styles.captureSubtext}>
            Take a clear photo of your wound for analysis
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Take Photo"
            variant="primary"
            onPress={() => {}}
            style={styles.button}
          />
          <Text style={styles.orText}>or</Text>
          <Button
            title="Upload from Gallery"
            variant="secondary"
            onPress={() => {}}
            style={styles.button}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1849D7',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  captureArea: {
    flex: 1,
    justifyContent: 'center',
    gap: 32,
  },
  cameraPlaceholder: {
    backgroundColor: '#F5F7FF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8EFFF',
    borderStyle: 'dashed',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  captureText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1849D7',
    marginBottom: 8,
  },
  captureSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actions: {
    gap: 16,
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
  orText: {
    color: '#666',
    fontSize: 16,
  },
}); 