(function () {
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
  const INDEX_URL = BASE_URL + '/api/v1/users/'
  //const AVATAR_URL = BASE_URL + '/api/photos/'
  const data = []
  const dataPanel = document.getElementById('data-panel')

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    //console.log(data)
    displayDataList(data)
  }).catch((err) => console.log(err))


  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    console.log(event.target)
    if (event.target.matches('.avatar')) {
      console.log(event.target.dataset.id)  // modify here
      showPerson(event.target.dataset.id)
    }
  })




  // display user list
  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {

      htmlContent += `
      <div class="col-sm-2">
        <div class="card mb-4">
          <img src="${item.avatar}" alt="Avatar" class="avatar" data-id="${item.id}" data-toggle="modal" data-target="#show-personal-modal">
          <h6>${item.name} ${item.surname}</h6>
        </div>
      </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }



  // show personal information
  function showPerson(id) {
    // get elements
    const modalName = document.getElementById('show-name')
    const modalImage = document.getElementById('show-personal-image')
    const modalEmail = document.getElementById('show-personal-email')
    const modalGender = document.getElementById('show-personal-gender')
    const modalAge = document.getElementById('show-personal-age')
    const modalRegion = document.getElementById('show-personal-region')
    const modalBirthday = document.getElementById('show-personal-birthday')
    const modalUpdate = document.getElementById('show-personal-updated')

    // set request url
    const url = INDEX_URL + id
    console.log(url)

    // send request to show api
    axios.get(url).then(response => {
      const data = response.data
      console.log(data)


      // insert data into modal ui
      modalName.textContent = data.name + " " + data.surname
      modalImage.innerHTML = `<img src="${data.avatar}" class="img-fluid" alt="Responsive image">`
      modalEmail.textContent = "Email:   " + data.email
      modalGender.textContent = "Gender:  " + data.gender
      modalAge.textContent = "Age:     " + data.age
      modalRegion.textContent = "Region:  " + data.region
      modalBirthday.textContent = "Birthday: " + data.birthday
      modalUpdate.textContent = "Latest Update: " + data.updated_at

    })
  }

})()
