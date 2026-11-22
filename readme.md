IRIEBE TOWN SECONDARY SCHOOL (UBE) — WEBSITE README
===================================================

WHAT YOU HAVE
-------------
Three files make up the complete website:

  index.html   — the whole page (every section)
  styles.css   — every style in one file
  script.js    — slideshow, testimonials, menu, counters, FAQ,
                 form, scroll animations, image fallback

Keep all three in the SAME folder. Double-click index.html to open
the site. It works on Android, iPhone, tablets and laptops — the
layout adapts to any screen size automatically.

NOTE: if your downloads ended with ".txt" (e.g. index.html.txt),
rename them to remove the ".txt" before use.


WHAT IS ALREADY LIVE
--------------------
- Every photo and the classroom video load from the internet
  (Unsplash / Pexels). Nothing on the page is empty.
- The first time the site opens it needs an internet connection;
  after that the browser caches the images.
- If any image or video ever fails to load, it is automatically
  replaced with a branded purple/pink placeholder — no blank spots.


USING THE SCHOOL'S OWN PHOTOS, LOGOS AND VIDEO
----------------------------------------------
1. In the same folder as index.html, create a folder called: images
2. Put these files inside it (exact names):
     school-logo.png    — the school crest (header + footer)
     new-tech-logo.png  — the New Technologies logo (footer credit)
3. To replace any online photo with a real school photo, copy the
   photo into the images folder, then in index.html find the
   matching <img ...> line and change its src, e.g.:
     from: src="https://images.unsplash.com/photo-..."
     to:   src="images/assembly-ground.jpg"
4. To use the school's own video, replace the <source src="...">
   in the About section with:  src="images/school-video.mp4"
   (MP4 format, keep the file under ~20 MB for fast loading).

The hero slideshow currently has 6 photos cycling every 5 seconds.
To make it 7, copy one <img class="hero-slide" ...> line and add
your own.


THINGS TO EDIT (currently placeholders)
---------------------------------------
Search index.html for these and replace with the real details:
  - Phone:    +234 800 000 0000
  - Email:    info@iriebetownsec-ube.edu.ng
  - Stats:    1,200+ students / 45+ staff / 18 subjects
  - Head Teacher's name and portrait
  - Testimonial names (currently "Former Student" etc.)
  - Social media links (all currently "#")


RECEIVING REAL MESSAGES FROM THE CONTACT FORM
---------------------------------------------
The form currently shows a thank-you note only. To receive messages
by email (free):
1. Go to https://formspree.io and create a free form.
2. In index.html, change the form tag to:
     <form class="contact-form reveal" id="contactForm"
           action="https://formspree.io/f/YOURCODE" method="POST">
3. In script.js, delete the whole "Contact form (demo submit)" block.


PUTTING THE SITE ON THE INTERNET (FREE)
---------------------------------------
Any of these will host it at no cost:
  - Netlify  : netlify.com — drag the whole folder onto the page.
  - Vercel   : vercel.com — import the folder.
  - GitHub Pages: create a repo, upload the files, enable Pages.
You will get a web address (e.g. iriebetownss.netlify.app) you can
share with parents and students. A custom address like
www.iriebetownsec-ube.edu.ng can be pointed at it later.


BUILT BY
--------
New Technologies
