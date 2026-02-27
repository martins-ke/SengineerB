const themeBtn = document.getElementById('theme-btn');
const body = document.getElementById('body');

themeBtn.addEventListener('click', () => {
  body.classList.toggle('light');
});

const links = document.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const sections= document.querySelectorAll(".section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element=entry.target;
        if(element.classList.contains('head')){
      entry.target.classList.add("sappear");
        }else if (element.classList.contains('intro-pic')) {
          entry.target.classList.add("sappear");
        }else if (element.classList.contains('about')) {
          entry.target.classList.add("sappear");
        }else if (element.classList.contains('toolbox')) {
          entry.target.classList.add("sappear");
        }else if (element.classList.contains('project')) {
          entry.target.classList.add("sappear");
        }else if (element.classList.contains('contact')) {
          entry.target.classList.add("sappear");
        }        
      }else{
        entry.target.classList.remove('sappear');
      }
    });
  },
{ root:null ,threshold: 0.3 }
);
sections.forEach(section => observer.observe(section));
text.forEach(t => observer.observe(t));