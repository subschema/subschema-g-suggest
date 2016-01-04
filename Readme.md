Subschema G Suggest
===
This is a processor for using google location suggestion with subschema.

##Demo
A simple demo can be found [here](http://subschema.github.io/subschema-g-suggest).

##Installation

```sh
 $ npm install subschema-g-suggest
```

##Usage
You can use this as a Processor for the autocompletor.

```jsx
 import React from 'react';
 import ReactDOM from 'react-dom';
 import Subschema, {loader} from 'Subschema';
 import GSuggest from 'subschema-g-suggest';

 //adds the loader
 loader.addProcessor('GSuggest', GSuggest(

 /**Your Google API Key
  {key: GOOGLE_MAPS_API_KEY, libraries: ['places','geometry']}
  **/
 ));

 //add the processor to the schema
 var schema = {
    address:{
      type:'Autocomplete',
      processor:'GSuggest'
    }
 }

 ReactDOM.render(<Form schema={schema}/>, document.getElementById('content'));
```
