import React from 'react';
import {
  // TextInput,
  StyleSheet,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  View
} from 'react-native';
import {reduce} from 'lodash';
import TextInput from '../TextInput';

const isDigit = (char: string) => /\d/.test(char);
const MAX_LENGTH = 1;

type P = {
  value: string;
  count: number;
  inputProps?: TextInputProps;
  onAfterChangeText: (value: string) => void;
};

type S = {
  [key: string]: string;
};

const valueToState = (value: string, count: number): S => {
  const holes = Array.from({length: count});
  return holes.reduce<S>((acc, current, index) => ({...acc, [index]: value[index] || ''}), {}); // to object
};

export default class SpacedTextInput extends React.Component<P, S> {
  inputs: Array<TextInput | null> = [];
  state: S = {};

  static defaultProps = {
    value: ''
  };

  constructor(props: P) {
    super(props);
    this.state = valueToState(props.value, props.count);
  }

  componentWillReceiveProps(nextProps: P) {
    if (nextProps.value === this.props.value && nextProps.count === this.props.count) {
      return;
    }
    this.setState(valueToState(nextProps.value, nextProps.count));
  }

  render() {
    const {count, inputProps = {}} = this.props;
    const {style: inputStyle, ...restInputProps} = inputProps;
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(
        <TextInput
          caretHidden
          onFocus={this.focus}
          autoFocus={i === 0}
          value={this.state[i]}
          ref={node => {
            this.setRef(node, i);
          }}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          onKeyPress={event => {
            this.onKeyPress(event, i);
          }}
          onChangeText={text => {
            this.onChangeText(text, i);
          }}
          style={[styles.inputItem, inputStyle]}
          key={i}
          maxLength={MAX_LENGTH}
          {...restInputProps}
        />
      );
    }

    return <View style={styles.row}>{list}</View>;
  }

  reset(focus = true) {
    this.setState(
      valueToState('', this.props.count),
      focus
        ? () => {
            const [first] = this.inputs;
            first && first.focus();
          }
        : undefined
    );
  }

  focus = () => {
    const input = this.inputs[Math.min(this.value().length, this.inputs.length - 1)];
    input && input.focus();
  };

  value(): string {
    return reduce(this.state, (prev, curr) => prev + '' + curr) as string;
  }

  onChangeText = (text: string, index: number) => {
    this.__onChangeText(text, index);
  };

  __onChangeText(text: string, index: number) {
    if (text === '' || isDigit(text)) {
      this.setState(
        {
          [index]: text
        },
        () => {
          if (text.length) {
            const nextIndex = index + 1;
            if (nextIndex < this.props.count) {
              const input = this.inputs[nextIndex];
              input && input.focus();
            }
          }
          const {onAfterChangeText} = this.props;
          onAfterChangeText && onAfterChangeText(this.value());
        }
      );
    }
  }

  onKeyPress = (
    {nativeEvent: {key}}: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const {[index]: currText = ''} = this.state;
    if (key === 'Backspace') {
      if (currText.length === 0) {
        const target = this.inputs[index - 1];
        if (target) {
          this.setState(
            {
              [index - 1]: ''
            },
            () => {
              target.focus();
              target.clear();
            }
          );
        }
      }
    } else if (isDigit(key) && currText.length === MAX_LENGTH) {
      this.__onChangeText(key, index);
    }
  };

  setRef = (node: TextInput | null, index: number) => {
    this.inputs[index] = node;
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  inputItem: {
    backgroundColor: '#fff',
    textAlign: 'center',
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D1D1',
    fontSize: 17,
    lineHeight: 24
  }
});
