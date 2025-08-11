import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SpecialtyItem from './SpecialtyItem/SpecialtyItem';

interface Specialty {
  name: string;
  description?: string;
}

interface SpecialtyListProps {
  specialties: Specialty[];
}

const SpecialtyList: React.FC<SpecialtyListProps> = ({ specialties }) => (
  <View style={styles.container}>
    {specialties.map((specialty, idx) => (
      <SpecialtyItem key={idx} {...specialty} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F8FF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#6CB7FF',
    padding: 12,
    marginTop: 12,
    marginBottom: 12,
  },
});

export default SpecialtyList;
