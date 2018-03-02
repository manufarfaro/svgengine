window.loader = (function() {

    window.obj = document.getElementById('testObj'); //DELETE THIS IN PROD

    let currentSetup = {
        path: null,
        useCache: false,
        defaultClass: null,
    };

    Element.prototype.svgInsert = function(svgName, config) {
        placeInObject(this, svgName, config);
    };

    function setup(setupObject) {
        for(let key in setupObject) {
            if (currentSetup.hasOwnProperty(key)) {
                currentSetup[key] = setupObject[key]
            }
        }
    }

    function load(filename, callback, callbackExtraArguments, path) {
        if (!filename) {
            throw new Error('no filename provided');
        }
        let currentpath = currentSetup.path || path || 'resources';
        $.ajax('./' + currentpath + '/' + filename + '.svg', {
            success: function(data) {
                out = data.getElementsByTagName('svg')[0];
                callback(out, callbackExtraArguments);
            },
            error: function() {
                console.log('you fucked up');
            },
        });
    }

    function placeInObject(object, svgName, config) {
        if (!object instanceof Node) {
            throw new Error('not a valid html element');
        }
        let currentConfig = config || {};
        load(svgName, function(mySvg, currentConfig) {
            object.appendChild(prepSVG(mySvg, currentConfig));
        }, currentConfig);
    }

    function prepSVG(svg, config) {
        if (currentSetup.defaultClass) {
            svg.classList.add(currentSetup.defaultClass);
        }
        if (config.class) {
            svg.classList.add(config.class);
        }
        return svg;
    }


    function addCSSProperty(key, value) {

    }

    function setOption(key, value) {
        if (currentSetup[key]) {
            currentSetup[key] = value;
        }
    }

    function setPath(path) {
        //TODO: Ensure no / at the beggining and end.
        if (typeof path !== 'string') {
            throw new Error('path is not a string');
        }
        currentSetup.path = path;
    }

    function getPath() {
        return currentSetup.path;
    }

    return {
        currentSetup: currentSetup,
        getPath: getPath,
        setPath: setPath,
        load: load,
        placeInObject: placeInObject,
        setup: setup
    };
})();
