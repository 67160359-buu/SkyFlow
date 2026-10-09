const express = require('express');
const router = express.Router();
const { AIRLINES, generate200Flights } = require('./airlines-data');

const cache = new Map();
const TTL = 10 * 60 * 1000;

// API Endpoint: Get all 200 Airlines
router.get('/airlines', (req, res) => {
  const { q = '', country = '' } = req.query;
  let result = [...AIRLINES];

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(a =>
      a.name.toLowerCase().includes(query) ||
      a.code.toLowerCase().includes(query) ||
      a.country.toLowerCase().includes(query)
    );
  }

  if (country) {
    result = result.filter(a => a.country.toLowerCase() === country.toLowerCase());
  }

  res.json({
    total: AIRLINES.length,
    count: result.length,
    airlines: result
  });
});

// API Endpoint: Get All 200 Popular Flights Master Catalog
router.get('/flights/all', (req, res) => {
  const { q = '', region = '', direct = '', airline = '', maxPrice = '' } = req.query;
  const allMasterFlights = generate200Flights('BKK', 'ALL');

  let result = [...allMasterFlights];

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(f =>
      f.code.toLowerCase().includes(query) ||
      f.airline.toLowerCase().includes(query) ||
      f.airlineCode.toLowerCase().includes(query) ||
      f.to.toLowerCase().includes(query) ||
      (f.destName && f.destName.toLowerCase().includes(query)) ||
      (f.destEn && f.destEn.toLowerCase().includes(query)) ||
      (f.country && f.country.toLowerCase().includes(query))
    );
  }

  if (region && region !== 'all') {
    result = result.filter(f => f.region === region.toLowerCase());
  }

  if (airline) {
    const aQuery = airline.toLowerCase();
    result = result.filter(f =>
      f.airline.toLowerCase().includes(aQuery) ||
      f.airlineCode.toLowerCase() === aQuery
    );
  }

  if (direct === 'true' || direct === '1') {
    result = result.filter(f => f.stops === 0);
  }

  if (maxPrice && !isNaN(Number(maxPrice))) {
    result = result.filter(f => f.price <= Number(maxPrice));
  }

  res.json({
    total: allMasterFlights.length,
    count: result.length,
    flights: result
  });
});

// API Endpoint: Get 200 Flights for requested route & date
router.get('/flights', async (req, res) => {
  let { from = 'BKK', to = 'SIN', date = '', airline = '', direct = '' } = req.query;

  from = String(from).toUpperCase().slice(0, 3);
  to = String(to).toUpperCase().slice(0, 3);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    date = new Date().toISOString().split('T')[0];
  }

  const key = process.env.FLIGHTAPI_KEY || '6ac915800d589104633ed86f';
  const ck = `${from}-${to}-${date}`;

  // Check in-memory cache first
  const hit = cache.get(ck);
  let flights = hit && (Date.now() - hit.t < TTL) ? hit.flights : null;

  if (!flights) {
    // Generate base master 200 flights across all 200 airlines
    const masterFlights = generate200Flights(from, to, date);

    try {
      // Attempt live fetch from FlightAPI.io
      const url = `https://api.flightapi.io/onewaytrip/${key}/${from}/${to}/${date}/1/0/0/Economy/THB?region=TH`;
      const r = await fetch(url);

      if (r.ok) {
        const d = await r.json();
        const by = (arr) => Object.fromEntries((arr || []).map((x) => [x.id, x]));
        const legs = by(d.legs), segs = by(d.segments), carriers = by(d.carriers);

        const liveFlights = (d.itineraries || []).map((it) => {
          const legId = (it.leg_ids || [])[0];
          const leg = legs[legId];

          let price = null;
          if (it.pricing_options && it.pricing_options[0] && it.pricing_options[0].price) {
            price = it.pricing_options[0].price.amount || it.pricing_options[0].price.raw;
          } else if (typeof it.price === 'number') {
            price = it.price;
          } else if (it.price && typeof it.price === 'object') {
            price = it.price.raw || it.price.amount;
          }

          if (!leg || price == null) return null;

          const seg = segs[(leg.segment_ids || [])[0]] || {};
          const carrierId = (leg.marketing_carrier_ids || leg.carrier_ids || [])[0];
          const car = carriers[carrierId] || {};

          const depTime = leg.departure_time ? leg.departure_time.slice(11, 16) : String(leg.departure || '').slice(11, 16) || '10:00';
          const arrTime = leg.arrival_time ? leg.arrival_time.slice(11, 16) : String(leg.arrival || '').slice(11, 16) || '12:30';

          return {
            airline: car.name || car.display_code || 'สายการบิน',
            airlineCode: car.display_code || car.code || 'TG',
            code: `${car.display_code || car.code || ''} ${seg.marketing_flight_number || ''}`.trim(),
            dep: depTime,
            arr: arrTime,
            duration: leg.duration || 120,
            stops: leg.stop_count ?? 0,
            price: Math.round(price),
            from,
            to,
            date,
            isLive: true
          };
        }).filter(Boolean);

        if (liveFlights.length > 0) {
          // Merge live flights at the top, and backfill with master flights up to 200 flights
          const liveCodes = new Set(liveFlights.map(f => f.code));
          const remainingMaster = masterFlights.filter(f => !liveCodes.has(f.code));
          flights = [...liveFlights, ...remainingMaster].slice(0, 200);
        }
      }
    } catch (e) {
      console.warn('FlightAPI Fetch notice (using 200 master flights):', e.message);
    }

    if (!flights || flights.length < 200) {
      flights = masterFlights;
    }

    // Cache the 200 flights
    cache.set(ck, { t: Date.now(), flights });
  }

  // Apply filters if requested
  let filtered = [...flights];

  if (airline) {
    const aQuery = airline.toLowerCase();
    filtered = filtered.filter(f =>
      (f.airline && f.airline.toLowerCase().includes(aQuery)) ||
      (f.airlineCode && f.airlineCode.toLowerCase() === aQuery)
    );
  }

  if (direct === 'true' || direct === '1') {
    filtered = filtered.filter(f => f.stops === 0);
  }

  res.json({
    total: flights.length,
    count: filtered.length,
    from,
    to,
    date,
    flights: filtered
  });
});

module.exports = router;
