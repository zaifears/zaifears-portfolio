import Image from 'next/image';
import Link from 'next/link';

const educationEntries = [
  {
    id: 'chartered-accountancy',
    title: 'CHARTERED ACCOUNTANCY (CA) - CERTIFICATE LEVEL PASSED',
    institution: 'Institute of Chartered Accountants of Bangladesh',
    period: 'January 2025 - June 2025',
    description: 'By successfully completing the Certificate Level of Chartered Accountancy, I have gained a robust understanding of financial reporting, auditing principles, and domestic tax laws. This qualification directly supplements my academic studies, equipping me with the practical expertise needed to effectively manage accounts and ensure regulatory compliance. My background provides a comprehensive view of business operations, from strategic planning to detailed financial oversight.',
    website: 'https://www.icab.org.bd',
    image: '/icab.png',
    imageAlt: 'Institute of Chartered Accountants of Bangladesh',
    link: 'https://www.icab.org.bd/',
    imagePosition: 'left',
    borderColor: 'hover:border-blue-500/50'
  },
  {
    id: 'university',
    title: 'Bangladesh University of Professionals',
    institution: 'BBA in Finance & Banking',
    period: '2022 - Present',
    description: 'I am currently pursuing my Bachelor\'s degree in Finance & Banking, where my coursework covers key areas such as investment analysis, risk management, and business law. Beyond my formal studies, I am deeply involved in campus life and practical learning opportunities. I have collaborated with faculty members on research projects and have taken an active role in organizing a variety of events. These include departmental seminars, a cross-university business hackathon, as well as workshops and competitions focused on practical skills like Excel.',
    website: 'https://bup.edu.bd',
    image: '/university.png',
    imageAlt: 'Bangladesh University of Professionals',
    link: 'https://en.wikipedia.org/wiki/Bangladesh_University_of_Professionals',
    imagePosition: 'right',
    borderColor: 'hover:border-green-500/50'
  },
  {
    id: 'college',
    title: 'Notre Dame College',
    institution: 'Higher Secondary Certificate (HSC), Business Studies',
    period: '2019 - 2021',
    description: 'I went to Notre Dame College for my higher secondary studies, where I focused on Business. I worked hard and was very happy to get a GPA of 5.00. Being at Notre Dame taught me a lot about business basics and helped me get ready for university. It was a challenging place that really helped me learn how to think critically and solve problems.',
    website: 'https://ndc.edu.bd',
    image: '/college.png',
    imageAlt: 'Notre Dame College',
    link: 'https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka',
    imagePosition: 'left',
    borderColor: 'hover:border-purple-500/50'
  },
  {
    id: 'school',
    title: 'Ideal School & College',
    institution: 'Secondary School Certificate (SSC), Business Studies',
    period: 'Completed 2019',
    description: 'This is where my interest in business really started. I finished my secondary school here, studying Business and getting a GPA of 4.50. Learning about commerce and economics at Ideal School & College is what made me want to continue studying business and finance. It gave me a great start and the motivation to keep learning.',
    website: 'https://iscm.edu.bd/',
    image: '/school.png',
    imageAlt: 'Ideal School & College',
    link: 'https://en.wikipedia.org/wiki/Ideal_School_and_College',
    imagePosition: 'right',
    borderColor: 'hover:border-orange-500/50'
  }
];

export default function EducationPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Education</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">My academic journey and qualifications</p>
        </div>

        {/* Education Entries */}
        <div className="space-y-12">
          {educationEntries.map((entry) => (
            <div key={entry.id} className={`group bg-white dark:bg-neutral-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8 ${entry.borderColor} transition-all duration-300 hover:shadow-2xl`}>
               <div className={`flex flex-col md:flex-row items-center gap-8 ${entry.imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Image Section */}
                <div className="flex-shrink-0 w-full md:w-1/3">
                  <Link href={entry.link} target="_blank" rel="noopener noreferrer">
                    <div className="relative overflow-hidden rounded-xl">
                      <Image
                        src={entry.image}
                        alt={entry.imageAlt}
                        width={400}
                        height={250}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 dark:bg-black/20 dark:group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                  </Link>
                </div>

                {/* Content Section */}
                <div className="flex-grow">
                  <Link href={entry.link} target="_blank" rel="noopener noreferrer">
                    <h2 className="text-2xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 hover:underline">
                      {entry.title}
                    </h2>
                  </Link>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{entry.institution}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{entry.period}</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {entry.description}
                  </p>
                  <a 
                    href={entry.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-300"
                  >
                    Visit Website
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gray-100 dark:bg-gray-900/30 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Want to Learn More?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Explore my skills, certifications, and technical expertise to see how my educational background translates into practical capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/skills"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-blue-600/25"
              >
                View Skills
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-semibold rounded-xl border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}