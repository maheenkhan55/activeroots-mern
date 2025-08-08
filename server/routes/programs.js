import express from 'express';
import Program from '../models/Program.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { sport, ageGroup, search, status = 'active' } = req.query;
    
    let query = { status };

    // Filter by sport
    if (sport && sport !== 'all') {
      query.sport = sport;
    }

    // Filter by age group
    if (ageGroup && ageGroup !== 'all') {
      // Parse age range like "5-8" or "9-12"
      if (ageGroup.includes('-')) {
        const [minAge, maxAge] = ageGroup.split('-').map(Number);
        query.$and = [
          { minAge: { $lte: maxAge } },
          { maxAge: { $gte: minAge } }
        ];
      }
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const programs = await Program.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: programs.length,
      data: programs
    });
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get single program
// @route   GET /api/programs/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    console.error('Get program error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Create new program
// @route   POST /api/programs
// @access  Private (Admin/Coach only)
router.post('/', protect, authorize('admin', 'coach'), async (req, res) => {
  try {
    const program = await Program.create(req.body);

    res.status(201).json({
      success: true,
      data: program
    });
  } catch (error) {
    console.error('Create program error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update program
// @route   PUT /api/programs/:id
// @access  Private (Admin/Coach only)
router.put('/:id', protect, authorize('admin', 'coach'), async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    console.error('Update program error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete program
// @route   DELETE /api/programs/:id
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    await program.deleteOne();

    res.json({
      success: true,
      message: 'Program deleted successfully'
    });
  } catch (error) {
    console.error('Delete program error:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router;