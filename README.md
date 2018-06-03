# ambience

## Setup

### Frontend + Backend

```
cd frontend
yarn
```

```
cd backend
yarn
```

### Rasa

As described in:
[installation](https://nlu.rasa.com/tutorial.html)
and
[tutorial](https://nlu.rasa.com/tutorial.html):

```
pip install rasa_nlu
pip install rasa_nlu[spacy]

python -m spacy download en_core_web_md
python -m spacy link en_core_web_md en
```

## Usage

### Frontend + Backend

```
cd frontend
yarn start
```

```
cd backend
yarn start
```

### Rasa

```
python -m rasa_nlu.train \
    --config backend/config_spacy.yml \
    --data backend/demo-rasa.json \
    --path projects

python -m rasa_nlu.server --path projects
```

## Intent list:

Analogously to [rasa intents](https://github.com/RasaHQ/rasa_nlu/blob/master/data/examples/rasa/demo-rasa.md):

* goodbye
* greet
* affirm
* deny
* argue
* propose
* other

## Competition

https://chatvisualizer.com/

## Data

https://www.kaggle.com/datasets?sortBy=relevance&group=public&search=chat&page=1&pageSize=20&size=all&filetype=all&license=all
https://www.w3.org/2011/rdf-wg/wiki/Chatlog_2011-04-13
https://www.w3.org/2011/rdf-wg/wiki/Chatlog_2011-04-14