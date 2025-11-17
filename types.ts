// FIX: Import React to resolve the 'React' namespace for `React.ComponentType`.
import React from 'react';

export interface PersonalInfo {
  name: string;
  title: string;
  about: string;
  cvUrl: string;
  email: string;
  phone?: string;
  linkedin?: string;
}

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}