console.log('voter info 2020')
const voterInfo = document.getElementById('voter-info')

const curAddressDOM = document.getElementById('current-address-p')
const locationNameDOM = document.getElementById('location-name')
const pollingLocationDOM = document.getElementById('polling-location')
const mapPollingDOM = document.getElementById('map-polling')

const earlyLocationNameDOM = document.getElementById('early-location-name')
const earlyLocationDOM = document.getElementById('early-location')
const mapEarlyLocDOM = document.getElementById('map-early-location')

const dropoffLocationNameDOM = document.getElementById('dropoff-location-name')
const dropoffLocationDOM = document.getElementById('dropoff-location')
const mapDropoffLocDOM = document.getElementById('map-dropoff-location')

const editAddressDOM = document.getElementById('edit-address')

const togglePage = function togglePage() {
  document.getElementById('landing-container').classList.toggle('hidden')
  document.getElementById('form-container').classList.toggle('hidden')
  document.getElementById('info-page-container').classList.toggle('hidden')
}


// Fetching data from Google Civic Info API and update the DOM

const stringAddressFieldsTogether = function stringAddressFieldsTogether(dataObj) {
  let address = '';
  for (let field in dataObj) {
    if (field === 'city' || field === 'state') {
      address += ', '
    } else if (field !== 'line1') {
      address += ' '
    }
    if (field !== 'locationName') {
      address += dataObj[field] 
    }
  }
  return address;
}

let mapSite =''
if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
  mapSite = 'https://maps.apple.com/?q='
} else {
  mapSite = 'https://maps.google.com/?q='
}


voterInfo.addEventListener('submit', e => {
  let addressForURL = '', data;
  e.preventDefault();
  togglePage()
  scroll(0,0)
  voterInfo.querySelectorAll('input').forEach( ele => {
    // console.dir(ele.value)
    addressForURL += `${ele.value} `
  })
  const URL = 'https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyAHOsjZyYzVuSdwGFoQzKckUx7ygGZXjzQ&electionId=2000&address=' + addressForURL
  fetch(URL).then(res => res.json())
  .then(resData => {
    data = resData
    console.log(data)
    // normalized current address
    let dataObj = data.normalizedInput
    let curAddress = stringAddressFieldsTogether(dataObj)
    curAddressDOM.innerHTML = `<p>${curAddress}</p>`
    
    // Polling location
    let locationName = '', pollingLocation = '';
    if (data.pollingLocations) {
      dataObj = data.pollingLocations[0].address
      locationName = dataObj.locationName || ''
      pollingLocation = stringAddressFieldsTogether(dataObj)
      mapPollingDOM.setAttribute('href', mapSite + pollingLocation)
    } else {
      mapPollingDOM.classList.add('hidden')
      locationName = ''
      pollingLocation = 'Information currently not available.  Please check back later.'
    }
    locationNameDOM.innerText = locationName
    pollingLocationDOM.innerText = pollingLocation

    // Early Vote location
    let earlyLocName = '', earlyVoteLoc = '';
    if (data.earlyVoteSites) {
      dataObj = data.earlyVoteSites[0].address
      earlyLocName = dataObj.locationName || ''
      earlyVoteLoc = stringAddressFieldsTogether(dataObj)
      mapEarlyLocDOM.setAttribute('href', mapSite + earlyVoteLoc)
    } else {
      mapEarlyLocDOM.classList.add('hidden')
      earlyLocName = ''
      earlyVoteLoc = 'Information currently not available.  Please check back later.'
    }
    earlyLocationNameDOM.innerText = earlyLocName
    earlyLocationDOM.innerText = earlyVoteLoc

    // Dropoff location
    let dropoffLocName = '', dropoffLoc = '';
    if (data.dropOffLocations) {
      dataObj = data.dropOffLocations[0].address
      dropoffLocName = dataObj.locationName || ''
      dropoffLoc = stringAddressFieldsTogether(dataObj)
      mapDropoffLocDOM.setAttribute('href', mapSite + dropoffLoc)
    } else {
      mapDropoffLocDOM.classList.add('hidden')
      dropoffLocName = ''
      dropoffLoc = 'Information currently not available.  Please check back later.'
    }
    dropoffLocationNameDOM.innerText = dropoffLocName
    dropoffLocationDOM.innerText = dropoffLoc
    
    console.log("current address", curAddress)
    console.log("polling", locationName, pollingLocation)
    console.log("early", earlyLocName, earlyVoteLoc)
    console.log("dropoff", dropoffLocName, dropoffLoc)
  })
})

editAddressDOM.addEventListener('click', togglePage)