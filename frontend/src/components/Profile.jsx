import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';

const Profile = () => {
    const { user, fetchUserProfile } = useContext(AuthContext);

    useEffect(() => {
        fetchUserProfile(); 
    }, [fetchUserProfile]);

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>DOB:</strong> {user.dob}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Phone Number:</strong> {user.phonenumber}</p>
            <p><strong>Address:</strong> {user.address}</p>
        </div>
    );
};

export default Profile;
