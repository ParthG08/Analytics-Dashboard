import pandas as pd
data = pd.read_json('./jsondata.json')
df = pd.DataFrame(data)

# print(df.columns)
num_row = df.shape[0]
print(num_row)

