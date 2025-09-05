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


export default function Home() {
  return (
    <>
  <Navbar/>
      <UnifiedCarousel />
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
