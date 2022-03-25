/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Share,
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
  const mist = require('../Assets/mist.jpg');
  const spring = require('../Assets/spring.jpg');
  const summer = require('../Assets/summer.jpg');
  const winter = require('../Assets/winter.jpg');
  const rain = require('../Assets/rain.jpg');
  const cloud = require('../Assets/cloud.jpg');
  let source = '';
  console.log(data);

  if (data.weather[0].main == 'Clouds') source = cloud;
  if (data.weather[0].main == 'Haze') source = mist;
  if (data.weather[0].main == 'Clear') source = summer;
  if (data.weather[0].main == 'Mist') source = mist;
  if (data.weather[0].main == 'Smoke') source = mist;
  if (data.weather[0].main == 'Rain') source = rain;
  if (data.weather[0].main == 'Snow') source = winter;
  if (data.weather[0].main == 'Drizzle') source = rain;

  const onShare = async (data) => {
    try {
      const result = await Share.share({
        message:
          `Weather details of ${data.name} (${data.sys.country}) :-` +
          `\n\n1) ${data.weather[0].description.toUpperCase()}` +
          `\n2) Temperature - ${celsius}` +
          '\u{00B0}' +
          'C' +
          `\n3) Humidity - ${data.main.humidity}%` +
          `\n5) Wind - ${data.wind.speed} m/s` +
          `\n4) Pressure - ${data.main.pressure} hPa`,
      });
    } catch (error) {
      alert(error.message);
    }
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
        onBackButtonPress={()=>{toggleModal()}}
      >
        <ImageBackground
          source={source}
          resizeMode='cover'
          style={styles.bgImage}
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
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
            >
              <TouchableOpacity
                onPress={() => onShare(data)}
                style={{ ...styles.buttons, backgroundColor: '#ffc400' }}
              >
                <Text style={{ color: '#fff' }}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModal}
                style={{ ...styles.buttons, backgroundColor: '#ff4d4d' }}
              >
                <Text style={{ color: '#fff' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
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
    color: 'black',
  },
  box: {
    borderWidth: 1.5,
    borderColor: 'black',
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
    color: 'black',
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
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
    // backgroundColor: '#ffffe6',
    margin: 0,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    shadowOpacity: 10,
  },
  buttons: {
    alignItems: 'center',
    borderRadius: 5,
    width: 150,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default WeatherData;
