import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";

/** Small technical section label: brass index + hairline + uppercase text. */
export function Eyebrow({
  index,
  children,
  tone = "dark",
  className,
}: {
  index?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      {index ? <span className="text-brass tnum">{index}</span> : null}
      <span
        aria-hidden
        className={cn(
          "h-px w-7",
          tone === "dark" ? "bg-white/25" : "bg-ink/25"
        )}
      />
      <span className={tone === "dark" ? "text-fog" : "text-ink/55"}>
        {children}
      </span>
    </p>
  );
}

/** Inline link with an arrow that shifts on hover — used inside cards/rows. */
export function ArrowLink({
  children,
  href,
  tone = "dark",
  onClick,
  className,
}: {
  children: ReactNode;
  href: string;
  tone?: "dark" | "light";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-sm font-medium",
        tone === "dark" ? "text-bone" : "text-ink",
        className
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover/link:scale-x-100"
        />
      </span>
      <ArrowUpRight
        className="size-4 text-brass transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        aria-hidden
      />
    </a>
  );
}
