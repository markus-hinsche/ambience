# ambience

## Local Setup

```bash
cd frontend
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

### Train your RASA model

```bash
python3.6 -m rasa_nlu.train \
    --config nlp/config_mitie.yml \
    --data nlp/set12_cleaned.json \
    --path nlp/projects
```

```bash
python3.6 server.py
```

At the moment, the messages, the classified intent, and the confidence are
printed to your console instead of being passed to the frontend.

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

## Similar projects

https://chatvisualizer.com/

## Deploy on uberspace

Follow the instructions in `deploy/README.md`

### Resources

Rasa:
- [installation](https://nlu.rasa.com/installation.html)
- [tutorial](https://nlu.rasa.com/tutorial.html)
