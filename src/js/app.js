import { init as init_bluetooth } from './bluetooth';
import { init as init_wifi } from './wifi';

import { api } from 'agl-js-api';

export function init() {
    api.init();
    init_bluetooth();
    // init_wifi();
}

window.api = api;