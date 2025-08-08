import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import apiService from '../services/api';

const Home = () => {
  const [featuredPrograms, setFeaturedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth(); 

  useEffect(() => {
    fetchFeaturedPrograms(); 
  }, []);

  const fetchFeaturedPrograms = async () => {
    try {
        const programs = await apiService.getPrograms(); 
        // show first 3 programs as featured 
        setFeaturedPrograms(programs.slice(0,3));
    } catch (error) {
        console.error('Failed to fetch programs:', error);
        // fallback to static data if api fails
        setFeaturedPrograms([
        {
          _id: '1',
          name: "Youth Soccer",
          ageGroup: "Ages 5-12",
          price: 120,
          maxParticipants: 15,
          currentParticipants: 7
        },
        {
          _id: '2',
          name: "Basketball Training",
          ageGroup: "Ages 8-14",
          price: 130,
          maxParticipants: 20,
          currentParticipants: 8
        },
        {
          _id: '3',
          name: "Swimming Lessons",
          ageGroup: "Ages 5-10",
          price: 150,
          maxParticipants: 12,
          currentParticipants: 7
        }
      ]);
    } finally {
        setLoading(false);
    }
  };

  const getSportImage = (name) => {
    if (name.toLowerCase().includes('soccer')) {
      return "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
    } else if (name.toLowerCase().includes('basketball')) {
      return "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
    } else if (name.toLowerCase().includes('swimming')) {
      return "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
    } else if (name.toLowerCase().includes('tennis')) {
      return "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
    } else if (name.toLowerCase().includes('baseball')) {
      return "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
    }
    return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
  };

  return (
    <div>
<div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="fade-in">Engage Actively in Your Child's Sports Journey</h1>
          <p className="slide-up">Connect with coaches, track progress, and be part of every milestone in their development.</p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/programs" className="btn btn-secondary">
              <span className="material-icons">search</span>
              Discover Programs
            </Link>
            <Link to={isLoggedIn ? "/dashboard" : "/login"} className="btn btn-outline" style={{ background: 'white', color: 'var(--primary-600)' }}>
              <span className="material-icons">
                {isLoggedIn ? "dashboard" : "person_add"}
              </span>
              {isLoggedIn ? "Go to Dashboard" : "Join Our Community"}
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Stay Connected Every Step of the Way</h2>

          <div className="card-grid">
            <div className="card text-center">
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6) auto',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <span className="material-icons" style={{ color: 'white', fontSize: '2rem' }}>search</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-800)' }}>Discover & Connect</h3>
              <p style={{ color: 'var(--gray-600)' }}>Find the perfect programs for your child and meet the coaches who will guide their development.</p>
            </div>

            <div className="card text-center">
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--gradient-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6) auto',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <span className="material-icons" style={{ color: 'white', fontSize: '2rem' }}>groups</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-800)' }}>Enroll & Engage</h3>
              <p style={{ color: 'var(--gray-600)' }}>Secure your spot and begin building meaningful connections with coaches and the sports community.</p>
            </div>

            <div className="card text-center">
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--accent-orange-500), var(--accent-orange-600))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6) auto',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <span className="material-icons" style={{ color: 'white', fontSize: '2rem' }}>emoji_events</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-800)' }}>Track & Celebrate</h3>
              <p style={{ color: 'var(--gray-600)' }}>Follow your child's progress, celebrate milestones, and stay actively involved in their sports journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Programs Where Parents Matter</h2>

          {loading ? (
            <div className="text-center" style={{ padding: 'var(--space-12)' }}>
              <div className="spinner" style={{ margin: '0 auto' }}></div>
              <p style={{ marginTop: 'var(--space-4)', color: 'var(--gray-600)' }}>Loading programs...</p>
            </div>
          ) : (
            <>
              <div className="card-grid">
                {featuredPrograms.map(program => (
                  <div key={program._id} className="card" style={{ overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={getSportImage(program.name)}
                      alt={program.name}
                      className="rounded-lg"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        marginBottom: 'var(--space-6)'
                      }}
                    />
                    <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-800)' }}>{program.name}</h3>
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-2)' }}>
                        <span style={{ fontWeight: '600' }}>Age Group:</span> {program.ageGroup}
                      </p>
                      <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-2)' }}>
                        <span style={{ fontWeight: '600' }}>Duration:</span> {program.duration || '8-12 weeks'}
                      </p>
                      <p style={{ color: 'var(--secondary-600)', fontWeight: '700' }}>
                        {program.maxParticipants - program.currentParticipants} spots left
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                      <Link
                        to={`/program/${program._id}`}
                        className="btn btn-outline"
                        style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
                      >
                        View Details
                      </Link>
                      <Link
                        to="/programs"
                        className="btn btn-primary"
                        style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
                      >
                        Join - ${program.price}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center" style={{ marginTop: 'var(--space-12)' }}>
                <Link to="/programs" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  <span className="material-icons">sports</span>
                  View All Programs
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-8)', textAlign: 'center' }}>
            <div className="fade-in">
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: '700', marginBottom: 'var(--space-2)' }}>500+</div>
              <p style={{ fontSize: 'var(--font-size-lg)', opacity: 0.9 }}>Happy Families</p>
            </div>
            <div className="fade-in">
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: '700', marginBottom: 'var(--space-2)' }}>15+</div>
              <p style={{ fontSize: 'var(--font-size-lg)', opacity: 0.9 }}>Sports Programs</p>
            </div>
            <div className="fade-in">
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: '700', marginBottom: 'var(--space-2)' }}>25+</div>
              <p style={{ fontSize: 'var(--font-size-lg)', opacity: 0.9 }}>Expert Coaches</p>
            </div>
            <div className="fade-in">
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: '700', marginBottom: 'var(--space-2)' }}>98%</div>
              <p style={{ fontSize: 'var(--font-size-lg)', opacity: 0.9 }}>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Activity Gallery */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Active Community</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-12)'
          }}>
            <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
              <img
                src="https://images.pexels.com/photos/8941615/pexels-photo-8941615.jpeg"
                alt="Youth sports activity"
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
                }}
              />
              <div style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ color: 'var(--gray-800)', marginBottom: 'var(--space-3)' }}>Building Team Spirit</h3>
                <p style={{ color: 'var(--gray-600)' }}>Our programs focus on teamwork, friendship, and developing lasting bonds through sports.</p>
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
              <img
                src="https://images.pexels.com/photos/8941613/pexels-photo-8941613.jpeg"
                alt="Active youth engagement"
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
                }}
              />
              <div style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ color: 'var(--gray-800)', marginBottom: 'var(--space-3)' }}>Active Learning</h3>
                <p style={{ color: 'var(--gray-600)' }}>Every session is designed to keep kids engaged while learning essential sports skills and life values.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Parent Stories of Connection</h2>
          
          <div className="card-grid">
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Sarah Johnson"
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Sarah Johnson</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Parent of Emma, Age 8</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "I love how I can see Emma's progress after every session. Coach Martinez sends updates that help me support her practice at home."
              </p>
              <div>
                {[1,2,3,4,5].map(i => <span key={i} className="material-icons" style={{color: '#FE4F2D', fontSize: '1.2rem'}}>star</span>)}
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Mike Chen"
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Mike Chen</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Parent of Tyler, Age 11</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "The communication is incredible. I always know what Tyler is working on and how I can encourage him between sessions."
              </p>
              <div>
                {[1,2,3,4,5].map(i => <span key={i} className="material-icons" style={{color: '#FE4F2D', fontSize: '1.2rem'}}>star</span>)}
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Emily Rodriguez"
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Emily Rodriguez</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Parent of Sofia, Age 9</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "Finally, a program where I feel truly involved in my daughter's sports journey. The transparency builds such trust!"
              </p>
              <div>
                {[1,2,3,4,5].map(i => <span key={i} className="material-icons" style={{color: '#FE4F2D', fontSize: '1.2rem'}}>star</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section" style={{ background: 'var(--gradient-secondary)', color: 'white' }}>
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8" style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto var(--space-8) auto' }}>
            Join hundreds of families who are actively engaged in their children's sports journey.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/programs" className="btn btn-outline" style={{
              textDecoration: 'none',
              background: 'white',
              color: 'var(--secondary-600)',
              borderColor: 'white'
            }}>
              <span className="material-icons">sports</span>
              Browse Programs
            </Link>
            <Link to={isLoggedIn ? "/dashboard" : "/login"} className="btn" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              textDecoration: 'none',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <span className="material-icons">
                {isLoggedIn ? "dashboard" : "person_add"}
              </span>
              {isLoggedIn ? "My Dashboard" : "Sign Up Today"}
            </Link>
          </div>
        </div>
      </section>
    </div>



    </div>
  )
}