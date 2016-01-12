import React, {
  Component,
} from 'react';

import TextFileDropZone from './textFilesDropZone';
import TextFileInput from './textFileInput';

export default class MultiwayTextInput extends Component {

  constructor() {
    super();
    this.onReadStart = this.onReadStart.bind(this);
    this.onTexts = this.onTexts.bind(this);
    this.onDragActive = this.onDragActive.bind(this);
    this.onDragDeactive = this.onDragDeactive.bind(this);
    this.state = {
      isDragActive: false,
    };
  }

  onTexts(texts){
    if (this.props.onTexts) {
      this.props.onTexts(texts);
    }
  }

  onReadStart(){
    console.log('on read start');
  }

  onDragActive() {
    this.setState({
      isDragActive: true,
    });
  }

  onDragDeactive() {
    this.setState({
      isDragActive: false,
    });
  }

  render(){
    return <TextFileDropZone onActive={this.onDragActive} onDeactive={this.onDragDeactive} onReadStart={this.onReadStart} onTexts={this.onTexts}>
      { this.renderContent() }
    </TextFileDropZone>
  }

  renderContent() {
    const {
      isDragActive,
    } = this.state;

    if (isDragActive) {
      return <div>DROP YOUR FILES HERE</div>
    } else {
      return <div>
        <textarea ref={ node => this.textarea = node }></textarea>
        <button onClick={() => { this.onTexts([this.textarea.value]) }}>Parse</button>
        <TextFileInput onTexts={this.onTexts}></TextFileInput>
      </div>
    }
  }
}
