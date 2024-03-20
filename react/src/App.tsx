import React from 'react';
import Test from './Test';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};

export default App;
