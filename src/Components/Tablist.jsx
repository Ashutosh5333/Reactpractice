import React, { useState } from 'react';

const TabList = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabClick('login')}>Login</button>
        <button onClick={() => handleTabClick('signup')}>Signup</button>
      </div>

      <div>
        {activeTab === 'login' && <LoginForm />}
        {activeTab === 'signup' && <SignupForm />}
      </div>
    </div>
  );
};

const LoginForm = () => {
  return (
    <div>
      <h2>Login Form</h2>
      {/*  login form components go here */}
    </div>
  );
};

const SignupForm = () => {
  return (
    <div>
      <h2>Signup Form</h2>
      {/*  signup form components go here */}
    </div>
  );
};

export default TabList;
