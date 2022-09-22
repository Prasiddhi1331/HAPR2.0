import sys, json
import numpy as np 
import pandas as pd
import neattext.functions as nfx
from keras_preprocessing.sequence import pad_sequences
import pickle
import os
dirname = os.path.dirname(__file__)

filename = os.path.join(dirname, '../notebook/Model___Date_Time_2022_09_22__21_26_34___Loss_0.18113407492637634___Accuracy_0.931078314781189.h5')
from tensorflow import keras
model = keras.models.load_model(filename)

def clean_word(text):
    sent=text
    sent=sent.lower()
    sent=nfx.remove_special_characters(sent)
    sent=nfx.remove_stopwords(sent)
    return sent,len(sent.split())

text = json.loads(sys.argv[1])  
text = text['text']  

# text = """Ex Wife Threatening SuicideRecently I left my wife for good because she has cheated on me twice and lied to me so much that I have decided to refuse to go back to her. As of a few days ago, she began threatening suicide. I have tirelessly spent these paat few days talking her out of it and she keeps hesitating because she wants to believe I'll come back. I know a lot of people will threaten this in order to get their way, but what happens if she really does? What do I do and how am I supposed to handle her death on my hands? I still love my wife but I cannot deal with getting cheated on again and constantly feeling insecure. I'm worried today may be the day she does it and I hope so much it doesn't happen."""

c_text,text_l=clean_word(text)

filename = os.path.join(dirname, '../notebook/tokenizer.pickle')
with open(filename, 'rb') as handle:
    tokenizer = pickle.load(handle)

text_seq=tokenizer.texts_to_sequences([c_text])
text_pad=pad_sequences(text_seq,maxlen=50)
result = (model.predict(text_pad) > 0.5).astype("int32")

print(result[0][0])
# newdata = {'result':result[0][0]}

# print(json.dumps(newdata))