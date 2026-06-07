'use client';
import { useState } from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFF0] p-4">
      {/* Ornamen dekoratif bunga abstrak */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#F4C2C2] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#FBCFE8] p-8 z-10">
        <h1 className="text-3xl font-bold text-[#36454F] font-serif text-center mb-6">Login Admin</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Username</label>
            <input className="w-full px-4 py-3 mt-1 rounded-xl border border-[#FBCFE8] focus:border-[#D4AF37] outline-none" type="text" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Password</label>
            <input className="w-full px-4 py-3 mt-1 rounded-xl border border-[#FBCFE8] focus:border-[#D4AF37] outline-none" type="password" />
          </div>
          <button className="w-full bg-[#D4AF37] hover:bg-[#a07c2e] text-white py-3 rounded-full font-semibold transition">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}