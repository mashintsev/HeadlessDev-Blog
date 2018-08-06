import CMS from 'netlify-cms'


import BlogPostPreview from './preview-templates/BlogPostPreview'


CMS.registerPreviewStyle('/styles.css')
// CMS.registerPreviewTemplate('about', AboutPagePreview)
// CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
