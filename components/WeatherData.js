/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { useState } from 'react';

const WeatherData = ({ data }) => {
  const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(2);
  const celsius = (data.main.temp - 273.15).toFixed(2);
  const [isModalVisible, setModalVisible] = useState(true);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container} onStartShouldSetResponder={() => true}>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        coverScreen={true}
        useNativeDriver={true}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        animationInTiming={800}
        animationOutTiming={800}
      >
        <ScrollView style={styles.containerInner}>
          <Text style={styles.title}>
            {data.name} - {data.sys.country}
          </Text>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>{data.weather[0].description}</Text>
            <Image
              style={styles.image}
              source={{
                uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
              }}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Temp</Text>
            <View style={styles.tempContainer}>
              <Text style={styles.boxText}>{data.main.temp}K</Text>
              <Text style={styles.boxText}>{fahrenheit}&#8457;</Text>
              <Text style={styles.boxText}>{celsius}&#8451;</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Humidity</Text>
            <Text style={styles.boxText}>{data.main.humidity}%</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Pressure</Text>
            <Text style={styles.boxText}>{data.main.pressure + ' '}hPa</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Wind</Text>
            <Text style={styles.boxText}>{data.wind.speed} m/s</Text>
          </View>
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              backgroundColor: '#ff4d4d',
              alignItems: 'center',
              borderRadius: 5,
              width: 150,
              height: 50,
              alignSelf: 'center',
              justifyContent:'center'
            }}
          >
            <Text style={{color:'#fff'}}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  box: {
    borderWidth: 1,
    borderColor: '#999999',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  boxLabel: {
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 5,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 40,
    alignContent: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
  modal: {
    flex: 1,
    backgroundColor: '#ffffe6',
    margin: 0,
  },
});

export default WeatherData;
