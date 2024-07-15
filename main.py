from fastapi import FastAPI
from pandas import DataFrame,Index
from datetime import datetime
import lifelines
import pickle

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/test")
async def try_model():
    new_data = DataFrame(
        {
            "age": [85],
            "gender": [0],  # 0 - Male, 1 - Female
            "education": [
                3
            ],  # 0 - Post-grad; 1-College; 2- University; 3 - Highschool;
            "race": [
                2
            ],  #  0 - Arabic; 1- Black; 2 - Caucasian; 3-Hispanic; 4-South Asian; 5-East Asian;
            "social_class": [
                3
            ],  # 0 - Upper class; 1- Poverty; 2 -Working class; 3-Middle class
            "physical_activity": [1],  # 0 - lower; 1 - lack; 2 - Higher
            "poor_diet": [0],
            "viruses": [0],
            "smoking": [0],
            "micro_infarcts": [0],
            "depression": [0],
            "early_stress": [0],
            "air_pollution": [0],
            "calcium_deficiency": [0],
            "alcohol": [0],
            "organic_solvents": [0],
            "vitamin_deficiency": [0],
            "dental_infection": [0],
            "fungi_infection": [0],
            "bacteria_infection": [0],
            "lack_of_cognitive_activity": [1],
            "poor_cholesterol_homeostasis": [1],
            "cardiovascular_disease": [0],
            "congestive_heart_failure": [0],
            "metals": [0],
            "malnutrition": [0],
            "immune_system_dysfunction": [1],
            "obesity": [1],
            "poor_controlled_type2_diabetes": [1],
            "stroke": [1],
            "family_history_of_dementia": [1],
            "traumatic_brain_injury": [1],
            "cancer": [0],
        }
    )
    dob = datetime(1937, 3, 2)
    age_in_days = (datetime.today() - dob).days
    model = pickle.load(open("model.pkl", "rb"))
    result = model.predict_survival_function(new_data)
    result.index = result.index.astype(int)
    new_index = Index(range(result.index.min(), result.index.max() + 1))
    result = result.reindex(index=new_index,method="backfill")
    chance_of_alz = result[0][age_in_days]
    return {"test": chance_of_alz, "age_in_days": age_in_days}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
