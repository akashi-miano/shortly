const ham = document.querySelector('.mobile-nav')
const mobileNav = document.querySelector('.hero-nav__wrapper')

let isOpen = false
ham.addEventListener('click', () => {
	isOpen = true
	ham.classList.toggle('open')
	mobileNav.classList.toggle("open")
})
