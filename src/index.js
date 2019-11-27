/*
 * Copyright 2019 Igalia, S.L.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* JS */
import { init } from './js/app';
import { toggle as toggle_bluetooth, 
    pair as pair_bluetooth, 
    connect as connect_bluetooth,
    disconnect as disconnect_bluetooth,
    filter as setFilter_bluetooth,
    remove as remove_device_bluetooth
} from './js/bluetooth';

/* CSS */
import './styles/app.scss';

window.show = function(page){
    document.getElementById('main').classList.add('hide');
    document.getElementById(page).classList.remove('hide');
}

window.hide = function(page) {
    document.getElementById('main').classList.remove('hide');
    document.getElementById(page).classList.add('hide');
}

window.toggle_bluetooth =  toggle_bluetooth;
window.remove_device_bluetooth = remove_device_bluetooth;
window.manage_remove_bluetooth = function(deviceId, isPaired, isConnected) { 
    if ( !isConnected ) {
        remove_device_bluetooth(deviceId);
    } else if ( isConnected ) {
        disconnect_bluetooth(deviceId);
    }
}
window.manage_bluetooth = function(deviceId, isPaired, isConnected) {
    if ( !isPaired && !isConnected ) {
        pair_bluetooth(deviceId);
    } else if ( isPaired && !isConnected ) {
        connect_bluetooth(deviceId);
    }
};
window.setFilter_bluetooth = function(entry){
    setFilter_bluetooth(entry.getAttribute('filter'));
    var buttons = document.getElementById('bluetooth').getElementsByClassName('footer')[0].getElementsByClassName('button');

    for( var i = 0; i < buttons.length; i++ ) {
        buttons[i].classList.remove('active');
    }

    entry.classList.add('active');
}
init();