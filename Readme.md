Subschema G Suggest
===
This is a processor for using google location suggestion with subschema.

##Installation

```js
 $ npm install subschema-g-suggest
```

##Usage
```js
 import Subschema, {loader} from 'Subschema';
 import GSuggest from 'subschema-g-suggest';
 loader.addProcessor('GSuggest', GSuggest());

 ...
 schema = {
    address:{
      type:'Autocomplete',
      processor:'GSuggest'
    }
 }

```
