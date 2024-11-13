
export const getProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, dob, gender, phonenumber, address } = req.user;

        res.status(200).json({
            firstName,
            lastName,
            email,
            dob,
            gender,
            phonenumber,
            address
        });
    } catch (error) {
        console.error('Error fetching profile:', error.message || error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
