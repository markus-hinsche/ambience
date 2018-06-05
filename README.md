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

### Deploy

```bash
cd frontend
npm install
npm run build
cp -r build/* ~/html/
```

```bash
cd backend
npm install
npm start
```

### Rasa

As described in:
[installation](https://nlu.rasa.com/tutorial.html)
and
[tutorial](https://nlu.rasa.com/tutorial.html):

```bash
pip3.6 install rasa_nlu --user
pip3.6 install git+https://github.com/mit-nlp/MITIE.git --user
pip3.6 install rasa_nlu[mitie] --user
pip3.6 install coloredlogs --user
pip3.6 install csvkit --user
pip3.6 install pandas -- user

cd nlp
wget https://github.com/mit-nlp/MITIE/releases/download/v0.4/MITIE-models-v0.2.tar.bz2
tar jxf MITIE-models-v0.2.tar.bz2
bzip2 -dk MITIE-models-v0.2.tar.bz2
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
python3.6 -m rasa_nlu.train \
    --config nlp/config_mitie.yml \
    --data nlp/set12_cleaned.json \
    --path nlp/projects

python3.6 -m rasa_nlu.server --port 3054 --path nlp/projects
```

Querying Rasa then gives us:

```bash
❯ curl -XPOST localhost:3054/parse -d '{"q":"hello there"}'
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
python3.6 -c "
import pandas as pd
df = pd.read_csv('set12.csv')
print(df[['text', 'intent']].groupby('intent').count())
"
```
