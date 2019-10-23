import { init as init_bluetooth } from './bluetooth';

import { api } from 'agl-js-api';

export function init() {
    api.init();
    init_bluetooth();
}