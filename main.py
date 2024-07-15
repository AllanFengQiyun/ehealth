from fastapi import FastAPI
from pandas import DataFrame
import pickle

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


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
    with pickle.load(open("model.pkl", "rb")) as model:
        result = model.predict_cumulative_hazard(new_data)
        return {"test": result}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
