import { Loader2 } from "lucide-react";

const Loader = ({ size, styles }: { size?: number; styles?: string }) => {
  const baseStyles = `size-${size ? size : "6"} `;

  return (
    <Loader2
      style={{ width: size, height: size }}
      className={` ${baseStyles} ${styles}
        animate-spin duration-300 text-primary`}
    />
  );
};

export default Loader;
