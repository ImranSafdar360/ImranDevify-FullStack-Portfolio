import TestimonialCard from '../../components/TestimonialCard';

async function getTestimonials() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/testimonials`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Client Testimonials
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            What my clients and collaborators say about working with me. 
            Their feedback drives me to continuously improve and deliver exceptional results.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <>
            {/* Featured Testimonials */}
            {testimonials.some((testimonial: any) => testimonial.featured) && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Featured Testimonials
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {testimonials
                    .filter((testimonial: any) => testimonial.featured)
                    .map((testimonial: any) => (
                      <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                    ))}
                </div>
              </div>
            )}

            {/* All Testimonials */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {testimonials.some((testimonial: any) => testimonial.featured) ? 'All Testimonials' : 'Testimonials'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial: any) => (
                  <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Client Satisfaction
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {testimonials.length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Happy Clients
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {testimonials.length > 0 
                      ? (testimonials.reduce((sum: number, t: any) => sum + t.rating, 0) / testimonials.length).toFixed(1)
                      : '0'
                    }
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Average Rating
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {testimonials.filter((t: any) => t.rating === 5).length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    5-Star Reviews
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No testimonials yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Client testimonials will appear here once they are added.
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want to work together?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and work with amazing clients. 
            Let's discuss your project and see how I can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Start a Project
            </a>
            <a
              href="/projects"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

