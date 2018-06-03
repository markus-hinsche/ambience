import argparse
import json
import re
from typing import List

whatsapp_regex_pattern = r'(?P<time>[0-9/, :AMP]+) \- (?P<name>[a-zA-Z ]+): (?P<text>.+)'


def parse_chat(chat: str) -> List[dict]:
    matches = re.finditer(whatsapp_regex_pattern, chat)
    messages = [m.groupdict() for m in matches]
    for m in messages:
        m['intent'] = ''
    return messages


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--chat', type=str, default='chat.txt')
    parser.add_argument('--out', type=str, default='parsed_list.json')
    args = parser.parse_args()

    chat = open(args.chat).read()
    messages = parse_chat(chat)
    json.dump(messages, open(args.out, mode='w', encoding='utf-8'), indent=2, sort_keys=True)