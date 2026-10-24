
import { motion, useReducedMotion } from "framer-motion";

interface WavyTextProps {
  text: string;
  className?: string;
  delay?: number;
  interval?: number;
}

export function WavyText({
  text,
  className = "",
  delay = 0,
  interval = 3,
}: WavyTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={className}
      aria-label={text}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${index}-${char}`}
          aria-hidden="true"
          style={{
            display: "inline-block",
            transformOrigin: "50% 85%",
            whiteSpace: "pre",
          }}
          animate={{
            y: [0, 1, 9, 5, 0],
            x: [0, 0, 2, -1, 0],
            rotate: [0, 0, 14, -9, 0],
            scale: [1, 1, 0.97, 1.01, 1],
          }}
          transition={{
            duration: 1.1,
            delay: delay + index * 0.045,
            repeat: Infinity,
            repeatDelay: interval,
            times: [0, 0.15, 0.55, 0.8, 1],
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}


interface CrumbleTextProps {
  text: string;
  className?: string;
  delay?: number;
  interval?: number;
}

export function CrumbleText({
  text,
  className = "",
  delay = 0,
  interval = 3,
}: CrumbleTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={className}
      aria-label={text}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        whiteSpace: "pre-wrap",
      }}
    >
      {Array.from(text).map((char, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        return (
          <motion.span
            key={`${index}-${char}`}
            aria-hidden="true"
            style={{
              display: "inline-block",
              transformOrigin: "50% 100%",
              whiteSpace: "pre",
            }}
            animate={{
              rotate: [0, direction * 90, 0],
              x: [0, direction * 5, 0],
            }}
            transition={{
              duration: 2.5,
              delay,
              repeat: Infinity,
              repeatDelay: interval,
              times: [0, 0.5, 1],
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}
