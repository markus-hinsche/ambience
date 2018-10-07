from chat_parser import parse_chat


EXAMPLE_EXPORT = u'''
4/20/18, 12:37 PM - Markus: Hast du Lust aufn Lunch Date nächste Woche?
4/20/18, 6:23 PM - Kai Rollmann: Jaa!!
4/20/18, 6:23 PM - Kai Rollmann: Verführe mich :D
'''


def test_parse_chat():
    expected = [
        {
            "name": "Markus",
            "text": "Hast du Lust aufn Lunch Date n\u00e4chste Woche?",
            "time": "4/20/18, 12:37 PM"
        },
        {
            "name": "Kai Rollmann",
            "text": "Jaa!!",
            "time": "4/20/18, 6:23 PM"
        },
        {
            "name": "Kai Rollmann",
            "text": "Verf\u00fchre mich :D",
            "time": "4/20/18, 6:23 PM"
        }
    ]

    assert parse_chat(EXAMPLE_EXPORT) == expected
