from pymongo import MongoClient
from dotenv import load_dotenv
import os
import random
import time

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["RWF"]
collection = db["production"]

print("Factory Simulator Started")

START_VALUES = {
    "Freight": {"produced": 1200, "defective": 25},
    "Passenger": {"produced": 900, "defective": 12},
    "Metro": {"produced": 700, "defective": 8},
}

while True:

    records = list(collection.find())

    for record in records:

        wheel_type = record["wheelType"]
        current_produced = record["produced"]

        if current_produced >= 2500:

            collection.update_one(
                {"_id": record["_id"]},
                {
                    "$set": {
                        "produced": START_VALUES[wheel_type]["produced"],
                        "defective": START_VALUES[wheel_type]["defective"]
                    }
                }
            )

            continue

        if wheel_type == "Freight":
            produced = random.randint(15, 30)
            defective = random.randint(0, 2)

        elif wheel_type == "Passenger":
            produced = random.randint(10, 20)
            defective = random.randint(0, 1)

        elif wheel_type == "Metro":
            produced = random.randint(5, 15)
            defective = random.randint(0, 1)

        else:
            produced = random.randint(5, 10)
            defective = 0

        if current_produced + produced > 2500:
            produced = 2500 - current_produced

        collection.update_one(
            {"_id": record["_id"]},
            {
                "$inc": {
                    "produced": produced,
                    "defective": defective
                }
            }
        )

    print("Factory Running...")
    time.sleep(5)