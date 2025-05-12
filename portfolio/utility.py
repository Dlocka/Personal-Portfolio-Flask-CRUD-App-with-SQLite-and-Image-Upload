import hashlib
import json
 # References:
    # - Using hashlib
    # - Documentation: https://docs.python.org/3/library/hashlib.html
def Tohash(text):

    hash_object = hashlib.md5()

    hash_object.update(text.encode('utf-8'))
    
    hashed_text = hash_object.hexdigest()
    
    return hashed_text

def ObjectToJson(obj):   
    obj_dict = obj.__dict__.copy()
    #Refeerences
    # - Changes: remove '_sa_instance_state' in object if it exists
    # - Source: https://docs.sqlalchemy.org/en/20/orm/session_state_management.html
    if '_sa_instance_state' in obj_dict:
        obj_dict.pop('_sa_instance_state');
    
    # References:
    # - Using JSON encoder and decoder
    # - Documentation: https://docs.python.org/3/library/json.html
    JsonText=json.dumps(obj_dict);
    return JsonText;