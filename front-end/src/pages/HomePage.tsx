import React from 'react'

interface HomePageProps {
  children?: React.ReactNode
}

const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  // console.log("home page props", props)
  return (
    <React.Fragment>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-lg mb-6">This is the home page of my website.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Learn More</button>
      </div>
    </React.Fragment>
  )
}

export default HomePage;