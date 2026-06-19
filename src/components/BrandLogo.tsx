import { Link } from "react-router-dom";

export function BrandLogo({ variant = "ivory", size = "md" }: { variant?: "ivory" | "navy" | "gold"; size?: "sm" | "md" | "lg" }) {
  const color = variant === "ivory" ? "text-ivory" : variant === "gold" ? "text-gold" : "text-navy";
  const sub = variant === "ivory" ? "text-gold-soft" : "text-gold-deep";
  const sizes = {
    sm: { name: "text-base", tag: "text-[0.55rem]" },
    md: { name: "text-xl", tag: "text-[0.6rem]" },
    lg: { name: "text-3xl", tag: "text-[0.7rem]" },
  }[size];
  return (
    <Link to="/" className={`group inline-flex flex-col ${color}`} aria-label="World Vision Consultancy — home">
      <span className={`font-display font-medium leading-none tracking-tight ${sizes.name}`}>
        World Vision<span className={sub}>.</span>
      </span>
      <span className={`mono mt-1 ${sizes.tag} tracking-[0.32em] uppercase ${sub}`}>Consultancy</span>
    </Link>
  );
}
