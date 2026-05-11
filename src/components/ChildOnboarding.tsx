"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { X, Baby, Cake, User, ArrowRight, Heart } from "lucide-react";
import gsap from "gsap";

export function ChildOnboarding() {
  const { user, isLoaded } = useUser();
  const children = useQuery(api.users.getChildren, user ? { userId: user.id } : "skip");
  const addChild = useMutation(api.users.addChild);
  
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [step, setStep] = useState(1);

  // Show if logged in and has no children yet
  React.useEffect(() => {
    if (isLoaded && user && children && children.length === 0) {
      const dismissed = localStorage.getItem("zuzu-onboarding-dismissed");
      if (!dismissed) setShow(true);
    }
  }, [isLoaded, user, children]);

  const handleSubmit = async () => {
    if (user && name && birthday && gender) {
      await addChild({ userId: user.id, name, birthday, gender });
      setShow(false);
      localStorage.setItem("zuzu-onboarding-dismissed", "true");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div className="bg-butter rounded-[3rem] w-full max-w-xl relative z-10 p-12 shadow-2xl overflow-hidden border border-white/20">
        <button 
          onClick={() => {
            setShow(false);
            localStorage.setItem("zuzu-onboarding-dismissed", "true");
          }}
          className="absolute top-8 right-8 p-3 hover:bg-black/5 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-zuzu-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-zuzu-pink fill-current" />
          </div>
          <h2 className="text-4xl font-display text-gray-900 mb-3">One more thing!</h2>
          <p className="text-gray-500 font-body">Help us personalize your boutique experience by telling us a bit about your little ones.</p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Their Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zuzu-blue" />
              <input 
                type="text" 
                placeholder="e.g. Ayaan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 outline-none border-2 border-transparent focus:border-zuzu-blue/20 transition-all font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Birthday</label>
              <div className="relative">
                <Cake className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zuzu-blue" />
                <input 
                  type="date" 
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 outline-none border-2 border-transparent focus:border-zuzu-blue/20 transition-all font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Gender</label>
              <div className="flex gap-2">
                {["Boy", "Girl", "Unisex"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-grow py-4 rounded-2xl font-bold text-sm transition-all ${
                      gender === g ? "bg-zuzu-blue text-white shadow-lg" : "bg-white text-gray-600 border border-black/5 hover:bg-gray-50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            disabled={!name || !birthday || !gender}
            onClick={handleSubmit}
            className="w-full py-5 bg-zuzu-pink text-white rounded-full font-bold text-lg shadow-xl shadow-pink-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
          >
            Start Personalized Shopping
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">You can add more children later in your profile</p>
        </div>
      </div>
    </div>
  );
}
