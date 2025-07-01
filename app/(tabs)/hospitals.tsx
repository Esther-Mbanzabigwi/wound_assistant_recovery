import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function HospitalsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Nearby Hospitals</Text>
        <Text style={styles.subtitle}>
          Locate medical facilities near you for immediate care
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Search hospitals"
          icon="search"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button
          title="Use My Location"
          variant="primary"
          onPress={() => {}}
          style={styles.locationButton}
        />
      </View>

      <View style={styles.locationInfo}>
        <Text style={styles.locationText}>Current Location</Text>
        <Text style={styles.address}>Downtown Area, Main Street</Text>
      </View>

      <ScrollView style={styles.hospitalList}>
        <View style={styles.hospitalCard}>
          <View style={styles.hospitalInfo}>
            <Text style={styles.hospitalName}>City General Hospital</Text>
            <Text style={styles.distance}>0.8 miles away</Text>
          </View>
          
          <Text style={styles.hospitalAddress}>123 Main Street, Downtown</Text>
          <Text style={styles.phone}>(555) 123-4567</Text>
          <Text style={styles.hours}>24/7</Text>

          <Text style={styles.waitTime}>Wait Time: ~15 mins</Text>

          <View style={styles.specialties}>
            <Text style={styles.specialtyTag}>Emergency Care</Text>
            <Text style={styles.specialtyTag}>Maternity</Text>
            <Text style={styles.specialtyTag}>Surgery</Text>
          </View>

          <View style={styles.actions}>
            <Button
              title="Get Directions"
              variant="primary"
              onPress={() => {}}
              style={styles.actionButton}
            />
            <Button
              title="Call"
              variant="secondary"
              onPress={() => {}}
              style={styles.actionButton}
            />
          </View>
        </View>

        <View style={styles.hospitalCard}>
          <View style={styles.hospitalInfo}>
            <Text style={styles.hospitalName}>Women's Health Center</Text>
            <Text style={styles.distance}>1.2 miles away</Text>
          </View>
          
          <Text style={styles.hospitalAddress}>456 Oak Avenue, Midtown</Text>
          <Text style={styles.phone}>(555) 987-6543</Text>
          <Text style={styles.hours}>6 AM - 10 PM</Text>

          <Text style={styles.waitTime}>Wait Time: ~30 mins</Text>

          <View style={styles.specialties}>
            <Text style={styles.specialtyTag}>Women's Health</Text>
            <Text style={styles.specialtyTag}>Postpartum Care</Text>
            <Text style={styles.specialtyTag}>OB/GYN</Text>
          </View>

          <View style={styles.actions}>
            <Button
              title="Get Directions"
              variant="primary"
              onPress={() => {}}
              style={styles.actionButton}
            />
            <Button
              title="Call"
              variant="secondary"
              onPress={() => {}}
              style={styles.actionButton}
            />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
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
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
  },
  locationButton: {
    minWidth: 140,
  },
  locationInfo: {
    backgroundColor: '#F5F7FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  hospitalList: {
    flex: 1,
  },
  hospitalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hospitalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1849D7',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  hospitalAddress: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  hours: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  waitTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: '#E8EFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    color: '#1849D7',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
}); 