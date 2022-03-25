import React, { useState,useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getWeather } from './store/actions/weatherActions';
import Form from './components/Form';
import Weather from './components/Weather';

const App = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.weather);

  const searchSubmitHandler = () => {
    if (search === '') {
      return Alert.alert('Oops!', 'City name cannot be empty!', [
        { text: 'OK' },
      ]);
    }

    setLoading(true);
    dispatch(
      getWeather(
        search,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
    Keyboard.dismiss();
  };

  const clearField = () => {
    setSearch('');
  };

 useEffect(() => {
   const backAction = () => {
     Alert.alert('Hold on!', 'Are you sure you want to exit the App?', [
       {
         text: 'Cancel',
         onPress: () => null,
         style: 'cancel',
       },
       { text: 'YES', onPress: () => BackHandler.exitApp() },
     ]);
     return true;
   };

   const backHandler = BackHandler.addEventListener(
     'hardwareBackPress',
     backAction
   );

   return () => backHandler.remove();
 }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Form
          search={search}
          onSetSearch={setSearch}
          onSubmit={searchSubmitHandler}
          onClear={clearField}
        />
        <Weather loading={loading} data={data} error={error} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffe6',
  },
});

export default App;
