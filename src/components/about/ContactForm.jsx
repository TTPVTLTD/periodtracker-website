'use client';

import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'General', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-12 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="">Message Received!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you for reaching out. Your feedback has been forwarded to our support and product development team.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 px-6 py-2.5 rounded-full bg-flo-600 text-white font-bold text-xs hover:bg-flo-700 transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="">Send us a message</h3>
        <p className="text-gray-500 mt-1">We respond to community inquiries within 24–48 hours.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Priya Sharma"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-flo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-flo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Topic / Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-flo-500 bg-white"
        >
          <option value="General">General Inquiry</option>
          <option value="Ayurveda">Ayurveda Remedy Suggestion</option>
          <option value="AI">AI Health Report Feedback</option>
          <option value="AppSupport">App Support (iOS / Android)</option>
          <option value="Subscription">Subscription Management</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Your Message</label>
        <textarea
          rows="4"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help you today?"
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-flo-500 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-full bg-[#f43f77] hover:bg-[#e11d5f] text-white font-bold text-sm shadow-md shadow-pink-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Submit Message</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
