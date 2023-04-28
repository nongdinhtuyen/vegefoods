import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { Button, Input, Skeleton, Space } from 'antd';
import { useRef, useState } from 'react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';

const center = { lat: 21.0272543, lng: 105.7728563 };
function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDWTx7bREpM5B6JKdbzOvMW-RRlhkukmVE',
    libraries: ['places'],
  });

  const [map, setMap] = useState<any>(null);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [distance, setDistance] = useState<any>('');
  const [duration, setDuration] = useState<any>('');

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef<any>();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef<any>();

  if (!isLoaded) {
    return <Skeleton />;
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance?.text);
    setDuration(results.routes[0].legs[0].duration?.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
  }

  return (
    <div className=' relative flex-col items-center w-screen h-screen'>
      <div className=' absolute left-0 top-0 h-full w-full'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>
      <div className='p-4 m-4 rounded-lg bg-white shadow z-10'>
        <div className='flex justify-between gap-x-2'>
          <div className='flex-1'>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </div>
          <div className='flex-1'>
            <Autocomplete>
              <Input type='text' placeholder='Destination' ref={destiantionRef} />
            </Autocomplete>
          </div>

          <Space>
            <Button type='primary' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <Button icon={<FaTimes />} onClick={clearRoute} />
          </Space>
        </div>
        <div className='mt-4 gap-x-4 justify-between'>
          <div>Distance: {distance} </div>
          <div>Duration: {duration} </div>
          {/* <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default GoogleMaps;
