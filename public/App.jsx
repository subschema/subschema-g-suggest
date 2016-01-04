"use strict";
import React, {Component} from 'react';
import Subschema, {loader,ValueManager,decorators, Form} from 'Subschema';
import GSuggests from '../src/GSuggests';

var {listen} = decorators;
/**
 * This adds the GSuggests Processor.
 */
loader.addProcessor('GSuggests', GSuggests());

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

var valueManager = ValueManager();

class DisplayValue extends Component {

    @listen("value", "address")
    setValue(value) {
        this.setState({value});
    }

    render() {
        return <code>{JSON.stringify(this.state.value, null, 2)}</code>;
    }
}

export default class App extends Component {

    render() {
        return <div>
            <h3>Subschema Google Suggests Plugin</h3>
            <Form schema={schema} valueManager={valueManager}>
                <DisplayValue/>
            </Form>
        </div>
    }
}
