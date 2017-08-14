window.loader = (function() {
    return {
        setFolder: function(folder) {
            this.folder = folder;
        },
        getFolder: function() {
            return this.folder;
        },
        load: function(filename, folder) {
            var output;
            if (!filename) {
                throw new Error('no filename provided')
            }
            var folder = folder || 'resources'
            $.ajax('./' + folder + '/' + filename + '.svg', {
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
