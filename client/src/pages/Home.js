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
        {/* Hero Section */}

        {/* Hero Section */}

        {/* Featured Programs */}

        {/* Stats Section */}

        {/* Community Activity Gallery */}

        {/* Testimonials */}

        {/* Call to Action */}



    </div>
  )
 



}