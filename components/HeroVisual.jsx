import Image from "next/image";

export default function HeroVisual() {
  return (
    <div className="hero-robot" aria-hidden="true">
      <Image
        src="/hero-robot-latest.png"
        alt=""
        width={640}
        height={760}
        priority
        className="hero-robot-img"
      />
    </div>
  );
}
