import { useState } from "react";

import Patientmain from "./routes/Patientmain";
import Doctormain from "./routes/Doctormain";
import Adminmain from "./routes/Adminmain";

function App() {

  let mainComponent=<Patientmain />
  // switch (route) {
  //   case "admin":
  //     mainComponent = <Adminmain />;
  //     break;
  //   case "doctor":
  //     mainComponent = <Doctormain />;
  //     break;
  //   case "user":
  //     mainComponent = <Patientmain />;
  //     break;
  //   default:
  //     mainComponent = <div>Please log in</div>;
  // }

  return <>{mainComponent}</>;
}

export default App;
