import { motion, isValidMotionProp } from "framer-motion";
import { Box, chakra, shouldForwardProp } from "@chakra-ui/react";

export const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
}); 