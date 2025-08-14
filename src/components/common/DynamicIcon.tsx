/* eslint-disable @typescript-eslint/no-explicit-any */
import { icons } from "lucide-react";

const DynamicIcon = ({
  name,
  ...props
}: {
  name: keyof typeof icons;
  [key: string]: any;
}) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null; // Or return a default icon
  }

  return <LucideIcon {...props} />;
};

export default DynamicIcon;
