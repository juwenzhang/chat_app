import React from'react'

interface ProfilePageProps {
  children?: React.ReactNode;
}

const ProfilePage: React.FC<ProfilePageProps> = (props: ProfilePageProps) => {
  // console.log(props.children)
  return (
    <React.Fragment>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
        <p className="text-lg mb-6">This is the profile page of my website.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Profile</button>
      </div>
    </React.Fragment>
  )
}

export default ProfilePage;