#!/bin/bash

set -x
set -e

cat set1.csv > set12.csv
tail -n +2 set2.csv >> set12.csv
tail -n +2 set3.csv >> set12.csv

python3 -c "
import pandas as pd
df = pd.read_csv('set12.csv')
out = df[df.intent.notnull()]
out.to_csv('set12_cleaned.csv', index=False)
"

echo '{"rasa_nlu_data": {"common_examples":' > nlp/set12_cleaned.json
csvjson set12_cleaned.csv >> nlp/set12_cleaned.json
echo '}}' >> nlp/set12_cleaned.json
