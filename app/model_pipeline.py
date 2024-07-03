#!pip install imbalanced-learn
import datetime as dt
from dateutil.relativedelta import relativedelta
import faker 
import numpy as np
from typing import List
from datetime import datetime
import pandas as pd
import warnings
import pickle
import matplotlib as plt
import seaborn as sns
from lifelines import KaplanMeierFitter

# import tensorflow as tf

# Number of trees in random forest
n_estimators = [int(x) for x in np.linspace(start=200, stop=2000, num=10)]
# Number of features to consider at every split
max_features = ["auto", "sqrt", "log2"]
# Maximum number of levels in tree
max_depth = [int(x) for x in np.linspace(10, 1000, 10)]
# Minimum number of samples required to split a node
min_samples_split = [2, 5, 10, 14]
# Minimum number of samples required at each leaf node
min_samples_leaf = [1, 2, 4, 6, 8]
# Create the random grid
random_grid = {
    "n_estimators": n_estimators,
    "max_features": max_features,
    "max_depth": max_depth,
    "min_samples_split": min_samples_split,
    "min_samples_leaf": min_samples_leaf,
    "criterion": ["entropy", "gini"],
}

faker = fk.Faker(["en_CA"])
warnings.filterwarnings("ignore")

education: List[str] = ["Highschool", "College", "University", "Post-grad"]
gender: List[str] = ["Male", "Female"]
race: List[str] = [
    "Caucasian",
    "Black",
    "Hispanic",
    "South Asian",
    "East Asian",
    "Arabic",
]
social_class: List[str] = ["Poverty", "Working class", "Middle class", "Upper class"]
physical_activity: List[str] = ["lack", "lower", "higher"]


def cm_show(my_cm, model_name):
    plt.figure(figsize=(4, 3))
    sns.heatmap(
        my_cm,
        annot=True,
        cmap="PiYG",
        fmt="d",
        xticklabels=["False", "True"],
        yticklabels=["False", "True"],
    )
    plt.xlabel("Predicted Labels")
    plt.ylabel("True Labels")
    plt.title(f"{model_name} - Confusion Matrix")
    plt.show()


# Set a seed for reproducibility
faker.seed_instance(100)

check__ = []


class Patient:
    def __init__(
        self,
        name: str,
        dob: dt.datetime.date,
        education: str,
        gender: str,
        race: str,
        social_class: str,
        alcohol: bool,
        physical_activity: str,
        lack_of_cognitive_activity: bool,
        family_history_of_dementia: bool,
        malnutrition: bool,
        poor_diet: bool,
        smoking: bool,
        cancer: bool,
        cardiovascular_disease: bool,
        congestive_heart_failure: bool,
        immune_system_dysfunction: bool,
        micro_infarcts: bool,
        obesity: bool,
        poor_cholesterol_homeostasis: bool,
        poor_controlled_type2_diabetes: bool,
        stroke: bool,
        traumatic_brain_injury: bool,
        depression: bool,
        early_stress: bool,
        air_pollution: bool,
        calcium_deficiency: bool,
        geographic_location: str,
        metals: bool,
        organic_solvents: bool,
        vitamin_deficiency: bool,
        bacteria_infection: bool,
        dental_infection: bool,
        fungi_infection: bool,
        viruses: bool,
    ):
        self.name = name
        self.dob = dob
        self.education = education
        self.gender = gender
        self.race = race
        self.social_class = social_class
        self.alcohol = alcohol
        self.physical_activity = physical_activity
        self.lack_of_cognitive_activity = lack_of_cognitive_activity
        self.family_history_of_dementia = family_history_of_dementia
        self.malnutrition = malnutrition
        self.poor_diet = poor_diet
        self.smoking = smoking
        self.cancer = cancer
        self.cardiovascular_disease = cardiovascular_disease
        self.congestive_heart_failure = congestive_heart_failure
        self.immune_system_dysfunction = immune_system_dysfunction
        self.micro_infarcts = micro_infarcts
        self.obesity = obesity
        self.poor_cholesterol_homeostasis = poor_cholesterol_homeostasis
        self.poor_controlled_type2_diabetes = poor_controlled_type2_diabetes
        self.stroke = stroke
        self.traumatic_brain_injury = traumatic_brain_injury
        self.depression = depression
        self.early_stress = early_stress
        self.air_pollution = air_pollution
        self.calcium_deficiency = calcium_deficiency
        self.geographic_location = geographic_location
        self.metals = metals
        self.organic_solvents = organic_solvents
        self.vitamin_deficiency = vitamin_deficiency
        self.bacteria_infection = bacteria_infection
        self.dental_infection = dental_infection
        self.fungi_infection = fungi_infection
        self.viruses = viruses

    @staticmethod
    def generate_random_patient(min_age: int, max_age: int):
        # Generate random values for each attribute
        patient_dob = faker.date_of_birth(minimum_age=min_age, maximum_age=max_age)
        social_class__ = faker.random_element(elements=social_class)
        education__ = faker.random_element(elements=education)
        gender__ = faker.random_element(elements=gender)
        race__ = faker.random_element(elements=race)
        exercise__ = faker.random_element(elements=physical_activity)
        base_growth_factor = 1

        # Determine education risk based on education level
        if education__ == "Highschool":
            education_risk = 1.2
        elif education__ == "College":
            education_risk = 1.1
        elif education__ == "University":
            education_risk = 0.9
        else:
            education_risk = 0.8

        # Determine social class risk
        if social_class__ == "Poverty":
            social_class_risk = 1.2
        elif social_class__ == "Working class":
            social_class_risk = 1.1
        elif social_class__ == "Middle class":
            social_class_risk = 0.9
        else:
            social_class_risk = 0.8

        # Determine gender risk
        gender_risk = 1.1 if gender__ == "Male" else 0.9

        # Determine exercise risk
        if exercise__ == "lack":
            exercise_risk = 1.1
        elif exercise__ == "lower":
            exercise_risk = 1.0
        else:
            exercise_risk = 0.9

        unhealthy_factor = (
            100
            * (relativedelta(dt.date.today(), patient_dob).years / 90)
            * base_growth_factor
            * education_risk
            * social_class_risk
            * exercise_risk
        )
        global check__
        check__.append(unhealthy_factor)

        return Patient(
            name=faker.name(),
            dob=patient_dob,  # extremly low risk to have AD under age 30
            education=education__,
            gender=gender__,
            race=race__,
            social_class=social_class__,
            alcohol=faker.boolean(chance_of_getting_true=unhealthy_factor),
            physical_activity=exercise__,
            lack_of_cognitive_activity=faker.boolean(
                chance_of_getting_true=unhealthy_factor
            ),
            family_history_of_dementia=faker.boolean(
                chance_of_getting_true=unhealthy_factor
            ),
            malnutrition=faker.boolean(chance_of_getting_true=unhealthy_factor),
            poor_diet=faker.boolean(chance_of_getting_true=unhealthy_factor),
            smoking=faker.boolean(chance_of_getting_true=unhealthy_factor),
            cancer=faker.boolean(chance_of_getting_true=unhealthy_factor),
            cardiovascular_disease=faker.boolean(
                chance_of_getting_true=unhealthy_factor
            ),
            congestive_heart_failure=faker.boolean(
                chance_of_getting_true=unhealthy_factor
            ),
            immune_system_dysfunction=faker.boolean(
                chance_of_getting_true=unhealthy_factor
            ),
            micro_infarcts=faker.boolean(chance_of_getting_true=unhealthy_factor),
            obesity=faker.boolean(chance_of_getting_true=unhealthy_factor),
            poor_cholesterol_homeostasis=faker.boolean(
                chance_of_getting_true=unhealthy_factor
            ),
            poor_controlled_type2_diabetes=faker.boolean(
                chance_of_getting_true=unhealthy_factor
            ),
            stroke=faker.boolean(chance_of_getting_true=unhealthy_factor),
            traumatic_brain_injury=faker.boolean(
                chance_of_getting_true=unhealthy_factor
            ),
            depression=faker.boolean(chance_of_getting_true=unhealthy_factor),
            early_stress=faker.boolean(chance_of_getting_true=unhealthy_factor),
            air_pollution=faker.boolean(chance_of_getting_true=unhealthy_factor),
            calcium_deficiency=faker.boolean(chance_of_getting_true=unhealthy_factor),
            geographic_location=faker.address(),
            metals=faker.boolean(chance_of_getting_true=unhealthy_factor),
            organic_solvents=faker.boolean(chance_of_getting_true=unhealthy_factor),
            vitamin_deficiency=faker.boolean(chance_of_getting_true=unhealthy_factor),
            bacteria_infection=faker.boolean(chance_of_getting_true=unhealthy_factor),
            dental_infection=faker.boolean(chance_of_getting_true=unhealthy_factor),
            fungi_infection=faker.boolean(chance_of_getting_true=unhealthy_factor),
            viruses=faker.boolean(chance_of_getting_true=unhealthy_factor),
        )


patient_list: List[Patient] = [
    Patient.generate_random_patient(30, 65) for i in range(0, 30000)
] + [
    Patient.generate_random_patient(65, 90) for i in range(0, 70000)
]  # create a list of 100000 patients
patient_df = pd.DataFrame.from_records(vars(o) for o in patient_list)


# generate age
# Define a function to calculate age
def calculate_age(dob):
    today = datetime.today()
    age = relativedelta(today, dob).years
    return age


# Apply the function to the 'dob' column
patient_df["age"] = patient_df["dob"].apply(calculate_age)
# check the data

# age vs. AD, came from https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2941917/#R17


def labeling_patients(df: pd.DataFrame) -> bool:
    def chance_of_truth_by_age(age: int) -> float:
        if 30 <= age <= 64:
            return 0.11
        elif 65 <= age <= 69:
            return 0.6
        elif 70 <= age <= 74:
            return 1.0
        elif 75 <= age <= 79:
            return 2.0
        elif 80 <= age <= 84:
            return 3.3
        elif age >= 85:
            base_chance = 8.4
            exponent_factor = 1.5  # Adjust this factor for desired exponential growth
            additional_chance = (age - 85) * exponent_factor
            return min(base_chance + additional_chance, 50.0)
        return 0

    light_inc_like = [
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
    ]

    moderate_inc_like = [
        "lack_of_cognitive_activity",
        "poor_cholesterol_homeostasis",
        "cardiovascular_disease",
        "congestive_heart_failure",
        "metals",
        "malnutrition",
        "immune_system_dysfunction",
    ]

    strong_inc_like = [
        "obesity",
        "poor_controlled_type2_diabetes",
        "stroke",
        "family_history_of_dementia",
        "traumatic_brain_injury",
    ]

    inverse_list = ["cancer"]

    if df["age"] <= 30:
        return False

    percentage_chance = chance_of_truth_by_age(df["age"])
    factors = 1

    if df["gender"] == "Female":
        factors *= 1.18
    if df["physical_activity"] == "higher":
        factors *= 0.98
    elif df["physical_activity"] == "lack":
        factors *= 1.02

    cols = df.index
    ignore_cols = [
        "name",
        "dob",
        "age",
        "social_class",
        "education",
        "gender",
        "race",
        "geographic_location",
        "physical_activity",
    ]
    cols = [c for c in cols if c not in ignore_cols]

    for col in cols:
        if col in light_inc_like and df[col]:
            factors *= 1.05
        elif col in moderate_inc_like and df[col]:
            factors *= 1.02
        elif col in strong_inc_like and df[col]:
            factors *= 1.04
        elif col in inverse_list and df[col]:
            factors *= 0.99

    return faker.boolean(chance_of_getting_true=percentage_chance * factors)

patient_df['dob'] = pd.to_datetime(patient_df['dob'])
today = datetime.today()

light_inc_like = [
    "poor_diet", "viruses", "smoking", "micro_infarcts", "depression",
    "early_stress", "air_pollution", "calcium_deficiency", "alcohol",
    "organic_solvents", "vitamin_deficiency", "dental_infection",
    "fungi_infection", "bacteria_infection"
]

moderate_inc_like = [
    "lack_of_cognitive_activity", "poor_cholesterol_homeostasis",
    "cardiovascular_disease", "congestive_heart_failure", "metals",
    "malnutrition", "immune_system_dysfunction"
]

strong_inc_like = [
    "obesity", "poor_controlled_type2_diabetes", "stroke",
    "family_history_of_dementia", "traumatic_brain_injury"
]

def generate_diagnosis_date(row):
    date_of_birth = row['dob']
    if row['event'] == 1:
        # Calculate the date range for diagnosis
        max_diagnosis_date = today

        health_score = 0
        for factor in light_inc_like:
            if row[factor]:
                health_score += 1
        for factor in moderate_inc_like:
            if row[factor]:
                health_score += 2
        for factor in strong_inc_like:
            if row[factor]:
                health_score += 3

        # Reduce max diagnosis date by a factor of the health score
        max_diagnosis_date -= timedelta(days=health_score * 365)

        diagnosis_date = faker.date_between_dates(date_start = max_diagnosis_date-timedelta(days=365*3.5), date_end=max_diagnosis_date)
        diagnosis_date = pd.to_datetime(diagnosis_date)
        return (diagnosis_date - date_of_birth).days
    else:
        return (today - date_of_birth).days

# Apply the function to generate 'time_to_event'
patient_df['time_to_event'] = patient_df.apply(generate_diagnosis_date, axis=1)

df_cox = patient_df.drop(columns=['name', 'dob', 'label','label_int','combined_label','geographic_location'])
df_cox.head()

# Kaplan-Meier Analysis
kmf = KaplanMeierFitter()

# Plotting Kaplan-Meier curves for Alzheimer's vs. no Alzheimer's
plt.figure(figsize=(12, 8))

# Alzheimer's group
kmf.fit(durations=df_cox['time_to_event'][df_cox['event'] == 1], event_observed=df_cox['event'][df_cox['event'] == 1], label='Alzheimer\'s')
ax = kmf.plot_survival_function()

# Non-Alzheimer's group
kmf.fit(durations=df_cox['time_to_event'][df_cox['event'] == 0], event_observed=df_cox['event'][df_cox['event'] == 0], label='Not Alzheimer\'s')
kmf.plot_survival_function(ax=ax)

pickle.dump(rf_model, open("model.pkl", "wb"))
