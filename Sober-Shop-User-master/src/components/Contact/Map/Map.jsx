import React from "react";

export default function Map() {
  return (
    <div className="google-map" style={{ height: "100%" }}>
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59568.027584418945!2d105.72570584180134!3d21.07259335937534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345522c2c40fdb%3A0xf09734667a0bd56!2zQuG6r2MgVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1667365515658!5m2!1svi!2s"
        width="100%"
        height="100%"
        frameBorder="0"
        aria-hidden="false"
        tabIndex="0"
      />
    </div>
  );
}
