// This is the final code for your education page.
// The file should be located at: app/education/page.tsx
import Image from 'next/image';
import Link from 'next/link'; // Import the Link component

export default function EducationPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl mb-8">Education</h1>

      {/* --- Chartered Accountancy Entry --- */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Text Content Column */}
        <div className="w-full md:w-2/3">
          <Link href="https://www.icab.org.bd/" target="_blank" rel="noopener noreferrer">
            <h2 className="text-2xl font-bold hover:underline">CHARTERED ACCOUNTANCY (CA) - CERTIFICATE LEVEL PASSED</h2>
          </Link>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Institute of Chartered Accountants of Bangladesh (January 2025 - June 2025)
          </p>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            By successfully completing the Certificate Level of Chartered Accountancy, I have gained a robust understanding of financial reporting, auditing principles, and domestic tax laws. This qualification directly supplements my academic studies, equipping me with the practical expertise needed to effectively manage accounts and ensure regulatory compliance. My background provides a comprehensive view of business operations, from strategic planning to detailed financial oversight.
          </p>
          <p className="mt-4">
            <a href="https://www.icab.org.bd/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Website: https://www.icab.org.bd
            </a>
          </p>
        </div>
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <Link href="https://www.icab.org.bd/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icab.png" // Make sure 'icab.png' is in your 'public' folder
              alt="Institute of Chartered Accountants of Bangladesh"
              width={500}
              height={300}
              className="rounded-lg object-cover shadow-md transition-opacity hover:opacity-80"
            />
          </Link>
        </div>
      </div>

      {/* Separator Line */}
      <hr className="my-12 border-neutral-200 dark:border-neutral-800" />

      {/* --- BUP Entry (Image on Left) --- */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          {/* ✅ Image is now a clickable link */}
          <Link href="https://en.wikipedia.org/wiki/Bangladesh_University_of_Professionals" target="_blank" rel="noopener noreferrer">
            <Image
              src="/university.png" // Make sure 'university.png' is in your 'public' folder
              alt="Bangladesh University of Professionals"
              width={500}
              height={300}
              className="rounded-lg object-cover shadow-md transition-opacity hover:opacity-80"
            />
          </Link>
        </div>
        {/* Text Content Column */}
        <div className="w-full md:w-2/3">
          {/* ✅ Title is now a clickable link */}
          <Link href="https://en.wikipedia.org/wiki/Bangladesh_University_of_Professionals" target="_blank" rel="noopener noreferrer">
            <h2 className="text-2xl font-bold hover:underline">Bangladesh University of Professionals</h2>
          </Link>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            BBA in Finance & Banking (2022 - Present)
          </p>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            I am currently pursuing my Bachelor's degree in Finance & Banking, where my coursework covers key areas such as investment analysis, risk management, and business law. Beyond my formal studies, I am deeply involved in campus life and practical learning opportunities. I have collaborated with faculty members on research projects and have taken an active role in organizing a variety of events. These include departmental seminars, a cross-university business hackathon, as well as workshops and competitions focused on practical skills like Excel.
          </p>
          {/* ✅ Added Website Link */}
          <p className="mt-4">
            <a href="https://bup.edu.bd" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Website: https://bup.edu.bd
            </a>
          </p>
        </div>
      </div>

      {/* Separator Line */}
      <hr className="my-12 border-neutral-200 dark:border-neutral-800" />

      {/* --- Notre Dame College Entry (Image on Right) --- */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Text Content Column */}
        <div className="w-full md:w-2/3">
           {/* ✅ Title is now a clickable link */}
          <Link href="https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka" target="_blank" rel="noopener noreferrer">
            <h2 className="text-2xl font-bold hover:underline">Notre Dame College</h2>
          </Link>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Higher Secondary Certificate (HSC), Business Studies (2019 - 2021)
          </p>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            I went to Notre Dame College for my higher secondary studies, where I focused on Business. I worked hard and was very happy to get a GPA of 5.00. Being at Notre Dame taught me a lot about business basics and helped me get ready for university. It was a challenging place that really helped me learn how to think critically and solve problems.
          </p>
          {/* ✅ Added Website Link */}
          <p className="mt-4">
            <a href="https://ndc.edu.bd" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Website: https://ndc.edu.bd
            </a>
          </p>
        </div>
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex-shrink-0">
           {/* ✅ Image is now a clickable link */}
          <Link href="https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka" target="_blank" rel="noopener noreferrer">
            <Image
              src="/college.png" // Make sure 'college.png' is in your 'public' folder
              alt="Notre Dame College"
              width={500}
              height={300}
              className="rounded-lg object-cover shadow-md transition-opacity hover:opacity-80"
            />
          </Link>
        </div>
      </div>

      {/* Separator Line */}
      <hr className="my-12 border-neutral-200 dark:border-neutral-800" />

      {/* --- Ideal School & College Entry (Image on Left) --- */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex-shrink-0">
           {/* ✅ Image is now a clickable link */}
          <Link href="https://en.wikipedia.org/wiki/Ideal_School_and_College" target="_blank" rel="noopener noreferrer">
            <Image
              src="/school.png" // Make sure 'school.png' is in your 'public' folder
              alt="Ideal School & College"
              width={500}
              height={300}
              className="rounded-lg object-cover shadow-md transition-opacity hover:opacity-80"
            />
          </Link>
        </div>
        {/* Text Content Column */}
        <div className="w-full md:w-2/3">
           {/* ✅ Title is now a clickable link */}
          <Link href="https://en.wikipedia.org/wiki/Ideal_School_and_College" target="_blank" rel="noopener noreferrer">
            <h2 className="text-2xl font-bold hover:underline">Ideal School & College</h2>
          </Link>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Secondary School Certificate (SSC), Business Studies (Completed 2019)
          </p>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            This is where my interest in business really started. I finished my secondary school here, studying Business and getting a GPA of 4.50. Learning about commerce and economics at Ideal School & College is what made me want to continue studying business and finance. It gave me a great start and the motivation to keep learning.
          </p>
          {/* ✅ Added Website Link */}
          <p className="mt-4">
            <a href="https://iscm.edu.bd/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Website: https://iscm.edu.bd/
            </a>
          </p>
        </div>
      </div>

    </section>
  );
}