import React, {
  Component
} from 'react';

import { readAllFilesFromEvent } from './fileReader';

export default class TextFileInput extends Component {

  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    event.preventDefault();

    readAllFilesFromEvent(event).then((texts) => {
      if (this.props.onTexts) {
        this.props.onTexts(texts);
      }
    });
  }

  render() {
    return <input type="file" {...this.props} onChange={this.onInputChange}/>
  }

}
