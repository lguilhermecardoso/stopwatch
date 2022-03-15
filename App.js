import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

let time = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App () {

  const [timer, setTimer] = React.useState('00:00:00');
  const [buttonText, setButtonText] = React.useState('Iniciar');
  const [lastTime, setLastTime] = React.useState(null);

  function startTimer() {
    if (time != null) {
      clearInterval(time);
      time = null;
      setButtonText('Iniciar');
      let format =
        (hh < 10 ? '0' + hh : hh) + ':'
        + (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss);
      setLastTime(format);
    } else {
      time = setInterval(() => {
        setButtonText('Pausar');
        ss++;
        if (ss === 60) {
          ss = 0;
          mm ++;
        }
        if (mm === 60) {
          mm = 0;
          hh ++;
        }

        let format = 
          (hh < 10? '0' + hh : hh) + ':'
          + (mm < 10 ? '0' + mm : mm) + ':'
          + (ss < 10 ? '0' + ss : ss);
        setTimer(format);
      }, 1000);
    }
  }

  function clearTimer() {
    clearInterval(time);
    setTimer('00:00:00');
    setButtonText('Iniciar');
    setLastTime(null);
    time = null;
    ss = 0;
    mm = 0;
    hh = 0;
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />
      <Text style={styles.timer}> {timer} </Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={clearTimer}>
          <Text style={styles.btnText}>Zerar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText} onPress={startTimer}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.areaLastTimer}>
        <Text style={styles.textTimer}>
          {lastTime ? 'Tempo parcial ' + lastTime : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaLastTimer: {
    marginTop: 40
  },
  textTimer: {
    fontSize: 20,
    color: '#fff',
    fontStyle: 'italic'
  }
})