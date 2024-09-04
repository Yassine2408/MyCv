import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUpload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const App = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const personalInfo = {
    name: 'Yassine AIT-ELCAID',
    email: 'yassine.aitelcaid@uit.ac.ma',
    phone: '0653205141',
    address: 'lotissement elbassma Ouled Oujih 14000 Kénitra',
  };

  const education = [
    {
      period: '2019 - Present',
      degree: 'Deug en études anglaises',
      institution: 'faculté des langues et des arts, kénitra',
      details: 'Etudes fondamentales en anglais',
    },
    {
      period: '2021 - 2022',
      degree: 'Licence professionnelle en développement informatique',
      institution: 'ibn tofail, kenitra',
      details: 'Maîtrise du langage développement web : HTML / CSS / JAVASCRIPT, Développement logiciel : PYTHON, Gestion des bases de données : SQL',
    },
    // Add other education entries here
  ];

  const experience = [
    {
      period: '2022 - 2023',
      position: "Enseignant de l'informatique",
      company: 'Ecole Valfleury, Kenitra',
      responsibilities: [
        "Animation des cours d'informatique aux élèves du CE1 au CE6",
        'Evaluer les compétences acquises des élèves',
        "Gestion de l'espace",
        'Préparation des cours et des évaluations',
      ],
    },
  ];

  const skills = [
    'Ecoute active',
    'Facilité à communiquer en français et en anglais',
    'capacité de gérer des groupes',
    'Maitrise des outils informatique',
    'Adaptation aux situations différentes',
  ];

  const languages = ['Arabe', 'Anglais', 'Français'];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set background color
    doc.setFillColor(102, 51, 153);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Add image if available
    if (image) {
      doc.addImage(image, 'JPEG', 10, 10, 50, 50);
    }
    
    // Add content to the PDF with improved styling
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text(personalInfo.name, 70, 30);
    
    doc.setFontSize(12);
    doc.text(`Email: ${personalInfo.email}`, 70, 40);
    doc.text(`Phone: ${personalInfo.phone}`, 70, 50);
    doc.text(`Address: ${personalInfo.address}`, 70, 60);
    
    doc.setFontSize(18);
    doc.text('Education', 14, 80);
    const educationData = education.map(edu => [edu.period, edu.degree, edu.institution, edu.details]);
    doc.autoTable({
      startY: 85,
      head: [['Period', 'Degree', 'Institution', 'Details']],
      body: educationData,
      theme: 'grid',
      styles: { textColor: [255, 255, 255], fillColor: [128, 0, 128] },
      headStyles: { fillColor: [75, 0, 130] },
    });
    
    const finalY = doc.lastAutoTable.finalY || 85;
    doc.text('Experience', 14, finalY + 20);
    const experienceData = experience.map(exp => [exp.period, exp.position, exp.company, exp.responsibilities.join(', ')]);
    doc.autoTable({
      startY: finalY + 25,
      head: [['Period', 'Position', 'Company', 'Responsibilities']],
      body: experienceData,
      theme: 'grid',
      styles: { textColor: [255, 255, 255], fillColor: [128, 0, 128] },
      headStyles: { fillColor: [75, 0, 130] },
    });
    
    doc.text('Skills', 14, doc.lastAutoTable.finalY + 20);
    doc.setFontSize(12);
    doc.text(skills.join(', '), 14, doc.lastAutoTable.finalY + 30, { maxWidth: 180 });
    
    doc.setFontSize(18);
    doc.text('Languages', 14, doc.lastAutoTable.finalY + 50);
    doc.setFontSize(12);
    doc.text(languages.join(', '), 14, doc.lastAutoTable.finalY + 60);
    
    // Save the PDF
    doc.save('Yassine_AIT-ELCAID_CV.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            {image ? (
              <img src={image} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
            ) : (
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaUpload className="text-gray-500 text-3xl" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-semibold"
            >
              Upload Image
            </button>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-4"
          >
            {personalInfo.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center space-x-4"
          >
            <p><FaEnvelope className="inline mr-2" />{personalInfo.email}</p>
            <p><FaPhone className="inline mr-2" />{personalInfo.phone}</p>
            <p><FaMapMarkerAlt className="inline mr-2" />{personalInfo.address}</p>
          </motion.div>
        </header>

        <main>
          <Section title="Formation">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-4"
              >
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p>{edu.institution}</p>
                <p className="text-sm">{edu.period}</p>
                <p className="text-sm">{edu.details}</p>
              </motion.div>
            ))}
          </Section>

          <Section title="Expérience professionnelle">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-4"
              >
                <h3 className="text-xl font-semibold">{exp.position}</h3>
                <p>{exp.company}</p>
                <p className="text-sm">{exp.period}</p>
                <ul className="list-disc list-inside">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-sm">{resp}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </Section>

          <Section title="Compétences">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center"
            >
              {skills.map((skill, index) => (
                <span key={index} className="bg-white text-purple-600 px-3 py-1 rounded-full m-1">
                  {skill}
                </span>
              ))}
            </motion.div>
          </Section>

          <Section title="Langues">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center space-x-4"
            >
              {languages.map((lang, index) => (
                <span key={index} className="text-lg font-semibold">{lang}</span>
              ))}
            </motion.div>
          </Section>
        </main>

        <footer className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold"
            onClick={generatePDF}
          >
            <FaDownload className="inline mr-2" />
            Télécharger CV (PDF)
          </motion.button>
        </footer>
      </div>

      {showPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Téléchargement du CV</h2>
            <p className="text-gray-700 mb-4">Le téléchargement du PDF commencera bientôt...</p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded"
              onClick={() => setShowPDF(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    {children}
  </motion.section>
);

export default App;