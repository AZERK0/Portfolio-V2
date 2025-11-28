import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: createAuthorSchema()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          links: z.array(createButtonSchema()),
          images: z.array(createImageSchema())
        }),
        logos: z.object({
          title: z.string(),
          icons: z.array(z.object({
            name: z.string(),
            text: z.string()
          }))
        }).optional(),
        about: createBaseSchema(),
        studies: z.object({
          headline: z.string(),
          title: z.string(),
          description: z.string(),
          items: z.array(z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string(),
            image: z.string()
          }))
        }).optional(),
        experience: createBaseSchema().extend({
          items: z.array(z.object({
            date: z.string(),
            position: z.string(),
            company: z.object({
              name: z.string(),
              url: z.string(),
              logo: z.string().editor({ input: 'icon' }),
              color: z.string()
            })
          }))
        }),
        pricing: z.object({
          headline: z.string(),
          title: z.string(),
          description: z.string(),
          plan: z.object({
            title: z.string(),
            description: z.string(),
            price: z.string().or(z.number()),
            cycle: z.string(),
            highlight: z.boolean().optional(),
            align: z.string().optional(),
            button: createButtonSchema(),
            features: z.array(z.string())
          })
        }).optional(),
        testimonials: z.array(createTestimonialSchema()).optional(),
        blog: createBaseSchema().optional(),
        faq: createBaseSchema().extend({
          categories: z.array(
            z.object({
              title: z.string().nonempty(),
              questions: z.array(
                z.object({
                  label: z.string().nonempty(),
                  content: z.string().nonempty()
                })
              )
            }))
        }).optional(),
        cta: z.object({
          title: z.string(),
          description: z.string(),
          links: z.array(createButtonSchema())
        }).optional()
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        url: z.string().optional(),
        tags: z.array(z.string()).optional(),
        date: z.date().or(z.string()),
        otherImages: z.array(z.string()).optional(),
        video: z.string().optional(),
        badge: z.object({
          label: z.string(),
          color: z.string(),
          variant: z.string()
        }).optional(),
        category: z.string().optional(),
        alert: z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string(),
          color: z.string(),
          variant: z.string()
        }).optional()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        minRead: z.number().optional(),
        date: z.date(),
        image: z.string().nonempty().editor({ input: 'media' }),
        author: createAuthorSchema()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'blog.yml' }
      ],
      schema: z.object({
        links: z.array(createButtonSchema()).optional()
      })
    }),
    speaking: defineCollection({
      type: 'page',
      source: 'speaking.yml',
      schema: z.object({
        links: z.array(createButtonSchema()),
        events: z.array(z.object({
          category: z.enum(['Live talk', 'Podcast', 'Conference']),
          title: z.string(),
          date: z.date().or(z.string()),
          location: z.string(),
          url: z.string().optional()
        }))
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        content: z.string().optional(),
        images: z.array(createImageSchema()).optional(),
        info: z.object({
          name: z.string(),
          birthdate: z.string(),
          location: z.string()
        }).optional(),
        quote: z.string().optional()
      })
    })
  }
})
