// ── Inject the site's actual stylesheets into the preview pane ──
CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Lato:wght@300;400;700&display=swap');
CMS.registerPreviewStyle('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
CMS.registerPreviewStyle('/reset.css');
CMS.registerPreviewStyle('/style.css');

// ── Helper: safely convert Immutable.js value to plain JS ──
function val(entry, path) {
  var v = entry.getIn(['data'].concat(path));
  return v && v.toJS ? v.toJS() : (v !== undefined ? v : '');
}

// ── Home Page Preview Template ──
var HomePreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var getAsset = this.props.getAsset;

    // Pull data
    var hero         = val(entry, ['hero'])         || {};
    var services     = val(entry, ['services'])     || {};
    var about        = val(entry, ['about'])        || {};
    var testimonials = val(entry, ['testimonials']) || {};
    var stats        = val(entry, ['stats'])        || [];
    var gallery      = val(entry, ['gallery'])      || {};
    var contact      = val(entry, ['contact'])      || {};
    var footer       = val(entry, ['footer'])       || {};

    // Resolve uploaded images (returns blob URL during editing)
    var heroBg    = getAsset(hero.bg_image)  || hero.bg_image  || '';
    var aboutPhoto = getAsset(about.photo)   || about.photo    || '';

    return h('div', { style: { fontFamily: 'Lato, sans-serif' } },

      // ── HERO ──
      h('section', { className: 'hero', id: 'home' },
        h('div', { className: 'hero__overlay', 'aria-hidden': 'true' }),
        h('img', {
          className: 'hero__bg',
          src: heroBg.toString ? heroBg.toString() : heroBg,
          alt: 'Hero background'
        }),
        h('div', { className: 'container hero__content' },
          h('p',  { className: 'hero__eyebrow' }, hero.eyebrow),
          h('h1', { className: 'hero__title' }, hero.title, h('br'), hero.title_sub),
          h('p',  { className: 'hero__lead' }, hero.lead),
          h('div', { className: 'hero__actions' },
            h('a', { className: 'btn btn--primary' }, hero.cta_primary_text),
            h('a', { className: 'btn btn--outline' }, hero.cta_secondary_text)
          )
        )
      ),

      // ── SERVICES ──
      h('section', { className: 'services section section--alt', id: 'services' },
        h('div', { className: 'container' },
          h('div', { className: 'section-header' },
            h('span', { className: 'section-header__eyebrow' }, services.eyebrow),
            h('h2',  { className: 'section-header__title' }, services.title),
            h('div', { className: 'divider' }),
            h('p',   { className: 'section-header__subtitle' }, services.subtitle)
          ),
          h('ul', { className: 'services__grid' },
            (services.items || []).map(function (s, i) {
              return h('li', { key: i, className: 'service-card' },
                h('h3', { className: 'service-card__title' }, s.title),
                h('p',  { className: 'service-card__text' }, s.description)
              );
            })
          )
        )
      ),

      // ── ABOUT ──
      h('section', { className: 'about section', id: 'about' },
        h('div', { className: 'container about__inner' },
          h('div', { className: 'about__image-wrap' },
            h('img', {
              className: 'about__photo',
              src: aboutPhoto.toString ? aboutPhoto.toString() : aboutPhoto,
              alt: about.photo_alt
            }),
            h('div', { className: 'about__badge' },
              h('span', { className: 'about__badge-number' }, about.experience_years),
              h('span', { className: 'about__badge-label' }, 'Years of Experience')
            )
          ),
          h('div', { className: 'about__body' },
            h('span', { className: 'section-header__eyebrow' }, about.eyebrow),
            h('h2',   { className: 'about__title' }, about.name),
            h('div',  { className: 'divider', style: { margin: '0.75rem 0 1.25rem' } }),
            h('p',    { className: 'about__text' }, about.bio1),
            h('p',    { className: 'about__text' }, about.bio2),
            h('ul', { className: 'about__highlights' },
              (about.highlights || []).map(function (item, i) {
                return h('li', { key: i }, item);
              })
            ),
            h('a', { className: 'btn btn--primary about__cta' }, about.cta_text)
          )
        )
      ),

      // ── TESTIMONIALS ──
      h('section', { className: 'testimonials section section--alt', id: 'testimonials' },
        h('div', { className: 'container' },
          h('div', { className: 'section-header' },
            h('span', { className: 'section-header__eyebrow' }, testimonials.eyebrow),
            h('h2',   { className: 'section-header__title' }, testimonials.title),
            h('div',  { className: 'divider' }),
            h('p',    { className: 'section-header__subtitle' }, testimonials.subtitle)
          ),
          h('ul', { className: 'testimonials__grid' },
            (testimonials.items || []).map(function (t, i) {
              var avatar = getAsset(t.avatar) || t.avatar || '';
              return h('li', { key: i, className: 'testimonial-card' },
                h('div', { className: 'testimonial-card__stars' }, '\u2605\u2605\u2605\u2605\u2605'),
                h('blockquote', { className: 'testimonial-card__quote' }, '\u201C' + t.quote + '\u201D'),
                h('div', { className: 'testimonial-card__author' },
                  h('img', {
                    className: 'testimonial-card__avatar',
                    src: avatar.toString ? avatar.toString() : avatar,
                    alt: t.name
                  }),
                  h('div', {},
                    h('strong', {}, t.name),
                    h('span',   {}, t.treatment)
                  )
                )
              );
            })
          ),
          h('ul', { className: 'stats-bar' },
            (stats || []).map(function (s, i) {
              return h('li', { key: i, className: 'stats-bar__item' },
                h('span', { className: 'stats-bar__number' }, s.number),
                h('span', { className: 'stats-bar__label' }, s.label)
              );
            })
          )
        )
      ),

      // ── GALLERY ──
      h('section', { className: 'gallery section', id: 'gallery' },
        h('div', { className: 'container' },
          h('div', { className: 'section-header' },
            h('span', { className: 'section-header__eyebrow' }, gallery.eyebrow),
            h('h2',   { className: 'section-header__title' }, gallery.title),
            h('div',  { className: 'divider' }),
            h('p',    { className: 'section-header__subtitle' }, gallery.subtitle)
          ),
          h('div', { className: 'gallery__grid' },
            (gallery.items || []).map(function (item, i) {
              var imgSrc = getAsset(item.src) || item.src || '';
              var cls = 'gallery__item'
                + (item.tall ? ' gallery__item--tall' : '')
                + (item.wide ? ' gallery__item--wide' : '');
              return h('figure', { key: i, className: cls },
                h('img', { src: imgSrc.toString ? imgSrc.toString() : imgSrc, alt: item.alt }),
                h('figcaption', {}, item.caption)
              );
            })
          )
        )
      ),

      // ── CONTACT ──
      h('section', { className: 'contact section section--alt', id: 'contact' },
        h('div', { className: 'container contact__inner' },
          h('div', { className: 'contact__info' },
            h('span', { className: 'section-header__eyebrow' }, contact.eyebrow),
            h('h2',   { className: 'contact__title' }, contact.title),
            h('div',  { className: 'divider', style: { margin: '0.75rem 0 1.5rem' } }),
            h('p',    { className: 'contact__lead' }, contact.lead),
            h('ul', { className: 'contact__details' },
              h('li', {},
                h('div', { className: 'contact__details-icon' }),
                h('div', {},
                  h('strong', {}, 'Address'),
                  h('span',   {}, contact.address)
                )
              ),
              h('li', {},
                h('div', { className: 'contact__details-icon' }),
                h('div', {},
                  h('strong', {}, 'Phone'),
                  h('span',   {}, contact.phone)
                )
              ),
              h('li', {},
                h('div', { className: 'contact__details-icon' }),
                h('div', {},
                  h('strong', {}, 'Email'),
                  h('span',   {}, contact.email)
                )
              ),
              h('li', {},
                h('div', { className: 'contact__details-icon' }),
                h('div', {},
                  h('strong', {}, 'Opening Hours'),
                  h('span',   {}, contact.hours_weekday),
                  h('span',   {}, contact.hours_weekend)
                )
              )
            )
          )
        )
      ),

      // ── FOOTER ──
      h('footer', { className: 'site-footer' },
        h('div', { className: 'site-footer__bottom' },
          h('div', { className: 'container' },
            h('p', {}, footer.tagline)
          )
        )
      )

    ); // end root div
  }
});

CMS.registerPreviewTemplate('home', HomePreview);
