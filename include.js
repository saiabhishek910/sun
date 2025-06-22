// include.js - All JavaScript functions consolidated within a single DOMContentLoaded listener

document.addEventListener('DOMContentLoaded', function() {

    // 1. Load Header and Footer HTML dynamically
    fetch("header.html")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status} for header.html`);
        return res.text();
      })
      .then(data => {
        const headerDiv = document.getElementById("header");
        if (headerDiv) {
          headerDiv.innerHTML = data;
        }
      })
      .catch(error => console.error('Error loading header.html:', error));

    fetch("footer.html")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status} for footer.html`);
        return res.text();
      })
      .then(data => {
        const footerDiv = document.getElementById("footer");
        if (footerDiv) {
          footerDiv.innerHTML = data;
        }
      })
      .catch(error => console.error('Error loading footer.html:', error));

    // 2. Vision & Mission section animation logic
    const vmSection = document.querySelector('.vm-section');
    if (vmSection) {
      function revealOnScrollVM() {
        const sectionTop = vmSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.8) {
          vmSection.classList.add('visible');
          window.removeEventListener('scroll', revealOnScrollVM);
        }
      }
      window.addEventListener('scroll', revealOnScrollVM);
      revealOnScrollVM();
    }

    // 3. Our Impact section counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    counters.forEach(counter => {
      const animate = () => {
        const value = +counter.getAttribute('data-target');
        const data = +counter.innerText.replace('+', '');
        const increment = value / speed;

        if (data < value) {
          counter.innerText = Math.ceil(data + increment);
          setTimeout(animate, 10);
        } else {
          counter.innerText = value + '+';
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(counter);
    });

    // 4. Testimonial Carousel initialization
    var myCarousel = document.querySelector('#testimonialCarousel');
    if (myCarousel) {
      new bootstrap.Carousel(myCarousel, {
        interval: 5000,
        ride: 'carousel'
      });
    }
  
    // 5. Upcoming Events Section JavaScript Logic
    const upcomingEvents = [
      {
        id: 'event1',
        name: 'Meals of Compassion: Community Feeding Drive',
        date: 'June 25, 2025',
        time: '1:00 PM - 3:00 PM',
        location: 'Guntur',
        image: 'images/event-summit.jpg', // Ensure this image path is correct or replace with placeholder
        description: 'Join us as we prepare and distribute nutritious meals to vulnerable children and families in local communities. Your help ensures no one goes hungry, spreading warmth and hope one plate at a time.'
      },
      {
        id: 'event2',
        name: 'Scribe for Sight: Exam Assistance for the Visually Impaired',
        date: 'July 10, 2025',
        time: '9:00 AM - 12:00 PM',
        location: 'Guntur',
        image: 'images/event-trees.jpg', // Ensure this image path is correct or replace with placeholder
        description: 'Volunteer your time to be a scribe for visually impaired students during their exams. Your support helps them achieve their academic dreams and overcome significant barriers, empowering them through education.'
      },
      {
        id: 'event3',
        name: 'Roadside Rescuers: Aid & Care for Homeless Individuals',
        date: 'July 15, 2025',
        time: '8:30 PM - 10:00 PM',
        location: 'Machilipatnam',
        image: 'images/event-medical.jpg', // Ensure this image path is correct or replace with placeholder
        description: 'Lend a hand as we provide essential supplies, warm clothing, and basic care to roadside individuals and the homeless. Your compassion offers dignity and immediate relief to those most in need.'
      },
      {
        id: 'event4',
        name: 'Elderly Embrace: Seniors Support & Fellowship Day',
        date: 'August 20, 2025',
        time: '2:00 PM - 5:00 PM',
        location: 'Mangalagiri',
        image: 'images/event-workshop.jpg', // Ensure this image path is correct or replace with placeholder
        description: 'Spend a heartwarming day engaging with and assisting elderly individuals in our community. We will offer companionship, distribute care packages, and provide support, ensuring our elders feel valued and remembered.'
      },
      {
        id: 'event5',
        name: 'Holistic Help: All-Ages Outreach Program',
        date: 'September 20, 2025',
        time: '2:00 PM - 5:00 PM',
        location: 'Gudivada',
        image: 'images/event-workshop.jpg', // Ensure this image path is correct or replace with placeholder
        description: 'This event is a comprehensive outreach effort touching various age groups from children to seniors. Participate in diverse activities including educational support, health awareness, and essential aid distribution, reflecting our commitment to helping everyone in need.'
      }
    ];
  
    const eventListContainer = document.getElementById('event-list-container');
    const eventDetailCard = document.getElementById('event-detail-card');
  
    if (eventListContainer && eventDetailCard) { // Only run if event containers exist
      function renderEventList() {
        eventListContainer.innerHTML = ''; // Clear existing
        upcomingEvents.forEach(event => {
          const eventItem = document.createElement('a');
          eventItem.href = "#"; // Prevent page refresh
          eventItem.classList.add('list-group-item', 'list-group-item-action', 'event-list-item', 'rounded-3');
          eventItem.setAttribute('data-event-id', event.id);
          eventItem.innerHTML = `
            <div class="d-flex align-items-center flex-grow-1">
              <img src="${event.image}" onerror="this.onerror=null; this.src='https://placehold.co/80x80/FF6B00/FFFFFF?text=Event';" class="event-list-img rounded-3 me-3" alt="${event.name}">
              <div class="flex-grow-1">
                <h5 class="event-list-title">${event.name}</h5>
                <p class="event-list-meta small text-muted mb-0">
                  <i class="bi bi-calendar-event me-1"></i> ${event.date} | ${event.time}<br>
                  <i class="bi bi-geo-alt me-1"></i> ${event.location}
                </p>
              </div>
            </div>
          `;
          eventListContainer.appendChild(eventItem);
  
          eventItem.addEventListener('click', (e) => {
            e.preventDefault();
            const clickedEventId = e.currentTarget.getAttribute('data-event-id');
            displayEventDetails(clickedEventId);
            document.querySelectorAll('.event-list-item').forEach(item => item.classList.remove('active'));
            e.currentTarget.classList.add('active');
          });
        });
      }
  
      function displayEventDetails(eventId) {
        const event = upcomingEvents.find(e => e.id === eventId);
        if (event) {
          eventDetailCard.innerHTML = `
            <img src="${event.image}" onerror="this.onerror=null; this.src='https://placehold.co/800x450/FF6B00/FFFFFF?text=Event+Details';" class="card-img-top rounded-top-3" alt="${event.name}">
            <div class="card-body p-4">
              <h3 class="card-title event-detail-title">${event.name}</h3>
              <p class="card-text event-detail-meta">
                <i class="bi bi-calendar-event me-2"></i> ${event.date} | ${event.time}<br>
                <i class="bi bi-geo-alt me-2"></i> ${event.location}
              </p>
              <p class="card-text event-detail-description">${event.description}</p>
              <a href="#event-registration-form" class="btn btn-orange mt-3">Learn More</a>
            </div>
          `;
        } else {
          eventDetailCard.innerHTML = `<div class="card-body"><p class="text-muted">Event details not found.</p></div>`;
        }
      }
  
      // Initial render on page load for Upcoming Events
      renderEventList();
      if (upcomingEvents.length > 0) {
        displayEventDetails(upcomingEvents[0].id);
        const firstListItem = document.querySelector(`.event-list-item[data-event-id="${upcomingEvents[0].id}"]`);
        if (firstListItem) {
          firstListItem.classList.add('active');
        }
      }
    }
  
  
    // 6. LLM Feature: Event Idea Generator Logic
    const generateEventIdeasBtn = document.getElementById('generateEventIdeasBtn');
    const eventPromptInput = document.getElementById('eventPrompt');
    const eventOutputDiv = document.getElementById('eventOutput');
    const eventIdeasContentDiv = document.getElementById('eventIdeasContent');
    const loadingSpinner = document.getElementById('loadingSpinner');
  
    if (generateEventIdeasBtn && eventPromptInput && eventOutputDiv && eventIdeasContentDiv && loadingSpinner) {
      generateEventIdeasBtn.addEventListener('click', async () => {
        const prompt = eventPromptInput.value.trim();
  
        if (prompt === "") {
          eventIdeasContentDiv.innerHTML = '<p class="text-danger">Please enter a prompt to generate event ideas.</p>';
          eventOutputDiv.classList.remove('d-none');
          return;
        }
  
        eventIdeasContentDiv.innerHTML = '';
        eventOutputDiv.classList.add('d-none');
        loadingSpinner.classList.add('active');
        generateEventIdeasBtn.disabled = true;
  
        try {
          let chatHistory = [];
          chatHistory.push({ role: "user", parts: [{ text: `Generate 3-5 creative and actionable event ideas for an NGO focused on student welfare and nation-building. The user prompt is: "${prompt}". Provide the ideas as a bulleted list, each with a short title and a one-sentence description. Only provide the ideas, no conversational text.` }] });
  
          const payload = { contents: chatHistory };
          // !!! IMPORTANT: PASTE YOUR GOOGLE CLOUD API KEY HERE !!!
          const apiKey = "YOUR_GENERATED_API_KEY_HERE"; // <--- REPLACE THIS EMPTY STRING WITH YOUR ACTUAL API KEY
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
  
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }
  
          const result = await response.json();
          if (result.candidates && result.candidates.length > 0 &&
              result.candidates[0].content && result.candidates[0].content.parts &&
              result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            eventIdeasContentDiv.innerHTML = marked.parse(text);
            eventOutputDiv.classList.remove('d-none');
          } else {
            eventIdeasContentDiv.innerHTML = '<p class="text-danger">Failed to generate ideas. The AI response was empty or malformed.</p>';
            eventOutputDiv.classList.remove('d-none');
            console.error('LLM response error: Empty or malformed candidates.', result);
          }
        } catch (error) {
          eventIdeasContentDiv.innerHTML = '<p class="text-danger">An error occurred while fetching ideas. Please check your network connection and the console for more details.</p>';
          eventOutputDiv.classList.remove('d-none');
          console.error('Fetch error:', error);
        } finally {
          loadingSpinner.classList.remove('active');
          generateEventIdeasBtn.disabled = false;
        }
      });
    }
  
  
    // 7. News Section animation logic
    const newsSection = document.getElementById('latest-news');
    if (newsSection) { // Check if the element exists
      const newsSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            newsSection.classList.add('visible');
            newsSectionObserver.unobserve(newsSection);
          }
        });
      }, { threshold: 0.2 });
      newsSectionObserver.observe(newsSection);
    }
  
    // 8. About Us Section animation logic
    const aboutUsSection = document.getElementById('about-us');
    const aboutContentBlocks = document.querySelectorAll('.about-content-block');
  
    if (aboutUsSection) { // Check if the main aboutUsSection element exists
      const aboutUsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            aboutUsSection.classList.add('visible');
            // Staggered animation for content blocks within About Us
            aboutContentBlocks.forEach((block, index) => {
              setTimeout(() => {
                block.classList.add('visible');
              }, index * 200 + 300); // 300ms initial delay + 200ms per block
            });
            aboutUsObserver.unobserve(aboutUsSection);
          }
        });
      }, { threshold: 0.1 }); // Trigger when 10% of the section is visible
  
      aboutUsObserver.observe(aboutUsSection);
    }
  
    // 9. How to Get Involved Section animation logic
    const getInvolvedSection = document.getElementById('get-involved');
    if (getInvolvedSection) {
      const getInvolvedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            getInvolvedSection.classList.add('visible');
            getInvolvedObserver.unobserve(getInvolvedSection);
          }
        });
      }, { threshold: 0.1 }); // Trigger when 10% of the section is visible
  
      getInvolvedObserver.observe(getInvolvedSection);
    }
  
  }); // End of single DOMContentLoaded
  
    document.addEventListener('DOMContentLoaded', function () {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  // Animate gallery items (safe, even if empty)
  galleryItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Only proceed if all required lightbox elements exist
  if (lightboxOverlay && lightboxImg && lightboxCaption && lightboxCloseBtn) {
    galleryImages.forEach(img => {
      img.addEventListener('click', function () {
        lightboxImg.src = this.src;
        lightboxCaption.textContent = this.alt;
        lightboxOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    lightboxCloseBtn.addEventListener('click', function () {
      lightboxOverlay.style.display = 'none';
      document.body.style.overflow = '';
    });

    lightboxOverlay.addEventListener('click', function (e) {
      if (e.target === lightboxOverlay) {
        lightboxOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
});


 // Video Lightbox Script
function maximizeIframe(wrapper) {
  const iframe = wrapper.querySelector("iframe");
  if (!iframe) return; // Safety check

  const src = iframe.getAttribute("src");
  const caption = iframe.getAttribute("title") || "Video Preview";

  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxIframe = document.getElementById("lightbox-iframe");
  const lightboxCaption = document.getElementById("lightbox-caption");

  if (lightboxOverlay && lightboxIframe && lightboxCaption) {
    // Auto-play added to ensure video starts when opened
    lightboxIframe.setAttribute("src", src + "?autoplay=1");
    lightboxCaption.innerText = caption;
    lightboxOverlay.style.display = "flex";
  }
}

function closeLightbox() {
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxIframe = document.getElementById("lightbox-iframe");

  if (lightboxOverlay && lightboxIframe) {
    lightboxOverlay.style.display = "none";
    // Stop video playback
    lightboxIframe.setAttribute("src", "");
  }
}

// Run after everything (DOM + resources) are fully loaded
window.addEventListener('load', () => {
  const form = document.getElementById('eventRegistrationForm');
  const eventSelect = document.getElementById('event-select');
  const eventDetailsDisplay = document.getElementById('event-details-display');
  const successMessage = document.getElementById('successMessage');

  if (form && eventSelect && eventDetailsDisplay && successMessage) {
    // Event data
    const eventsData = {
      "Environmental Cleanup Drive": { date: "2025-07-20", time: "09:00 AM", location: "Riverside Park" },
      "Community Outreach Program": { date: "2025-08-15", time: "02:30 PM", location: "Community Hall" },
      "Fundraising Gala": { date: "2025-09-10", time: "07:00 PM", location: "Grand Ballroom" },
      "Skills Workshop for Youth": { date: "2025-10-05", time: "10:00 AM", location: "Youth Center" },
      "Food Distribution Event": { date: "2025-11-22", time: "11:00 AM", location: "City Square" }
    };

    // Update Event Details Section
    const updateEventDetails = () => {
      const selectedEventName = eventSelect.value;
      if (selectedEventName && eventsData[selectedEventName]) {
        const event = eventsData[selectedEventName];
        eventDetailsDisplay.innerHTML = `
          <strong>Event Name:</strong> ${selectedEventName}<br>
          <strong>Date:</strong> ${event.date}<br>
          <strong>Time:</strong> ${event.time}<br>
          <strong>Location:</strong> ${event.location}
        `;
      } else {
        eventDetailsDisplay.innerHTML = 'Please select an event to see its date and time.';
      }
    };

    // Attach change event to dropdown
    eventSelect.addEventListener('change', updateEventDetails);
    updateEventDetails(); // Initial update

    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const volunteerName = document.getElementById('volunteer-name').value;
      const email = document.getElementById('email').value;
      const phoneNumber = document.getElementById('phone-number').value;
      const eventName = eventSelect.value;
      const suggestions = document.getElementById('suggestions').value;

      let eventDate = '', eventTime = '';
      if (eventName && eventsData[eventName]) {
        eventDate = eventsData[eventName].date;
        eventTime = eventsData[eventName].time;
      }

      const formData = {
        volunteerName,
        email,
        phoneNumber,
        eventName,
        eventDate,
        eventTime,
        suggestions
      };

      console.log('Form Data Collected:', formData);

      // Simulate success after short delay
      setTimeout(() => {
        form.reset();
        updateEventDetails();
        form.classList.add('d-none');
        successMessage.classList.remove('d-none');
        successMessage.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {

  // 10. Volunteer Registration Form (safe single-use)
  const volunteerForm = document.getElementById('volunteerRegistrationForm');
  const volunteerSuccessMsg = document.getElementById('volunteerSuccess');

  if (volunteerForm && volunteerSuccessMsg) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        skills: document.getElementById('skills').value,
        reason: document.getElementById('why-join').value
      };

      console.log('Volunteer Data:', formData);

      volunteerForm.reset();
      volunteerForm.classList.add('d-none');
      volunteerSuccessMsg.classList.remove('d-none');
    });
  }

  // 11. Member Registration Form (safe single-use)
  const memberForm = document.getElementById('individualMemberRegistrationForm');
  const memberSuccess = document.getElementById('memberSuccessMessage');

  if (memberForm && memberSuccess) {
    memberForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        firstName: document.getElementById('member-first-name').value,
        lastName: document.getElementById('member-last-name').value,
        email: document.getElementById('member-email').value,
        phone: document.getElementById('member-phone-number').value,
        dob: document.getElementById('member-dob').value,
        gender: document.getElementById('member-gender').value,
        address: document.getElementById('member-address').value,
        city: document.getElementById('member-city').value,
        state: document.getElementById('member-state').value,
        zip: document.getElementById('member-zip').value,
        howHeard: document.getElementById('member-how-heard').value,
        whyJoin: document.getElementById('member-why-join').value
      };

      console.log("Member Data:", data);

      memberForm.reset();
      memberForm.classList.add('d-none');
      memberSuccess.classList.remove('d-none');
    });
  }

});

document.addEventListener('DOMContentLoaded', function() {
            const pastEvents = [
                {
                    id: 'pastEvent1',
                    title: 'Annual Student Mentorship Summit',
                    date: 'May 15, 2024',
                    location: 'Guntur,Andhra Pradesh',
                    description: 'A flagship event connecting 500+ students with industry leaders for guidance, workshops, and career insights. Focused on skill development and professional networking.',
                    image: 'https://placehold.co/600x400/87CEEB/FFFFFF?text=Mentorship+Summit' // Sky Blue
                },
                {
                    id: 'pastEvent2',
                    title: 'Rural Education Outreach Program',
                    date: 'April 20-22, 2024',
                    location: 'Mangalagiri,Andhra Pradesh',
                    description: 'Provided essential school supplies, digital learning tools, and basic computer literacy training to 1,200 students in underserved rural areas.',
                    image: 'https://placehold.co/600x400/90EE90/FFFFFF?text=Rural+Ed+Outreach' // Light Green
                },
                {
                    id: 'pastEvent3',
                    title: 'Youth Leadership & Nation-Building Workshop',
                    date: 'March 8, 2024',
                    location: 'Sattenapalli,Andhra Pradesh',
                    description: 'An interactive workshop fostering leadership qualities, civic responsibility, and critical thinking among 300 young participants.',
                    image: 'https://placehold.co/600x400/FFB6C1/FFFFFF?text=Youth+Leadership' // Light Pink
                },
                {
                    id: 'pastEvent4',
                    title: 'Health & Wellness Camp for Students',
                    date: 'February 10, 2024',
                    location: 'Gudivada,Andhra Pradesh',
                    description: 'Organized free health check-ups, dental camps, and awareness sessions on hygiene and nutrition for over 700 students.',
                    image: 'https://placehold.co/600x400/ADD8E6/FFFFFF?text=Health+Camp' // Light Blue
                },
                {
                    id: 'pastEvent5',
                    title: 'Environmental Awareness & Tree Plantation Drive',
                    date: 'January 26, 2024',
                    location: 'Tenali,Andhra Pradesh',
                    description: 'Collaborated with local schools to plant 1,000 saplings, promoting environmental consciousness and sustainable practices.',
                    image: 'https://placehold.co/600x400/C1FFC1/000000?text=Tree+Plantation' // Pale Green
                },
                {
                    id: 'pastEvent6',
                    title: 'Digital Literacy for Seniors Initiative',
                    date: 'December 1-5, 2023',
                    location: 'Gudivada,Andhra Pradesh',
                    description: 'Trained elderly community members on basic internet usage, online safety, and digital communication tools.',
                    image: 'https://placehold.co/600x400/FFDAB9/000000?text=Digital+Literacy' // Peach
                },
                {
                    id: 'pastEvent7',
                    title: 'Art & Culture Festival for Underprivileged Children',
                    date: 'November 18, 2023',
                    location: 'Tenali,Andhra Pradesh',
                    description: 'A day of creative expression through drawing, music, and dance workshops, providing a platform for hidden talents.',
                    image: 'https://placehold.co/600x400/DDA0DD/FFFFFF?text=Art+Festival' // Plum
                },
                {
                    id: 'pastEvent8',
                    title: 'Vocational Skills Training for Young Adults',
                    date: 'October 1-15, 2023',
                    location: 'Guntur,Andhra Pradesh',
                    description: 'Provided hands-on training in various vocational skills like carpentry, tailoring, and basic electronics to empower youth with employable skills.',
                    image: 'https://placehold.co/600x400/FFC0CB/000000?text=Vocational+Training' // Pink
                }
            ];

            const eventsGrid = document.getElementById('pastEventsGrid');

            // Function to create an event card HTML
            function createEventCard(event) {
                const card = document.createElement('div');
                card.classList.add('event-card'); // Base class for styling and animation
                card.setAttribute('data-event-id', event.id); // For potential future use (e.g., detail page link)

                card.innerHTML = `
                    <img src="${event.image}" alt="${event.title}" class="event-card-image">
                    <div class="event-card-content">
                        <h3 class="event-card-title">${event.title}</h3>
                        <p class="event-card-meta">
                            <i class="bi bi-calendar-event"></i> ${event.date}<br>
                            <i class="bi bi-geo-alt"></i> ${event.location}
                        </p>
                        <p class="event-card-description">${event.description}</p>
                        <a href="#" class="event-card-button">View Details</a>
                    </div>
                `;
                return card;
            }

            // Intersection Observer for animation on scroll
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible'); // Add 'visible' class to trigger animation
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
            }, {
                threshold: 0.2, // Trigger when 20% of the element is visible
                rootMargin: '0px 0px -10% 0px' // Slightly reduce the bottom margin to trigger earlier
            });

            // Populate the grid with event cards and observe them
            pastEvents.forEach(event => {
                const card = createEventCard(event);
                eventsGrid.appendChild(card);
                observer.observe(card); // Start observing each card for intersection
            });
        });

document.addEventListener('DOMContentLoaded', function() {
            // Get elements for the form and success message
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');
            const closeSuccessMessageButton = document.getElementById('closeSuccessMessage');
            const contactFormSection = document.getElementById('contactFormSection');

            // Get elements for sections to animate
            const pageHeader = document.getElementById('pageHeader');
            const contactInfoSection = document.getElementById('contactInfoSection');

            // --- Animation Logic ---

            // For the header, we'll apply the 'visible' class directly on DOMContentLoaded
            // with a small timeout to allow initial rendering and a smoother start.
            if (pageHeader) {
                setTimeout(() => {
                    pageHeader.classList.add('visible');
                }, 100); // Small delay for header animation
            } else {
                console.error("Page header with ID 'pageHeader' not found.");
            }


            // Intersection Observer for other sections (contact info and form)
            const createObserver = (element, className, delay = 0) => {
                if (!element) return; // Ensure element exists
                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.classList.add(className);
                            }, delay);
                            obs.unobserve(entry.target); // Stop observing once visible
                        }
                    });
                }, { threshold: 0.1 }); // Trigger when 10% of element is visible
                observer.observe(element);
            };

            // Apply animations to contact sections using the observer
            createObserver(contactInfoSection, 'visible', 200); // Slight delay for info section
            createObserver(contactFormSection, 'visible', 400); // More delay for form section

            // --- Form Submission Logic ---

            if (contactForm && successMessage && closeSuccessMessageButton) {
                contactForm.addEventListener('submit', function(event) {
                    event.preventDefault(); // Prevent default form submission

                    // In a real application, you would send this data to a server
                    // using fetch() or XMLHttpRequest (e.g., to an API endpoint).
                    const formData = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        subject: document.getElementById('subject').value,
                        message: document.getElementById('message').value
                    };

                    console.log('Form Submitted Data:', formData);

                    // Simulate an asynchronous submission (e.g., network request)
                    // In a real scenario, this would be inside a .then() block of your fetch() call.
                    setTimeout(() => {
                        contactForm.classList.add('hidden'); // Hide the form
                        successMessage.classList.remove('hidden'); // Show the success message
                        // Ensure success message also animates in if it starts hidden
                        setTimeout(() => {
                             successMessage.classList.add('visible');
                        }, 50); // Small delay to allow 'hidden' to apply before 'visible' transition
                    }, 500); // Simulate a short loading time
                });

                closeSuccessMessageButton.addEventListener('click', function() {
                    successMessage.classList.add('hidden'); // Hide the success message
                    successMessage.classList.remove('visible'); // Remove animation class
                    // Add a slight delay before showing the form to ensure smooth transition
                    setTimeout(() => {
                        contactForm.classList.remove('hidden'); // Show the form again
                        contactForm.reset(); // Clear the form fields
                        // Optional: Scroll back to the form if it was off-screen
                        contactFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                });
            } else {
                console.error("One or more essential contact form elements were not found!");
                console.log("contactForm:", contactForm);
                console.log("successMessage:", successMessage);
                console.log("closeSuccessMessageButton:", closeSuccessMessageButton);
            }
        });

 document.addEventListener('DOMContentLoaded', () => {
      // Animate header
      const header = document.getElementById('pageHeader');
      header.classList.add('visible');

      // Animate FAQ section
      const section = document.getElementById('faqSection');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      observer.observe(section);

      // Accordion logic
      const items = document.querySelectorAll('.faq-item');

      items.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        button.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');

          items.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.height = 0;
          });

          if (!isOpen) {
            item.classList.add('active');
            const scrollHeight = answer.scrollHeight;
            answer.style.height = scrollHeight + 'px';
          }
        });
      });

      // Adjust height after transition ends to allow text wrapping
      window.addEventListener('resize', () => {
        document.querySelectorAll('.faq-item.active .faq-answer').forEach(answer => {
          answer.style.height = answer.scrollHeight + 'px';
        });
      });
    });