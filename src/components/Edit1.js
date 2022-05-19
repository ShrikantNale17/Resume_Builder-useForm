import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Edit1() {

    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState('');

    const { register, watch, handleSubmit, getValues, setValue, formState: { errors }, } = useForm(
        {
            defaultValues: location.state.data
        });

    const addExperience = () => {
        setValue('prof_info.experience', [...getValues().prof_info.experience,
        {
            id: uuidv4(),
            comp_name: '',
            duration: null,
            responsibilities: ''
        }
        ])
    }

    const removeExperience = (index) => {
        setValue('prof_info.experience', watch('prof_info.experience').filter((exp, ind) => ind !== index))
    }

    const onSubmit = (data) => {
        console.log(data);
        if (data.prof_info.skills.length < 3) {
            setError('Please select at least 3 skills')
            return
        } else if (data.prof_info.experience.length < 2 || data.prof_info.experience.length > 5) {
            setError('please add appropriate experience')
            return
        }
        const localData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []
        const update = localData.map((cdata, ind) => ind === location.state.index ? data : cdata);
        localStorage.setItem('data', JSON.stringify(update));
        navigate('/')
    }

    console.log(errors);
    return (
        <div className="container my-4">
            <main>
                <div className="py-5 text-center">
                    <h2>Add Candidate</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-5">
                        <div className="col-md-7 col-lg-8 ms-auto me-auto">
                            <h4 className="mb-3">Basic Info</h4>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label className="form-label">First name</label>
                                    <input type="text" className="form-control" {...register('firstname', { required: true })} />
                                    {errors.firstname && <p style={{ color: 'red' }}>This field is required.</p>}
                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label">Last name</label>
                                    <input type="text" className="form-control" {...register('lastname', { required: true })} />
                                    {errors.lastname && <p style={{ color: 'red' }}>This field is required.</p>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Gender</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" value="male" {...register('gender', { required: true })} />
                                            <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" value="female" {...register('gender', { required: true })} />
                                            <label className="form-check-label">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" value="other" {...register('gender', { required: true })} />
                                            <label className="form-check-label">Other</label>
                                        </div>
                                    </div>
                                    {errors.gender && <p style={{ color: 'red' }}>This field is required.</p>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder="you@example.com" {...register('email', { required: true })} />
                                    {errors.email && <p style={{ color: 'red' }}>This field is required.</p>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Address</label>
                                    <textarea className="form-control" placeholder="1234 Main St" {...register('address', { required: true })}></textarea>
                                    {errors.address && <p style={{ color: 'red' }}>This field is required.</p>}
                                </div>

                                <div className="col-md-5">
                                    <label className="form-label">Country</label>
                                    <select className="form-select" {...register('country', { required: true })}>
                                        <option value="">Choose...</option>
                                        <option>India</option>
                                        <option>United States</option>
                                    </select>
                                    {errors.country && <p style={{ color: 'red' }}>This field is required.</p>}
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">State</label>
                                    <select className="form-select" {...register('state', { required: true })}>
                                        <option value="">Choose...</option>
                                        <option>Maharashtra</option>
                                        <option>Karnataka</option>
                                    </select>
                                    {errors.state && <p style={{ color: 'red' }}>This field is required.</p>}
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Pin / Zip</label>
                                    <input type="text" className="form-control" {...register('pin', { required: true })} />
                                    {errors.pin && <p style={{ color: 'red' }}>This field is required.</p>}
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h4 className="mb-3">Professional Info</h4>

                            <div className="row g-3">
                                <div className="col-12 mb-3">
                                    <label className="form-label">
                                        Choose your skills
                                        <span className="small text-muted">(min 3 skills)</span>
                                    </label>
                                    <div className="mb-0">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value='Angular' {...register('prof_info.skills', { required: true })} />
                                            <label className="form-check-label">Angular</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value='React' {...register('prof_info.skills', { required: true })} />
                                            <label className="form-check-label">React</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value='Node.JS' {...register('prof_info.skills', { required: true })} />
                                            <label className="form-check-label">Node.JS</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value='JavaScript' {...register('prof_info.skills', { required: true })} />
                                            <label className="form-check-label">JavaScript</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value='Flutter' {...register('prof_info.skills', { required: true })} />
                                            <label className="form-check-label">Flutter</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value='Java' {...register('prof_info.skills', { required: true })} />
                                            <label className="form-check-label">Java</label>
                                        </div>
                                    </div>
                                    {errors.prof_info?.skills && <p style={{ color: 'red' }}>This field is required.</p>}
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
                                        watch('prof_info.experience').map((exp, index) =>
                                            <div key={exp.id} className="card mx-3 mt-3">
                                                <div className="card-body">
                                                    <h6 className="card-title text-muted mb-3">
                                                        Experience #{index + 1}
                                                        <span style={{ cursor: 'pointer' }} className="float-end text-danger fw-normal" onClick={() => removeExperience(index)}>Remove</span>
                                                    </h6>
                                                    <div className="row g-3">
                                                        <div className="col-6">
                                                            <label className="form-label">Company Name</label>
                                                            <input type="text" className="form-control" {...register(`prof_info.experience[${index}].comp_name`, { required: true })} />
                                                            {errors.prof_info?.experience?.[index]?.comp_name && <p style={{ color: 'red' }}>This field is required.</p>}
                                                        </div>
                                                        <div className="col-6">
                                                            <label className="form-label">Duration <span className="text-muted">(in months)</span></label>
                                                            <input type="number" className="form-control" {...register(`prof_info.experience[${index}].duration`, { valueAsNumber: true, required: true })} />
                                                            {errors.prof_info?.experience?.[index]?.duration && <p style={{ color: 'red' }}>This field is required.</p>}
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label">Describe your responsibilities</label>
                                                            <textarea className="form-control" {...register(`prof_info.experience[${index}].responsibilities`, { required: true })}></textarea>
                                                            {errors.prof_info?.experience?.[index]?.responsibilities && <p style={{ color: 'red' }}>This field is required.</p>}
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

export default Edit1