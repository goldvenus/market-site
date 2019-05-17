/*eslint eqeqeq: ["error", "smart"]*/

function getScript(url) {
    var scrpt = document.createElement('script');
    scrpt.src = url;
    scrpt.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(scrpt);
}

if (typeof jQuery == 'undefined' || !jQuery.fn.jquery.startsWith('3')) getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js');
if (typeof JSEncrypt != 'function') getScript('https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.min.js');

var checkScripts = () => typeof jQuery == 'function' && typeof JSEncrypt == 'function';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(function (factory) {
    var registeredInModuleLoader;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Nummuspay;
        var api = window.Nummuspay = factory();
    }
}(function () {
    function init() {
        const nummuspayAttr = 'data-nummuspay';
        const requiredFields = ['email', 'firstName', 'lastName', 'billingAddress', 'zip', 'number', 'month', 'year', 'cvv'];
        var _publicKey;

        function api() { }

        api.debug = false;
        api.webBaseURL = () => api.debug ? 'https://localhost:44353' : 'https://members.nummuspay.com';
        api.apiBaseURL = () => api.debug ? 'https://localhost:44324' : 'https://api.nummuspay.com';

        api.SetPublicKey = function (pk) {
            _publicKey = pk;
        };

        api.Checkout = async function (opt) {
            while (!checkScripts()) await sleep(200);

            if (!opt) throw 'Please provide options for function Checkout.';

            var nummuspayPopupHTML = '' +
                '<style>' +
                '    #nummuspayPopupContainer {' +
                '        display: flex;' +
                '        width: 100%;' +
                '        height: 100%;' +
                '        top: 0;' +
                '        left: 0;' +
                '        z-index: 2147483647;' +
                '        position: fixed;' +
                '        align-items: center;' +
                '        justify-content: center;' +
                '        background-color: rgba(38, 38, 38, 0.4164);' +
                '    }' +
                '' +
                '    #nummuspayPopup {' +
                '        background: url(' + api.webBaseURL() + '/Content/Images/loader.gif) top center no-repeat;' +
                '        width: 100%;' +
                '        max-width: 85%;' +
                '        height: 100%;' +
                '        max-height: 85%;' +
                '        border-radius: 6px;' +
                '        overflow: hidden;' +
                '    }' +
                '' +
                '        #nummuspayPopup iframe {' +
                '            width: 100%;' +
                '            height: 100%;' +
                '            border: 0;' +
                '        }' +
                '' +
                '    @media only screen and (max-width: 720px) {' +
                '        #nummuspayPopup {' +
                '            max-width: 97%;' +
                '            max-height: 97%;' +
                '        }' +
                '    }' +
                '</style>' +
                '' +
                '<div id="nummuspayPopupContainer">' +
                '   <div id="nummuspayPopup"></div>' +
                '</div>';
            $(nummuspayPopupHTML).appendTo('body');

            var iframeSrc = api.webBaseURL() + '/Checkout?' + Object.entries(opt).map(x => x[0] + '=' + x[1]).join('&');
            $('<iframe src="' + iframeSrc + '" allow="geolocation" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation"></iframe>').appendTo('#nummuspayPopup');
        };

        api.CreateToken = async function (data) {
            while (!checkScripts()) await sleep(200);

            var _data, hasinputs, hasData;

            var inputs = $('input[' + nummuspayAttr + ']');
            if (inputs.length == 0) {
                hasinputs = false;
            }
            else {
                hasinputs = true;

                _data = inputs.map(function () {
                    return {
                        name: $(this).attr(nummuspayAttr),
                        value: $(this).val()
                    };
                }).get();
            }

            if (data) {
                hasData = true;

                var entries = Object.entries(data);
                if (entries.length == 0) hasData = false;

                if (hasData) {
                    _data = entries.map(x => ({
                        name: x[0],
                        value: x[1]
                    }));
                }
            }
            else {
                hasData = false;
            }

            if (!hasinputs && !hasData) {
                if (data) {
                    throw 'Data are required and must not be empty.';
                }
                else {
                    throw 'No inputs detected with ' + nummuspayAttr + ' attribute';
                }
            }

            requiredFields.forEach(rf => {
                var dataField = _data.find(d => d.name == rf);
                if (!dataField || !dataField.value) throw rf + ' is required and must have a value.';
            });

            if (!_publicKey) throw 'Public key required. Please set it using SetPublicKey().';

            var jse = new JSEncrypt();
            jse.setPublicKey('-----BEGIN PUBLIC KEY-----\n' + _publicKey + '\n-----END PUBLIC KEY-----');

            var encryptedData = {
                publicKey: _publicKey
            };

            _data.forEach(d => {
                var encrypted = jse.encrypt(d.value);
                if (!encrypted) throw 'Wrong public key.';
                while (!encrypted.endsWith('==')) {
                    encrypted = jse.encrypt(d.value)
                }

                encryptedData[d.name] = encrypted;
            });

            return $.post(api.apiBaseURL() + '/v1/Data/CreateToken', encryptedData);
        };

        return api;
    }

    return init();
}));