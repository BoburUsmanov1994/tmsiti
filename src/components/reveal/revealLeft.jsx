import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const RevealLeft = ({ children, className, classNameTop, duration }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div className={classNameTop} ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -75 },
          visible: { opacity: 1, x: 0 },
        }}
        initial={"hidden"}
        animate={mainControls}
        transition={{ duration: duration, delay: 0.4 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealLeft;
