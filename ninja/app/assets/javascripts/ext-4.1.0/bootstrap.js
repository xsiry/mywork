/*
This file is part of Ext JS 4.1

Copyright (c) 2011-2012 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2012-04-20 14:10:47 (19f55ab932145a3443b228045fa80950dfeaf9cc)
*/
/**
 * Load the library located at the same path with this file
 *
 * Will automatically load ext-all-dev.js if any of these conditions is true:
 * - Current hostname is localhost
 * - Current hostname is an IP v4 address
 * - Current protocol is "file:"
 *
 * Will load ext-all.js (minified) otherwise
 */
(function() {
    var scripts = document.getElementsByTagName('script'),
        localhostTests = [
            /^localhost$/,
            /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d{1,5})?\b/ // IP v4
        ],
        host = window.location.hostname,
        isDevelopment = null,
        queryString = window.location.search,
        test, path, i, ln, scriptSrc, match;
        extDir = "ext-4.1.0/";

    for (i = 0, ln = scripts.length; i < ln; i++) {
        scriptSrc = scripts[i].src;

        //match = scriptSrc.match(/bootstrap\.js$/);
        match = scriptSrc.match(/bootstrap\.js\?body\=1/); 
        if (match) {
            path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
            break;
        } else {
            match = scriptSrc.match(/application\-[0-9a-z]+\.js/);
            if (match) {
                path = scriptSrc.substring(0, scriptSrc.length - match[0].length) + extDir;
                break;
            }
        }
    }

    if (queryString.match('(\\?|&)debug') !== null) {
        isDevelopment = true;
    }
    else if (queryString.match('(\\?|&)nodebug') !== null) {
        isDevelopment = false;
    }

    if (isDevelopment === null) {
        for (i = 0, ln = localhostTests.length; i < ln; i++) {
            test = localhostTests[i];

            if (host.search(test) !== -1) {
                isDevelopment = true;
                break;
            }
        }
    }

    if (isDevelopment === null && window.location.protocol === 'file:') {
        isDevelopment = true;
    }

    document.write('<script type="text/javascript" charset="UTF-8" src="' + 
        path + 'ext-all' + (isDevelopment ? '-dev' : '') + '.js"></script>');
})();
