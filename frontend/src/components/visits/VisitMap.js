import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Icon } from 'antd'
import moment from 'moment'
moment.locale('es')

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
    <div className="map" style={{ border: '2px solid rgba(128, 0, 128, 1)', marginRight: '3px', marginBottom: '3px' }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => setViewport(viewport)}
        map
      >
        {visits &&
          visits.length > 0 &&
          visits.map(visit => {
            if (
              visit.customer &&
              visit.customer.location &&
              visit.customer.location.coordinates &&
              visit.customer.location.coordinates.length === 2
            )
              return (
                <Marker
                  key={visit._id}
                  latitude={visit.customer.location.coordinates[1]}
                  longitude={visit.customer.location.coordinates[0]}
                >
                  <button className="marker-btn" onClick={e => selectVisit(e, visit)}>
                    <Icon type="calendar" style={{ fontSize: '25px', color: 'rgba(128, 0, 128, 1)' }} />
                  </button>
                </Marker>
              )
            else return ''
          })}

        {selectedVisit &&
          selectedVisit.customer &&
          selectedVisit.customer.location &&
          selectedVisit.customer.location.coordinates &&
          selectedVisit.customer.location.coordinates.length === 2 && (
            <Popup
              latitude={selectedVisit.customer.location.coordinates[1]}
              longitude={selectedVisit.customer.location.coordinates[0]}
              onClose={clearVisitSelection}
            >
              <div>
                <div>
                  <b>{`${moment(selectedVisit.start).format('DD/MM/YY')}  ${moment(selectedVisit.start).format(
                    'HH:mm'
                  )}-${moment(selectedVisit.end).format('HH:mm')}`}</b>
                </div>
                <div>
                  <span>{selectedVisit.customer ? `${selectedVisit.customer.name}` : 'Sin cliente'}</span>
                  <span>
                    {selectedVisit.user
                      ? ` (${selectedVisit.user.firstname}. ${selectedVisit.user.surname})`
                      : ' (Sin comercial)'}
                  </span>
                </div>
              </div>
            </Popup>
          )}
      </ReactMapGL>
    </div>
  )
}

export default VisitMap
