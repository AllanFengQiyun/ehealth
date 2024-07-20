from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
import pandas as pd
import pickle

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",  # React development server
    "https://ehealth-facb87f2634e.herokuapp.com/",  # Your frontend Heroku app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

class PatientData(BaseModel):
    age: int
    gender: int
    education: int
    race: int
    social_class: int
    physical_activity: int
    poor_diet: int
    viruses: int
    smoking: int
    micro_infarcts: int
    depression: int
    early_stress: int
    air_pollution: int
    calcium_deficiency: int
    alcohol: int
    organic_solvents: int
    vitamin_deficiency: int
    dental_infection: int
    fungi_infection: int
    bacteria_infection: int
    lack_of_cognitive_activity: int
    poor_cholesterol_homeostasis: int
    cardiovascular_disease: int
    congestive_heart_failure: int
    metals: int
    malnutrition: int
    immune_system_dysfunction: int
    obesity: int
    poor_controlled_type2_diabetes: int
    stroke: int
    family_history_of_dementia: int
    traumatic_brain_injury: int
    cancer: int
    dob: str  # Format: "YYYY-MM-DD"

@app.post("/predict")
async def predict_alzheimer(patient_data: PatientData):
    try:
        # Convert input data to DataFrame
        df = pd.DataFrame([patient_data.dict()])
        df = df.drop('dob', axis=1)  # Remove dob from DataFrame

        # Calculate age in days
        dob = datetime.strptime(patient_data.dob, "%Y-%m-%d")
        age_in_days = (datetime.today() - dob).days

        # Load model
        model = pickle.load(open("model.pkl", "rb"))

        # Make prediction
        result = model.predict_survival_function(df)
        result.index = result.index.astype(int)
        new_index = pd.Index(range(result.index.min(), result.index.max() + 1))
        result = result.reindex(index=new_index, method="backfill")
        chance_of_alz = float(result[0][age_in_days])  # Convert to float for JSON serialization

        return {"chance_of_alzheimer": chance_of_alz, "age_in_days": age_in_days}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
