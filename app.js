console.log('voter info 2020')

function toggle() {
    document.getElementById('landing-container').classList.add('hidden')
    document.getElementById('form-container').classList.remove('hidden')
}
document.getElementById('get-started').addEventListener('click', toggle)

// const search = document.getElementById('voter')
// const voterInfo = document.getElementById('voter-info')
// let address = ''
// voterInfo.addEventListener('submit', e => {
//   e.preventDefault();
//   console.log(e)
//   voterInfo.querySelectorAll('input').forEach( ele => {
//     console.dir(ele.value)
//     address += `${ele.value} `
//   })
//   console.log(address)
//   const URL = 'https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyAHOsjZyYzVuSdwGFoQzKckUx7ygGZXjzQ&electionId=2000&address=' + address
//   fetch(URL).then(res => res.json())
//   .then(data => console.log(data))
// })
