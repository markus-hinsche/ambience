#!/usr/bin/env python3
import unicodedata
import re
from typing import List, Dict, Union

from flask import Flask, jsonify, request, wrappers
from rasa_nlu.model import Interpreter
from flask import Flask, request, jsonify
from flask_cors import CORS

# Recover model from model directory
MODEL_DIR = './nlp/projects/default/model_20180613-130746'

# TODO
# Got a problem when trying to start interpreter
# when putting the .py file into backend dir

# TODO why here?
interpreter = Interpreter.load(MODEL_DIR)


def get_whatsapp_messages(content: str) -> List[Dict[str, str]]:
    """

    Args:
        content: All messages in a string

    Returns: [{'name': 'matched_string', ...}]

    """

    # The date, time pattern at the beginning of WhatsApp messages
    date_time_ger = r'\d{2}\.\d{2}\.\d{2}, \d{2}:\d{2}'
    date_time_en = r'\d{1,2}\/\d{1,2}\/\d{2}, \d{2}:\d{2} (PM|AM)'

    pattern = (r'(?P<time>({0}|{1})) - (?P<author>[\w \+]+):'
               r'(?P<text>.+?(?=(\n({0}|{1})|$)))'
               .format(date_time_ger, date_time_en))
    regex = re.compile(pattern, re.DOTALL)
    return [match.groupdict() for match in regex.finditer(content)]


# def bucketize_messages(messages: List, bucket_size: int):
#     return [messages[i: i+bucket_size]
#             for i in range(0, len(messages), bucket_size)]


def map_message_to_rasa_call(message: Dict[str, str]) -> Dict[str, Union[float, str]]:
    """Parse a message by a call to the Rasa NLU module

    Arguments:
        message {Dict[str, str]} -- [
            {'time': '12.04.18, 21:42',
             'name': 'Lotti',
             'text': 'Hey, hier Marcel'}]

    Returns:
        Dict[str, Union[float, str] -- [
            {'time': '12.04.18, 21:42',
             'name': 'Dirk',
             'text': 'Hey, here is Dirk'
             'intent': 'greet'
             'confidence': 0.982}
        ]
    """
    parsed = interpreter.parse(message['text'])['intent']  # type: dict
    res = {'intent': parsed['name'],
           'confidence': parsed['confidence']}
    return dict(**message, **res)


def parse_file(f: bytes) -> List[Dict[str, str]]:
    content = f.decode('utf-8', 'ignore')

    # This seems to be necessary since there are stupid special unicode chars
    # leading and trailing the phone number
    filtered = filter(lambda c: unicodedata.category(c) != 'Cf', content)
    return get_whatsapp_messages(''.join(filtered))


# Initialize the server
app = Flask(__name__)
CORS(app)

# TODO kill?
@app.route('/')
@app.route('/index.html')
def index() -> str:
    return 'Hello, World!'


@app.route('/chats', methods=['POST'])
def upload_file() -> wrappers.Response:
    if request.method == 'POST':
        chat = request.files['chat']
        raw_bytes_string = chat.read()

        matches = parse_file(raw_bytes_string)
        messages = list(map(map_message_to_rasa_call, matches))

        return jsonify({
            'message': 'success',
            'data': messages
        })


if __name__ == '__main__':
    app.run(port=62729, debug=True)
