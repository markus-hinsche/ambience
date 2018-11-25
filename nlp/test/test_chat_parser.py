from server import get_whatsapp_messages


EXAMPLE_EXPORT = u'''
4/20/18, 12:37 PM - Markus: Hast du Lust aufn Lunch Date nächste Woche?
4/20/18, 6:23 PM - Kai Rollmann: Jaa!!
4/20/18, 6:23 PM - \u202a+49 176 1234567\u202c: Verführe mich :D
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
            "name": "+49 176 1234567",
            "text": "Verf\u00fchre mich :D",
            "time": "4/20/18, 6:23 PM"
        }
    ]

    assert get_whatsapp_messages(EXAMPLE_EXPORT) == expected
