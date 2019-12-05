import * as bluetooth from './bluetooth';
import * as wifi from './wifi';
import { load as load_template } from './templates';
import Mustache from 'mustache';

var template;
var page = {
    bluetooth: true,
    wifi: false
};

export function show() {
    page.bluetooth = bluetooth.getState();
    document.body.innerHTML = Mustache.render(template, page);
}

export function init() {
    load_template('main.template.html').then(function(result) {
        template = result;
        Mustache.parse(template);
        show();
        bluetooth.init();
        wifi.init();
    }, function(error) {
        console.error('ERRROR loading main template', error);
    });
}