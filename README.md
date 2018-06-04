# ambience

## Setup

### Frontend + Backend

```bash
cd frontend
yarn
```

```bash
cd backend
yarn
```

### Rasa

As described in:
[installation](https://nlu.rasa.com/tutorial.html)
and
[tutorial](https://nlu.rasa.com/tutorial.html):

```bash
pip install rasa_nlu
pip install rasa_nlu[spacy]
pip install coloredlogs
pip install csvkit
pip install pandas

python -m spacy download en_core_web_md
python -m spacy link en_core_web_md en
```

## Usage

### Frontend + Backend

```bash
cd frontend
yarn start
```

```bash
cd backend
yarn start
```

### Rasa

```bash
python -m rasa_nlu.train \
    --config nlp/config_spacy.yml \
    --data nlp/set12_cleaned.json \
    --path nlp/projects

python -m rasa_nlu.server --path nlp/projects
```

Querying Rasa then gives us:

```bash
❯ curl -XPOST localhost:5000/parse -d '{"q":"hello there"}'
{
  "intent": {
    "name": "greet",
    "confidence": 1.0
  },
  "entities": [],
  "text": "hello there",
  "project": "default",
  "model": "fallback"
}
```

## Intent list:

Analogously to [rasa intents](https://github.com/RasaHQ/rasa_nlu/blob/master/data/examples/rasa/demo-rasa.md):

* goodbye
* greet
* affirm
* deny
* argue
* propose
* ask
* explain
* other

## Competition

https://chatvisualizer.com/

## Data

https://www.kaggle.com/datasets?sortBy=relevance&group=public&search=chat&page=1&pageSize=20&size=all&filetype=all&license=all
https://www.w3.org/2011/rdf-wg/wiki/Chatlog_2011-04-13
https://www.w3.org/2011/rdf-wg/wiki/Chatlog_2011-04-14

### Combine sets

Shell

```bash
./combine-sets.sh
```

Get statistic

```bash
python -c "
import pandas as pd
df = pd.read_csv('set12.csv')
print(df[['text', 'intent']].groupby('intent').count())
"
```
