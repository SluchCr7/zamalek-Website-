import React from "react";
import { cn } from "@/lib/utils"; // يمكنك حذف هذا واستبداله بدمج الكلاسات يدويًا إذا لم تكن تستخدمه
import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import "./infinite.css";
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const duration =
    speed === "fast" ? "20s" : speed === "slow" ? "80s" : "40s";

  const animationDirection = direction === "left" ? "forwards" : "reverse";

  return (
    <div
      className={`relative overflow-hidden w-screen mask-image [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ${className}`}
    >
      <ul
        className={`flex w-max gap-16 py-4 animate-scroll ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animationDuration: duration,
          animationDirection: animationDirection,
        }}
      >
        {[...items, ...items].map((team, idx) => (
          <li key={idx} className="min-w-[18rem] flex-shrink-0">
            <Link
              href={team.open ? `/teams/${encodeURIComponent(team.name)}` : "#"}
            >
              <div
                className={`relative rounded-2xl overflow-hidden shadow-lg group transition transform hover:-translate-y-2 hover:shadow-2xl duration-300 border-4 border-[#b30000] ${
                  team.open
                    ? "cursor-pointer"
                    : "pointer-events-none opacity-60"
                }`}
              >
                <Image
                  src={team.img}
                  alt={team.name}
                  width={400}
                  height={300}
                  className="w-full h-100 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 flex flex-col justify-end p-4">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    {team.name}
                    {!team.open && (
                      <Lock size={16} className="text-gray-400" />
                    )}
                  </h3>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
