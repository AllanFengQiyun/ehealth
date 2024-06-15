from pathlib import Path
from shiny import App , reactive
from shiny.express import input,ui
from shiny_validate import InputValidator, check
from datetime import datetime as dt
from faker import Faker
from dateutil.relativedelta import relativedelta

fake = Faker()

# Inputs definition
INPUTS = {
    "name": ui.input_text("name", "Enter your name"),
    "dob": ui.input_date("dob", "Date of Birth"),
    "education": ui.input_select("education", "Education Level", choices=["Highschool", "College", "University", "Others"]),
    "gender": ui.input_radio_buttons("gender", "Gender", choices=["Male", "Female"]),
    "race": ui.input_select("race", "Race", choices=["Caucasian", "Black", "Hispanic", "South Asian", "East Asian", "Arabic"]),
    "social_class": ui.input_select("social_class", "Social Class", choices=["Poverty", "Working class", "Middle class", "Upper class"], selected="Working class", multiple=False),
    "alcohol": ui.input_select("alcohol", "Do you consume alcohol?", choices=["Yes", "No"]),
    "physical_activity": ui.input_select("physical_activity", "Physical Activity", choices=["lack", "lower", "regular"]),
    "lack_of_cognitive_activity": ui.input_select("lack_of_cognitive_activity", "Lack of Cognitive Activity", choices=["Yes", "No"]),
    "family_history_of_dementia": ui.input_select("family_history_of_dementia", "Family History of Dementia", choices=["Yes", "No"]),
    "malnutrition": ui.input_select("malnutrition", "Malnutrition", choices=["Yes", "No"]),
    "poor_diet": ui.input_select("poor_diet", "Poor Diet", choices=["Yes", "No"]),
    "smoking": ui.input_select("smoking", "Smoking", choices=["Yes", "No"]),
    "cancer": ui.input_select("cancer", "Cancer", choices=["Yes", "No"]),
    "cardiovascular_disease": ui.input_select("cardiovascular_disease", "Cardiovascular Disease", choices=["Yes", "No"]),
    "congestive_heart_failure": ui.input_select("congestive_heart_failure", "Congestive Heart Failure", choices=["Yes", "No"]),
    "immune_system_dysfunction": ui.input_select("immune_system_dysfunction", "Immune System Dysfunction", choices=["Yes", "No"]),
    "micro_infarcts": ui.input_select("micro_infarcts", "Micro Infarcts", choices=["Yes", "No"]),
    "obesity": ui.input_select("obesity", "Obesity", choices=["Yes", "No"]),
    "poor_cholesterol_homeostasis": ui.input_select("poor_cholesterol_homeostasis", "Poor Cholesterol Homeostasis", choices=["Yes", "No"]),
    "poor_controlled_type2_diabetes": ui.input_select("poor_controlled_type2_diabetes", "Poor Controlled Type 2 Diabetes", choices=["Yes", "No"]),
    "stroke": ui.input_select("stroke", "Stroke", choices=["Yes", "No"]),
    "traumatic_brain_injury": ui.input_select("traumatic_brain_injury", "Traumatic Brain Injury", choices=["Yes", "No"]),
    "depression": ui.input_select("depression", "Depression", choices=["Yes", "No"]),
    "early_stress": ui.input_select("early_stress", "Early Stress", choices=["Yes", "No"]),
    "air_pollution": ui.input_select("air_pollution", "Air Pollution", choices=["Yes", "No"]),
    "calcium_deficiency": ui.input_select("calcium_deficiency", "Calcium Deficiency", choices=["Yes", "No"]),
    "geographic_location": ui.input_text("geographic_location", "Geographic Location"),
    "metals": ui.input_select("metals", "Metals Exposure", choices=["Yes", "No"]),
    "organic_solvents": ui.input_select("organic_solvents", "Organic Solvents Exposure", choices=["Yes", "No"]),
    "vitamin_deficiency": ui.input_select("vitamin_deficiency", "Vitamin Deficiency", choices=["Yes", "No"]),
    "bacteria_infection": ui.input_select("bacteria_infection", "Bacteria Infection", choices=["Yes", "No"]),
    "dental_infection": ui.input_select("dental_infection", "Dental Infection", choices=["Yes", "No"]),
    "fungi_infection": ui.input_select("fungi_infection", "Fungi Infection", choices=["Yes", "No"]),
    "viruses": ui.input_select("viruses", "Viruses", choices=["Yes", "No"]),
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

with ui.card():
    ui.card_header("Health and Lifestyle"),
    INPUTS["alcohol"],
    INPUTS["physical_activity"],
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
    INPUTS["geographic_location"],
    INPUTS["metals"],
    INPUTS["organic_solvents"],
    INPUTS["vitamin_deficiency"],
    INPUTS["bacteria_infection"],
    INPUTS["dental_infection"],
    INPUTS["fungi_infection"],
    INPUTS["viruses"],