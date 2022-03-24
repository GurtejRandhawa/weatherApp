/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const Form = ({ search, onSetSearch, onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hi there!</Text>
      <Text style={styles.subHeading}>
        Enter the city name below and press the search button.
      </Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder='Enter city name...'
          value={search}
          onChangeText={(val) => onSetSearch(val)}
        />
        <Button color='#ffc400' title='Search' onPress={onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: '#f1f1f1',
  },
  heading: {
    fontSize: 20,
    // textAlign: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 15,
    // textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    backgroundColor: '#fff',
     color: '#363636',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Form;
