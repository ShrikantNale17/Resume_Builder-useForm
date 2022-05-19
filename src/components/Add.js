import React, { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

function Add() {

  const navigate = useNavigate()
  // const location = useLocation();
  // const [expCount, setExpCount] = useState(2);
  const [error, setError] = useState('');
  const [formdata, setFormdata] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    address: '',
    country: '',
    state: '',
    pin: '',
    prof_info: {
      skills: [],
      experience: [
        {
          id: uuidv4(),
          comp_name: '',
          duration: null,
          responsibilities: ''
        },
        {
          id: uuidv4(),
          comp_name: '',
          duration: null,
          responsibilities: ''
        }
      ]
    }
  })



  const handleSkills = (value) => {
    setFormdata({ ...formdata, prof_info: { ...formdata.prof_info, skills: formdata.prof_info.skills.includes(value) ? formdata.prof_info.skills.filter(val => val !== value) : [...formdata.prof_info.skills, value] } })
  }

  const addExperience = () => {
    setFormdata({
      ...formdata, prof_info: {
        ...formdata.prof_info, experience: [...formdata.prof_info.experience,
        {
          id: uuidv4(),
          comp_name: '',
          duration: null,
          responsibilities: ''
        }]
      }
    })
  }

  const removeExperience = (index) => {
    setFormdata({ ...formdata, prof_info: { ...formdata.prof_info, experience: formdata.prof_info.experience.filter((exp, ind) => ind !== index) } })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formdata.prof_info.skills.length < 3) {
      setError('Please select at least 3 skills')
      return
    } else if (formdata.prof_info.experience.length < 2 || formdata.prof_info.experience.length > 5) {
      setError('please add appropriate experience')
      return
    }
    const localData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []
    localData.push(formdata);
    localStorage.setItem('data', JSON.stringify(localData));
    navigate('/')
  }

  return (
    <div className="container my-4">
      <main>
        <div className="py-5 text-center">
          <h2>Add Candidate</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row g-5">
            <div className="col-md-7 col-lg-8 ms-auto me-auto">
              <h4 className="mb-3">Basic Info</h4>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label">First name</label>
                  <input type="text" className="form-control" value={formdata.firstname} onChange={(e) => setFormdata({ ...formdata, firstname: e.target.value })} required />
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Last name</label>
                  <input type="text" className="form-control" value={formdata.lastname} onChange={(e) => setFormdata({ ...formdata, lastname: e.target.value })} required />
                </div>

                <div className="col-12">
                  <label className="form-label">Gender</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name='gender' value="male" checked={formdata.gender === 'male'} onChange={(e) => setFormdata({ ...formdata, gender: e.target.value })} required />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name='gender' value="female" checked={formdata.gender === 'female'} onChange={(e) => setFormdata({ ...formdata, gender: e.target.value })} />
                      <label className="form-check-label">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name='gender' value="other" checked={formdata.gender === 'other'} onChange={(e) => setFormdata({ ...formdata, gender: e.target.value })} />
                      <label className="form-check-label">Other</label>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="you@example.com" value={formdata.email} onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} required />
                </div>

                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" placeholder="1234 Main St" value={formdata.address} onChange={(e) => setFormdata({ ...formdata, address: e.target.value })} required></textarea>
                </div>

                <div className="col-md-5">
                  <label className="form-label">Country</label>
                  <select className="form-select" defaultValue={formdata.country} onChange={(e) => setFormdata({ ...formdata, country: e.target.value })} required>
                    <option value="">Choose...</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <select className="form-select" defaultValue={formdata.state} onChange={(e) => setFormdata({ ...formdata, state: e.target.value })} required>
                    <option value="">Choose...</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Pin / Zip</label>
                  <input type="text" className="form-control" value={formdata.pin} onChange={(e) => setFormdata({ ...formdata, pin: e.target.value })} required />
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Professional Info</h4>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">
                    Choose your skills
                    <span className="small text-muted">(min 3 skills)</span>
                  </label>
                  <div className="mb-3">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value='Angular' checked={formdata.prof_info.skills.includes('Angular')} onChange={e => handleSkills(e.target.value)} />
                      <label className="form-check-label">Angular</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value='React' checked={formdata.prof_info.skills.includes('React')} onChange={e => handleSkills(e.target.value)} />
                      <label className="form-check-label">React</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value='Node.JS' checked={formdata.prof_info.skills.includes('Node.JS')} onChange={e => handleSkills(e.target.value)} />
                      <label className="form-check-label">Node.JS</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value='JavaScript' checked={formdata.prof_info.skills.includes('JavaScript')} onChange={e => handleSkills(e.target.value)} />
                      <label className="form-check-label">JavaScript</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value='Flutter' checked={formdata.prof_info.skills.includes('Flutter')} onChange={e => handleSkills(e.target.value)} />
                      <label className="form-check-label">Flutter</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value='Java' checked={formdata.prof_info.skills.includes('Java')} onChange={e => handleSkills(e.target.value)} />
                      <label className="form-check-label">Java</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row gy-3">
                <div className="col-12">
                  <label className="form-label">
                    <strong>
                      Experience
                      <span className="small text-muted">(min 2, max 5 items)</span>
                    </strong>
                  </label>
                  {
                    formdata.prof_info.experience.map((exp, index) =>
                      <div key={exp.id} className="card mx-3 mt-3">
                        <div className="card-body">
                          <h6 className="card-title text-muted mb-3">
                            Experience #{index + 1}
                            <span style={{ cursor: 'pointer' }} className="float-end text-danger fw-normal" onClick={() => removeExperience(index)}>Remove</span>
                          </h6>
                          <div className="row g-3">
                            <div className="col-6">
                              <label className="form-label">Company Name</label>
                              <input type="text" className="form-control" value={exp.comp_name} onChange={(e) => setFormdata({ ...formdata, prof_info: { ...formdata.prof_info, experience: formdata.prof_info.experience.map((expe, ind) => index === ind ? { ...expe, comp_name: e.target.value } : expe) } })} required />
                            </div>
                            <div className="col-6">
                              <label className="form-label">Duration <span className="text-muted">(in months)</span></label>
                              <input type="number" className="form-control" value={exp.duration} onChange={(e) => setFormdata({ ...formdata, prof_info: { ...formdata.prof_info, experience: formdata.prof_info.experience.map((expe, ind) => index === ind ? { ...expe, duration: Number(e.target.value) } : expe) } })} required />
                            </div>
                            <div className="col-12">
                              <label className="form-label">Describe your responsibilities</label>
                              <textarea className="form-control" value={exp.responsibilities} onChange={(e) => setFormdata({ ...formdata, prof_info: { ...formdata.prof_info, experience: formdata.prof_info.experience.map((expe, ind) => index === ind ? { ...expe, responsibilities: e.target.value } : expe) } })} required></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  <span style={{ color: 'blue', cursor: 'pointer' }} className="d-block mt-3" onClick={addExperience}>Add more experience</span>
                </div>
              </div>
              <span style={{ color: 'red' }}>{error}</span>
              <hr className="my-4" />

              <button className="btn btn-primary" type="submit">Save Candidate</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Add