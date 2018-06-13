import argparse
import csv


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--chat', type=str, default='chat_en.csv')
    parser.add_argument('--out', type=str, default='chat_en.txt')
    args = parser.parse_args()

    chat = open(args.chat, mode='r')
    out = open(args.out, mode='w')
    reader = csv.DictReader(chat, ["time", "name", "text"])
    next(reader)
    for row in reader:
        time = row['time']
        text = row['text']
        name = row['name']
        out.write(f'{time} - {name}: {text}\n')