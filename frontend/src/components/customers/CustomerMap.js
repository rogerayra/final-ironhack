import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

function CustomerMap({ customers, selectCustomer, clearCustomerSelection, selectedCustomer }) {
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
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => setViewport(viewport)}
        map
      >
        {customers &&
          customers.length > 0 &&
          customers.map(customer => {
            if (customer.location && customer.location.coordinates && customer.location.coordinates.length === 2)
              return (
                <Marker
                  key={customer._id}
                  latitude={customer.location.coordinates[1]}
                  longitude={customer.location.coordinates[0]}
                >
                  <button className="marker-btn" onClick={e => selectCustomer(e, customer)}>
                    <img src="http://cdn.onlinewebfonts.com/svg/img_124250.png" alt={customer.name} />
                  </button>
                </Marker>
              )
            else return ''
          })}

        {selectedCustomer &&
          selectedCustomer.location &&
          selectedCustomer.location.coordinates &&
          selectedCustomer.location.coordinates.length === 2 && (
            <Popup
              latitude={selectedCustomer.location.coordinates[1]}
              longitude={selectedCustomer.location.coordinates[0]}
              onClose={clearCustomerSelection}
            >
              <div>{selectedCustomer.name}</div>
            </Popup>
          )}
      </ReactMapGL>
    </div>
  )
}

export default CustomerMap
