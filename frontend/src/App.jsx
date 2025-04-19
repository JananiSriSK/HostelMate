import React from "react";
import StudentHome from "./components/pages/StudentHome";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <StudentHome />
      <Toaster/>
    </div>
  );
};

export default App;
