from flask import request, render_template, jsonify
from c3 import app
from c3.forms.forms import HEX2RGB_Form, RGB2HEX_Form


@app.route('/')
def c3():
    rgb2hex_form = RGB2HEX_Form()
    hex2rgb_form = HEX2RGB_Form()

    return render_template(
        'c3/c3.html',
        rgb2hex_form=rgb2hex_form,
        hex2rgb_form=hex2rgb_form,
        title="C3 | Color Code Converter"
    )


@app.route('/convert-rgb-to-hex', methods=['POST', 'GET'])
def convert_rgb_to_hex():
    rgb2hex_form = RGB2HEX_Form()
    hex2rgb_form = HEX2RGB_Form()

    if rgb2hex_form.validate_on_submit():
        allowed_characters = [
            '(', ')', ',', ' ',
            'a', 'b', 'c', 'd', 'e', 'f',
            'A', 'B', 'C', 'D', 'E', 'F',
            '0', '1', '2', '3', '4', '5',
            '6', '7', '8', '9', 'r', 'g',
            'b'
        ]

        clean_rgb_code = ''

        rgb_code = rgb2hex_form.rgb2hex.data.strip()
        
        for character in rgb_code:
            if character not in allowed_characters:
                return jsonify(
                    dict(
                        status='invalid_character'
                    )
                )

            if character.isdigit() or \
               character == ',':
               clean_rgb_code = f'{clean_rgb_code}{character}'

        clean_rgb_code_split = clean_rgb_code.split(',')

        for value in clean_rgb_code_split:
            if 0 > int(value) or int(value )> 255:
                return jsonify(
                    dict(
                        status='invalid_values'
                    )
                )

        red = clean_rgb_code_split[0]
        green = clean_rgb_code_split[1]
        blue = clean_rgb_code_split[2]

        hex_value = f"#{int(red):02x}{int(green):02x}{int(blue):02x}"

        return jsonify(
            dict(
                status='success',
                hex_value=hex_value
            )
        )

    return render_template(
        'c3/c3.html',
        rgb2hex_form=rgb2hex_form,
        hex2rgb_form=hex2rgb_form,
        title="C3 | Color Code Converter"
    )


@app.route('/convert-hex-to-rgb', methods=['POST', 'GET'])
def convert_hex_to_rgb():
    rgb2hex_form = RGB2HEX_Form()
    hex2rgb_form = HEX2RGB_Form()

    if hex2rgb_form.validate_on_submit():
        hex_code = hex2rgb_form.hex2rgb.data.lower().strip().lstrip('#')
        rgb_value = f"rgb{tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))}"
        
        return jsonify(
            dict(
                status='success',
                rgb_value=rgb_value
            )
        )

    return render_template(
        'c3/c3.html',
        rgb2hex_form=rgb2hex_form,
        hex2rgb_form=hex2rgb_form,
        title="C3 | Color Code Converter"
    )
