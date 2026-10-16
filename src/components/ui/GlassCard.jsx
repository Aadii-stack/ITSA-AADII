import React from "react";
import { ChevronDown } from "lucide-react";

// Inline Social SVG Icons
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ULogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29.667 31.69"
    {...props}
  >
    <path d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" />
    <path d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" transform="translate(-45.91 0)" />
    <path d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" transform="translate(0 -51.963)" />
  </svg>
);

const GlassCard = React.forwardRef(
  ({ className = "", title = "Meta Summit '25", description = "ITSA's premier flagship tech event bringing workshops, competitive hackathons, and guest keynotes.", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`group h-[320px] w-[300px] [perspective:1000px] ${className}`}
        {...props}
      >
        <div className="relative h-full rounded-[40px] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-amber-500/20 shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(234,179,8,0.2)_0px_30px_50px_-20px] group-hover:[transform:rotate3d(1,1,0,20deg)]">
          <div className="absolute inset-2 rounded-[35px] border-b border-l border-amber-500/30 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]"></div>
          
          <div className="absolute inset-0 [transform:translate3d(0,0,26px)]">
            <div className="px-6 pt-20 pb-0">
              <span className="block text-xl font-black text-amber-400 font-mono tracking-tight">
                {title}
              </span>
              <span className="mt-3 block text-[13px] leading-relaxed text-zinc-300">
                {description}
              </span>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between [transform-style:preserve-3d] [transform:translate3d(0,0,26px)]">
            <div className="flex gap-2 [transform-style:preserve-3d]">
              {[
                { icon: InstagramIcon, delay: "100ms" },
                { icon: TwitterIcon, delay: "200ms" },
                { icon: GithubIcon, delay: "300ms" },
              ].map(({ icon: Icon, delay }, index) => (
                <button
                  key={index}
                  className="group/social grid h-[28px] w-[28px] place-content-center rounded-full border-none bg-amber-400 shadow-md transition-all duration-200 ease-in-out hover:bg-white active:bg-amber-500"
                  style={{ transitionDelay: delay }}
                >
                  <Icon className="h-3.5 w-3.5 stroke-black transition-colors" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 cursor-pointer transition-all duration-200 ease-in-out hover:translate-x-1">
              <button className="border-none bg-none text-xs font-bold text-amber-400 font-mono">
                EXPLORE
              </button>
              <ChevronDown className="h-4 w-4 stroke-amber-400 -rotate-90" strokeWidth={3} />
            </div>
          </div>

          <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
            {[
              { size: "150px", pos: "8px", z: "20px", delay: "0s" },
              { size: "120px", pos: "10px", z: "40px", delay: "0.2s" },
              { size: "90px", pos: "16px", z: "60px", delay: "0.4s" },
            ].map((circle, index) => (
              <div
                key={index}
                className="absolute aspect-square rounded-full bg-amber-500/10 border border-amber-500/20 transition-all duration-500 ease-in-out"
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay,
                }}
              ></div>
            ))}
            <div
              className="absolute grid aspect-square w-[46px] place-content-center rounded-full bg-amber-400 shadow-lg transition-all duration-500 ease-in-out [transform:translate3d(0,0,90px)] group-hover:[transform:translate3d(0,0,110px)]"
              style={{ top: "24px", right: "24px" }}
            >
              <ULogo className="w-5 fill-black" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;