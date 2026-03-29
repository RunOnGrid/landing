import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "18px",
          background:
            "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.18), transparent 34%), linear-gradient(180deg, #1b0c0d 0%, #030303 100%)",
          border: "2px solid rgba(255, 65, 76, 0.55)",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle at 35% 35%, #ff6972 0%, #ff414c 58%, #b42129 100%)",
            boxShadow:
              "0 0 0 3px rgba(255, 65, 76, 0.14), 0 10px 24px rgba(255, 65, 76, 0.28)",
          }}
        />
      </div>
    ),
    size,
  );
}
