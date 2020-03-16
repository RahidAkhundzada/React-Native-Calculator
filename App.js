import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultText: '',
      Calculation: '',
    };
    this.operations = ['C', 'Del', '+', '-', '*', '/'];
  }

  calculateresult() {
    const text = this.state.resultText;

    this.setState({
      Calculation: eval(text),
    });
  }
  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return this.state.resultText.split('').pop();
    }
    return true;
  }
  buttonPressed(text) {
    if (text === '=') {
      return this.validate() && this.calculateresult();
    }
    console.log(text);
    this.setState({
      resultText: this.state.resultText + text,
    });
  }
  operate(operation) {
    switch (operation) {
      case 'Del':
        const text = this.state.resultText.split('');
        text.pop();
        this.setState({
          resultText: text.join(''),
        });
        break;
      case 'C':
        this.setState({
          resultText: '',
          Calculation: '',
        });

        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastCaracter = this.state.resultText.split('').pop();
        if (this.operations.indexOf(lastCaracter) > 1) {
          return;
        }
        if (this.state.resultText === '') {
          return;
        }

        this.setState({
          resultText: this.state.resultText + operation,
        });
    }
  }
  render() {
    let rows = [];
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>,
        );
      }
      rows.push(<View style={styles.row}>{row}</View>);
    }

    let ops = [];

    for (let i = 0; i < 6; i++) {
      ops.push(
        <TouchableOpacity
          key={this.operations[i]}
          style={styles.btn}
          onPress={() => this.operate(this.operations[i])}>
          <Text style={styles.btnText}>{this.operations[i]}</Text>
        </TouchableOpacity>,
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.Calculation}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>

          <View style={styles.operation}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 25,
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
  },
  operation: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 30,
    color: 'black',
  },
  calculationText: {
    fontSize: 24,
    color: 'black',
  },
});
