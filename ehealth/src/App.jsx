import { useState } from 'react';

export default function App() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert boolean values to integers
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

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      <br />
      <label htmlFor="dob">Date of Birth:</label>
      <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
      <br />
      <label htmlFor="education">Education Level:</label>
      <select id="education" name="education" value={formData.education} onChange={handleChange}>
        {["Highschool", "College", "University", "Post-grad"].map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <br />
      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        {["Male", "Female"].map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <br />
      <label htmlFor="race">Race:</label>
      <select id="race" name="race" value={formData.race} onChange={handleChange}>
        <option value="">Select Race</option>
        {["Caucasian", "Black", "Hispanic", "South Asian", "East Asian", "Arabic"].map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <br />
      <label htmlFor="social_class">Social Class:</label>
      <select id="social_class" name="social_class" value={formData.social_class} onChange={handleChange}>
        <option value="">Select Social Class</option>
        {["Poverty", "Working class", "Middle class", "Upper class"].map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <br />
      <label htmlFor="physical_activity">Physical Activity:</label>
      <select id="physical_activity" name="physical_activity" value={formData.physical_activity} onChange={handleChange}>
        <option value="">Select Physical Activity Level</option>
        {["lack", "lower", "higher"].map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <br />
      <label htmlFor="geographic_location">Geographic Location:</label>
      <input type="text" id="geographic_location" name="geographic_location" value={formData.geographic_location} onChange={handleChange} />

      {/* Checkbox inputs */}
      {[
        'alcohol', 'lack_of_cognitive_activity', 'family_history_of_dementia', 'malnutrition',
        'poor_diet', 'smoking', 'cancer', 'cardiovascular_disease', 'congestive_heart_failure',
        'immune_system_dysfunction', 'micro_infarcts', 'obesity', 'poor_cholesterol_homeostasis',
        'poor_controlled_type2_diabetes', 'stroke', 'traumatic_brain_injury', 'depression',
        'early_stress', 'air_pollution', 'calcium_deficiency', 'metals', 'organic_solvents',
        'vitamin_deficiency', 'bacteria_infection', 'dental_infection', 'fungi_infection', 'viruses'
      ].map((field) => (
        <div key={field}>
          <label htmlFor={field}>
            {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
          </label>
          <input
            type="checkbox"
            id={field}
            name={field}
            checked={formData[field]}
            onChange={handleChange}
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}