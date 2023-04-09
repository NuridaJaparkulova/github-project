const mainEl = document.querySelector('.main')
const wrapper = document.createElement('div')
wrapper.className = 'wrapper'

const formTag = document.createElement('form')
formTag.className = 'main__form'
const inpTag = document.createElement('input') 
inpTag.className = 'main__inp'
inpTag.setAttribute('name', 'name')
const btnTag = document.createElement('button')
btnTag.setAttribute('type', 'submit')
btnTag.innerText = 'поиск'
btnTag.className = 'main__btn'
formTag.appendChild(inpTag)
formTag.appendChild(btnTag)
mainEl.appendChild(formTag)

formTag.addEventListener('submit', async (e) => {
    e.preventDefault()
    const inpVal = Object.fromEntries(new FormData(e.target))
    inpTag.value = ''
    const resp = await fetch(`https://api.github.com/users/${inpVal.name}`);
   if(resp.ok) {
        const data = await resp.json()
        wrapper.appendChild(creatProfile(data))
        mainEl.appendChild(wrapper)
        return data
   } else {
       alert ('Пользователь не найден');   
   }
})

const creatProfile = (profileData) => {
    const element = document.createElement('div')
    element.className = 'profile'
    element.innerHTML = `
        <img src="${profileData.avatar_url}"  class="search-img">
        <p class="search__text"><span>Name: </span>${profileData.name}</p>
        <p class="search__text"><span>City: </span>${profileData.location}</p>
        <p class="search__text"><span>About me </span>${profileData.bio}</p>
    `
    element.appendChild(profileDelete())
    return element
}

const profileDelete = () => {
    const element = document.createElement('button')
    element.className = 'delete_btn'
    element.innerText = 'delete'
    element.addEventListener('click', (e) => {
        wrapper.innerHTML = ''
    })
    return element
}