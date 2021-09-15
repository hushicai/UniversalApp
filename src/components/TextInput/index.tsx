import React, {Component, createRef} from 'react';
import {TextInput as RawTextInput, TextInputProps, Platform, StyleSheet} from 'react-native';

type S = {
  height?: number;
};

export default class TextInput extends Component<TextInputProps, S> {
  static State = RawTextInput.State;
  _inputRef = createRef<RawTextInput>();
  state: S = {};
  focus() {
    this._inputRef.current && this._inputRef.current.focus();
  }
  render() {
    // Android 6以上textAlign为center，placeholder变化时，
    // 若内容为空，placeholder会不显示，
    // 并且输入内容并清掉的话，placeholder又会出现，
    // 但输入光标会移到最右边
    let {keyboardType, ...props} = this.props;
    switch (keyboardType) {
      case 'numeric':
        // web端不能用numeric，否则无法限制maxLength
        keyboardType = Platform.select<TextInputProps['keyboardType']>({
          default: 'numeric',
          web: 'phone-pad'
        });
        break;
    }
    return (
      <RawTextInput
        onContentSizeChange={Platform.select({
          android: !props.multiline
            ? undefined
            : ({
                nativeEvent: {
                  contentSize: {height}
                }
              }) => {
                this.setState({
                  height
                });
              }
        })}
        ref={this._inputRef}
        key={props.placeholder}
        allowFontScaling={false}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType}
        {...props}
        style={[
          styles.input,
          this.props.style,
          this.state.height ? {height: this.state.height} : undefined
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 0
  }
});
