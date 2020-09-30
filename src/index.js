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
import * as app from './js/app';

import { api } from 'agl-js-api';
import * as bluetooth from './js/bluetooth';
import * as wifi from './js/wifi';
import * as wired from './js/wired';
import * as version from './js/version';
import * as date from './js/date';

/* CSS */
import './styles/app.scss';

window.bluetooth = bluetooth;
window.wifi = wifi;
window.wired = wired;
window.date = date;
window.version = version;

api.init();
app.init();
bluetooth.init();
wifi.init();
wired.init();
date.init();
version.init();
