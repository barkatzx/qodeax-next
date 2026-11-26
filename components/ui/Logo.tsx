import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  tone?: "default" | "light";
  className?: string;
  priority?: boolean;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/fav.png"
      alt=""
      width={64}
      height={64}
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    />
  );
}

export function Logo({ tone = "default", className, priority = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={tone === "light" ? "/logo-light.png" : "/logo-dark.png"}
        alt="Qodeax"
        width={1190}
        height={267}
        priority={priority}
        className="h-[30px] w-auto sm:h-[34px]"
      />
    </span>
  );
}
