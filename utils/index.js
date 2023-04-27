// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// class StopWatch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       timerOn: false,
//       timerStart: 0,
//       timerTime: 0
//     };
//   }

//   startTimer = () => {
//     this.setState({
//       timerOn: true,
//       timerTime: this.state.timerTime,
//       timerStart: Date.now() - this.state.timerTime
//     });
//     this.timer = setInterval(() => {
//       this.setState({
//         timerTime: Date.now() - this.state.timerStart
//       });
//     }, 10);
//   };

//   stopTimer = () => {
//     this.setState({ timerOn: false });
//     clearInterval(this.timer);
//   };

//   resetTimer = () => {
//     this.setState({
//       timerStart: 0,
//       timerTime: 0
//     });
//   };

//   render() {
//     const { timerTime } = this.state;
//     let milliseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
//     let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
//     let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
//     let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

//     return (
//       <View style={styles.container}>
//         <View style={styles.timerWrapper}>
//           <Text style={styles.timer}>
//             {hours} : {minutes} : {seconds} : {milliseconds}
//           </Text>
//         </View>
//         <View style={styles.buttonWrapper}>
//           {this.state.timerOn === false && this.state.timerTime === 0 && (
//             <TouchableOpacity onPress={this.startTimer} style={styles.button}>
//               <Text style={styles.buttonText}>Start</Text>
//             </TouchableOpacity>
//           )}
//           {this.state.timerOn === true && (
//             <TouchableOpacity onPress={this.stopTimer} style={styles.button}>
//               <Text style={styles.buttonText}>Stop</Text>
//             </TouchableOpacity>
//           )}
//           {this.state.timerOn === false && this.state.timerTime > 0 && (
//             <TouchableOpacity onPress={this.startTimer} style={styles.button}>
//               <Text style={styles.buttonText}>Resume</Text>
//             </TouchableOpacity>
//           )}
//           {this.state.timerOn === false && this.state.timerTime > 0 && (
//             <TouchableOpacity onPress={this.resetTimer} style={styles.button}>
//               <Text style={styles.buttonText}>Reset</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   timerWrapper: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop:0,
//   },
//   timer: {
//     fontSize: 50,
//     fontWeight: 'bold'
//   },
//   buttonWrapper: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   button: {
//     backgroundColor: '#333',
//     borderRadius: 10,
//     marginHorizontal: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold'
//   }
// });

// export default StopWatch
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const StopWatchTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed((timeElapsed) => timeElapsed + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStopPress = () => {
    setIsRunning((isRunning) => !isRunning);
  };

  const handleResetPress = () => {
    setIsRunning(false);
    setTimeElapsed(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}
          onPress={handleStartStopPress}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleResetPress}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 50,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: '#4682b4',
  },
  startButton: {
    backgroundColor: '#4caf50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default StopWatchTimer;