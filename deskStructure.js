export const myStructure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Ustawienia strony')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')),
            ...S.documentTypeListItems().filter(listItem => !['siteSettings'].includes(listItem.getId()))
  ]);