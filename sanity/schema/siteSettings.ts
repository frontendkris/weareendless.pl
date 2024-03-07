import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Ustawienia strony',
  type: 'document',
  fields: [
    defineField({
      name: 'massIntentions',
      type: 'blockContent',
      title: 'Intencje Mszalne'
    }),
    defineField({
      name: 'parishAnnouncements',
      type: 'blockContent',
      title: 'Ogłoszenia Parafialne'
    }),
    defineField({
      name: 'messes',
      title: 'Msze Święte',
      type: 'string',
    }),
    defineField({
      name: 'confession',
      title: 'Spowiedź Święta',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Nabożeństwa',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Nazwa nabożeństwa',
            type: 'string'
          },
          {
            name: 'when',
            title: 'Kiedy jest organizowane',
            type: 'string'
          },
        ],
      }],
    }),
    defineField({
      name: 'office',
      title: 'Biuro parafialne',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'day',
            title: 'Dzień',
            type: 'string'
          },
          {
            name: 'hours',
            title: 'Godziny otwarcia',
            type: 'string'
          },
          {
            name: 'note',
            title: 'Adnotacja',
            type: 'string'
          },
        ],
        preview: {
          select: {
            title: 'day',
            hours: 'hours',
            note: 'note',
          },
          prepare(selection) {
            const { title, hours, note } = selection;
            return {
              title: `${title}:  ${hours}${!!note ? ', ' + note : ''}`,
            }
          },
        },
      }],
    }),
    defineField({
      name: 'phone',
      title: 'Numer telefonu',
      type: 'string',
    }),
    defineField({
      name: 'bankAccount',
      title: 'Konto bankowe',
      type: 'string',
    }),
    defineField({
      name: 'galleryLinks',
      title: 'Galeria',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'year',
            title: 'Rok',
            type: 'number'
          },
          {
            name: 'albums',
            title: 'Albumy',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Nazwa wydarzenia',
                  type: 'string'
                },
                {
                  name: 'date',
                  title: 'Data',
                  type: 'date'
                },
                {
                  name: 'link',
                  title: 'Link udostępniania',
                  type: 'string',
                  validation: Rule => Rule.required().uri({
                    allowRelative: false,
                    scheme: ['http', 'https'],
                  })
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  link: 'link',
                },
                prepare(selection) {
                  const { title, link } = selection;
                  return {
                    title: `${title} ${!!link === false ? '– brak linku' : ''}`,
                  }
                }
              },
            }]
          },
        ],
        preview: {
          select: {
            title: 'year',
            albums: 'albums',
          },
          prepare(selection) {
            const { title, albums } = selection;
            return {
              title: `${title} (${albums.length} albumów)`,
            }
          },
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Ustawienia strony`,
      }
    },
  }
});
