'use client';

import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative">
        {/* Outer Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"
        />

        {/* Animated Logo Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex flex-col items-center gap-6"
        >
          <div className="relative">
            {/* Spinning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute -inset-4 border-2 border-primary/10 border-t-primary/40 rounded-full"
            />
            
            {/* The Compass Logo */}
            <motion.div
              animate={{ 
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-20 h-20 bg-primary text-primary-foreground rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/30"
            >
              <Compass className="w-10 h-10" />
            </motion.div>
          </div>

          <div className="space-y-2 text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold tracking-tighter uppercase font-display"
            >
              Vantage
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-0.5 bg-primary/20 rounded-full overflow-hidden w-24 mx-auto"
            >
              <div className="h-full bg-primary w-1/3 animate-[loading_1.5s_infinite_ease-in-out]" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
