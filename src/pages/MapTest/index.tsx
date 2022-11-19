import { useEffect, useRef } from 'react'
import { useGeolocation } from '@/hooks/useGeolocation'

export default function MapTest() {
  const mapRef = useRef<HTMLDivElement>(null)
  const { state: geolocation, fetchGeolocation } = useGeolocation()

  useEffect(() => {
    const { naver } = window
    if (!mapRef.current || !naver || geolocation.loading)
      return

    const location = new naver.maps.LatLng(geolocation.latitude!, geolocation.longitude!)
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    }
    const map = new naver.maps.Map(mapRef.current, mapOptions)
    const marker = new naver.maps.Marker({ position: location })

    marker.setMap(map)
  }, [geolocation])

  function onClickBtn() {
    fetchGeolocation()
  }

  return (
    <div className="w-full flex justify-center mt-8">
      <button onClick={onClickBtn}>
        Load Geolocation
      </button>
      <div ref={mapRef} className="w-[600px] h-[600px]">
        Hello Map
      </div>
    </div>
  )
}
