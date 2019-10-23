import { bluetooth } from 'agl-js-api';
import Mustache from 'mustache';

var isPowered = false;
var template;

function update_state(state) {
    var control = document.getElementById('BluetoothControl');
    if( state.powered ) {
        control.classList.add('enabled');
    } else {
        control.classList.remove('enabled');
    }
}

function update_devices(devices) {
    console.log('update_devices', devices);
    var deviceList = document.getElementById('BluetoothContainer');
    deviceList.innerHTML = '';

    devices.forEach(function(device) {
        deviceList.innerHTML += Mustache.render(template, device);
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
    bluetooth.adapter_state().then(update_state);

    bluetooth.managed_objects().then(function(result){
        update_devices(result.devices);
    });

    bluetooth.on_device_changes(function(data) {
        bluetooth.managed_objects().then(function(result){
            update_devices(result.devices);
        });
    }).then(function(result) {
        console.log('SUBSCRIBED TO DEVICE CHANGES');
    });
}