"use strict";
import React, {Component} from 'react';
import Subschema, {loader, Form} from 'Subschema';
import GSuggests from '../src/GSuggests';

/**
 * This adds the GSuggests Processor.
 */
loader.addProcessor('GSuggests', GSuggests);

//A simple Schema for this configuration
var schema = {
    schema: {
        address: {
            "type": "Autocomplete",
            "processor": "GSuggests",
            "help": "Type an address for completion"
        }
    }
}

export default class App extends Component {

    render() {
        return <div>
            <h3>Subschema Google Suggests Plugin</h3>
            <Form schema={schema}/>
        </div>
    }
}
