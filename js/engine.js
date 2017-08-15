window.loader = (function() {
    function setPath(path) {
        this.path = path;
    }

    function getPath() {
        return this.path;
    }

    function load(filename, callback, path) {
        var output;
        if (!filename) {
            throw new Error('no filename provided')
        }
        var path = this.path || path || 'resources'
        $.ajax('./' + path + '/' + filename + '.svg', {
            success: function(data) {
                out = data.getElementsByTagName('svg')[0];
                callback(out);
            },
            error: function() {
                console.log('you fucked up')
            }
        })
    }

    function placeInObject(object, svgToPlace) {
        if (!object instanceof Node) {
            throw new Error('not a valid html element')
        }
        load(svgToPlace, function(mySvg) {
            object.appendChild(mySvg);
        })
    }

    return {
        getPath: getPath,
        setPath: setPath,
        load: load,
        placeInObject: placeInObject
    }
})();
