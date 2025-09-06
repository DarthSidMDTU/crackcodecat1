import { UnifiedCarousel } from './components/UnifiedCarousel';
import { CourseOffering } from './components/CourseOffering';
import { FacultySpotlight } from './components/FacultySpotlight';
import { CourseCatalog } from './components/CourseCatalog';
import { Footer } from './components/Footer';
import { BookDemo } from './components/BookDemo';
import { FAQ } from './components/FAQ';

import { Achievers } from './components/Achievers';

import ScoreStrip from './components/ScoreStrip';
import CrackCodeVARC from './components/CrackCodeVARC';
import { Navbar } from './components/Navbar';
import YouTubeEmbed from './components/Yotube';


export default function Home() {
  return (
    <>
  
      <UnifiedCarousel />
      <YouTubeEmbed videoId='XGmZFNG-qQQ'/>
      {/* <ScoreStrip/> */}
      <CourseOffering />
      <CrackCodeVARC /> 
      <FacultySpotlight />
  
 
  <Achievers />
  <FAQ />
     <BookDemo/>

      <Footer />
    </>
  );
}
