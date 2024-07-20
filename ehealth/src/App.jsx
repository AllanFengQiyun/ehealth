import { useState } from 'react';

export default function ControlledComponent() {
  // Corrected the typo in setFormDate to setFormData
  const [formData, setFormData] = useState({ 
    name: "", 
    dob: "",
    education: "high-school",});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Using setFormData instead of setFormDate
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    await fetch('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <br></br>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        <br></br>
        <label htmlFor="dob">Date of Birth:</label>
        <br></br>
        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
        <br></br>
        <label htmlFor="education">Education Level:</label>
        <br></br>
        <select id="education" name="education" value={formData.education} onChange={handleChange}>
          <option value="high-school">High School</option>
          <option value="bachelors">Bachelor's</option>
          <option value="masters">Master's</option>
          <option value="other">Other</option>
        </select>
        <br></br>
        <label htmlFor="gender">Biological gender:</label>
        <br></br>
        <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br></br>
        <label htmlFor="socialClass">Social class:</label>
        <br></br>
        <select id="socialClass" name="socialClass" value={formData.socialClass} onChange={handleChange}>
          <option value="Poverty">Poverty</option>
          <option value="Working class">Working class</option>
          <option value="Middle class">Middle class</option>
          <option value="Upper class">Upper class</option>
        </select>
        <br></br>
        <label htmlFor="geographicLocation">Geographic location:</label>
        <br></br>
        <input type="text" id="geographicLocation" name="geographicLocation" value={formData.geographicLocation} onChange={handleChange} />
        <br></br>
        <label htmlFor="physicalActivity">Physical activity:</label>
        <br></br>
        <select id="physicalActivity" name="physicalActivity" value={formData.physicalActivity} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
        <br></br>
        <label htmlFor="Alcohol">Do you consume alcohol?</label>
        <br></br>
        <input type="checkbox" id="Alcohol" name="Alcohol" value={formData.Alcohol} onChange={handleChange} />
        <br></br>
        <button type="submit">Submit</button>
      </form>
</>
)};