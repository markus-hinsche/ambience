## Data

https://www.kaggle.com/datasets?sortBy=relevance&group=public&search=chat&page=1&pageSize=20&size=all&filetype=all&license=all
https://www.w3.org/2011/rdf-wg/wiki/Chatlog_2011-04-13
https://www.w3.org/2011/rdf-wg/wiki/Chatlog_2011-04-14

### Combine sets

In order to generate a training set you have to combine multiple sets using

```bash
cd nlp/data
./combine-sets.sh
```

### Get statistic

```bash
python3.6 -c "
import pandas as pd
df = pd.read_csv('set12.csv')
print(df[['text', 'intent']].groupby('intent').count())
"
```
