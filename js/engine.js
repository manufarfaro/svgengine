window.loader = (function() {
    window.obj = document.getElementById('testObj');
    let setup = {
        path: null,
        useCache: false,
        defaultClass: null,
    };

    Element.prototype.svgInsert = function(svg, config) {
        placeInObject(this, svg, config);
    };

    function setPath(path) {
        setup.path = path;
    }

    function getPath() {
        return setup.path;
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
        let extraClass = config.class || setup.defaultClass;
        if (extraClass) {
            svg.classList.add(extraClass);
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
    };
})();
