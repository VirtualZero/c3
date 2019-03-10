from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Regexp


class RGB2HEX_Form(FlaskForm):
    rgb2hex = StringField(
        None, 
        [
            DataRequired(),
            Length(
                min=5, 
                max=20
            ),
            Regexp(
                '^(rgb)?\(?\s?\d{1,3},\s?\d{1,3},\s?\d{1,3}\s?\)?$',
                message='Please enter a valid RGB code.'
            )
        ]
    )


class HEX2RGB_Form(FlaskForm):
    hex2rgb = StringField(
        None, 
        [
            DataRequired(),
            Length(
                min=6, 
                max=7
            ), 
            Regexp(
                '^#?([A-F]|[a-f]|[0-9]){6}$',
                message='Please enter a valid hex code.'
            )
        ]
    )
