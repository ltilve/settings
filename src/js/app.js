import Mustache from 'mustache';
import { init as init_sliders } from './sliders';

var template;

function render_sliders(sliders) {
    var sliderContainer = document.getElementById('SliderContainer');
    for( var i=0; i<sliders.length; i++) {
        var node = Mustache.render(template, sliders[i]);
        sliderContainer.innerHTML += node;
    }
}

export function init() {
    template = document.getElementById('slider-template').innerHTML;
    Mustache.parse(template);

    var sliders =  [];
    for( var i=0; i<10; i++) {
        sliders.push({
            id: i,
            name: 'Volume '+i,
            value: Math.floor(Math.random()*100)
        });
    }

    init_sliders(sliders);
    render_sliders(sliders);
}