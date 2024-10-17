async function loadMarkdown(filename, section) {
    try {
        // Fetch the Markdown file
        const response = await fetch(filename);
        const markdownText = await response.text();
        
        // Convert the Markdown to HTML
        const converter = new showdown.Converter();
        const html = converter.makeHtml(markdownText);
        console.log(html);
        
        //injecting markdown for each section
        document.getElementById(section).innerHTML = html;
    } catch (error) {
        console.error('Error loading the markdown file:', error);
    }
}


// Load the markdown content on page load
loadMarkdown("about.md", "about-me");
loadMarkdown("project.md", "projects");
loadMarkdown("skills.md" , "skills");
loadMarkdown("contact.md", "contact");

// Toggle the sidebar for mobile view
document.getElementById('menu-btn').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
});

// Add smooth scroll behavior to all sidebar links
document.querySelectorAll('#sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Highlight active section in the sidebar as the user scrolls
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionOffset = section.offsetTop - 100;

        if (scrollPos >= sectionOffset && scrollPos < sectionOffset + section.offsetHeight) {
            document.querySelector(`#sidebar a[href="#${sectionId}"]`).classList.add('active');
        } else {
            document.querySelector(`#sidebar a[href="#${sectionId}"]`).classList.remove('active');
        }
    });
});
