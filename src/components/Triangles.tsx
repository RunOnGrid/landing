// src/components/Triangles.tsx
import React from "react";

const Triangles: React.FC = () => {
  const items = [
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/6e1cb7d7-75d2-4ed4-45b7-e896d90ef800/public",
      pos: "top-[65%] left-[89%] w-[250px] z-10",
      anim: "animate-[float-xl_7s_ease-in-out_infinite]",
      delay: "0s",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/fff70f1a-fae7-4a6a-1dce-352ef9e50b00/public",
      pos: "top-[60%] left-[83%] w-[260px]",
      anim: "animate-[float-lg_6s_ease-in-out_infinite]",
      delay: "0.6s",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/701772cd-ce71-4bc7-6ecc-58c5268db100/public",
      pos: "top-[18%] left-[94%] w-[250px]",
      anim: "animate-[float-xl_8s_ease-in-out_infinite]",
      delay: "1.2s",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/a1c59744-7029-45c4-e67e-97078b3cc300/public",
      pos: "top-[35%] left-[92%] w-[220px]",
      anim: "animate-[float-lg_6.5s_ease-in-out_infinite]",
      delay: "1.8s",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/dc09739e-537c-43a4-d17a-5f6ccff4ff00/public",
      pos: "top-[60%] left-[75%] w-[130px] z-10",
      anim: "animate-[float-xl_7.5s_ease-in-out_infinite]",
      delay: "2.2s",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/fbcb78e8-b581-460e-85e0-f71daf745000/public",
      pos: "top-[52%] left-[70.5%] w-[150px]",
      anim: "animate-[float-lg_6.2s_ease-in-out_infinite]",
      delay: "2.8s",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/a9c40340-bfb1-45b1-5eea-893350486700/public",
      pos: "top-[20%] left-[75%] w-[270px]",
      anim: "animate-[float-xl_8.5s_ease-in-out_infinite]",
      delay: "3.2s",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/845e1bda-6745-48bf-38f2-422884b6e200/public",
      pos: "top-[20%] left-[68%] w-[220px]",
      anim: "animate-[float-lg_6.8s_ease-in-out_infinite]",
      delay: "3.8s",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/daaaa43b-fc02-4631-a858-0c40c9db0f00/public",
      pos: "top-[18%] left-[38%] w-[500px] z-0",
      anim: "animate-[float-xl_9s_ease-in-out_infinite]",
      delay: "4.2s",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/cbfb456d-906d-4ac1-8d12-3d0162d0a300/public",
      pos: "top-[47%] left-[60%] w-[200px] z-10",
      anim: "animate-[float-lg_7s_ease-in-out_infinite]",
      delay: "4.8s",
    },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none select-none absolute inset-0 h-full w-full hidden md:block"
    >
      {items.map((t, i) => (
        <img
          key={i}
          src={t.src}
          alt=""
          className={[
            "absolute transform-gpu will-change-transform",
            "brightness-110 drop-shadow-[0_0_28px_rgba(54,176,121,0.45)]",
            t.anim,
            t.pos,
          ].join(" ")}
          style={{
            animationDelay: t.delay as React.CSSProperties["animationDelay"],
          }}
        />
      ))}
    </div>
  );
};

export default Triangles;
