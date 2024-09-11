import React from "react";
import Image from "next/image";
import Map from "../../public/assets/images/Map.png";

const MapSection: React.FC = () => {
  return (
    <div className="flex my-3">
      <Image
        src={Map}
        alt="World Sales Map"
        layout="responsive"
        className="w-full bg-card border h-auto"
      />
    </div>
  );
};

export default MapSection;
