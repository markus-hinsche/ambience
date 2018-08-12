#!/usr/bin/env python3
import logging
import unicodedata

from rasa_nlu.model import Metadata, Interpreter
from flask import Flask, request
from flask import jsonify
import re


# Recover model from model directory
model_directory = './nlp/projects/default/model'

# Got a problem when trying to start interpreter 
# when putting the .py file into backend dir

interpreter = Interpreter.load(model_directory)


# Initialize the server
app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def index():
    return 'Hello, World!'


@app.route('/chats', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['chat']
        file = f.read()

        matches = parse_file(file)
        messages = ask_rasa(matches)
        print(messages)
        response = {"message": "success", "data": messages}

        return jsonify(response), 200

       

def parse_file(file):
    content =  file.decode("utf-8", "ignore")

    # This seems to be necessary since there are stupid special unicode chars
    # leading and trailing the phone number
    filtered = filter(lambda c: unicodedata.category(c) != 'Cf', content)
    content = "".join(filtered)
    return get_whatsapp_messages(content)

def get_whatsapp_messages(content):
    # The date, time pattern at the beggining of whatsapps
    date_time = r"\d{2}\.\d{2}\.\d{2}, \d{2}:\d{2}"

    # Match by regular expression
    # Using pythons named groups (?P<...>)
    pattern = r"(?P<time>{0}) - (?P<author>[\w \+]+): (?P<text>.+?(?=(\n{0}|$)))".format(date_time)
    regex = re.compile(pattern, re.DOTALL)
    # groupdict() returns a dictionary {"name": "matched_string", ...}
    matches = [match.groupdict() for match in regex.finditer(content)]

    return matches

def bucketize_messages(messages, bucket_size):
    buckets = []
    for i in range(0, len(messages), bucket_size):
        bucket = messages[i : i + bucket_size]
        buckets.append(bucket)

    return buckets

def ask_rasa(messages):
    list_of_messages = []
    buckets = bucketize_messages(messages, 20)
    for bucket in buckets:
        for message in bucket:
            message_parsed = map_message_to_rasa_call(message)
            list_of_messages.append(message_parsed)
    return list_of_messages

def map_message_to_rasa_call(message):
    # message is dictionary
    # {'time': '12.04.18, 21:42',
    # 'author': 'Marcel Hinsche',
    # 'text': 'Hey, hier Marcel'}

    # interpreter.parse() also returns a dict
    parsed = interpreter.parse(message['text'])['intent']
    res = {'intent': parsed['name'],
            'confidence': parsed['confidence']}
    # Update message dictionary IN PLACE
    message.update(res)
    return message









if __name__ == '__main__':
    app.run(port=62729)

