"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[750px] overflow-hidden bg-black">

      {/* Background */}

      <div className="absolute inset-0">

        <Image
          src="/naserHead.jpg"
          alt="Zamalek Stadium"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/65" />

        {/* Bottom Fade */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      </div>

      {/* Hero */}

      <div className="relative z-10 flex h-full items-center justify-center">

        <div className="container mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="mx-auto max-w-5xl text-center"
          >
                      {/* Logo */}

            <div className="mx-auto mb-10 relative w-32 h-32 md:w-40 md:h-40">

              <Image
                src="/zsc.png"
                alt="Zamalek SC"
                fill
                priority
                className="object-contain"
              />

            </div>

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-neutral-300 backdrop-blur-md">

              <Shield className="w-4 h-4 text-red-600"/>

              <span>Official Website • Since 1911</span>

            </div>

            {/* Heading */}

            <h1 className="mt-10 text-5xl md:text-7xl xl:text-8xl font-black leading-none tracking-tight text-white">

              مدرسة الفن والهندسة

            </h1>

            <h2 className="mt-6 text-2xl md:text-4xl font-semibold text-red-600">

              نادي الزمالك الرياضي

            </h2>

            {/* Description */}

            <p className="mx-auto mt-8 max-w-3xl text-lg md:text-xl leading-9 text-neutral-300">

              أكثر من قرن من المجد والتاريخ والبطولات.
              نادي الزمالك ليس مجرد نادٍ رياضي، بل إرثٌ عريق
              وجماهير عظيمة وشغف لا ينتهي داخل الملاعب المصرية
              والإفريقية.

            </p>
                        {/* CTA */}

            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">

              <Link
                href="/Pages/News"
                className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                hover:bg-red-700
                text-white
                px-8
                py-4
                font-semibold
                transition-all
                duration-300
                "
              >
                آخر الأخبار

                <ChevronLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </Link>

              <Link
                href="/Pages/Matches"
                className="
                rounded-xl
                border
                border-white/20
                bg-white/5
                hover:bg-white/10
                px-8
                py-4
                text-white
                font-semibold
                transition-all
                duration-300
                "
              >
                الفريق الأول
              </Link>

            </div>

            {/* Small Text */}

            <p className="mt-12 text-sm uppercase tracking-[6px] text-neutral-500">

              The White Castle • Cairo • Egypt

            </p>

          </motion.div>

        </div>

      </div>
      </section>
  );
};

export default Hero;