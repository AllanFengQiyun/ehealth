import React, { useState } from 'react';

export default function App() {
  const [formType, setFormType] = useState(null);
  const [patientId, setPatientId] = useState('');
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
  };

  const handleFormTypeSelect = (selectedType) => {
    setFormType(selectedType);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formType === 'specific') {
      try {
        const response = await fetch(`https://your-api-endpoint.com/patient/${patientId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const patientData = await response.json();
        console.log('Patient data:', patientData);
        // Handle the patient data as needed
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    } else {
      // Existing form submission logic for manual entry
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
        // Handle successful submission
      } catch (error) {
        console.error('Error:', error);
        // Handle errors
      }
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

  return (
    <div style={styles.container}>
      {formType === null ? (
        <div>
          <h2>Select Form Type</h2>
          <button style={styles.button} onClick={() => handleFormTypeSelect('manual')}>Manual Entry</button>
          <button style={styles.button} onClick={() => handleFormTypeSelect('specific')}>Select Specific Patient</button>
        </div>
      ) : formType === 'specific' ? (
        <div style={styles.form}>
          <h2>Select Specific Patient</h2>
          <label htmlFor="patientId">Patient ID:</label>
          <input style={styles.input} type="text" id="patientId" value={patientId} onChange={handlePatientIdChange} />
          <button style={styles.button} onClick={handleSubmit}>Fetch Patient Data</button>
        </div>
      ) : (
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2>Manual Entry Form</h2>
          <label htmlFor="name">Name:</label>
          <input style={styles.input} type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          
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
            {["Caucasian", "Black", "Hispanic", "South Asian", "East Asian", "Arabic"].map(option => (
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
    </div>
  );
}
