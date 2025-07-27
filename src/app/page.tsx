"use client"
import React, { useEffect, useRef } from "react";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionHero3 from "@/app/(server-components)/SectionHero3";
import CardCategory6 from "@/components/CardCategory6";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionVideos from "@/components/SectionVideos";
import SectionHowItWork from "@/components/SectionHowItWork";
import HowItWorks from "@/components/HowItWorks";

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Hill Country Escapes",
    taxonomy: "category",
    count: 12000,
    thumbnail:
      "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Beachfront Villas",
    taxonomy: "category",
    count: 18000,
    thumbnail:
      "https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "Historical Heritage Stays",
    taxonomy: "category",
    count: 15000,
    thumbnail:
      "https://images.pexels.com/photos/356644/pexels-photo-356644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Rainforest Retreats",
    taxonomy: "category",
    count: 8000,
    thumbnail:
      "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "Luxury Colombo Hotels",
    taxonomy: "category",
    count: 10000,
    thumbnail:
      "https://images.pexels.com/photos/12584266/pexels-photo-12584266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

// Animation wrapper component
const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: { 
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up": return "translate-y-20";
      case "down": return "-translate-y-20";
      case "left": return "translate-x-20";
      case "right": return "-translate-x-20";
      default: return "translate-y-20";
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out opacity-0 ${getInitialTransform()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Stagger animation for grid items
const StaggeredGrid = ({ children }: { children: React.ReactNode }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const gridItems = entry.target.children;
            Array.from(gridItems).forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in');
              }, index * 200);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-12 gap-6">
      {React.Children.map(children, (child, index) => 
        React.cloneElement(child as React.ReactElement, {
          className: `${(child as React.ReactElement).props.className || ''} transition-all duration-700 ease-out opacity-0 translate-y-10 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 transform hover:scale-105 hover:shadow-2xl duration-500`.trim()
        })
      )}
    </div>
  );
};

function PageHome() {
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add smooth scroll for any anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .animate-in {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5a67d8 0%, #6b46c1 100%);
        }

        /* Parallax effect for background elements */
        .parallax-bg {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>

      <main className="nc-PageHome3 relative overflow-hidden">
        {/* GLASSMORPHISM */}
        <div className="parallax-bg">
          <BgGlassmorphism />
        </div>

        {/* SECTION HERO */}
        <AnimatedSection className="container px-1 sm:px-4 mb-24" delay={0}>
          <div className="transform transition-all duration-1000 ease-out">
            <SectionHero3 className="" />
          </div>
          <AnimatedSection delay={100} direction="up">
            <HowItWorks />
          </AnimatedSection>
        </AnimatedSection>

        <div className="container relative space-y-24 mb-24">
          {/* FEATURED PLACES SECTION */}
          <AnimatedSection delay={100} direction="up">
            <SectionGridFeaturePlaces />
          </AnimatedSection>

          {/* CATEGORIES GRID */}
          <AnimatedSection delay={100} direction="up">
            <StaggeredGrid>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
                <CardCategory6 taxonomy={DEMO_CATS_2[0]} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
                <CardCategory6 taxonomy={DEMO_CATS_2[3]} />
                <CardCategory6 taxonomy={DEMO_CATS_2[1]} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
                <CardCategory6 taxonomy={DEMO_CATS_2[4]} />
              </div>
            </StaggeredGrid>
          </AnimatedSection>

          {/* VIDEOS SECTION */}
          <AnimatedSection delay={100} direction="up">
            <div className="transform transition-all duration-700 ease-out">
              <SectionVideos />
            </div>
          </AnimatedSection>
        </div>
      </main>
    </>
  );
}

export default PageHome;