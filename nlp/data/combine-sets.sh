#!/bin/bash

set -x
set -e

# Concatenate csv files
TMP_FILE=set12.csv
cat set1.csv > "$TMP_FILE"
tail -n +2 set2.csv >> "$TMP_FILE"
tail -n +2 set3.csv >> "$TMP_FILE"

# Remove lines without intent in csv files
TMP_CSV_CLEANED=set12_cleaned.csv
python3.6 -c "
import pandas as pd
df = pd.read_csv('set12.csv')
out = df[df.intent.notnull()]
out.to_csv('${TMP_CSV_CLEANED}', index=False)
"

# Transform csv to json
OUT_FILE="../set12_cleaned.json"
echo '{"rasa_nlu_data": {"common_examples":' > "$OUT_FILE"
csvjson "$TMP_CSV_CLEANED" >> "$OUT_FILE"
echo '}}' >> "$OUT_FILE"
