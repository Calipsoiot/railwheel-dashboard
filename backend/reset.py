from pymongo import MongoClient
from dotenv import load_dotenv
import os
import random
import time

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["railwheelfactory"]
collection = db["production"]

collection.update_one(
    {"wheelType": "Freight"},
    {"$set": {"produced": 1200, "defective": 25}}
)

collection.update_one(
    {"wheelType": "Passenger"},
    {"$set": {"produced": 900, "defective": 12}}
)

collection.update_one(
    {"wheelType": "Metro"},
    {"$set": {"produced": 700, "defective": 8}}
)

print("Factory Data Reset Successfully")