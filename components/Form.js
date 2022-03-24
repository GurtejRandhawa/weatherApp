/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

const Form = ({ search, onSetSearch, onSubmit, onClear }) => {
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
        {/* <Button color='#ffc400' title='Search' onPress={onSubmit} />
        <Button color='#ffc400' title='CLear' onPress={onClear} /> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={onClear} style={styles.buttons}>
            <Text style={{ color: '#fff' }}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit} style={styles.buttons}>
            <Text style={{ color: '#fff' }}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 25,
    // textAlign: 'center',
    marginBottom: 30,
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
    marginBottom: 15,
  },
  buttons: {
    backgroundColor: '#ffc400',
    alignItems: 'center',
    borderRadius: 5,
    width: 150,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Form;
