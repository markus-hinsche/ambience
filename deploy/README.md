# Deploy

## How to deploy on a new Uberspace?

### Setup

To downlaod the [MITIE models](https://rasa.com/docs/nlu/0.11.4/installation/#first-alternative-mitie), run:

```bash
./nlp/get_mitie_models.sh
```


### Update frontend

Given the frontend code was altered, to update the deployed frontend, run:

```bash
cd frontend
npm install
npm run build
cp -r build/* ~/html/
```

### Update service

If the nlp service was altered, to update, run:

```bash
cp ~/ambience/deploy/nlp.ini ~/etc/services.d/nlp.ini
supervisorctl reread
supervisorctl update
supervisorctl start nlp
```

## How to handle services?
As described in 
[Uberspace 7 docs](https://manual.uberspace.de/en/daemons-supervisord.html):
Here are a few highlights

```bash
supervisorctl status
supervisorctl start my-daemon
supervisorctl start stop my-daemon
supervisorctl start restart my-daemon
supervisorctl start remove my-daemon
supervisorctl tail -f my-daemon
```
