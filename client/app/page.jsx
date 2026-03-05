"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";



export default function LandingPage() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Master the Art of <span className="bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">Public Speaking</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            AI-powered speech analysis that helps you improve your public speaking skills with real-time feedback on your voice, pace, and delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <button className="bg-gradient-to-r from-amber-600 to-rose-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-amber-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/30">
                Get Started
              </button>
            </Link>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="bg-white text-slate-700 border border-gray-200 px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 transition-all duration-300 shadow-sm"
            >
              See How It Works
            </button>
          </div>
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-rose-600/20 rounded-3xl blur-3xl -z-10"></div>
            <div className="relative bg-white/70 border border-gray-200 rounded-2xl p-1 shadow-2xl overflow-hidden backdrop-blur-sm">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img
                  src="/demo-screenshot.svg"
                  alt="Oratio Dashboard Preview"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Powerful Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to <span className="bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">Speak with Confidence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools helps you master public speaking through advanced AI analysis and personalized feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10">
              <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Feedback</h3>
              <p className="text-gray-500">
                Get instant analysis on your pace, tone, and clarity as you speak, with visual indicators to help you adjust in real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/10">
              <div className="w-14 h-14 bg-rose-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
              <p className="text-gray-500">
                Dive deep into your performance metrics with detailed analytics and personalized insights to track your progress over time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10">
              <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Coaching</h3>
              <p className="text-gray-500">
                Receive tailored recommendations and exercises based on your unique speaking patterns and areas for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block bg-rose-500/10 text-rose-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">Oratio</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and see immediate improvements in your public speaking skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">1</div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-600/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">Record Your Speech</h3>
                  <p className="text-gray-500">
                    Simply record yourself speaking using your device's microphone and camera. Our AI will analyze your speech in real-time.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">2</div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-rose-600/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">Get Instant Feedback</h3>
                  <p className="text-gray-500">
                    Receive detailed analysis on your pacing, tone, clarity, and more. Our AI pinpoints areas for improvement.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">3</div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-600/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">Improve & Track Progress</h3>
                  <p className="text-gray-500">
                    Follow personalized recommendations and track your improvement over time with our detailed analytics dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/signup">
              <button className="bg-gradient-to-r from-amber-600 to-rose-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-amber-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/30">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-slate-900/[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block bg-orange-500/10 text-orange-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="bg-gradient-to-r from-orange-400 to-rose-300 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of professionals who have transformed their public speaking skills with Oratio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                  I
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Ishu</h4>
                  <p className="text-sm text-gray-500">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Oratio has completely transformed how I prepare for presentations. The real-time feedback is incredibly accurate and has helped me become a more confident speaker."
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Shivam</h4>
                  <p className="text-sm text-gray-500">Startup Founder</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a founder, I need to pitch to investors regularly. Oratio's analytics helped me understand my speaking patterns and improve my delivery significantly."
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                  E
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Eshan</h4>
                  <p className="text-sm text-gray-500">University Professor</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I use Oratio to help my students improve their presentation skills. The detailed feedback on pacing and clarity is invaluable for their development."
              </p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">Public Speaking Skills</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Join thousands of professionals who have improved their speaking skills with Oratio. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30">
                Get Started
              </button>
            </Link>
            <Link href="#features">
              <button className="bg-white text-slate-700 border border-gray-200 px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 transition-all duration-300 shadow-sm">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 pt-16 pb-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <Image
                    src="/logo1.png"
                    alt="Oratio Logo"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">
                  Oratio
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Empowering confident communicators through AI-powered speech analysis and feedback.
              </p>
            </div>

            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">How It Works</a></li>

                <li><a href="#" className="text-gray-500 hover:text-slate-900 transition-colors duration-200 text-sm">Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-500 hover:text-slate-900 transition-colors duration-200 text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-slate-900 transition-colors duration-200 text-sm">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Oratio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Styled JSX */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(125deg, #ff8c32, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .h3 span {
          font-weight: 800;
          background: linear-gradient(125deg, #ff8c32, #ffd700);
          text-transform: uppercase;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          display: inline-block;
        }

        .h3 span::after {
          content: "";
          display: block;
          width: 45%;
          height: 3px;
          background: linear-gradient(125deg, #ff8c32, #ffd700);
          position: absolute;
          top: 100%;
          margin-top: -4px;
        }

        @media (max-width: 700px) {
          .h3 span::after {
            width: 45%;
            height: 2px;
            margin-top: -3px;
          }
        }

        .card {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(225, 29, 72, 0.15) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 
            0 8px 32px rgba(245, 158, 11, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .card:hover::before {
          left: 100%;
        }

        .card:hover {
          transform: translateY(-12px) scale(1.03);
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 
            0 20px 60px rgba(245, 158, 11, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 40px rgba(225, 29, 72, 0.3);
        }

        .card-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 1.5rem;
          border-radius: 1rem;
          position: relative;
          z-index: 1;
        }

        .card-content .h3 {
          color: #ffffff;
          text-transform: uppercase;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .card-content .h3 span {
          background: linear-gradient(135deg, #f59e0b 0%, #e11d48 50%, #fb923c 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient 3s ease infinite;
        }

        .card-content .p {
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.75rem;
          font-size: 1rem;
        }

        .glass-bg {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}