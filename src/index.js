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
import { toggle as toggle_bluetooth } from './js/bluetooth';

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

window.toggle_bluetooth =  function() {
    toggle_bluetooth();
}

init();