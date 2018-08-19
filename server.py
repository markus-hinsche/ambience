#!/usr/bin/env python3
import unicodedata
import re
from typing import List, Dict, Union

from flask import Flask, jsonify, request, wrappers
from flask_cors import CORS
from rasa_nlu.model import Interpreter

MODEL_DIR = './nlp/projects/default/model_20180613-130746'
INTERPRETER = Interpreter.load(MODEL_DIR)

# Initialize the server
app = Flask(__name__)
CORS(app)


def get_whatsapp_messages(content: str) -> List[Dict[str, str]]:
    """

    Args:
        content: All messages in a string

    Returns: [{'name': 'matched_string', ...}]
    """

    pattern = r'(?P<time>[0-9\/, :AMP]+) \- (?P<name>[a-zA-Z ]+): (?P<text>.+)'
    regex_ = re.compile(pattern, re.DOTALL)
    matches = [re.match(regex_, row) for row in content.split("\n")]
    real_matches = filter(lambda x: bool(x), matches)
    return list(map(lambda x: x.groupdict(), real_matches))


def map_message_to_rasa_call(message: Dict[str, str]) -> Dict[str, Union[float, str]]:
    """Parse a message by a call to the Rasa NLU module

    Arguments:
        message: [
            {'time': '12.04.18, 21:42',
             'name': 'Lotti',
             'text': 'Hey, hier Marcel'}]

    Returns:
        [
            {'time': '12.04.18, 21:42',
             'name': 'Dirk',
             'text': 'Hey, here is Dirk'
             'intent': 'greet'
             'confidence': 0.982}
        ]
    """
    parsed = INTERPRETER.parse(message['text'])['intent']  # type: dict
    parsed['intent'] = parsed.pop('name')
    return dict(**message, **parsed)


def parse_file(f: bytes) -> List[Dict[str, str]]:
    content = f.decode('utf-8', 'ignore')

    # This seems to be necessary since there are stupid special unicode chars
    # leading and trailing the phone number
    filtered = filter(lambda c: unicodedata.category(c) != 'Cf', content)
    return get_whatsapp_messages(''.join(filtered))


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
