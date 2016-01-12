import React, {
  Component,
} from 'react';

import { readAllFilesFromEvent } from './fileReader';

export default class TextFileDropZone extends Component {

  constructor() {
    super();
    this.onDrop = this.onDrop.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.state = {
      isDragActive: false,
    };
  }

  onDrop(event){
    event.preventDefault();


    if (this.props.onReadStart) {
      this.props.onReadStart();
    }

    readAllFilesFromEvent(event).then((texts) => {
      if (this.props.onDeactive) {
        this.props.onDeactive();
      }

      if (this.props.onTexts) {
        this.props.onTexts(texts);
      }
    });


  }

  onDragOver(event) {
    event.preventDefault();
  }

  onDragEnter(event) {
    this.setState({
      isDragActive: true,
    });
    if (this.props.onActive) {
      this.props.onActive();
    }
  }

  onDragLeave(event) {
    this.setState({
      isDragActive: false,
    });

    if (this.props.onDeactive) {
      this.props.onDeactive();
    }
  }

  render(){
    const {
      children,
    } = this.props;

    const {
      isDragActive,
    } = this.state;

    return <div onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop}>
      {children}
    </div>
  }
}
