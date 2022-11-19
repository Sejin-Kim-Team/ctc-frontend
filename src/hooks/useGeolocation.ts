import { useEffect, useState } from 'react'

export interface IGeolocationPositionError {
  readonly code: number
  readonly message: string
  readonly PERMISSION_DENIED: number
  readonly POSITION_UNAVAILABLE: number
  readonly TIMEOUT: number
}

export interface GeoLocationSensorState {
  loading: boolean
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
  error?: Error | IGeolocationPositionError
}

export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<GeoLocationSensorState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  })

  async function fetchGeolocation() {
    try {
      const result: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      })

      setState({
        loading: false,
        accuracy: result.coords.accuracy,
        altitude: result.coords.altitude,
        altitudeAccuracy: result.coords.altitudeAccuracy,
        heading: result.coords.heading,
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
        speed: result.coords.speed,
        timestamp: result.timestamp,
      })
    }
    catch (e) {
      setState(oldState => ({ ...oldState, loading: false, e }))
    }
  }

  return {
    state,
    fetchGeolocation,
  }
}
