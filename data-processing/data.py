import pandas as pd
data = pd.read_json('./jsondata.json')
df = pd.DataFrame(data)

print(df.columns)
num_row = df.shape[0]
print(num_row)

# unique_sector_list = set(df['sector'])
# unique_topic_list = set(df['topic'])

# print(len(unique_topic_list))
# print(len(unique_sector_list))

# unique_country_list = set(df['country'])

# print(len(unique_country_list))

# intensity_array = list(df['intensity'])
# intensity_freq = [0]*11
# for val in intensity_array:
#     if type(val) is str: intensity_freq[0]=intensity_freq[0]+1
#     else:
#         intensity_freq[int(val/10)+1]= intensity_freq[int(val/10)+1]+1

# print(intensity_freq)
# print(sum(intensity_freq))

# topics = set(df['topic'])
# print(len(topics))

# for val in topics:
#     print(val)