"use client";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full px-6 md:px-16 py-16 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10">
          <div className="flex-1 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Christine Okoth
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Blockchain Developer | Web3 Engineer | AI Explorer
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Blockchain developer crafting secure, human-centered Web3 tools — from sustainable networks to smart economies.
            </p>
          </div>

          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl border-4 border-primary">
            <Image
              src="/christine.jpg"
              alt="Christine Okoth"
              width={300}
              height={300}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
