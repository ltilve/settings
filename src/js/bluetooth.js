import { bluetooth } from 'agl-js-api';
import Mustache from 'mustache';
import { load as load_template } from './templates';
import * as app from './app';
import { getMaxListeners } from 'cluster';

var template;
var page = {
    devices: [],
    filter: {
        available: true,
        paired: false,
        connected: false
    },
    powered: false
};

function render(){
    document.body.innerHTML = Mustache.render(template, page);
}

function update_devices(devices) {
    page.devices = [];
    devices.forEach(function(device) {
        if ( page.filter.connected && device.properties.connected ) {
            page.devices.push(device);
        } else if ( page.filter.paired && 
                device.properties.paired && 
                !device.properties.connected ) {
            page.devices.push(device);
        } else if ( page.filter.available & 
                !device.properties.connected && 
                !device.properties.paired) {
            page.devices.push(device);
        }
    });

    console.log(page);

    render();
}

function refresh_devices() {
    bluetooth.managed_objects().then(function(result){
        update_devices(result.devices);
    });
}

function pair(deviceId) {
    bluetooth.pair(deviceId).then(function() {
        refresh_devices();
    });
}

function connect(deviceId) {
    bluetooth.connect(deviceId).then(function() {
        refresh_devices();
    });
}

function disconnect(deviceId) {
    bluetooth.disconnect(deviceId).then(function() {
        refresh_devices();
    });
}

export function toggle() {
    bluetooth.adapter_state().then(function(result) {
        bluetooth.adapter_state({
            powered: !result.powered
        }).then(function(state) {
            page.powered = state.powered;
        });
    });
}

export function init() {
    load_template('bluetooth.template.html').then(function(result) {
        template = result;
        Mustache.parse(template);
    }, function(error) {
        console.error('ERROR Loading bluetooth template', error);
    });

    bluetooth.adapter_state().then(function(state) {
        page.powered = state.powered;
    });
}

export function getState() {
    return page.powered;
}

export function show() {
    refresh_devices();
}

export function hide() {
    app.show();
}

export function available() {
    page.filter = {
        available: true,
        paired: false,
        connected: false
    };
    refresh_devices();
}

export function connected() {
    page.filter = {
        available: false,
        paired: false,
        connected: true
    };
    refresh_devices();
}

export function paired() {
    page.filter = {
        available: false,
        paired: true,
        connected: false
    };
    refresh_devices();
}

export function remove(deviceId) {
    bluetooth.remove_device(deviceId).then(function() {
        refresh_devices();
    });
}

export function manage(deviceId, paired, connected) {
    if ( connected ) {
        connect(deviceId);
    } else if ( paired ) {
        disconnect(deviceId);
    } else {
        pair(deviceId);
    }
}