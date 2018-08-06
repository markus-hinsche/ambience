# ambience

## Local Setup

```bash
cd frontend
yarn
```

```bash
cd backend
yarn
```

```bash
pip install -r nlp/requirements.txt
./nlp/get_mitie_models.sh
```

## Usage

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

python3.6 -m rasa_nlu.server --port 61729 --path nlp/projects
```

Querying Rasa then gives us:

```bash
❯ curl -XPOST localhost:61729/parse -d '{"q":"hello there"}'
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

## Deploy on uberspace

Follow the instructions in `deploy/README.md`

### Resources
Rasa:
- [installation](https://nlu.rasa.com/installation.html)
- [tutorial](https://nlu.rasa.com/tutorial.html)
