import { UnifiedCarousel } from './components/UnifiedCarousel';
import { CourseOffering } from './components/CourseOffering';
import { FacultySpotlight } from './components/FacultySpotlight';
import { CourseCatalog } from './components/CourseCatalog';
import { Footer } from './components/Footer';
import { ScheduleCall } from './components/ScheduleCall';
import { FAQ } from './components/FAQ';

import { Achievers } from './components/Achievers';

import ScoreStrip from './components/ScoreStrip';
import CrackCodeVARC from './components/CrackCodeVARC';


export default function Home() {
  return (
    <>

      <UnifiedCarousel />
      {/* <ScoreStrip/> */}
      <CourseOffering />
      <CrackCodeVARC /> 
      <FacultySpotlight />
  
 
  <Achievers />
  <FAQ />
      <ScheduleCall/>

      <Footer />
    </>
  );
}
