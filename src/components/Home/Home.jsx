import React from 'react';

function Home({ displayName, email, photoURL, emailVerified }) {
  return (
    <section>
      <div>
        <div>
        <h1 className='text-4xl text-left font-bold'>Flow4Life</h1>
        </div>
        <div className='text-left pt-4'>
        <h2 className='text-xl'>Welcome</h2> 
        <h2 className='text-bold text-2xl' >{displayName}</h2> 
      </div>
      </div>
    </section>
  );
}

export default Home;