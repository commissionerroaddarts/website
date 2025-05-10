"use client";

export default function EstablishmentHeader({
  name,
  tagline,
  shortDis,
}: Readonly<{
  name: string;
  tagline: string;
  shortDis: string;
}>) {
  return (
    <div className=" space-y-4">
      <div className="flex flex-col gap-">
        <h1 className="text-white text-3xl font-bold">{name}</h1>
        <p className="text-gray-400 text-sm">{tagline}</p>
      </div>
      {/* <div className="flex space-x-4 my-4">
        {[
          { icon: <FaShareAlt />, label: "Share" },
          { icon: <FaBookmark />, label: "Save" },
          { icon: <FaStar />, label: "Add a review" },
        ].map((action, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg bg-gradient-to-r from-gray-200/80 to-gray-200/10 hover:bg-opacity-70 transition"
            style={{
              background:
                "linear-gradient(109.46deg, rgba(201, 201, 201, 0.8) 1.57%, rgba(196, 196, 196, 0.1) 100%)",
              // opacity: 0.5,
            }}
          >
            <div className="text-white text-xl">{action.icon}</div>
            <span className="text-white">{action.label}</span>
          </div>
        ))}
      </div> */}
      <div>
        <h2 className="text-white text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-300">{shortDis}</p>
      </div>
    </div>
  );
}
