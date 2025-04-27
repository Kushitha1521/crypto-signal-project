import React, { useEffect } from 'react';

const AdSenseAd = () => {
  useEffect(() => {
    // Dynamically load the Google AdSense script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9068417913167381';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);  // Clean up the script when component unmounts
    };
  }, []);

  return (
    <div className="adsense-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9068417913167381"
        data-ad-slot="YOUR-AD-SLOT"
        data-ad-format="auto"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
