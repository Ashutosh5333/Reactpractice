import React, { useState } from 'react';

const Laung = () => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div>
      <div>
        <button onClick={() => switchLanguage('en')}>English</button>
        <button onClick={() => switchLanguage('ja')}>Japanese</button>
        <button onClick={() => switchLanguage('hi')}>Hindi</button>
      </div>

      <div style={{ display: language === 'en' ? 'block' : 'none' }}>
        <h1>Hello, this is English content.</h1>
      </div>

      <div style={{ display: language === 'ja' ? 'block' : 'none' }}>
        <h1>こんにちは、これは日本語のコンテンツです。</h1>
      </div>

      <div style={{ display: language === 'hi' ? 'block' : 'none' }}>
        <h1>नमस्ते, यह हिंदी कंटेंट है।</h1>
      </div>
    </div>
  );
};

export default Laung;
