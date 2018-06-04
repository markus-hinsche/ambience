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
pip3.6 install rasa_nlu --user
pip3.6 install git+https://github.com/mit-nlp/MITIE.git --user
pip3.6 install rasa_nlu[mitie] --user
pip3.6 install coloredlogs --user
pip3.6 install csvkit --user

cd nlp
wget https://github.com/mit-nlp/MITIE/releases/download/v0.4/MITIE-models-v0.2.tar.bz2
tar jxf MITIE-models-v0.2.tar.bz2
bzip2 -dk MITIE-models-v0.2.tar.bz2
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
python3.6 -m rasa_nlu.train \
    --config nlp/config_mitie.yml \
    --data nlp/demo-rasa.json \
    --path nlp/projects

python3.6 -m rasa_nlu.server --port 3054 --path nlp/projects
```

Querying Rasa then gives us:

```
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

    cat set1.csv > set12.csv
    tail -n +2 set2.csv >> set12.csv
    tail -n +2 set3.csv >> set12.csv

    python3.6 -c "
    import pandas as pd
    df = pd.read_csv('set12.csv')
    out = df[df.intent.notnull()]
    out.to_csv('set12_cleaned.csv', index=False)
    "
    
    echo '{"rasa_nlu_data": {"common_examples":' > nlp/set12_cleaned.json
    csvjson set12_cleaned.csv >> nlp/set12_cleaned.json
    echo '}}' >> nlp/set12_cleaned.json

Get statistic
    
    python3.6 -c "
    import pandas as pd
    df = pd.read_csv('set12.csv')
    print(df[['text', 'intent']].groupby('intent').count())
    "