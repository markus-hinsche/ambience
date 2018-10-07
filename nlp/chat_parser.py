#!/usr/bin/env python3

import argparse
import csv
import json
import re
from typing import List

whatsapp_regex_pattern = r'(?P<time>[0-9/, :AMP]+) \- (?P<name>[a-zA-Z ]+): (?P<text>.+)'


def parse_chat(chat: str) -> List[dict]:
    matches = re.finditer(whatsapp_regex_pattern, chat)
    messages = [m.groupdict() for m in matches]
    return messages


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--chat', type=str, default='data/chat_en_short.txt')
    parser.add_argument('--out', type=str, default='data/chat_en_short.csv')
    args = parser.parse_args()

    chat = open(args.chat).read()
    messages = parse_chat(chat)
    f = open(args.out, mode='w')
    # json.dump(messages, f, indent=2, sort_keys=True)

    writer = csv.DictWriter(f, ["text", "time", "name"])
    writer.writeheader()
    writer.writerows(messages)
