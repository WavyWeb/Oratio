"use client";
import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function AnimatedCircularBar({
  targetValue,
  pathColor,
  textColor,
  trailColor,
  textSize = "20px",
  maxValue = 100,
  suffix = "",
  duration = 1200,
  className,
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const target = Math.round(targetValue);
    if (target === 0) {
      setAnimatedValue(0);
      return;
    }

    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      // Ease-out: fast start, slow end
      const progress = 1 - Math.pow(1 - current / steps, 3);
      const val = Math.round(progress * target);
      setAnimatedValue(Math.min(val, target));
      if (current >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasAnimated, targetValue, duration]);

  return (
    <div ref={ref} className={className}>
      <CircularProgressbar
        value={animatedValue}
        maxValue={maxValue}
        text={`${animatedValue}${suffix}`}
        styles={buildStyles({
          pathColor,
          textColor,
          trailColor,
          textSize,
          pathTransitionDuration: 0.05,
        })}
      />
    </div>
  );
}
