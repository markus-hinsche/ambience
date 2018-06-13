# Deploy

## How to deploy on a new uberspace?

### Setup 
```bash
cd frontend
npm install
npm run build
cp -r build/* ~/html/
```

```bash
./nlp/get_mitie_models.sh
```

Copy contents of `deploy/` directories onto uberspace.

```bash
supervisorctl reread
supervisorctl update
supervisorctl start
```

## How to handle services?
As described in 
[uberspace 7 docs](https://manual.uberspace.de/en/daemons-supervisord.html):
Here are a few highlights

```bash
supervisorctl status
supervisorctl start my-daemon
supervisorctl start stop my-daemon
supervisorctl start restart my-daemon
supervisorctl start remove my-daemon
supervisorctl tail -f my-daemon
```