window.loader = (function() {
    window.obj = document.getElementById('testObj');
    let currentSetup = {
        path: null,
        useCache: false,
        defaultClass: null,
    };

    Element.prototype.svgInsert = function(svgName, config) {
        placeInObject(this, svgName, config);
    };

    function setPath(path) {
        currentSetup.path = path;
    }

    function getPath() {
        return currentSetup.path;
    }

    function setup(setupObject) {
        for(var key in setupObject) {
            if (currentSetup.hasOwnProperty(key)) {
                currentSetup[key] = setupObject[key]
            }
        }
    }

    function load(filename, callback, callbackExtraArguments, path) {
        if (!filename) {
            throw new Error('no filename provided');
        }
        var path = this.path || path || 'resources';
        $.ajax('./' + path + '/' + filename + '.svg', {
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
        load(svgName, function(mySvg, config) {
            object.appendChild(prepSVG(mySvg, config));
        }, config);
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

    return {
        getPath: getPath,
        setPath: setPath,
        load: load,
        placeInObject: placeInObject,
        setup: setup
    };
})();
