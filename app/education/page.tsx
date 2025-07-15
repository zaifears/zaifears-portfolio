// This is the final code for your education page.
// The file should be located at: app/education/page.tsx
import Image from 'next/image';

export default function EducationPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl mb-8">Education</h1>

      {/* --- BUP Entry (Image on Left) --- */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <Image
            src="/university.png" // Make sure 'university.png' is in your 'public' folder
            alt="Bangladesh University of Professionals"
            width={500}
            height={300}
            className="rounded-lg object-cover shadow-md"
          />
        </div>
        {/* Text Content Column */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold">Bangladesh University of Professionals</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            BBA in Finance & Banking (2022 - Present)
          </p>
          {/* ✅ Updated Text */}
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            I am currently pursuing my Bachelor's degree in Finance & Banking, where my coursework covers key areas such as investment analysis, risk management, and business law. Beyond my formal studies, I am deeply involved in campus life and practical learning opportunities. I have collaborated with faculty members on research projects and have taken an active role in organizing a variety of events. These include departmental seminars, a cross-university business hackathon, as well as workshops and competitions focused on practical skills like Excel.
          </p>
        </div>
      </div>

      {/* Separator Line */}
      <hr className="my-12 border-neutral-200 dark:border-neutral-800" />

      {/* --- Notre Dame College Entry (Image on Right) --- */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Text Content Column */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold">Notre Dame College</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Higher Secondary Certificate (HSC), Business Studies (2019 - 2021)
          </p>
           {/* ✅ Updated Text */}
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            I went to Notre Dame College for my higher secondary studies, where I focused on Business. I worked hard and was very happy to get a GPA of 5.00. Being at Notre Dame taught me a lot about business basics and helped me get ready for university. It was a challenging place that really helped me learn how to think critically and solve problems.
          </p>
        </div>
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <Image
            src="/college.png" // Make sure 'college.png' is in your 'public' folder
            alt="Notre Dame College"
            width={500}
            height={300}
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      </div>

      {/* Separator Line */}
      <hr className="my-12 border-neutral-200 dark:border-neutral-800" />

      {/* --- Ideal School & College Entry (Image on Left) --- */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <Image
            src="/school.png" // Make sure 'school.png' is in your 'public' folder
            alt="Ideal School & College"
            width={500}
            height={300}
            className="rounded-lg object-cover shadow-md"
          />
        </div>
        {/* Text Content Column */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold">Ideal School & College</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Secondary School Certificate (SSC), Business Studies (Completed 2019)
          </p>
           {/* ✅ Updated Text */}
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            This is where my interest in business really started. I finished my secondary school here, studying Business and getting a GPA of 4.50. Learning about commerce and economics at Ideal School & College is what made me want to continue studying business and finance. It gave me a great start and the motivation to keep learning.
          </p>
        </div>
      </div>

    </section>
  );
}
