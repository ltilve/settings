import { bluetooth } from 'agl-js-api';
import Mustache from 'mustache';

window.bluetooth = bluetooth;

var template;
var filterBy = 'available';

function update_state(state) {
    var control = document.getElementById('BluetoothControl');
    if( state.powered ) {
        control.classList.add('enabled');
    } else {
        control.classList.remove('enabled');
    }
}

function update_devices(devices) {
    var deviceList = document.getElementById('BluetoothContainer');
    deviceList.innerHTML = '';

    devices.forEach(function(device) {
        if ( filterBy === 'connected' && device.properties.connected ) {
            deviceList.innerHTML += Mustache.render(template, device);
        } else if ( filterBy === 'paired' && 
                device.properties.paired && 
                !device.properties.connected ) {
            deviceList.innerHTML += Mustache.render(template, device); 
        } else if ( filterBy === 'available' & 
                !device.properties.connected && 
                !device.properties.paired) {
            deviceList.innerHTML += Mustache.render(template, device); 
        }
    });
}

function refresh_devices() {
    bluetooth.managed_objects().then(function(result){
        update_devices(result.devices);
    });
}

export function toggle() {
    bluetooth.adapter_state().then(function(result) {
        bluetooth.adapter_state({
            powered: !result.powered
        }).then(update_state);
    });
}

export function init() {
    template = document.getElementById('bluetooth-device-template').innerHTML;
    Mustache.parse(template);
    bluetooth.adapter_state({
        discovery: true
    }).then(update_state);
    refresh_devices();

    // This code has been commented to improve performance
    // bluetooth.on_device_changes(function(data) {
    //     bluetooth.managed_objects().then(function(result){
    //         update_devices(result.devices);
    //     });
    // }).then(function(result) {
    //     console.log('SUBSCRIBED TO DEVICE CHANGES');
    // });
}

export function filter(filter) {
    filterBy = filter;
    refresh_devices();
}

export function getFilter() {
    return filterBy;
}

export function remove(deviceId) {
    bluetooth.remove_device(deviceId).then(function() {
        refresh_devices();
    });
}

export function pair(deviceId) {
    bluetooth.pair(deviceId).then(function() {
        refresh_devices();
    });
}

export function connect(deviceId) {
    bluetooth.connect(deviceId).then(function() {
        refresh_devices();
    });
}

export function disconnect(deviceId) {
    bluetooth.disconnect(deviceId).then(function() {
        refresh_devices();
    });
}