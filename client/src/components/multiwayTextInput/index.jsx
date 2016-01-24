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

  clickInputFile(){
    const input = document.getElementById('inputFile');
    if(input && document.createEvent) {
      const evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      input.dispatchEvent(evt);
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
    return <div className="multiway-text-input-container">
      <TextFileDropZone
        onActive={this.onDragActive}
        onDeactive={this.onDragDeactive}
        onReadStart={this.onReadStart}
        onTexts={this.onTexts}>
        { this.renderContent() }
      </TextFileDropZone>
    </div>
  }

  renderContent() {
    const {
      isDragActive,
    } = this.state;

    if (isDragActive) {
      return <div className="multiway-text-input-container--dropzone">
        <div className="dropzone--active">
          <i className="fa fa-file-text-o"></i>
        </div>
      </div>
    } else {
      return <div className="row">
        <div className="column column-50">
          <textarea ref={ node => this.textarea = node }></textarea>
        </div>
        <div className="column column-25">
          <button className="button button-outline full-width" onClick={this.clickInputFile}>Select CSV files...</button>
          <TextFileInput
            style={{display: 'none'}}
            id="inputFile"
            accept=".csv"
            multiple
            onTexts={this.onTexts}
          />
        </div>
        <div className="column column-25">
          <button className="button full-width" onClick={() => { this.onTexts([this.textarea.value]) }}>Parse</button>
        </div>
      </div>
    }
  }
}
