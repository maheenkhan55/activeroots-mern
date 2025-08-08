import express from 'express';
import Enrollment from '../models/Enrollment.js';
import Program from '../models/Program.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get user enrollments
// @route   GET /api/cart/enrollments
// @access  Private
router.get('/enrollments', protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id });

    res.json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Create enrollment (Add to cart)
// @route   POST /api/cart/enroll
// @access  Private
router.post('/enroll', protect, async (req, res) => {
  try {
    const { programId, childName, childAge } = req.body;

    // Check if program exists
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Check if program is full
    if (program.isFull) {
      return res.status(400).json({ message: 'Program is full' });
    }

    // Check if child is already enrolled in this program
    const existingEnrollment = await Enrollment.findOne({
      user: req.user.id,
      program: programId,
      childName,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingEnrollment) {
      return res.status(400).json({ 
        message: 'Child is already enrolled in this program' 
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      user: req.user.id,
      program: programId,
      childName,
      childAge
    });

    // Update program participant count
    await Program.findByIdAndUpdate(programId, {
      $inc: { currentParticipants: 1 }
    });

    // Populate enrollment data
    await enrollment.populate('program');

    res.status(201).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    console.error('Create enrollment error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update enrollment status
// @route   PUT /api/cart/enrollments/:id
// @access  Private 
router.put('/enrollments/:id', protect, async (req, res) => {
  try { 
    const { status, paymentStatus } = req.body;

    const enrollment = await Enrollment.findOne({
      _id: req.params.id,
      user: req.user.id
    });
  
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Update allowed fields 
    if (status) enrollment.status = status;
    if (paymentStatus) enrollment.paymentStatus = paymentStatus;

    await enrollment.save();

    res.json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    console.error('Update enrollment error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Cancel enrollment
// @route   DELETE /api/cart/enrollments/:id
// @access  Private
router.delete('/enrollments/:id', protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Update program participant count
    await Program.findByIdAndUpdate(enrollment.program, {
      $inc: { currentParticipants: -1 }
    });

    await enrollment.deleteOne();

    res.json({
      success: true,
      message: 'Enrollment cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel enrollment error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Add progress update (Coach only)
// @route   POST /api/cart/enrollments/:id/progress
// @access  Private
router.post('/enrollments/:id/progress', protect, async (req, res) => {
  try {
    const { skill, level, notes } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.progress.push({ skill, level, notes });
    await enrollment.save();

    res.json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    console.error('Add progress error:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router;