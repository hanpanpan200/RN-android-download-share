import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { downloadFile } from './downloadHelper'

export default class Example extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filePath: null,
    }
  }

  download = async () => {
    const filePath = await downloadFile()
    if (!filePath) return
    this.setState({filePath: filePath})
  }

  share = () => {

  }

  renderDownloadedInfo() {
    const { filePath } = this.state
    if (!filePath) {
      return <Text style={styles.downloadInfoText}>The file has not been downloaded.</Text>
    }
    return (
      <View style={styles.downloadInfoText}>
        <Text>The file has been downloaded to path:</Text>
        <Text>{this.state.filePath}</Text>
      </View>
    )
  }

  renderShareButton() {
    const { filePath } = this.state
    if (!filePath) return <Text style={[styles.disabledButton, styles.buttonText]}>Share</Text>
    return (
      <TouchableOpacity style={styles.button} onPress={this.share}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Press Download to download a PDF, and then Share. </Text>
        <TouchableOpacity style={styles.button} onPress={this.download}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        {this.renderDownloadedInfo()}
        {this.renderShareButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    paddingLeft: 16,
    paddingRight: 16,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'red',
    width: 150,
    alignItems: 'center',
    borderRadius: 3,    
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  disabledButton: {
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'gray',
    width: 150,
    borderRadius: 3,
    textAlign: 'center',
  },
  downloadInfoText: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,    
  },
})