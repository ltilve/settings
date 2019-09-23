this.sliders = {};

function getRootNode(node) {
    while(!node.hasAttribute('slider-id') && node.parentNode) {
        return getRootNode(node.parentNode);
    }

    if( node.hasAttribute('slider-id') ) {
        return node;
    } else {
        return false;
    }
}

function getValue(node) {
    node = getRootNode(node);
    if( node ) {
        return parseInt(node.getAttribute('value'));
    } else {
        return false;
    }
}

function setValue(node, value) {
    node = getRootNode(node);
    if( node ){
        value = Math.max(Math.min(value, 100), 0);
        node.setAttribute('value', value);
        node.getElementsByTagName('progress')[0].value = value;
        node.getElementsByTagName('input')[0].value = value;
        node.getElementsByClassName('value')[0].innerHTML = value+'%';
    }
}

function init(sliders) {
    console.log(sliders);
}

function increase(node) {
    setValue(node, getValue(node)+5);
}

function decrease(node) {
    setValue(node, getValue(node)-5);
}

function change(node) {
    setValue(node, node.value);
}

module.exports = {
    init: init,
    increase: increase,
    decrease: decrease,
    change: change
}