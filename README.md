# ambience

## Setup

### Frontend

```
cd frontend
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
```

## Usage

### Frontend

```
yarn start
```

### Rasa

```
python -m spacy download en_core_web_md
python -m spacy link en_core_web_md en

python -m rasa_nlu.train \
    --config sample_configs/config_spacy.yml \
    --data data/examples/rasa/demo-rasa.json \
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
* agree
* other

## Competition

https://chatvisualizer.com/

## Data

https://www.kaggle.com/datasets?sortBy=relevance&group=public&search=chat&page=1&pageSize=20&size=all&filetype=all&license=all
