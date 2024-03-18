import { useState } from 'react'

import Doctormain from './pages/doctor/Doctormain';
import AdminMain from './pages/admin/Adminmain';
import Patientmain from './pages/patient/Patientmain';


function App() {
  // const [route, setRoute] = useState("admin")
  let route ="user"
  // if(window.location.pathname == '/'){
  //   setRoute("user")
  // }else if(window.location.pathname == '/admin'){
  //   setRoute("admin")

  // }
  console.log();
  if (window.location.pathname == '/') {
    //  setRoute("user")
    route = "user"
  }else if(window.location.pathname.includes("/admin")){
     route ="admin"
    }else if(window.location.pathname.includes("/doctor")){
      route ="doctor"
      
  }
  let mainComponent;
  switch (route) {
    case 'admin':
      mainComponent = <AdminMain />;
      break;
    case 'doctor':
      mainComponent = <Doctormain />;
      break;
    case 'user':
      mainComponent = <Patientmain />
      break;
    default:
      mainComponent = <div>Please log in</div>;
  }


  return (
    <>
  
      {mainComponent}




    </>
  )
}

export default App
