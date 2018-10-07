#!/usr/bin/env python3
import argparse
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
            {'time': '4/20/18, 12:37 PM',
             'name': 'Dirk',
             'text': 'Hey, here is Dirk'}]

    Returns:
        [
            {'time': '4/20/18, 12:37 PM',
             'name': 'Dirk',
             'text': 'Hey, here is Dirk'
             'intent': 'greet'
             'confidence': 0.982}
        ]
    """
    parsed = INTERPRETER.parse(message['text'])['intent']  # type: dict
    parsed['intent'] = parsed.pop('name')
    return dict(**message, **parsed)


@app.route('/chats', methods=['POST'])
def upload_file() -> wrappers.Response:
    if request.method == 'POST':
        chat = request.files['chat']
        content = chat.read().decode('utf-8', 'ignore')
        messages = get_whatsapp_messages(''.join(content))
        messages = list(map(map_message_to_rasa_call, messages))

        return jsonify({
            'message': 'success',
            'data': messages
        })


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", help="display a square of a given number", type=int, default=62729)
    args = parser.parse_args()
    app.run(port=args.port, debug=True)
