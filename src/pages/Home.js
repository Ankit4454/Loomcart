import React from 'react';

function Home() {
  return (
    <div className="relative bg-cover bg-center h-screen px-10" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Discover Your Perfect Products</h1>
          <p className="text-lg mb-6">Explore a wide range of products curated just for you.</p>
          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700">Learn More</button>
        </div>
      </div>
    </div>
  )
}

export default Home;