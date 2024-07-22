from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, field_validator
from datetime import datetime
import pandas as pd
import pickle

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",  # React development server
    "https://ehealth-facb87f2634e.herokuapp.com/",  # Your frontend Heroku app
    "https://ehealth-frontend-9a7623e8b7a7.herokuapp.com/",
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
    dob: str

    @field_validator(
        "gender",
        "poor_diet",
        "viruses",
        "smoking",
        "micro_infarcts",
        "depression",
        "early_stress",
        "air_pollution",
        "calcium_deficiency",
        "alcohol",
        "organic_solvents",
        "vitamin_deficiency",
        "dental_infection",
        "fungi_infection",
        "bacteria_infection",
        "lack_of_cognitive_activity",
        "poor_cholesterol_homeostasis",
        "cardiovascular_disease",
        "congestive_heart_failure",
        "metals",
        "malnutrition",
        "immune_system_dysfunction",
        "obesity",
        "poor_controlled_type2_diabetes",
        "stroke",
        "family_history_of_dementia",
        "traumatic_brain_injury",
        "cancer",
    )
    @classmethod
    def check_binary(cls, v):
        if v not in [0, 1]:
            raise ValueError("Value must be 0 or 1")
        return v

    @field_validator("education", "race", "social_class", "physical_activity")
    @classmethod
    def check_range(cls, v, info):
        ranges = {
            "education": (0, 3),
            "race": (0, 5),
            "social_class": (0, 3),
            "physical_activity": (0, 2),
        }
        min_val, max_val = ranges[info.field_name]
        if v < min_val or v > max_val:
            raise ValueError(f"Value must be between {min_val} and {max_val}")
        return v

    @field_validator("dob")
    @classmethod
    def check_date_format(cls, v):
        try:
            datetime.strptime(v, "%Y-%m-%d")
        except ValueError:
            raise ValueError("Incorrect date format, should be YYYY-MM-DD")
        return v


@app.post("/predict")
async def predict_alzheimer(patient_data: PatientData):
    try:
        # Convert input data to DataFrame
        df = pd.DataFrame([patient_data.dict()])

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
        chance_of_alz = float(
            result[0][age_in_days]
        )  # Convert to float for JSON serialization

        return {"chance_of_alzheimer": chance_of_alz, "age_in_days": age_in_days}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
