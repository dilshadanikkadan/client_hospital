import { useState } from "react";

import Patientmain from "./routes/Patientmain";
import Doctormain from "./routes/Doctormain";
import Adminmain from "./routes/Adminmain";

function App() {
  let route = "user";
  if (window.location.pathname.includes("/admin")) {
    route = "admin";
  } else if (window.location.pathname.includes("/doctor")) {
    route = "doctor";
  }
  let mainComponent;
  switch (route) {
    case "admin":
      mainComponent = <Adminmain />;
      break;
    case "doctor":
      mainComponent = <Doctormain />;
      break;
    case "user":
      mainComponent = <Patientmain />;
      break;
    default:
      mainComponent = <div>Please log in</div>;
  }

  return <>{mainComponent}</>;
}

export default App;
