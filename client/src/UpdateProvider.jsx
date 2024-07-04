import React,{ useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateProvider (){
  const {id} = useParams()
  const [name, setName] = useState()
  const [country, setCountry] = useState()
  const [marketshare, setMarketshare] = useState()
  const [renewbleenergypercentage, setRenewbleenergypercentage] = useState()
  const [yearlyrevenue, setYearlyrevenue] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3001/getProvider/' + id)
    .then(result => {console.log(result)
      setName(result.data.name)
      setCountry(result.data.country)
      setMarketshare(result.data.marketshare)
      setRenewbleenergypercentage(result.data.renewbleenergypercentage)
      setYearlyrevenue(result.data.yearlyrevenue)
    })
    .catch(err => console.log(err))
  }, [])

    const Update = (e) => {
      e.preventDefault();
      axios.put("http://localhost:3001/updateProvider/" + id, {name, country, marketshare, renewbleenergypercentage, yearlyrevenue})
      .then(result => {
      console.log(result)
      navigate('/')
      })
    }

    return(
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Edit Provider's data</h2>
          <div className="mb-2">
            <label htmlFor="name">Name of the Provider</label>
            <input type="text" placeholder="Enter Name" className="form-control"
            required minLength={3} maxLength={30} value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label htmlFor="country">Country where the Provider is located</label>
            <input type="text" placeholder="Enter Country" className="form-control" 
            required minLength={4} maxLength={30} value={country} onChange={(e) => setCountry(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label htmlFor="marketshare">Market share of the Provider in (0 - 100)</label>
            <input type="number" placeholder="Enter Market Share" className="form-control"  
            required min={0} max={100} value={marketshare} onChange={(e) => setMarketshare(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label htmlFor="renewbleenergypercentage">Renewble energy percentage of the Provider's production in (0 - 100)</label>
            <input type="number" placeholder="Enter Renewble energy percentage" className="form-control"  
            required min={0} max={100} value={renewbleenergypercentage} onChange={(e) => setRenewbleenergypercentage(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label htmlFor="yearlyrevenue">Yearly revenue of the Provider</label>
            <input type="number" placeholder="Enter Yearly revenue" className="form-control"  
            required min={0} value={yearlyrevenue} onChange={(e) => setYearlyrevenue(e.target.value)}/>
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
    )
}

export default UpdateProvider;