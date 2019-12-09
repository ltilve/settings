import Mustache from 'mustache';
import { load as load_template } from './templates';
import * as app from './app';

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var template;
var page = {
    date: {
        days: [],
        months: [],
        years: [],
        isDay: function() {
            var now = new Date();
            return now.getDate() === this;
        },
        getMonthName: function() {
            return monthNames[this];
        },
        isMonth: function() {
            var now = new Date();
            return now.getMonth() === this;
        },
        isYear: function() {
            var now = new Date();
            return now.getFullYear() === this;
        }
    },
    time: {
        hours: [],
        minutes: [],
        ampm: ['AM', 'PM'],
        isHour: function() {
            var now = new Date();
            return now.getHours()%12 === this;
        },
        isMinutes: function() {
            var now = new Date();
            return now.getMinutes() === this;
        },
        isAmpm: function (){
            var now = new Date();
            if( this === 'AM' && now.getHours() < 12 ) {
                return true;
            } else {
                return false;
            }
        }
    }
}

function render(){
    document.body.innerHTML = Mustache.render(template, page);
}

export function init() {
    for ( var i=0; i<31; i++) {
        page.date.days[i] = i+1;
    };

    for ( var i = 0; i < 50; i++){
        page.date.years[i] = 2010 + i;
    };

    for ( var i = 0; i < 12; i++){
        page.date.months[i] = i;
    };

    for ( var i=0; i<12; i++ ) {
        page.time.hours[i] = i+1;
    };

    for ( var i=0; i<60; i++ ) {
        page.time.minutes[i] = i
    }

    load_template('date.template.html').then(function(result) {
        template = result;
        Mustache.parse(template);
    }, function(error) {
        console.error('ERROR Loading date template', error);
    });
}

export function show() {
    render();
}

export function hide() {
    app.show();
}