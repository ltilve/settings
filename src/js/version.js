import { platforminfo } from 'agl-js-api';
import Mustache from 'mustache';
import { load as load_template } from './templates';
import * as app from './app';

var template;
var page = {
    platform: "platform_info",
    json: "stringify_json_platform"
}

function render(){
    document.body.innerHTML = Mustache.render(template, page);
}

export function init() {
    load_template('version.template.html').then(function(result) {
        template = result;
        Mustache.parse(template);
    }, function(error) {
        console.error('ERROR Loading settings template', error);
    });
}

export function show() {
        platforminfo.get_platform_info().then(function(result) {
            page.platform = result;
            page.json = "loaded= " + JSON.stringify(result);
            render();
        }, function(error) {
            console.error("error!" + JSON.stringify(error));
            render();
        });
}

export function hide() {
    app.show();
}
