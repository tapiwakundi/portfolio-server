import { list } from '@keystone-6/core';

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
} from '@keystone-6/core/fields';

import { cloudinaryImage } from '@keystone-6/cloudinary';
import { Lists } from '.keystone/types';
require('dotenv').config({})

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      experience: relationship({ ref: 'Experience.user', many: true }),
      projects: relationship({ ref: 'Project.user', many: true }),
      articles: relationship({ ref: 'Article.user', many: true })
    },
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
  }),
  Experience: list({
    fields: {
      companyName: text(),
      position: text(),
      description: text({
        ui: {
          displayMode: 'textarea'
        }
      }),
      user: relationship({ ref: 'User.experience' })
    }
  }),
  Project: list({
    fields: {
      name: text(),
      organization: text(),
      shortDescription: text({
        ui: {
          displayMode: 'textarea'
        }
      }),
      challenges: relationship({ ref: 'ProjectChallenge.project', many: true }),
      technologies: text(),
      features: text({
        ui: {
          displayMode: 'textarea'
        }
      }),
      sourceCodeUrl: text({}),
      liveSiteUrl: text(),
      objective: text({
        ui: {
          displayMode: 'textarea'
        }
      }),
      year: integer(),
      majorTasks: text({
        ui: {
          displayMode: 'textarea'
        }
      }),
      user: relationship({ ref: 'User.projects' }),
      images: relationship({ ref: 'Image', many: true }),
      thumbnail: relationship({ ref: 'Image' }),
      banner: relationship({ ref: 'Image' })
    }
  }),
  ProjectChallenge: list({
    fields: {
      name: text(),
      description: text({
        ui: {
          displayMode: 'textarea'
        }
      }),
      project: relationship({ ref: 'Project.challenges' })
    }
  }),
  Article: list({
    fields: {
      name: text(),
      url: text({}),
      date: text({}),
      user: relationship({ ref: 'User.articles' }),
      thumbnail: relationship({ ref: 'Image' })
    }
  }),
  Image: list({
    fields: {
      for: select({
        options: [
          { label: 'Thumbnail', value: 'thumbnail' },
          { label: 'Extra', value: 'extra' }
        ]
      }),
      fieldName: cloudinaryImage({
        cloudinary: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
          apiKey: process.env.CLOUDINARY_API_KEY!,
          apiSecret: process.env.CLOUDINARY_API_SECRET!,
          folder: process.env.CLOUDINARY_API_FOLDER!,
        },
      }),
    }
  })
};
