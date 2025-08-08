import express from 'express';

const router = express.Router();

// Demo programs data
const demoPrograms = [
  {
    _id: '1',
    name: "Youth Soccer Development",
    sport: "Soccer",
    description: "Learn fundamental soccer skills including dribbling, passing, shooting, and teamwork. Perfect for beginners and intermediate players.",
    ageGroup: "Ages 5-12",
    minAge: 5,
    maxAge: 12,
    price: 120,
    duration: "12 weeks",
    coach: "Sarah Martinez",
    coachEmail: "sarah@activeroots.com",
    location: "Central Sports Complex",
    schedules: [
      { day: "Tuesday", time: "4:00 PM - 5:00 PM", duration: 60 },
      { day: "Thursday", time: "4:00 PM - 5:00 PM", duration: 60 }
    ],
    maxParticipants: 15,
    currentParticipants: 7,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-04-15'),
    status: "active"
  },
  {
    _id: '2',
    name: "Basketball Training Camp",
    sport: "Basketball", 
    description: "Intensive basketball training focusing on shooting, dribbling, defense, and game strategy. Build confidence on the court!",
    ageGroup: "Ages 8-14",
    minAge: 8,
    maxAge: 14,
    price: 130,
    duration: "12 weeks",
    coach: "Mike Johnson",
    coachEmail: "mike@activeroots.com",
    location: "Downtown Recreation Center",
    schedules: [
      { day: "Monday", time: "5:00 PM - 6:30 PM", duration: 90 },
      { day: "Wednesday", time: "5:00 PM - 6:30 PM", duration: 90 }
    ],
    maxParticipants: 20,
    currentParticipants: 8,
    startDate: new Date('2024-02-05'),
    endDate: new Date('2024-03-30'),
    status: "active"
  },
  {
    _id: '3',
    name: "Swimming Lessons",
    sport: "Swimming",
    description: "From beginner to intermediate swimming. Focus on water safety, stroke technique, and building endurance.",
    ageGroup: "Ages 5-10", 
    minAge: 5,
    maxAge: 10,
    price: 150,
    duration: "12 weeks",
    coach: "Lisa Chen",
    coachEmail: "lisa@activeroots.com",
    location: "Aquatic Center",
    schedules: [
      { day: "Saturday", time: "9:00 AM - 10:00 AM", duration: 60 }
    ],
    maxParticipants: 12,
    currentParticipants: 7,
    startDate: new Date('2024-02-10'),
    endDate: new Date('2024-05-05'),
    status: "active"
  }
];

// Demo user data
const demoUser = {
  id: 'demo-user-1',
  name: "John Smith",
  email: "john@example.com",
  phone: "555-0101",
  children: [
    { name: "Alex", age: 8, dateOfBirth: new Date('2016-03-15') },
    { name: "Emma", age: 10, dateOfBirth: new Date('2014-07-22') }
  ],
  role: "parent"
};

// @desc    Get all programs (demo)
// @route   GET /api/programs
router.get('/programs', (req, res) => {
  res.json({
    success: true,
    count: demoPrograms.length,
    data: demoPrograms
  });
});

// @desc    Get single program (demo)  
// @route   GET /api/programs/:id
router.get('/programs/:id', (req, res) => {
  const program = demoPrograms.find(p => p._id === req.params.id);
  if (!program) {
    return res.status(404).json({ message: 'Program not found' });
  }
  res.json({
    success: true,
    data: program
  });
});

// @desc    Login demo user
// @route   POST /api/auth/login
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'john@example.com' && password === 'password123') {
    res.json({
      success: true,
      token: 'demo-token-12345',
      user: demoUser
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// @desc    Register demo user
// @route   POST /api/auth/register
router.post('/auth/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  
  res.status(201).json({
    success: true,
    token: 'demo-token-12345',
    user: {
      id: 'demo-user-new',
      name,
      email,
      phone,
      children: [],
      role: 'parent'
    }
  });
});

// @desc    Get current user (demo)
// @route   GET /api/auth/me
router.get('/auth/me', (req, res) => {
  res.json({
    success: true,
    user: demoUser
  });
});

// @desc    Get enrollments (demo)
// @route   GET /api/cart/enrollments
router.get('/cart/enrollments', (req, res) => {
  const demoEnrollments = [
    {
      _id: 'enroll-1',
      program: demoPrograms[0],
      childName: "Alex",
      childAge: 8,
      status: "confirmed",
      paymentStatus: "paid",
      enrollmentDate: new Date('2024-01-15')
    },
    {
      _id: 'enroll-2', 
      program: demoPrograms[1],
      childName: "Emma",
      childAge: 10,
      status: "confirmed", 
      paymentStatus: "paid",
      enrollmentDate: new Date('2024-01-20')
    }
  ];

  res.json({
    success: true,
    count: demoEnrollments.length,
    data: demoEnrollments
  });
});

// @desc    Create enrollment (demo)
// @route   POST /api/cart/enroll
router.post('/cart/enroll', (req, res) => {
  const { programId, childName, childAge } = req.body;
  
  const program = demoPrograms.find(p => p._id === programId);
  if (!program) {
    return res.status(404).json({ message: 'Program not found' });
  }

  res.status(201).json({
    success: true,
    data: {
      _id: 'new-enrollment',
      program,
      childName,
      childAge,
      status: 'pending',
      paymentStatus: 'pending',
      enrollmentDate: new Date()
    }
  });
});

// @desc    Health check
// @route   GET /api/health
router.get('/health', (req, res) => {
  res.json({
    message: 'ActiveRoots Backend is running in demo mode!',
    mode: 'demo',
    timestamp: new Date().toISOString()
  });
});

export default router;