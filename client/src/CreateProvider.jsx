import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateProvider (){
  const [name, setName] = useState()
  const [country, setCountry] = useState()
  const [marketshare, setMarketshare] = useState()
  const [renewbleenergypercentage, setRenewbleenergypercentage] = useState()
  const [yearlyrevenue, setYearlyrevenue] = useState()
  const navigate = useNavigate()

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createProvider", {name, country, marketshare, renewbleenergypercentage, yearlyrevenue})
    .then(result => {
      console.log(result)
      navigate('/')
    })
    .catch(err => console.log(err))
  }

  return (
       <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
         <div className="w-50 bg-white rounded p-3">
           <form onSubmit={Submit}>
             <h2>Add new Provider</h2>
             <div className="mb-2">
               <label htmlFor="name">Name of the Provider</label>
               <input type="text" placeholder="Enter Name" className="form-control" id="name" 
                required minLength={3} maxLength={30} onChange={(e) => setName(e.target.value)}/>
             </div>
             <div className="mb-2">
               <label htmlFor="country">Country where the Provider is located</label>
               <input type="text" placeholder="Enter Country" className="form-control" id="country" 
                required minLength={4} maxLength={30} onChange={(e) => setCountry(e.target.value)}/>
             </div>
             <div className="mb-2">
               <label htmlFor="marketshare">Market share of the Provider in (0 - 100)</label>
               <input type="number" placeholder="Enter Market Share" className="form-control" id="marketshare" 
                required min={0} max={100} onChange={(e) => setMarketshare(e.target.value)}/>
             </div>
             <div className="mb-2">
               <label htmlFor="renewbleenergypercentage">Renewble energy percentage of the Provider's production in (0 - 100)</label>
               <input type="number" placeholder="Enter Renewble energy percentage" className="form-control" id="renewbleenergypercentage" 
                required min={0} max={100} onChange={(e) => setRenewbleenergypercentage(e.target.value)}/>
             </div>
             <div className="mb-2">
               <label htmlFor="yearlyrevenue">Yearly revenue of the Provider</label>
               <input type="number" placeholder="Enter Yearly revenue" className="form-control" id="yearlyrevenue" 
                required min={0} onChange={(e) => setYearlyrevenue(e.target.value)}/>
             </div>
             <button className="btn btn-success">Submit</button>
           </form>
         </div>
       </div>
    )
}

export default CreateProvider;