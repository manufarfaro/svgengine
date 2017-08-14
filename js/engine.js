window.loader = (function() {
    return {
        setPath: function(path) {
            this.path = path;
        },
        getPath: function() {
            return this.path;
        },
        load: function(filename, path) {
            var output;
            if (!filename) {
                throw new Error('no filename provided')
            }
            var path = this.path || path || 'resources'
            $.ajax('./' + path + '/' + filename + '.svg', {
                success: function(data) {
                    out = data.getElementsByTagName('svg')[0];
                    document.getElementsByTagName('body')[0].appendChild(out)
                },
                error: function() {
                    console.log('you fucked up')
                }
            })
        }
    }
})();
