function copyConvertedHexValue() {
    chv = document.getElementById('converted-hex-value')
    chv.removeAttribute('disabled');
    chv.select();
    document.execCommand('copy');

    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }

    else if (document.selection) {
        document.selection.empty();
    }

    chv.setAttribute('disabled', '');
    M.toast({
        html: '<p><i class="fas fa-2x fa-check green-text text-lighten-2 center"></i></p> &nbsp;&nbsp;&nbsp;<p>Hex Code Copied!</p>',
        classes: 'grey darken-3 button-border-purple white-text'
    });
}

function copyConvertedRGBValue() {
    crgbv = document.getElementById('converted-rgb-value')
    crgbv.removeAttribute('disabled');
    crgbv.select();
    document.execCommand('copy');

    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }

    else if (document.selection) {
        document.selection.empty();
    }

    crgbv.setAttribute('disabled', '');
    M.toast({
        html: '<p><i class="fas fa-2x fa-check green-text text-lighten-2 center"></i></p> &nbsp;&nbsp;&nbsp;<p>RGB Code Copied!</p>',
        classes: 'grey darken-3 button-border-purple white-text'
    });
}

$(document).ready(function (e) {

    $('#rgb2hex-form').on('submit', function (e) {
        e.preventDefault();

        new_rgb2hex_request = $.ajax({
            url: '/convert-rgb-to-hex',
            type: 'POST',
            data: $('#rgb2hex-form').serialize(),
            success: function (response) {
                if (response.status === 'success') {
                    document.getElementById('converted-hex-value-row').style.display = 'block';
                    document.getElementById('converted-hex-value').innerHTML = response.hex_value
                }

                else if (response.status === 'invalid_character') {
                    M.toast({ html: '<p><i class="fas fa-2x fa-exclamation-triangle red-text text-accent-1 center"></i></p> &nbsp;&nbsp;&nbsp;<p>Invalid Characters!</p>', classes: 'grey darken-3 button-border-purple white-text' })
                }

                else if (response.status === 'invalid_values') {
                    M.toast({ html: '<p><i class="fas fa-2x fa-exclamation-triangle red-text text-accent-1 center"></i></p> &nbsp;&nbsp;&nbsp;<p>Invalid Values!</p>', classes: 'grey darken-3 button-border-purple white-text' })
                }
            }
        });

        var csrf_token = "{{ csrf_token() }}";

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrf_token);
                }
            }
        });
    });
});

$(document).ready(function (e) {

    $('#hex2rgb-form').on('submit', function (e) {
        e.preventDefault();

        new_hex2rgb_request = $.ajax({
            url: '/convert-hex-to-rgb',
            type: 'POST',
            data: $('#hex2rgb-form').serialize(),
            success: function (response) {
                if (response.status === 'success') {
                    document.getElementById('converted-rgb-value-row').style.display = 'block';
                    document.getElementById('converted-rgb-value').innerHTML = response.rgb_value
                }

                else {
                    M.toast({ html: '<p><i class="fas fa-2x fa-check green-text text-lighten-2 center"></i></p> &nbsp;&nbsp;&nbsp;<p>Success!</p>', classes: 'grey darken-3 button-border-purple white-text' })
                }
            }
        });

        var csrf_token = "{{ csrf_token() }}";

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrf_token);
                }
            }
        });
    });
});