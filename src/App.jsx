import React, { useState } from 'react';


const hardcodedPatients = [
  {id: 311, Fname: 'Chelsea', Lname: 'Allen', age: 31, gender: 'Male', race: 'Arabic', phone: 358368362, email: 'ca@gmail.com', address: '76573 Walker Stream Suite 723', city: 'Lake Robert', province: 'YT', postalCode: 'L3N 5K9', dob: '1993-01-07', education: 'Highschool', social_class: 'Upper class', alcohol: 0, physical_activity: 'higher', lack_of_cognitive_activity: 0, family_history_of_dementia: 0, malnutrition: 0, poor_diet: 0, smoking: 0, cancer: 0, cardiovascular_disease: 0, congestive_heart_failure: 0, immune_system_dysfunction: 0, micro_infarcts: 0, obesity: 0, poor_cholesterol_homeostasis: 0, poor_controlled_type2_diabetes: 0, stroke: 0, traumatic_brain_injury: 0, depression: 1, early_stress: 1, air_pollution: 0, calcium_deficiency: 0, geographic_location: '', metals: 0, organic_solvents: 0, vitamin_deficiency: 0, bacteria_infection: 0, dental_infection: 0, fungi_infection: 0, viruses: 0},
  {id: 312, Fname: 'Jeff', Lname: 'Miller', age: 58, gender: 'Female', race: 'Black', phone: 183528742, email: 'jm@gmail.com', address: '4371 Wright Courts Suite 082', city: 'South Danielle', province: 'NT', postalCode: 'R2S 7X5', dob: '1966-01-06', education: 'University', social_class: 'Middle class', alcohol: 0, physical_activity: 'lack', lack_of_cognitive_activity: 1, family_history_of_dementia: 0, malnutrition: 0, poor_diet: 0, smoking: 1, cancer: 0, cardiovascular_disease: 0, congestive_heart_failure: 0, immune_system_dysfunction: 0, micro_infarcts: 0, obesity: 1, poor_cholesterol_homeostasis: 0, poor_controlled_type2_diabetes: 1, stroke: 0, traumatic_brain_injury: 0, depression: 0, early_stress: 0, air_pollution: 0, calcium_deficiency: 0, geographic_location: '', metals: 0, organic_solvents: 1, vitamin_deficiency: 0, bacteria_infection: 1, dental_infection: 0, fungi_infection: 0, viruses: 0},
  {id: 316, Fname: 'Philip', Lname: 'Castro', age: 89, gender: 'Male', race: 'Hispanic', phone: 424237472, email: 'pc@gmail.com', address: '118 Wanda Stravenue Apt. 410', city: 'Williamshire', province: 'AB', postalCode: 'S3T6Y2', dob: '1935-06-05', education: 'Post-grad', social_class: 'Poverty', alcohol: 0, physical_activity: 'lack', lack_of_cognitive_activity: 0, family_history_of_dementia: 1, malnutrition: 1, poor_diet: 1, smoking: 0, cancer: 0, cardiovascular_disease: 1, congestive_heart_failure: 0, immune_system_dysfunction: 0, micro_infarcts: 1, obesity: 1, poor_cholesterol_homeostasis: 0, poor_controlled_type2_diabetes: 1, stroke: 0, traumatic_brain_injury: 1, depression: 0, early_stress: 1, air_pollution: 0, calcium_deficiency: 0, geographic_location: '', metals: 1, organic_solvents: 1, vitamin_deficiency: 0, bacteria_infection: 0, dental_infection: 0, fungi_infection: 1, viruses: 0, notes: 1},
  {id: 317, Fname: 'Mary', Lname: 'Valenzuela', age: 90, gender: 'Female', race: 'South Asian', phone: 74626215, email: 'mv@gmail.com', address: '191 Benjamin Gateway', city: 'North Barbaraborough', province: 'NT', postalCode: 'E8J 8G8', dob: '1934-05-10', education: 'Highschool', social_class: 'Working class', alcohol: 1, physical_activity: 'lack', lack_of_cognitive_activity: 1, family_history_of_dementia: 1, malnutrition: 1, poor_diet: 1, smoking: 0, cancer: 1, cardiovascular_disease: 1, congestive_heart_failure: 1, immune_system_dysfunction: 1, micro_infarcts: 0, obesity: 1, poor_cholesterol_homeostasis: 1, poor_controlled_type2_diabetes: 1, stroke: 0, traumatic_brain_injury: 1, depression: 1, early_stress: 1, air_pollution: 1, calcium_deficiency: 1, geographic_location: '', metals: 1, organic_solvents: 0, vitamin_deficiency: 1, bacteria_infection: 1, dental_infection: 1, fungi_infection: 1, viruses: 1, notes: 1},
  {id: 318, Fname: 'Nicholas', Lname: 'Melendez', age: 89, gender: 'Female', race: 'Hispanic', phone: 536271853, email: 'nm@gmail.com', address: '8995 Walton Canyon', city: 'New Stefanieton', province: 'NS', postalCode: 'C6T8G6', dob: '1935-06-08', education: 'Highschool', social_class: 'Working class', alcohol: 0, physical_activity: 'lack', lack_of_cognitive_activity: 0, family_history_of_dementia: 1, malnutrition: 1, poor_diet: 1, smoking: 1, cancer: 0, cardiovascular_disease: 1, congestive_heart_failure: 0, immune_system_dysfunction: 0, micro_infarcts: 0, obesity: 1, poor_cholesterol_homeostasis: 1, poor_controlled_type2_diabetes: 1, stroke: 1, traumatic_brain_injury: 1, depression: 1, early_stress: 1, air_pollution: 1, calcium_deficiency: 0, geographic_location: '', metals: 1, organic_solvents: 1, vitamin_deficiency: 1, bacteria_infection: 1, dental_infection: 0, fungi_infection: 0, viruses: 1, notes: 1},
  {id: 313, Fname: 'Nicolas', Lname: 'Green', age: 67, gender: 'Female', race: 'Arabic', phone: 573917492, email: 'ng@gmail.com', address: '97046 Aaron Motorway', city: 'New Jameshaven', province: 'NB', postalCode: 'Y4G3M6', dob: '1957-04-11', education: 'University', social_class: 'Poverty', alcohol: 0, physical_activity: 'lack', lack_of_cognitive_activity: 1, family_history_of_dementia: 0, malnutrition: 0, poor_diet: 0, smoking: 1, cancer: 0, cardiovascular_disease: 0, congestive_heart_failure: 0, immune_system_dysfunction: 0, micro_infarcts: 0, obesity: 1, poor_cholesterol_homeostasis: 1, poor_controlled_type2_diabetes: 0, stroke: 0, traumatic_brain_injury: 0, depression: 0, early_stress: 0, air_pollution: 0, calcium_deficiency: 1, geographic_location: '', metals: 1, organic_solvents: 0, vitamin_deficiency: 1, bacteria_infection: 1, dental_infection: 0, fungi_infection: 1, viruses: 0, notes: 0},
  {id: 314, Fname: 'Kimberly', Lname: 'Robert', age: 67, gender: 'Male', race: 'Caucasian', phone: 732747892, email: 'kr@gmail.com', address: '1322 Blake Valley Apt. 167', city: 'Meyerbury', province: 'NL', postalCode: 'X7R7K9', dob: '1956-07-30', education: 'College', social_class: 'Upper class', alcohol: 0, physical_activity: 'higher', lack_of_cognitive_activity: 0, family_history_of_dementia: 0, malnutrition: 0, poor_diet: 0, smoking: 0, cancer: 0, cardiovascular_disease: 1, congestive_heart_failure: 1, immune_system_dysfunction: 0, micro_infarcts: 0, obesity: 0, poor_cholesterol_homeostasis: 0, poor_controlled_type2_diabetes: 1, stroke: 1, traumatic_brain_injury: 1, depression: 0, early_stress: 1, air_pollution: 0, calcium_deficiency: 1, geographic_location: '', metals: 1, organic_solvents: 0, vitamin_deficiency: 0, bacteria_infection: 1, dental_infection: 0, fungi_infection: 0, viruses: 0, notes: 0},
  {id: 319, Fname: 'Monica', Lname: 'Chan', age: 87, gender: 'Male', race: 'Arabic', phone: 427153512, email: 'mc@gmail.com', address: '4466 Tyler Vista Apt. 304', city: 'Rachelton', province: 'AB', postalCode: 'A7V 9R3', dob: '1936-10-02', education: 'Highschool', social_class: 'Working class', alcohol: 1, physical_activity: 'higher', lack_of_cognitive_activity: 0, family_history_of_dementia: 0, malnutrition: 1, poor_diet: 1, smoking: 1, cancer: 1, cardiovascular_disease: 1, congestive_heart_failure: 1, immune_system_dysfunction: 1, micro_infarcts: 0, obesity: 0, poor_cholesterol_homeostasis: 0, poor_controlled_type2_diabetes: 0, stroke: 1, traumatic_brain_injury: 1, depression: 1, early_stress: 0, air_pollution: 1, calcium_deficiency: 1, geographic_location: '', metals: 1, organic_solvents: 1, vitamin_deficiency: 0, bacteria_infection: 1, dental_infection: 0, fungi_infection: 1, viruses: 0, notes: 1},
  {id: 320, Fname: 'Ryan', Lname: 'Henderson', age: 87, gender: 'Male', race: 'Hispanic', phone: 424231358, email: 'rh@gmail.com', address: '7993 Mccoy Roads Suite 066', city: 'Port Brandonstad', province: 'MB', postalCode: 'R5H 9L2', dob: '1937-06-05', education: 'University', social_class: 'Middle class', alcohol: 1, physical_activity: 'lack', lack_of_cognitive_activity: 0, family_history_of_dementia: 0, malnutrition: 1, poor_diet: 1, smoking: 1, cancer: 0, cardiovascular_disease: 0, congestive_heart_failure: 1, immune_system_dysfunction: 1, micro_infarcts: 1, obesity: 1, poor_cholesterol_homeostasis: 1, poor_controlled_type2_diabetes: 1, stroke: 0, traumatic_brain_injury: 1, depression: 1, early_stress: 0, air_pollution: 1, calcium_deficiency: 0, geographic_location: '', metals: 0, organic_solvents: 1, vitamin_deficiency: 1, bacteria_infection: 0, dental_infection: 0, fungi_infection: 1, viruses: 0, notes: 1},
  {id: 315, Fname: 'Zachary', Lname: 'Wilson', age: 75, gender: 'Male', race: 'Hispanic', phone: 315258342, email: 'zw@gmail.com', address: '3563 Odonnell Rapid Apt. 946', city: 'South Thomas', province: 'NS', postalCode: 'G6R 2E1', dob: '1948-07-24', education: 'Post-grad', social_class: 'Middle class', alcohol: 0, physical_activity: 'lack', lack_of_cognitive_activity: 0, family_history_of_dementia: 0, malnutrition: 0, poor_diet: 1, smoking: 0, cancer: 0, cardiovascular_disease: 1, congestive_heart_failure: 0, immune_system_dysfunction: 1, micro_infarcts: 1, obesity: 0, poor_cholesterol_homeostasis: 0, poor_controlled_type2_diabetes: 1, stroke: 0, traumatic_brain_injury: 0, depression: 0, early_stress: 1, air_pollution: 0, calcium_deficiency: 1, geographic_location: '', metals: 0, vitamin_deficiency: 1, bacteria_infection: 1, dental_infection: 0, fungi_infection: 0, viruses: 0, notes: 0}
];

export default function App() {
  const [formType, setFormType] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    education: "Highschool",
    gender: "",
    race: "",
    social_class: "",
    alcohol: false,
    physical_activity: "",
    lack_of_cognitive_activity: false,
    family_history_of_dementia: false,
    malnutrition: false,
    poor_diet: false,
    smoking: false,
    cancer: false,
    cardiovascular_disease: false,
    congestive_heart_failure: false,
    immune_system_dysfunction: false,
    micro_infarcts: false,
    obesity: false,
    poor_cholesterol_homeostasis: false,
    poor_controlled_type2_diabetes: false,
    stroke: false,
    traumatic_brain_injury: false,
    depression: false,
    early_stress: false,
    air_pollution: false,
    calcium_deficiency: false,
    geographic_location: "",
    metals: false,
    organic_solvents: false,
    vitamin_deficiency: false,
    bacteria_infection: false,
    dental_infection: false,
    fungi_infection: false,
    viruses: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultData, setResultData] = useState(null);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#e6f2ff',
      padding: '20px',
      boxSizing: 'border-box',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '500px',
    },
    input: {
      margin: '10px 0',
      padding: '5px',
      width: '100%',
    },
    select: {
      margin: '10px 0',
      padding: '5px',
      width: '100%',
    },
    button: {
      margin: '10px 0',
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '5px 0',
    },
    checkbox: {
      marginRight: '10px',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      maxWidth: '500px',
      width: '90%',
    },
    modalHeader: {
      marginBottom: '15px',
    },
    modalTitle: {
      fontSize: '1.5em',
      marginBottom: '10px',
    },
    modalBody: {
      marginBottom: '15px',
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  };


  const handleFormTypeSelect = (selectedType) => {
    setFormType(selectedType);
    if (selectedType === 'specific') {
      setSelectedPatient('');
      setFormData({...formData, name: ''});
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePatientSelect = (e) => {
    const patientId = parseInt(e.target.value);
    setSelectedPatient(patientId);
    const patient = hardcodedPatients.find(p => p.id === patientId);
    if (patient) {
      setFormData({
        name: `${patient.Fname} ${patient.Lname}`,
        dob: patient.dob,
        education: patient.education,
        gender: patient.gender,
        race: patient.race,
        social_class: patient.social_class,
        alcohol: patient.alcohol === 1,
        physical_activity: patient.physical_activity,
        lack_of_cognitive_activity: patient.lack_of_cognitive_activity === 1,
        family_history_of_dementia: patient.family_history_of_dementia === 1,
        malnutrition: patient.malnutrition === 1,
        poor_diet: patient.poor_diet === 1,
        smoking: patient.smoking === 1,
        cancer: patient.cancer === 1,
        cardiovascular_disease: patient.cardiovascular_disease === 1,
        congestive_heart_failure: patient.congestive_heart_failure === 1,
        immune_system_dysfunction: patient.immune_system_dysfunction === 1,
        micro_infarcts: patient.micro_infarcts === 1,
        obesity: patient.obesity === 1,
        poor_cholesterol_homeostasis: patient.poor_cholesterol_homeostasis === 1,
        poor_controlled_type2_diabetes: patient.poor_controlled_type2_diabetes === 1,
        stroke: patient.stroke === 1,
        traumatic_brain_injury: patient.traumatic_brain_injury === 1,
        depression: patient.depression === 1,
        early_stress: patient.early_stress === 1,
        air_pollution: patient.air_pollution === 1,
        calcium_deficiency: patient.calcium_deficiency === 1,
        geographic_location: patient.geographic_location,
        metals: patient.metals === 1,
        organic_solvents: patient.organic_solvents === 1,
        vitamin_deficiency: patient.vitamin_deficiency === 1,
        bacteria_infection: patient.bacteria_infection === 1,
        dental_infection: patient.dental_infection === 1,
        fungi_infection: patient.fungi_infection === 1,
        viruses: patient.viruses === 1,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const booleanFields = [
      'alcohol', 'lack_of_cognitive_activity', 'family_history_of_dementia', 'malnutrition',
      'poor_diet', 'smoking', 'cancer', 'cardiovascular_disease', 'congestive_heart_failure',
      'immune_system_dysfunction', 'micro_infarcts', 'obesity', 'poor_cholesterol_homeostasis',
      'poor_controlled_type2_diabetes', 'stroke', 'traumatic_brain_injury', 'depression',
      'early_stress', 'air_pollution', 'calcium_deficiency', 'metals', 'organic_solvents',
      'vitamin_deficiency', 'bacteria_infection', 'dental_infection', 'fungi_infection', 'viruses'
    ];

    const formattedData = {
      ...formData,
      age: calculateAge(formData.dob),
      gender: formData.gender === 'Male' ? 1 : 0,
      education: ['Post-grad', 'College', 'University', 'Highschool'].indexOf(formData.education),
      race: ['Arabic', 'Black', 'Caucasian', 'Hispanic', 'South Asian', 'East Asian'].indexOf(formData.race),
      social_class: ['Upper class', 'Poverty', 'Working class', 'Middle class'].indexOf(formData.social_class),
      physical_activity: ['lower', 'lack', 'higher'].indexOf(formData.physical_activity),
    };

    booleanFields.forEach(field => {
      formattedData[field] = formData[field] ? 1 : 0;
    });


    try {
      const response = await fetch('https://ehealth-facb87f2634e.herokuapp.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      setResultData(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {formType === null ? (
        <div>
          <h2>Select Form Type</h2>
          <button style={styles.button} onClick={() => handleFormTypeSelect('manual')}>Manual Entry</button>
          <button style={styles.button} onClick={() => handleFormTypeSelect('specific')}>Select Specific Patient</button>
        </div>
      ) : (
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2>{formType === 'specific' ? 'Select Specific Patient' : 'Manual Entry Form'}</h2>
          
          {formType === 'specific' && (
            <select 
              style={styles.select} 
              value={selectedPatient} 
              onChange={handlePatientSelect}
            >
              <option value="">Select a patient</option>
              {hardcodedPatients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {`${patient.Fname} ${patient.Lname}`}
                </option>
              ))}
            </select>
          )}

          <label htmlFor="name">Name:</label>
          <input style={styles.input} type="text" id="name" name="name" value={formData.name} onChange={handleChange} readOnly={formType === 'specific'} />
          
          <label htmlFor="dob">Date of Birth:</label>
          <input style={styles.input} type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
          
          <label htmlFor="education">Education Level:</label>
          <select style={styles.select} id="education" name="education" value={formData.education} onChange={handleChange}>
            {["Highschool", "College", "University", "Post-grad"].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          <label htmlFor="gender">Gender:</label>
          <select style={styles.select} id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            {["Male", "Female"].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          <label htmlFor="race">Race:</label>
          <select style={styles.select} id="race" name="race" value={formData.race} onChange={handleChange}>
            <option value="">Select Race</option>
            {["Arabic", "Black", "Caucasian", "Hispanic", "South Asian", "East Asian"].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          <label htmlFor="social_class">Social Class:</label>
          <select style={styles.select} id="social_class" name="social_class" value={formData.social_class} onChange={handleChange}>
            <option value="">Select Social Class</option>
            {["Poverty", "Working class", "Middle class", "Upper class"].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          <label htmlFor="physical_activity">Physical Activity:</label>
          <select style={styles.select} id="physical_activity" name="physical_activity" value={formData.physical_activity} onChange={handleChange}>
            <option value="">Select Physical Activity Level</option>
            {["lack", "lower", "higher"].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          <label htmlFor="geographic_location">Geographic Location:</label>
          <input style={styles.input} type="text" id="geographic_location" name="geographic_location" value={formData.geographic_location} onChange={handleChange} />

          {/* Checkbox inputs */}
          {[
            'alcohol', 'lack_of_cognitive_activity', 'family_history_of_dementia', 'malnutrition',
            'poor_diet', 'smoking', 'cancer', 'cardiovascular_disease', 'congestive_heart_failure',
            'immune_system_dysfunction', 'micro_infarcts', 'obesity', 'poor_cholesterol_homeostasis',
            'poor_controlled_type2_diabetes', 'stroke', 'traumatic_brain_injury', 'depression',
            'early_stress', 'air_pollution', 'calcium_deficiency', 'metals', 'organic_solvents',
            'vitamin_deficiency', 'bacteria_infection', 'dental_infection', 'fungi_infection', 'viruses'
          ].map((field) => (
            <div key={field} style={styles.checkboxContainer}>
              <input
                style={styles.checkbox}
                type="checkbox"
                id={field}
                name={field}
                checked={formData[field]}
                onChange={handleChange}
              />
              <label htmlFor={field}>
                {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
            </div>
          ))}

          <button style={styles.button} type="submit">Submit</button>
        </form>
      )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Alzheimer's Disease Risk Assessment</h2>
          <p>Based on the provided information, here are the results:</p>
        </div>
        <div style={styles.modalBody}>
          {resultData && (
            <>
              <p>Chance of Alzheimer's Disease: {((1 - resultData.chance_of_alzheimer) * 100).toFixed(2)}%</p>
              <p>Age: {Math.floor(resultData.age_in_days / 365)} years</p>
            </>
          )}
        </div>
        <div style={styles.modalFooter}>
          <button style={styles.button} onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
}