import { network } from 'agl-js-api';
import Mustache from 'mustache';

var template;


function update_devices(devices) {
    console.log('update_devices', devices);
    var deviceList = document.getElementById('WifiContainer');
    deviceList.innerHTML = '';

    devices.forEach(function(device) {
        if( device.properties.type === 'wifi' ) {
            deviceList.innerHTML += Mustache.render(template, device);
        }
    });
}

export function init() {
    template = document.getElementById('wifi-device-template').innerHTML;
    Mustache.parse(template);

    setInterval(function() {
        network.services().then(function(result) {
            update_devices(result.values);
        })
    }, 10000);

    network.on_global_state(function(result) {
        console.log('on_global_state', result);
    }).then(function(){
        console.log('SUBSCRIBED', 'on_global_state');
    });
}