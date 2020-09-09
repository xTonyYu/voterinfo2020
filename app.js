console.log('voter info 2020')
const curAddressDOM = document.getElementById('current-address-p')
const locationNameDOM = document.getElementById('location-name')
const pollingLocationDOM = document.getElementById('polling-location')

function toggle() {
  document.getElementById('landing-container').classList.add('hidden')
  document.getElementById('form-container').classList.remove('hidden')
}
document.getElementById('get-started').addEventListener('click', toggle)

// Fetching data from Google Civic Info API and update the DOM
const voterInfo = document.getElementById('voter-info')
let addressForURL = '', data;

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

voterInfo.addEventListener('submit', e => {
  e.preventDefault();
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
    } else {
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
    } else {
      earlyLocName = ''
      earlyVoteLoc = 'Information currently not available.  Please check back later.'
    }
    // *********** DOM update here *******************

    // Dropoff location
    let dropoffLocName = '', dropoffLoc = '';
    if (data.dropOffLocations) {
      dataObj = data.dropOffLocations[0].address
      dropoffLocName = dataObj.locationName || ''
      dropoffLoc = stringAddressFieldsTogether(dataObj)
    } else {
      dropoffLocName = ''
      dropoffLoc = 'Information currently not available.  Please check back later.'
    }
    // *********** DOM update here *******************
    
    
    console.log("current address", curAddress)
    console.log("polling", locationName, pollingLocation)
    console.log("early", earlyLocName, earlyVoteLoc)
    console.log("dropoff", dropoffLocName, dropoffLoc)
  })
})

