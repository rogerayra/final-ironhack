import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

function VisitMap({ visits, selectVisit, clearVisitSelection, selectedVisit }) {
  const accessToken = 'pk.eyJ1Ijoicm9nZXJheXJhIiwiYSI6ImNqcWgzd2dsMTI2dTQ0NGxicXJiczQ5cXEifQ.XxSlOtI11XLzeQ-QsxlXAg'
  const [viewport, setViewport] = useState({
    latitude: 40.416775,
    longitude: -3.70379,
    width: '100%',
    height: '100%',
    zoom: 5.3
  })
  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/rogerayra/cjqil0h9i1n0t2smjfmeb2erj"
        onViewportChange={viewport => setViewport(viewport)}
        map
      >
        {visits &&
          visits.length > 0 &&
          visits.map(visit => (
            <Marker
              key={visit._id}
              latitude={visit.customer.location.coordinates[1]}
              longitude={visit.customer.location.coordinates[0]}
            >
              <button className="marker-btn" onClick={e => selectVisit(e, visit)}>
                <img src="http://cdn.onlinewebfonts.com/svg/img_124250.png" alt={visit.customer.name} />
              </button>
            </Marker>
          ))}

        {selectedVisit && (
          <Popup
            latitude={selectedVisit.customer.location.coordinates[1]}
            longitude={selectedVisit.customer.location.coordinates[0]}
            onClose={clearVisitSelection}
          >
            <div>
              <p>{`${selectedVisit.start}-${selectedVisit.end}`}</p>
              <p>{`${selectedVisit.user.firstname} ${selectedVisit.user.surname} visita ${
                selectedVisit.customer.name
              }`}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  )
}

export default VisitMap
