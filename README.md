# ambience

Ambience is a WhatsApp Chat Analysis WebApp. 

Given you have a long English chat conversation, you can export and analyze it. 
For each single message in the chat, ambience predicts an intent and provides an overview of used intents. 
How does this help? For example, it can provide an overall impression 
which chat participant is more likely to propose something, or who asks more. 

Find a deployed version here: https://ambience.uber.space. 

The frontend is a React web app. 
For message classification, we use [Rasa NLU](https://github.com/RasaHQ/rasa_nlu).
The predictions are transmitted via a lean Flask webserver.  

## Local Setup

To build the frontend, run:

```bash
yarn --cwd frontend
```

To install the pip requirements, and download the NLP model, run:

```bash
pip install -r nlp/requirements.txt
./nlp/get_mitie_models.sh
```

## Usage

To start the frontend, run: 

```bash
yarn --cwd frontend start
```

To start the backend, run:

```bash
python nlp/server.py
```

To verify that the setup works you can open [http://localhost:3006](http://localhost:3006) 
and upload a chat file like `data/chat_en_short.txt`. 
Of course you can also take your own exported WhatsApp conversation.

## Train your message classification model

In order to (re)train the Rasa classification model, run:

```bash
python -m rasa_nlu.train \
    --config nlp/config_mitie.yml \
    --data data/training_data_mixed.json \
    --path nlp/projects
```

### Intent list:

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

## Deploy on Uberspace

In order to deploy this to [our Uberspace](https://ambience.uber.space), 
we followed the the instructions in [deploy/README.md](deploy/README.md)

### Resources

Rasa:
- [installation](https://nlu.rasa.com/installation.html)
- [tutorial](https://nlu.rasa.com/tutorial.html)
