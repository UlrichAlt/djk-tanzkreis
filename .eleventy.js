const eleventyNavigationPlugin = require("@11ty/eleventy-navigation"); 
const
Image = require("@11ty/eleventy-img");

async function imageShortCode(src,alt) { let metadata = await Image(src, {
    widths: [300,600,1000], outputDir: "./_site/img", formats: ["avif", "jpeg"] });
    let sizes = "(max-width: 720px) 100vw, (max-width: 1260px) 70vw, calc(50vw-100px)"; 
    let imageAttributes = { alt, sizes, loading: "lazy", decoding: "async" };
    return Image.generateHTML(metadata, imageAttributes, {whitespaceMode: "inline"}); }

module.exports = function(eleventyConfig) {

    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(require("eleventy-plugin-postcss"));
    eleventyConfig.addPlugin(require("@sherby/eleventy-plugin-files-minifier"));
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortCode);
    eleventyConfig.addPassthroughCopy("src/icons");


  const { DateTime } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => { return
        DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yy-MM-dd'); });

    eleventyConfig.addFilter("readableDate", dateObj => { return
        DateTime.fromJSDate(dateObj, {}).setLocale('de-de').toLocaleString( {
            month: '2-digit', year: '2-digit', day: '2-digit' }); });

  return { markdownTemplateEngine: "njk", dir: { input: 'src', output: '_site' } }; };
