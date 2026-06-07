import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutGrid from './components/AboutGrid';
import ServicesAccordion from './components/ServicesAccordion';
import OurWork from './components/OurWork';
import Footer from './components/Footer';
import ProjectDetailsPage from './components/ProjectDetailsPage';
import WelcomeScreen from './components/WelcomeScreen';
import RetroContactModal from './components/RetroContactModal';
import { Project } from './types';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    // Dynamically retrieve Formspree form ID from environment variables
    const formspreeId = (import.meta as any).env?.VITE_FORMSPREE_FORM_ID || "";

    if (!formspreeId) {
      // Fallback submission flow for preview/testing
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setName('');
          setEmail('');
          setMessage('');
          setContactOpen(false);
        }, 4000);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setName('');
          setEmail('');
          setMessage('');
          setContactOpen(false);
        }, 4000);
      } else {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to submit form.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Transmission failed. Please check your network or try again.');
    }
  };

  const handleOpenContact = () => {
    const contactSection = document.getElementById('contact-hub-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setContactOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#E1EEFA]/35 text-zinc-900 selection:bg-[#2E8BF7] selection:text-white antialiased overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome-loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <WelcomeScreen 
              onEnter={(enteredName) => {
                if (enteredName && enteredName.trim() !== '') {
                  setName(enteredName);
                }
                setShowWelcome(false);
              }} 
            />
          </motion.div>
        ) : selectedProject ? (
          <motion.div
            key="project-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <ProjectDetailsPage 
              project={selectedProject} 
              onBack={() => setSelectedProject(null)} 
              onOpenContact={handleOpenContact} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="home-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Navigation Header bar */}
            <Header onOpenContact={handleOpenContact} />

            {/* Main Structural Flow - Reordered to focus exactly as requested: Projects first, then Experience, then Skills/About */}
            <main>
              <Hero onOpenContact={handleOpenContact} />
              <OurWork onSelectProject={(project) => setSelectedProject(project)} />
              <ServicesAccordion />
              <AboutGrid />
            </main>

            {/* Structured footer and metadata columns */}
            <Footer onOpenContact={handleOpenContact} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Retro Collage Style Contact Portal Drawer */}
      <AnimatePresence>
        {contactOpen && (
          <RetroContactModal
            isOpen={contactOpen}
            onClose={() => setContactOpen(false)}
            onSubmit={async (data) => {
              setName(data.name);
              setEmail(data.email);
              setMessage(data.message);
              setIsSubmitting(true);
              setErrorMsg('');
              
              const formspreeId = (import.meta as any).env?.VITE_FORMSPREE_FORM_ID || "";
              
              if (!formspreeId) {
                setTimeout(() => {
                  setIsSubmitting(false);
                  setSuccess(true);
                  setTimeout(() => {
                    setSuccess(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setContactOpen(false);
                  }, 4000);
                }, 1000);
                return;
              }

              try {
                const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify(data)
                });

                if (response.ok) {
                  setIsSubmitting(false);
                  setSuccess(true);
                  setTimeout(() => {
                    setSuccess(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setContactOpen(false);
                  }, 4000);
                } else {
                  const errData = await response.json();
                  setErrorMsg(errData.error || 'Broadcast routing failed. Please try again.');
                  setIsSubmitting(false);
                }
              } catch (err) {
                setErrorMsg('Network error. Check connection or try direct email.');
                setIsSubmitting(false);
              }
            }}
            isSubmitting={isSubmitting}
            success={success}
            errorMsg={errorMsg}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
