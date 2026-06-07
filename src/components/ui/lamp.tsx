import React from "react";
import { motion } from "motion/react";
import { cn } from "../../../src/lib/utils";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-screen flex-col items-center justify-start overflow-hidden bg-[#060608] w-full rounded-none z-0",
        className
      )}
    >
      {/* Dynamic ambient color spots for the background as requested: instead of flat dark background, these add beautiful colors */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Electric Blue glow top-right */}
        <div className="absolute right-[5%] top-[5%] w-[400px] h-[400px] rounded-full bg-[#2E8BF7]/10 blur-[130px]" />
        {/* Electric Turquoise glow top-left */}
        <div className="absolute left-[5%] top-[10%] w-[350px] h-[350px] rounded-full bg-[#12B4D1]/10 blur-[120px]" />
        {/* Warm Golden sunny spot right mid */}
        <div className="absolute right-[12%] top-[40%] w-[380px] h-[380px] rounded-full bg-[#FFA82E]/8 blur-[140px]" />
        {/* Clover green glow bottom-left */}
        <div className="absolute left-[10%] bottom-[10%] w-[300px] h-[300px] rounded-full bg-[#0FA958]/8 blur-[110px]" />
      </div>

      <div className="relative flex w-full flex-1 scale-y-110 items-center justify-center isolate z-0 pt-0">
        {/* Left Side Conic Lamp Beam (Electric Cyan) */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          transition={{
            delay: 0.2,
            duration: 1.0,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[26rem] bg-gradient-conic from-[#12B4D1] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] z-10"
        >
          {/* Cover masks to isolate the cone beam perfectly - using our custom background colorway #060608 */}
          <div className="absolute w-[100%] left-0 bg-[#060608] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-[#060608] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Side Conic Lamp Beam (Royal Electric Blue) */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          transition={{
            delay: 0.2,
            duration: 1.0,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[26rem] bg-gradient-conic from-transparent via-transparent to-[#2E8BF7] text-white [--conic-position:from_290deg_at_center_top] z-10"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-[#060608] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-[#060608] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Glow visual backdrops */}
        <div className="absolute top-1/2 h-40 w-full translate-y-12 scale-x-150 bg-[#060608] blur-2xl z-20"></div>
        <div className="absolute top-1/2 z-30 h-40 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        
        {/* Center spotlight cores utilizing periwinkle/cyan and blue elements */}
        <div className="absolute inset-auto z-40 h-36 w-[24rem] -translate-y-1/2 rounded-full bg-[#12B4D1] opacity-30 blur-3xl"></div>
        <div className="absolute inset-auto z-40 h-36 w-[24rem] -translate-y-1/2 translate-x-4 rounded-full bg-[#2E8BF7]/80 opacity-25 blur-3xl"></div>

        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "14rem" }}
          transition={{
            delay: 0.2,
            duration: 1.0,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[#12B4D1] blur-2xl"
        ></motion.div>

        <motion.div
          initial={{ width: "12rem" }}
          whileInView={{ width: "26rem" }}
          transition={{
            delay: 0.2,
            duration: 1.0,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-40 h-0.5 w-[26rem] -translate-y-[7rem] bg-gradient-to-r from-[#12B4D1] to-[#2E8BF7]"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#060608]"></div>
      </div>

      <div className="relative z-50 flex flex-col items-center w-full h-full justify-between">
        {children}
      </div>
    </div>
  );
};
