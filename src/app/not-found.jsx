"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="text-center max-w-xl">
        {/* 404 BIG TEXT */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-8xl md:text-9xl font-extrabold text-secondary"
        >
          404
        </motion.h1>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card bg-base-100 mt-6"
        >
          <div className="card-body items-center text-center">
            <Search size={50} className="text-secondary mb-2" />

            <h2 className="card-title text-3xl font-bold">Page Not Found</h2>

            <p className="text-base-content/70">
              Oops! The page you&apos;re looking for doesn’t exist or has been
              moved.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
              <Link href="/" className="btn btn-secondary flex-1 gap-2">
                <Home size={18} />
                Go Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn btn-outline flex-1 gap-2"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer text */}
        <p className="mt-6 text-sm text-base-content/60">
          Error code: 404 • Page not found
        </p>
      </div>
    </div>
  );
}
