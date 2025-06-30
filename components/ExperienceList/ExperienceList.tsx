import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExperienceItem from './ExperienceItem/ExperienceItem';

interface Experience {
  title: string;
  years: string;
  description: string;
}

interface ExperienceListProps {
  experiences: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => (
  <View style={styles.container}>
    {experiences.map((exp, idx) => (
      <ExperienceItem key={idx} {...exp} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6FFF0',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#B6FF6C',
    padding: 12,
    marginTop: 12,
    marginBottom: 12,
  },
});

export default ExperienceList;
