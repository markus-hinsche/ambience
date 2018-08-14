#!/usr/bin/env python3
import unicodedata
import re
from typing import List, Dict, Union

from rasa_nlu.model import Interpreter
from flask import Flask, request, jsonify


# Recover model from model directory
model_directory = './nlp/projects/default/model_20180613-130746'

# Got a problem when trying to start interpreter
# when putting the .py file into backend dir

interpreter = Interpreter.load(model_directory)


def get_whatsapp_messages(content):
    # The date, time pattern at the beggining of whatsapps
    date_time_ger = r"\d{1,2}\.\d{1,2}\.\d{2}, \d{2}:\d{2}"
    date_time_en = r"\d{1,2}\/\d{1,2}\/\d{2}, \d{2}:\d{2} (PM|AM)"

    # Match by regular expression
    # Using pythons named groups (?P<...>)
    pattern = (r"(?P<time>({0}|{1})) - (?P<author>[\w \+]+):"
               r"(?P<text>.+?(?=(\n({0}|{1})|$)))"
               .format(date_time_ger, date_time_en))
    regex = re.compile(pattern, re.DOTALL)
    # groupdict() returns a dictionary {"name": "matched_string", ...}
    matches = [match.groupdict() for match in regex.finditer(content)]

    return matches


def bucketize_messages(messages, bucket_size):
    # This function actually only makes sense for an asynchronous task?!
    buckets = [messages[i: i+bucket_size] for i in
               range(0, len(messages), bucket_size)]
    # for i in range(0, len(messages), bucket_size):
    #     bucket = messages[i: i + bucket_size]
    #     buckets.append(bucket)

    return buckets


def map_message_to_rasa_call(
        message: Dict[str, str]) -> Dict[str, Union[float, str]]:
    '''Parses a message by a call to the RASA NLU module

    Arguments:
        message {Dict[str, str]} -- [
            {'time': '12.04.18, 21:42',
             'author': 'Marcel Hinsche',
             'text': 'Hey, hier Marcel'}]

    Returns:
        Dict[str, Union[float, str] -- [
            {'time': '12.04.18, 21:42',
             'author': 'Marcel Hinsche',
             'text': 'Hey, hier Marcel'
             'intent': 'greet'
             'confidence': 0.982}
        ]
    '''

    # interpreter.parse() also returns a dict
    parsed = interpreter.parse(message['text'])['intent']
    res = {'intent': parsed['name'],
           'confidence': parsed['confidence']}
    # Update message dictionary IN PLACE
    message.update(res)
    return message


def parse_file(f: bytes) -> List:
    content = f.decode("utf-8", "ignore")

    # This seems to be necessary since there are stupid special unicode chars
    # leading and trailing the phone number
    filtered = filter(lambda c: unicodedata.category(c) != 'Cf', content)
    content = "".join(filtered)
    return get_whatsapp_messages(content)


def ask_rasa(messages):
    list_of_messages = []
    buckets = bucketize_messages(messages, 20)
    for bucket in buckets:
        for message in bucket:
            message_parsed = map_message_to_rasa_call(message)
            list_of_messages.append(message_parsed)
    return list_of_messages


# Initialize the server
app = Flask(__name__)


@app.route('/')
@app.route('/index.html')
def index():
    return 'Hello, World!'


@app.route('/chats', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        chat = request.files['chat']
        f = chat.read()

        matches = parse_file(f)
        messages = ask_rasa(matches)

        response = {"message": "success", "data": messages}
        print(response)

        return jsonify(response), 200


if __name__ == '__main__':
    app.run(port=62729, debug=True)
