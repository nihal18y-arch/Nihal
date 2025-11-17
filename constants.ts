
import type { PersonalInfo, Skill, Project } from './types';
import { BrushIcon, VideoIcon, CubeIcon, MegaphoneIcon, PaletteIcon, LayoutIcon } from './components/Icons';

export const personalInfo: PersonalInfo = {
  name: 'Muhammed Nihal K',
  title: 'Graphic Designer & Visual Storyteller',
  about: "I am a graphic designer with experience across all aspects of design and product development, seeking a role that leverages my creative and technical skills. As a visual storyteller, I'm fluent in graphic design, 3D modeling, and video editing, using tools like Adobe Creative Suite to craft compelling visuals and polished edits. With a strong foundation in design principles and attention to detail, I turn ideas into captivating experiences. My background in digital marketing allows me to connect with audiences online effectively. I bring fresh perspectives, creativity, and a collaborative spirit to every project and team I work with.",
  cvUrl: '#',
  email: 'nihal18y@gmail.com',
  phone: '+91 7306518977',
  linkedin: '#', // No link provided in CV
};

export const skillsData: Skill[] = [
  { name: 'Adobe Creative Suite', icon: BrushIcon }, // Photoshop, Illustrator, InDesign
  { name: 'Motion Graphics', icon: VideoIcon }, // After Effects
  { name: '3D Modeling', icon: CubeIcon }, // Blender, Cinema 4D
  { name: 'Branding & Logo Design', icon: PaletteIcon },
  { name: 'Poster & Layout Design', icon: LayoutIcon },
  { name: 'Digital Marketing', icon: MegaphoneIcon },
  { name: 'Video Editing', icon: VideoIcon }, // DaVinci Resolve, Final Cut Pro
  { name: 'UI/UX Principles', icon: LayoutIcon },
];

export const portfolioData: Project[] = [
  {
    title: 'Brand Identity & Logo Design',
    description: 'A collection of logos and brand identity packages for clients like Maison Verdure, Zeleven, and Nova, showcasing versatility in style and concept.',
    tags: ['Logo Design', 'Branding', 'Typography', 'Vector Art'],
    imageUrl: 'https://picsum.photos/seed/logos/600/400',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Commercial Poster & Ad Design',
    description: 'Engaging posters and advertisements for digital and print campaigns, focusing on clear messaging and strong visual impact for various brands.',
    tags: ['Poster Design', 'Advertising', 'Photo Manipulation', 'Layout'],
    imageUrl: 'https://picsum.photos/seed/posters/600/400',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Automotive Concept Art',
    description: 'A series of stylized posters and visuals celebrating iconic automotive designs like Mercedes-Benz and BMW, blending photography with graphic elements.',
    tags: ['Concept Art', 'Automotive', 'Graphic Design', 'Retouching'],
    imageUrl: 'https://picsum.photos/seed/cars/600/400',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Social Media & AI Creatives',
    description: 'Eye-catching visuals and creatives for social media platforms and AI-focused marketing campaigns, designed to boost engagement and drive results.',
    tags: ['Social Media', 'Digital Marketing', 'AI', 'Content Creation'],
    imageUrl: 'https://picsum.photos/seed/social/600/400',
    liveUrl: '#',
    repoUrl: '#',
  },
];