import User from '../../../model/User.js';
import Response from '../../../model/Response.js';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('savedResponses');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);
    await Response.deleteMany({ user: userId }); 

    res.status(200).json({ message: 'User and responses deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error while deleting user' });
  }
};
