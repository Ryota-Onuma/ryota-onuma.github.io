const fromLargeTablet = window.matchMedia('(min-width: 1024px)');
const tocSticky = document.querySelector("#toc .sticky")
if (fromLargeTablet.matches && tocSticky) {
    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            tocSticky.style.top = "20px";
        } else {
            tocSticky.style.top = null;
        }
    });
}

const updateActiveClasses = () => {
    const headers = document.querySelectorAll('#article h1:not(.article-title), #article h2:not(.article-title), #article h3:not(.article-title)');
    const links = document.querySelectorAll('#TableOfContents a');
    for (let i = 0; i < headers.length; i++) {
        const rect = headers[i].getBoundingClientRect();
        const nextRect = headers[i + 1] ? headers[i + 1].getBoundingClientRect() : null;
        if (rect.top >= 0 && rect.top <= window.innerHeight || (rect.top < 0 && nextRect && nextRect.top > window.innerHeight)) {
            links[i].classList.add('active');
        } else {
            links[i].classList.remove('active');
        }
    }
}
window.addEventListener('load', updateActiveClasses);
window.addEventListener('resize', updateActiveClasses);
window.addEventListener('scroll', updateActiveClasses);

