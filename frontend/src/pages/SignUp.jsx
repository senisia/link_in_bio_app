import axios from "axios"
import { useState } from "react"
import '../styles/SignUp.scss'
import { Input } from "@mui/material"
import NavBar from '../components/NavBar'

function SignUp() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    axios.post("http://127.0.0.1:8000/api/users/create_user", { username, password })
    .then(res => {
      const userToken = res.data.token
      localStorage.setItem("token", userToken)
      console.log(res.data)
    }) 
    .catch(err => console.error(`Error was encountered: ${err}`))
  }


  return (
    <>
      <NavBar></NavBar>
      <div className="SignUp">
        <div className="form-container-signup">
        <form onSubmit={e => handleSubmit(e)} className="form-signup">
          <Input type="text" onChange={e => setUsername(e.target.value)} placeholder="Username" className="form-input-signup"></Input>
          <Input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="form-input-signup"></Input>
          <div className="buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
