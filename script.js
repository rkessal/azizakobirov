document.addEventListener("DOMContentLoaded", main);

function main () {
  gsap.registerPlugin(ScrollTrigger) 
  lenis()

  const [_, ...sections] = document.querySelectorAll('.section__wrapper')

  ScrollTrigger.create({
      trigger: '.sections__container',
      start: 'top top',
      scrub: 0.1,
      fastScrollEnd: true,
      onUpdate: (self) => onUpdate(self, sections)
  })
}

function mapToValidRange(value) {
  if (value >= 0 && value <= 5) return 0;
  if (value >= 95 && value <= 100) return 100;
  if (value >= 25 && value <= 30) return 25;
  return value;
}

function onUpdate(self, sections) {
  const { progress } = self;
  const numSections = sections.length;
  const progressPerSection = 1 / numSections;

  sections.forEach((section, i) => {
    if (i === section.length - 1) return;
    const startProgress = i * progressPerSection;
    const endProgress = (i + 1) * progressPerSection;
    const sectionProgress = (progress - startProgress) / progressPerSection;

    if (progress >= startProgress && progress < endProgress) {
      const [imageWrapper] = section.querySelectorAll('.section__image__wrapper');
      const clipPathSection = mapToValidRange(100 - sectionProgress * 100)
      const clipPathImage = mapToValidRange(25 - sectionProgress * 25)
      gsap.to(section, {
        clipPath: `inset(${clipPathSection}% 0% 0%)`,
      })
      gsap.to(imageWrapper, {
        clipPath: `inset(${clipPathSection}% ${clipPathImage}% 0%)`,
      })
    }
  });
}

function lenis() {
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    console.log(e)
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
}
