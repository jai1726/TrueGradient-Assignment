import User from '../../../model/User.js';
import Response from '../../../model/Response.js';


export const saveResponse = async (req, res) => {
  try {
    const { summary, result_text } = req.body;
    const userId = req.user.id;

    const newResponse = new Response({ summary, result_text, user: userId });
    const savedResponse = await newResponse.save();

    await User.findByIdAndUpdate(userId, { $push: { savedResponses: savedResponse._id } });

    res.status(201).json({ message: 'Response saved', response: savedResponse });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ error: 'Server error while saving response' });
  }
};


export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedResponses');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Server error while fetching details' });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error while updating profile' });
  }
};
