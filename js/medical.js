const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const navAnchors = document.querySelectorAll('.nav-links a');
const yearSpan = document.getElementById('year');
const reportButtons = document.querySelectorAll('[data-report]');
const reportModal = document.getElementById('report-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalAction = document.getElementById('modal-action');
const modalClose = document.querySelector('.modal-close');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevButton = document.querySelector('.slider-control.prev');
const nextButton = document.querySelector('.slider-control.next');
const contactForm = document.getElementById('contact-form');
const feedback = document.querySelector('.form-feedback');

const reportContent = {
    sepsis: {
        title: 'Sepsis Recognition & Resuscitation Guide',
        description:
            'This 28-page packet includes evidence-based algorithms, case vignettes, rapid assessment tools, and faculty discussion notes to streamline small group teaching.',
        action: '#'
    },
    'hf-model': {
        title: 'Heart Failure Readmission Predictive Model',
        description:
            'Executive summary of a logistic regression model integrating social determinants of health metrics, with implementation checklist and QI roadmap.',
        action: '#'
    },
    analytics: {
        title: 'Learner Progress Analytics Dashboard',
        description:
            'Secure Tableau dashboard request form with anonymized cohort benchmarks, reflective themes, and skills tracking exports.',
        action: '#'
    }
};

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (entry.isIntersecting) {
                navAnchors.forEach(anchor => anchor.classList.remove('active'));
                if (link) {
                    link.classList.add('active');
                }
            }
        });
    },
    { rootMargin: '-45% 0px -50% 0px' }
);

document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

navAnchors.forEach(anchor =>
    anchor.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
    })
);

yearSpan.textContent = new Date().getFullYear();

reportButtons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.dataset.report;
        const content = reportContent[key];
        if (!content) return;
        modalTitle.textContent = content.title;
        modalDescription.textContent = content.description;
        modalAction.href = content.action;
        modalAction.textContent = key === 'analytics' ? 'Request Access' : 'Download';
        reportModal.classList.add('active');
        reportModal.setAttribute('aria-hidden', 'false');
    });
});

const closeModal = () => {
    reportModal.classList.remove('active');
    reportModal.setAttribute('aria-hidden', 'true');
};

modalClose?.addEventListener('click', closeModal);
reportModal?.addEventListener('click', event => {
    if (event.target === reportModal) {
        closeModal();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

let activeIndex = 0;

const updateTestimonials = index => {
    testimonialCards.forEach((card, idx) => {
        card.classList.toggle('active', idx === index);
    });
};

const nextTestimonial = () => {
    activeIndex = (activeIndex + 1) % testimonialCards.length;
    updateTestimonials(activeIndex);
};

const prevTestimonial = () => {
    activeIndex = (activeIndex - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonials(activeIndex);
};

nextButton?.addEventListener('click', nextTestimonial);
prevButton?.addEventListener('click', prevTestimonial);

setInterval(nextTestimonial, 8000);

const validateForm = formData => {
    const errors = [];
    if (!formData.get('name')) errors.push('Please enter your name.');
    if (!formData.get('email')) errors.push('Please enter your email.');
    if (!formData.get('interest')) errors.push('Please choose an area of interest.');
    if (!formData.get('message')) errors.push('Tell me about your goals.');
    return errors;
};

contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const errors = validateForm(formData);
    if (errors.length) {
        feedback.textContent = errors[0];
        feedback.style.color = '#d9534f';
        return;
    }
    feedback.textContent = 'Thank you! Your message has been received. I will be in touch soon.';
    feedback.style.color = 'var(--accent)';
    contactForm.reset();
});
