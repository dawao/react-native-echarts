import React, { Component } from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import renderChart from './renderChart';
//import echarts from './echarts.min';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

let source;
const _source = resolveAssetSource(require('./tpl.html'));
if (__DEV__) {
  source = { uri: `${_source.uri}` };
} else {
  const sourceAndroid = { uri: `file:///android_asset/tpl.html` };
  const sourceIOS = { uri: `file://${_source.uri}` };
  source = Platform.OS === 'ios' ? sourceIOS : sourceAndroid;
}
//另外一种改法：由于在发包时，找不到模板，现将
//source={require('./tpl.html')}改为source={this.props.source}
//模板由外部传入
export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  render() {
    return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props)}
          style={{
            height: this.props.height || 400,
          }}
          source={source}
        />
      </View>
    );
  }
}
