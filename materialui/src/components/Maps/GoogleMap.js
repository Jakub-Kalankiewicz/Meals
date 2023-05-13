import GoogleMapReact from "google-map-react";

function GoogleMap(props) {
  const center = { lat: props.lat, lng: props.lng };
  const zoom = 15;

  return (
    <div style={{ height: "350px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      />
    </div>
  );
}

export default GoogleMap;
