from pathlib import Path
from shiny import reactive
from shiny.express import input,ui
from shiny_validate import InputValidator, check
from datetime import datetime as dt
import pandas as pd

import pickle

filename = "model.pkl"
file = open(filename, "rb")
model = pickle.load(file)

# Inputs definition
INPUTS = {
    "name": ui.input_text("name", "Enter your name"),
    "dob": ui.input_date("dob", "Date of Birth"),
    "education": ui.input_select("education", "Education Level", choices=["Highschool", "College", "University", "Others"]),
    "gender": ui.input_radio_buttons("gender", "Gender", choices=["Male", "Female"]),
    "race": ui.input_select("race", "Race", choices=["Caucasian", "Black", "Hispanic", "South Asian", "East Asian", "Arabic"]),
    "social_class": ui.input_select("social_class", "Social Class", choices=["Poverty", "Working class", "Middle class", "Upper class"], selected="Working class", multiple=False),
    "alcohol": ui.input_checkbox("alcohol", "Do you consume alcohol?", False),
    "physical_activity": ui.input_select("physical_activity", "Physical Activity", choices=["lack", "lower", "regular"]),
    "lack_of_cognitive_activity": ui.input_checkbox("lack_of_cognitive_activity", "Lack of Cognitive Activity", False),
    "family_history_of_dementia": ui.input_checkbox("family_history_of_dementia", "Family History of Dementia", False),
    "malnutrition": ui.input_checkbox("malnutrition", "Malnutrition", False),
    "poor_diet": ui.input_checkbox("poor_diet", "Poor Diet", False),
    "smoking": ui.input_checkbox("smoking", "Smoking", False),
    "cancer": ui.input_checkbox("cancer", "Cancer", False),
    "cardiovascular_disease": ui.input_checkbox("cardiovascular_disease", "Cardiovascular Disease", False),
    "congestive_heart_failure": ui.input_checkbox("congestive_heart_failure", "Congestive Heart Failure", False),
    "immune_system_dysfunction": ui.input_checkbox("immune_system_dysfunction", "Immune System Dysfunction", False),
    "micro_infarcts": ui.input_checkbox("micro_infarcts", "Micro Infarcts", False),
    "obesity": ui.input_checkbox("obesity", "Obesity", False),
    "poor_cholesterol_homeostasis": ui.input_checkbox("poor_cholesterol_homeostasis", "Poor Cholesterol Homeostasis", False),
    "poor_controlled_type2_diabetes": ui.input_checkbox("poor_controlled_type2_diabetes", "Poor Controlled Type 2 Diabetes", False),
    "stroke": ui.input_checkbox("stroke", "Stroke", False),
    "traumatic_brain_injury": ui.input_checkbox("traumatic_brain_injury", "Traumatic Brain Injury", False),
    "depression": ui.input_checkbox("depression", "Depression", False),
    "early_stress": ui.input_checkbox("early_stress", "Early Stress", False),
    "air_pollution": ui.input_checkbox("air_pollution", "Air Pollution", False),
    "calcium_deficiency": ui.input_checkbox("calcium_deficiency", "Calcium Deficiency", False),
    "geographic_location": ui.input_text("geographic_location", "Geographic Location"),
    "metals": ui.input_checkbox("metals", "Metals Exposure", False),
    "organic_solvents": ui.input_checkbox("organic_solvents", "Organic Solvents Exposure", False),
    "vitamin_deficiency": ui.input_checkbox("vitamin_deficiency", "Vitamin Deficiency", False),
    "bacteria_infection": ui.input_checkbox("bacteria_infection", "Bacteria Infection", False),
    "dental_infection": ui.input_checkbox("dental_infection", "Dental Infection", False),
    "fungi_infection": ui.input_checkbox("fungi_infection", "Fungi Infection", False),
    "viruses": ui.input_checkbox("viruses", "Viruses", False),
}

app_dir = Path(__file__).parent
ui.include_css(app_dir / "style.css")
ui.page_opts(title="Health Survey")

# Define the UI layout
with ui.card():
    ui.card_header("Personal Info"),
    INPUTS["name"],
    INPUTS["dob"],
    INPUTS["education"],
    INPUTS["gender"],
    INPUTS["race"],
    INPUTS["social_class"],
    INPUTS["geographic_location"],

with ui.card():
    ui.card_header("Health and Lifestyle"),
    INPUTS["physical_activity"],
    INPUTS["alcohol"],
    INPUTS["lack_of_cognitive_activity"],
    INPUTS["family_history_of_dementia"],
    INPUTS["malnutrition"],
    INPUTS["poor_diet"],
    INPUTS["smoking"],
    INPUTS["cancer"],
    INPUTS["cardiovascular_disease"],
    INPUTS["congestive_heart_failure"],
    INPUTS["immune_system_dysfunction"],
    INPUTS["micro_infarcts"],
    INPUTS["obesity"],
    INPUTS["poor_cholesterol_homeostasis"],
    INPUTS["poor_controlled_type2_diabetes"],
    INPUTS["stroke"],
    INPUTS["traumatic_brain_injury"],
    INPUTS["depression"],
    INPUTS["early_stress"],
    INPUTS["air_pollution"],
    INPUTS["calcium_deficiency"],
    INPUTS["metals"],
    INPUTS["organic_solvents"],
    INPUTS["vitamin_deficiency"],
    INPUTS["bacteria_infection"],
    INPUTS["dental_infection"],
    INPUTS["fungi_infection"],
    INPUTS["viruses"],

ui.div(
    ui.input_action_button("submit", "Submit", class_="btn btn-primary"),
    class_="d-flex justify-content-end",
)

input_validator = None

@reactive.effect
def _():
    global input_validator
    input_validator = InputValidator()
    input_validator.add_rule("name", check.required())
    input_validator.add_rule("dob", check.required())
    input_validator.add_rule("education", check.required())

@reactive.effect
@reactive.event(input.submit)
def run_model():
    input_validator.enable()
    print("Running model")
    if not input_validator.is_valid():
        print("Invalid inputs")
        return
    
    data = pd.DataFrame([{k: input[k]() for k in INPUTS.keys()}])
    categorical_columns = ["education", "gender", "race", "social_class", "physical_activity"]
    for col in categorical_columns:
        data[col] = pd.factorize(data[col])[0]

    data["age"] = int((dt.now() - pd.to_datetime(data["dob"])).dt.days//365.25)
    print(data)
    data = data[['age', 'air_pollution', 'alcohol', 'bacteria_infection',
       'calcium_deficiency', 'cancer', 'cardiovascular_disease',
       'congestive_heart_failure', 'dental_infection', 'depression',
       'early_stress', 'education', 'family_history_of_dementia',
       'fungi_infection', 'gender', 'immune_system_dysfunction',
       'lack_of_cognitive_activity', 'malnutrition', 'metals',
       'micro_infarcts', 'obesity', 'organic_solvents', 'physical_activity',
       'poor_cholesterol_homeostasis', 'poor_controlled_type2_diabetes',
       'poor_diet', 'race', 'smoking', 'social_class', 'stroke',
       'traumatic_brain_injury', 'viruses', 'vitamin_deficiency']]
    prediction = model.predict(data)
    if prediction[0] == 0:
        ui.modal_show(ui.modal("You are not at risk of developing alzheimer's disease"))
    else:
        ui.modal_show(ui.modal("You are at risk of developing alzheimer's disease"))
