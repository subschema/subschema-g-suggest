"use strict";
import scriptjs from "scriptjs";
var api = {
    /** fetch will be called when value changes **/
    fetch(url, value, component, cb) {
        cb(null, []);
    },
    /**Value returns the value of the object, not necessarily whats in the input box**/
    value(obj){
        return obj == null ? null : obj.val || obj;
    },
    /**
     * Format returns the format.
     * @param v
     * @returns {null}
     */
    format(v){
        return v == null ? null : v.label || v;
    }
}
function factoryFactory(google) {
    var autocompleteService = new googleMaps.places.AutocompleteService()

    api.fetch = function (url, value, component, cb) {

        if (!value) {
            return [];
        }

        autocompleteService.getPlacePredictions({
            input: search,
            location: new googleMaps.LatLng(0, 0),
            radius: suggestRadius,
        }, (googleSuggests) => {
            if (!googleSuggests) {
                this.setState({suggests: []})
                return
            }

            cb(null, googleSuggests.map((suggest, key) => {
                var [ label, ...items ] = suggest.terms
                var address = items.map((item) => item.value).join(', ')
                var firstMatchedString = suggest.matched_substrings.shift()

                return {
                    label: label.value + (address.length > 0 ? ', ' + address : ''),
                    labelParts: {
                        before: label.value.substr(0, firstMatchedString.offset),
                        matched: label.value.substr(firstMatchedString.offset, firstMatchedString.length),
                        after: label.value.substr(firstMatchedString.offset + firstMatchedString.length),
                    },
                    address: address
                }
            }));
        });

    }
}

function factory(options) {
    options = options || {};
    if (typeof window.google === 'undefined') {
        window.googleMapsLoaded = () => {
            scriptjs.done('google-maps-places')
        }

        options.callback = 'googleMapsLoaded'

        const queryString = Object.keys(options).reduce((result, key) => (
            options[key] !== null && options[key] !== undefined
                ? (result += key + '=' + options[key] + '&')
                : result
        ), '?').slice(0, -1)

        scriptjs('https://maps.googleapis.com/maps/api/js' + queryString)
        scriptjs.ready('google-maps-places', () => {
            factoryFactory(google.maps);
        })
    } else {
        factoryFactory(google.maps);
    }
    return api;
}

export default factory;