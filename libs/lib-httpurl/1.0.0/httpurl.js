function HttpURL(string){
    var params = {};
    Object.defineProperty(this, 'params', {
        set: function(v){
            if (typeof v === 'object'){
                for(var p in params) {
                    delete params[p];
                }
                for(var p in v) {
                    params[p] = v[p];
                }
            }
        },
        get: function() {
            return params;
        },
        enumerable: false
    });

    Object.defineProperty(this, 'search', {
        set: function(v) {
            if(typeof v === 'string') {
                if (v.indexOf('?') === 0) {
                    v = v.substr(1);
                }
                var search = v.split('&');
                for(var p in params) {
                    delete params[p];
                }
                for(var i = 0 ; i < search.length; i++) {
                    var pair = search[i].split('=');
                    if (pair[0]) {
                        try {
                            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                        } catch(e) {
                            params[pair[0]] = pair[1] || '';
                        }
                    }
                }
            }
        },
        get: function(){
            var search = [];
            for(var p in params) {
                if (params[p]) {
                    try {
                        search.push(encodeURIComponent(p) +'=' + encodeURIComponent(params[p]));
                    } catch(e) {
                        search.push(p +'=' + params[p]);
                    }
                } else {
                    try {
                        search.push(encodeURIComponent(p));
                    } catch(e) {
                        search.push(p);
                    }
                }
            }
            if (search.length) {
                return '?' + search.join('&');
            } else {
                return '';
            }

        },
        enumerable: true
    });

    var hash;
    Object.defineProperty(this, 'hash', {
        set: function(v) {
            if (v && v.indexOf('#') < 0) {
                v = '#' + v;
            }
            hash = v || '';
        },
        get: function() {
            return hash;
        },
        enumerable: true
    });

    this.set = function(v) {
        v = v || '';
        var matchArr;
        if((matchArr = v.match(new RegExp('^(https?|beibei|beibeiapp|mizhe|mizheapp):[/]{2}' + //protocal
            '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' +  //username:password@
            '([^:/?#]+)' +                        //hostname
            '(?:[:]([0-9]+))?' +                  //port
            '([/][^?#;]*)?' +                     //pathname
            '(?:[?]([^?#]*))?' +                  //search
            '(#[^#]*)?$'                          //hash
        )))){
            this.protocal = matchArr[1];
            this.username = matchArr[2] || '';
            this.password = matchArr[3] || '';
            this.hostname = this.host = matchArr[4] ;
            this.port = matchArr[5] || '';
            this.pathname = matchArr[6] || '/';
            this.search = matchArr[7] || '';
            this.hash = matchArr[8] || '';
            this.origin = this.protocal + '://' + this.hostname;
        } else {
            throw new Error('Wrong uri scheme.');
        }
    }

    this.toString = function(){
        var string = this.protocal + '://';
        if(this.username) {
            string += this.username;
            if(this.password) {
                string += ':' + this.password;
            }
            string += '@';
        }
        string += this.host;
        if(this.port && this.port !== '80') {
            string += ':' + this.port;
        }
        if(this.pathname) {
            string += this.pathname;
        }
        if(this.search) {
            string += this.search;
        }
        if(this.hash) {
            string += this.hash;
        }
        return string;
    }

    if (string) {
        this.set(string.toString());
    }
}

module.exports={
	httpurl:HttpURL,
	uri:new HttpURL(location.href)
};
